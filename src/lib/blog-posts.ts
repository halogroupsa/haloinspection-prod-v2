export const blogArchive = {
  title: "Property Inspection Guides",
  description: "Practical guides for Dubai property buyers and owners preparing for an independent inspection.",
};

export const blogPosts = [
  {
    slug: "villa-viewing-checklist-dubai",
    title: "Dubai villa viewing checklist before you buy and renovate",
    description: "Use your villa viewing to record visible concerns, request access and prepare for a pre-purchase inspection before planning a renovation.",
    publishedAt: "2026-11-25",
    image: "inspection/villa",
    imageAlt: "Inspector examining an exterior wall and drain at a Dubai villa",
    sections: [
      {
        heading: "Take your renovation sketch on the viewing",
        paragraphs: [
          "Walk the villa with the changes you have in mind. If you want to move the kitchen, look at the existing room, the proposed room and the route between them. Record where you can see service points, access panels or previous repairs. A sketch with a room name and a few marked photos will help the inspector follow what you are considering.",
          "Start a list of questions that could change the scope of a renovation. A damaged skirting board might be easy to replace. Marks along several walls in the same room are worth asking about before assuming the floor and walls need only new finishes.",
        ],
      },
      {
        heading: "Record what you actually saw",
        paragraphs: [
          "Photograph both the room and the detail. Write down where a door sticks, where tiles have chipped or which edge of a window shows staining. If there is a patch of new paint, ask if the seller knows when it was done and whether it followed a repair. The answer gives the inspector a lead to check.",
          "From accessible areas, make a note of terraces, exterior wall marks and drainage features around the villa. If a ceiling sits beneath a terrace or bathroom, mark both on your sketch. Keep the notes descriptive. An old stain, for example, needs more information before anyone can say whether a leak is active.",
        ],
      },
      {
        heading: "Find out what can be checked before you commit",
        paragraphs: [
          "Ask the seller or agent which rooms, terraces and service cupboards can be opened for the inspection. Confirm the status of water and power and the seller’s permission for normal operating checks. If the villa has been empty, ask when the systems were last used and whether any maintenance records are available.",
          "A pre-purchase inspection can record conditions in accessible areas and explain which checks were limited. Ask what extra investigation would be needed for changes such as moving services or altering walls. Share any drawings for earlier alterations if the seller has them, and ask your renovation team how it will verify the changes you want to make.",
        ],
      },
      {
        heading: "Turn the inspection report into a renovation brief",
        paragraphs: [
          "Give the inspector the rooms you plan to change and the observations you want followed up. Once you have the report, put the findings into your list of renovation decisions. Some items are repairs you can describe to a contractor. Others need more access, a specialist inspection or a separate design decision before the scope is firm.",
          "Suppose the report records moisture marks at the bottom of a wall beside the shower. Put the area on the investigation list before ordering finishes. If the same report identifies a worn handle on a door you plan to keep, you can record it as a separate, visible repair.",
        ],
      },
    ],
  },
] as const;

export type BlogPost = (typeof blogPosts)[number];
