"""Build the hand-curated project assets. Originals are never modified.

Usage: python3 scripts/prepare-project-media.py /path/to/property-inspection-resources
Selections were visually reviewed against raw photo contact sheets and reel shot sheets.
"""
from pathlib import Path
from PIL import Image, ImageOps
from concurrent.futures import ThreadPoolExecutor
import json
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(sys.argv[1])
PLANS = {p['slug']: p for p in json.loads((SOURCE / 'exports/review/projects/projects_plan.json').read_text())}
RESEARCH = ROOT / 'research/project-media.json'
SELECTIONS = {
    'palm-jumeirah': [('frame', 1), ('frame', 2), ('frame', 3), ('frame', 5), ('frame', 6)],
    'jumeirah-new': [('frame', 11), ('frame', 1), ('frame', 2), ('frame', 3), ('frame', 5)],
    'mbr': [('frame', 1), ('frame', 7), ('frame', 2), ('frame', 10), ('frame', 8)],
    'd16': [('frame', 1), ('frame', 8), ('frame', 4), ('frame', 6), ('frame', 10)],
    'nad-al-sheba-191': [('frame', 1), ('frame', 2), ('frame', 6), ('frame', 8), ('frame', 7)],
    'nas-gardens-186': [('frame', 1), ('frame', 2), ('frame', 4), ('frame', 8), ('frame', 9)],
    'nas-gardens-188': [('frame', 10), ('frame', 3), ('frame', 7), ('frame', 9), ('frame', 11)],
    'nad-al-sheba-april': [('frame', 6), ('photo', 3), ('photo', 5), ('photo', 7), ('photo', 10)],
    'mudon': [('frame', 1), ('photo', 1), ('photo', 3), ('photo', 6), ('frame', 13)],
    'dh139': [('photo', 16), ('photo', 3), ('photo', 11), ('photo', 4), ('photo', 19), ('photo', 21)],
}
PHOTO_FOLDERS = {'dh139': 'inspection-dh139', 'mudon': 'inspection-mudon-images', 'nad-al-sheba-april': 'inspection-nad-al-sheba'}

def run(args):
    result = subprocess.run(args, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
    if result.returncode:
        raise RuntimeError(result.stderr.decode())

def prepare_images(slug, selections):
    dest = ROOT / 'public/images/projects' / slug
    dest.mkdir(parents=True, exist_ok=True)
    entries = []
    for i, (kind, number) in enumerate(selections):
        target = dest / ('cover.webp' if i == 0 else f'gallery-{i}.webp')
        entry = {'asset': str(target.relative_to(ROOT / 'public')), 'kind': kind}
        if kind == 'photo':
            files = sorted(p for p in (SOURCE / 'raw' / PHOTO_FOLDERS[slug]).rglob('*') if p.suffix.lower() == '.jpg')
            origin = files[number - 1]
            im = ImageOps.exif_transpose(Image.open(origin))
        else:
            shot = PLANS[slug]['shots'][number - 1]
            origin = SOURCE / shot['path']
            moment = shot['thumb_time']
            temporary = Path('/tmp') / f'halo-{slug}-{i}.jpg'
            filters = 'scale=1600:-2'
            if shot.get('hdr'):
                lut = SOURCE / 'exports/review/hlg_to_sdr.cube'
                filters = f"scale=1600:-2:in_color_matrix=bt2020:out_range=pc,format=gbrp16le,lut3d=file='{lut}',scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p"
            run(['ffmpeg', '-v', 'error', '-ss', str(moment), '-i', str(origin), '-frames:v', '1', '-vf', filters, '-y', str(temporary)])
            im = Image.open(temporary)
            entry['time_seconds'] = moment
        im = im.convert('RGB')
        im.thumbnail((1800, 1800))
        im.save(target, 'WEBP', quality=86, method=6)
        entry.update(source=str(origin.relative_to(SOURCE)), width=im.width, height=im.height)
        entries.append(entry)
    print(f'{slug}: {len(entries)} selected images', flush=True)
    return slug, entries

def prepare_video(slug):
    source = SOURCE / 'exports/project-pages' / slug / 'video.mp4'
    target = ROOT / 'public/videos/projects' / f'{slug}.mp4'
    target.parent.mkdir(parents=True, exist_ok=True)
    run(['ffmpeg', '-v', 'error', '-i', str(source), '-vf', 'scale=1280:720', '-c:v', 'libx264', '-preset', 'medium', '-crf', '26', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', '-threads', '2', '-y', str(target)])
    # A lighter 540p cut for phones: roughly half the bytes over a mobile connection.
    mobile = target.with_name(f'{slug}-540.mp4')
    run(['ffmpeg', '-v', 'error', '-i', str(source), '-vf', 'scale=960:540', '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-maxrate', '1000k', '-bufsize', '2000k', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', '-threads', '2', '-y', str(mobile)])
    print(f'{slug}: video {target.stat().st_size / 1024 / 1024:.1f} MB, mobile {mobile.stat().st_size / 1024 / 1024:.1f} MB', flush=True)
    return {'asset': str(target.relative_to(ROOT / 'public')), 'mobile_asset': str(mobile.relative_to(ROOT / 'public')), 'source': str(source.relative_to(SOURCE)), 'duration_seconds': 30, 'resolution': [1280, 720], 'mobile_resolution': [960, 540]}

with ThreadPoolExecutor(max_workers=3) as pool:
    images = dict(pool.map(lambda item: prepare_images(*item), SELECTIONS.items()))
    videos = json.loads(RESEARCH.read_text())['videos'] if '--images-only' in sys.argv else list(pool.map(prepare_video, PLANS))
RESEARCH.parent.mkdir(exist_ok=True)
RESEARCH.write_text(json.dumps({'source_root': str(SOURCE), 'selection_notes': 'Favor composed wide views and sharp inspection activity. Exclude near duplicates, clutter and motion blur. Raw photo sets remain with their named projects; DH139 is kept separate from D16 because no explicit project mapping was supplied. Mudon photo and portrait footage match the landscape visit date and interiors; both reels are presented on one project page.', 'images': images, 'videos': videos}, indent=2) + '\n')
