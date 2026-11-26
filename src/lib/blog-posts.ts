export const blogArchive = {
  title: "Property Inspection Guides",
  description: "Practical guides for Dubai property buyers and owners preparing for an independent inspection.",
};

export const blogPosts = [
  {
    slug: "property-snagging-before-handover-dubai",
    title: "What a handover inspection can confirm before taking the keys",
    description: "Prepare for property snagging in Dubai. Learn what a handover inspection can check, how to record defects and what to ask the developer to revisit.",
    publishedAt: "2026-11-26",
    image: "inspection/handover",
    imageAlt: "Inspector examining door alignment in an unfurnished new apartment",
    eyebrow: "Handover and snagging",
    serviceLink: {
      href: "/services/handover",
      label: "handover and snagging inspection"
    },
    reference: {
      href: "https://www.ecm.ae/wp-content/uploads/2023/06/Handover-Factsheet.pdf",
      label: "Emaar’s example handover factsheet"
    },
    sections: [
      {
        heading: "Book around the developer’s access window",
        paragraphs: [
          "When the handover email arrives, ask whether an independent inspector can attend, how much time the visit allows and who can open any service areas. Check whether water and power will be available and ask how the developer wants the snag list submitted. Book the visit once those details are clear.",
          "Send the inspector the unit plan and any finishes or upgrades you agreed in writing. Highlight the items you are unsure about. A wardrobe door scraping the frame is a defect to record. A different worktop finish is easier to discuss if you have the agreed specification beside the photograph."
        ]
      },
      {
        heading: "What the inspector can record on the day",
        paragraphs: [
          "A typical snagging visit covers visible finishes and the operation of items the inspector can reach and use under the agreed scope. That can include tile damage, doors and windows that bind, joinery alignment and basic plumbing or cooling checks where conditions allow.",
          "Ask for the name of the room, the exact location, the observation and a photo. If a guest bathroom tap is loose, “tap moves at the basin when operated” gives the team a clear action. Add the unit and room number before submitting the report."
        ]
      },
      {
        heading: "Keep a record of missed checks",
        paragraphs: [
          "A locked area, an appliance that has yet to be connected or an unavailable utility can leave a gap. Ask the inspector to list these separately and say what would be needed to check them later. Concealed construction and specialist tests have their own scope.",
          "Use that list when discussing the inspection with your developer. If cooling was unavailable, ask when it will be ready for a follow-up check and who will arrange access."
        ]
      },
      {
        heading: "Set up a recheck before the report is filed away",
        paragraphs: [
          "Send the report through the developer’s agreed channel and keep a copy with any reference numbers. Ask for target dates and how you will find out when work is complete. The original item number and photo make it easier to compare the repair on a return visit.",
          "Before deciding how to handle the key collection appointment, confirm the developer’s process and review your purchase documents. The snag report gives you a dated record of conditions, outstanding checks and repairs to follow up."
        ]
      }
    ]
  },
  {
    slug: "villa-viewing-checklist-dubai",
    title: "A pre-purchase walk-through checklist for a Dubai villa you plan to renovate",
    description: "Use your villa viewing to record visible concerns, request access and prepare for a pre-purchase inspection before planning a renovation.",
    publishedAt: "2026-11-25",
    image: "inspection/villa",
    imageAlt: "Inspector examining an exterior wall and drain at a Dubai villa",
    eyebrow: "Pre-purchase guide",
    serviceLink: { href: "/services/pre-purchase", label: "pre-purchase property inspection" },
    reference: { href: "https://www.nachi.org/sop.htm", label: "the InterNACHI standards of practice" },
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
