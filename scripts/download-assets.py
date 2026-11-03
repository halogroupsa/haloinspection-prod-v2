#!/usr/bin/env python3
"""Archive Halo's public images and prepare local, optimized site assets."""
import concurrent.futures
import json
import re
import shutil
import urllib.request
from pathlib import Path
from urllib.parse import urlparse

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
IMAGE_DIR = ROOT / 'public/images'
MANIFEST = ROOT / 'research/assets.json'
LOCAL = Path('/Volumes/MacLexarSsd/Lexar_Documents/DesignsFrontier/halo_ae/halo-ae-next/public/images')
UA = 'Mozilla/5.0'

def download(pair):
    url, relative = pair
    archive_relative = 'research/original-images/' + relative.removeprefix('images/legacy/')
    destination = ROOT / archive_relative
    destination.parent.mkdir(parents=True, exist_ok=True)
    try:
        request = urllib.request.Request(url, headers={'User-Agent': UA})
        with urllib.request.urlopen(request, timeout=35) as response:
            destination.write_bytes(response.read())
        row = {'archiveFile': archive_relative, 'source': url, 'type': 'existing-website', 'bytes': destination.stat().st_size}
        if destination.suffix.lower() in ('.jpg', '.jpeg', '.png', '.webp'):
            with Image.open(destination) as im:
                row['width'], row['height'] = im.size
        return row
    except Exception as exc:
        return {'source': url, 'error': str(exc)}

def optimize(source, name, max_width=1600, source_label=None, use=''):
    destination = IMAGE_DIR / name
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as opened:
        im = ImageOps.exif_transpose(opened)
        if im.mode not in ('RGB', 'RGBA'):
            im = im.convert('RGBA' if 'transparency' in im.info else 'RGB')
        if im.width > max_width:
            im = im.resize((max_width, round(im.height * max_width / im.width)), Image.Resampling.LANCZOS)
        im.save(destination, 'WEBP', quality=83, method=6)
        return {'file':'/images/'+name, 'source':source_label or str(source), 'type':'optimized', 'width':im.width, 'height':im.height, 'bytes':destination.stat().st_size, 'suggestedUsage':use}

def main():
    paths = json.loads((ROOT / 'research/asset-paths-live.json').read_text())
    tasks = [('https://haloinspection.ae'+p, 'images/legacy/'+p.removeprefix('/lovable-uploads/')) for p in paths if p.startswith('/lovable-uploads/')]
    tasks.append(('https://haloinspection.ae/lovable-uploads/fav2.png','images/legacy/fav2.png'))
    external = ROOT / 'research/unsplash-original-urls.json'
    if external.exists():
        tasks.extend((url, 'images/legacy/unsplash/' + urlparse(url).path.lstrip('/') + '.jpg') for url in json.loads(external.read_text()))
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        manifest = list(pool.map(download, tasks))
    local_files = sorted((LOCAL / 'property_inspection_dubai_r2').glob('*'))
    for source in local_files:
        if source.suffix.lower() in ('.jpg','.jpeg','.png','.webp'):
            clean_name = re.sub(r'[^a-z0-9]+','-',source.stem.lower()).strip('-')+'.webp'
            manifest.append(optimize(source, 'inspection/'+clean_name, use='Original Halo inspector, testing equipment, report or property photography'))
    for folder, category in [('lurking-clean','defects'),('lurking','reports')]:
        for source in sorted((LOCAL / 'property-inspection' / folder).glob('*.jpg')):
            manifest.append(optimize(source, f'{category}/{source.stem}.webp', max_width=900, use='Original inspection finding evidence'))
    for row in manifest.copy():
        if 'error' not in row and row['type'] == 'existing-website':
            source = ROOT / row['archiveFile']
            if source.suffix.lower() in ('.jpg','.jpeg','.png','.webp'):
                relative = source.relative_to(ROOT / 'research/original-images')
                manifest.append(optimize(source,'existing/'+str(relative.with_suffix('.webp')), source_label=row['source'], use='Image retained from original Halo website'))
    selected = ROOT / 'research/selected-assets.json'
    if selected.exists():
        manifest.extend(json.loads(selected.read_text()))
    font_sources = [
        {'file':'/fonts/manrope-latin.woff2','family':'Manrope','weight':'200 800','source':'https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSvfedN4.woff2'},
        {'file':'/fonts/urbanist-latin.woff2','family':'Urbanist','weight':'100 900','source':'https://fonts.gstatic.com/s/urbanist/v18/L0x-DF02iFML4hGCyMqlbS1miXK2.woff2'},
    ]
    MANIFEST.write_text(json.dumps({'retrieved':'2026-10-12','assets':manifest,'fonts':font_sources}, indent=2))
    print(json.dumps({'downloaded':sum(1 for r in manifest if r['type']=='existing-website') if all('type' in r for r in manifest) else len([r for r in manifest if r.get('type')=='existing-website']), 'optimized':len([r for r in manifest if r.get('type')=='optimized']), 'errors':[r for r in manifest if 'error' in r]},indent=2))

if __name__ == '__main__':
    main()
