/**
 * Stock imagery — Unsplash URLs verified HTTP 200.
 * coverByFilter: image when that chip is selected (thematic to filter + group).
 * filterTags: which chips include this group.
 * coverDefault: when no chip is selected (generic mix).
 */

const U = (slug) =>
  `https://images.unsplash.com/photo-${slug}?auto=format&fit=crop&w=640&h=400&q=80`;

/* Reusable stock photos (by theme) */
const STOCK = {
  hikeTrail: U("1551632811-561732d1e306"),
  mountains: U("1464822759023-fed622ff2c3b"),
  alpineLake: U("1506905925346-21bda4d32df4"),
  mistForest: U("1469474968028-56623f02e42e"),
  foodSpread: U("1546069901-ba9599a7e63c"),
  brunch: U("1504674900247-0877df9cc836"),
  restaurant: U("1517248135467-4c7edcad34c4"),
  dogBeach: U("1530281700549-e82e7bf110d6"),
  catClose: U("1574158622682-e40e69881006"),
  laptopDesk: U("1521737604893-d14cc237f11d"),
  openLaptop: U("1504384308090-c894fdcc538d"),
  vinylMusic: U("1529156069898-49953e39b3ac"),
  fashionWalk: U("1445205170230-053b83016050"),
  classroom: U("1503676260728-1c00da094a0b"),
  meetingTable: U("1507003211169-0a1dd7228f2d"),
  abstractBlue: U("1559827260-dc66d52bef19"),
};

export const GROUP_FILTERS = [
  "Nature & Outdoors",
  "Food",
  "Dogs",
  "Technology",
  "Travel",
  "Crafts",
  "Music",
  "Fashion",
  "Cats",
  "Politics",
  "Drink",
  "Education",
];

export const discoverGroups = [
  {
    id: "g-hike-ga",
    name: "Explore Georgia Hiking Club",
    category: "Hiking · Savannah, GA",
    memberCount: "578 members",
    iconKey: "mountain",
    blurb: "Day hikes, trail reports, and meetups from the coast to the foothills.",
    filterTags: ["Nature & Outdoors", "Travel"],
    coverDefault: STOCK.hikeTrail,
    coverByFilter: {
      "Nature & Outdoors": STOCK.hikeTrail,
      Travel: STOCK.mistForest,
    },
    since: "May 2019",
    activityShort: "10+ posts a day",
  },
  {
    id: "g-wild-women",
    name: "Wild Women Wanderers",
    category: "Outdoors · Southeast GA",
    memberCount: "4.2K members",
    iconKey: "tree",
    blurb: "Women-led hikes, paddles, and camping weekends across Georgia.",
    filterTags: ["Nature & Outdoors", "Travel"],
    coverDefault: STOCK.alpineLake,
    coverByFilter: {
      "Nature & Outdoors": STOCK.mountains,
      Travel: STOCK.alpineLake,
    },
  },
  {
    id: "g-plant-sav",
    name: "Savannah Plant Community",
    category: "Nature · Savannah, GA",
    memberCount: "8.3K members",
    iconKey: "tree",
    blurb: "Swaps, native species, and greenhouse tours in the Lowcountry.",
    filterTags: ["Nature & Outdoors", "Crafts"],
    coverDefault: STOCK.mistForest,
    coverByFilter: {
      "Nature & Outdoors": STOCK.mistForest,
      Crafts: STOCK.abstractBlue,
    },
  },
  {
    id: "g-north-ga",
    name: "North GA Hiking & Camping Group",
    category: "Hiking · North Georgia",
    memberCount: "10K members",
    iconKey: "mountain",
    blurb: "Waterfalls, ridge trails, and cold-weather camps in the mountains.",
    filterTags: ["Nature & Outdoors", "Travel"],
    coverDefault: STOCK.mountains,
    coverByFilter: {
      "Nature & Outdoors": STOCK.mountains,
      Travel: STOCK.alpineLake,
    },
  },
  {
    id: "g-ga-outdoor",
    name: "Georgia Outdoor Adventures",
    category: "Outdoors · Georgia",
    memberCount: "19K members",
    iconKey: "compass",
    blurb: "Kayaking, backpacking, and climbing — all skill levels welcome.",
    filterTags: ["Nature & Outdoors", "Drink", "Travel"],
    coverDefault: STOCK.alpineLake,
    coverByFilter: {
      "Nature & Outdoors": STOCK.hikeTrail,
      Drink: STOCK.restaurant,
      Travel: STOCK.mistForest,
    },
    since: "March 2018",
    activityShort: "50+ posts a week",
  },
  {
    id: "g-sav-food",
    name: "Savannah Supper Club",
    category: "Food & drink · Downtown",
    memberCount: "2.1K members",
    iconKey: "waves",
    blurb: "Pop-up dinners, farmers market crawls, and Lowcountry recipes.",
    filterTags: ["Food", "Drink", "Travel"],
    coverDefault: STOCK.foodSpread,
    coverByFilter: {
      Food: STOCK.foodSpread,
      Drink: STOCK.restaurant,
      Travel: STOCK.brunch,
    },
  },
  {
    id: "g-lowcountry-eats",
    name: "Lowcountry Foodies",
    category: "Restaurant finds · Chatham County",
    memberCount: "6.7K members",
    iconKey: "waves",
    blurb: "Brunch spots, seafood shacks, and hidden gems from Tybee to Bluffton.",
    filterTags: ["Food", "Travel"],
    coverDefault: STOCK.brunch,
    coverByFilter: {
      Food: STOCK.brunch,
      Travel: STOCK.restaurant,
    },
  },
  {
    id: "g-coast-dogs",
    name: "Coastal Georgia Dog Walkers",
    category: "Pets · Savannah area",
    memberCount: "3.4K members",
    iconKey: "waves",
    blurb: "Beach romps, leash-friendly trails, and adoption events.",
    filterTags: ["Dogs", "Nature & Outdoors"],
    coverDefault: STOCK.dogBeach,
    coverByFilter: {
      Dogs: STOCK.dogBeach,
      "Nature & Outdoors": STOCK.hikeTrail,
    },
  },
  {
    id: "g-sav-tech",
    name: "Savannah Tech & Startups",
    category: "Technology · GA",
    memberCount: "1.2K members",
    iconKey: "compass",
    blurb: "Meetups, coworking days, and lightning talks for builders.",
    filterTags: ["Technology", "Education"],
    coverDefault: STOCK.laptopDesk,
    coverByFilter: {
      Technology: STOCK.laptopDesk,
      Education: STOCK.classroom,
    },
  },
  {
    id: "g-cat-lowcountry",
    name: "Lowcountry Cat Lounge Friends",
    category: "Pets · Online + meetups",
    memberCount: "890 members",
    iconKey: "tree",
    blurb: "TNR support, foster networks, and coffee meetups for cat people.",
    filterTags: ["Cats", "Crafts"],
    coverDefault: STOCK.catClose,
    coverByFilter: {
      Cats: STOCK.catClose,
      Crafts: STOCK.abstractBlue,
    },
  },
  {
    id: "g-sav-music",
    name: "Savannah Live & Local",
    category: "Music · Historic district",
    memberCount: "5.1K members",
    iconKey: "waves",
    blurb: "Open mics, jazz nights, and festival volunteer crews.",
    filterTags: ["Music", "Drink"],
    coverDefault: STOCK.vinylMusic,
    coverByFilter: {
      Music: STOCK.vinylMusic,
      Drink: STOCK.restaurant,
    },
  },
  {
    id: "g-sav-fashion",
    name: "Hostess City Style",
    category: "Fashion · Savannah",
    memberCount: "1.8K members",
    iconKey: "compass",
    blurb: "Vintage markets, local designers, and photo walks.",
    filterTags: ["Fashion", "Crafts"],
    coverDefault: STOCK.fashionWalk,
    coverByFilter: {
      Fashion: STOCK.fashionWalk,
      Crafts: STOCK.abstractBlue,
    },
  },
  {
    id: "g-civic-sav",
    name: "Savannah Civic Forum",
    category: "Community · Chatham County",
    memberCount: "2.9K members",
    iconKey: "tree",
    blurb: "Town halls, voter info, and neighborhood advocacy — civil discourse only.",
    filterTags: ["Politics", "Education"],
    coverDefault: STOCK.meetingTable,
    coverByFilter: {
      Politics: STOCK.meetingTable,
      Education: STOCK.classroom,
    },
  },
];

export function getGroupCoverUrl(group, activeFilter) {
  if (activeFilter && group.coverByFilter?.[activeFilter]) {
    return group.coverByFilter[activeFilter];
  }
  return group.coverDefault || Object.values(group.coverByFilter || {})[0];
}

export function filterGroupsByChip(groups, activeFilter) {
  if (!activeFilter) return groups;
  return groups.filter((g) => g.filterTags?.includes(activeFilter));
}

/** Merge feed `group` stub with full discover row (cover, blurb, etc.). */
export function enrichGroupFromDiscover(ref) {
  if (!ref?.id) return null;
  const full = discoverGroups.find((g) => g.id === ref.id);
  if (!full) {
    return { ...ref, coverUrl: null, blurb: ref.blurb || "" };
  }
  return {
    ...full,
    name: ref.name || full.name,
    category: ref.category || full.category,
    memberCount: ref.memberCount || full.memberCount,
    iconKey: ref.iconKey || full.iconKey,
    coverUrl: getGroupCoverUrl(full, null),
  };
}

/** Rows for group info sheet (Figma-style details). */
export function getGroupInfoRows(group) {
  const loc =
    group.category && group.category.includes("·")
      ? group.category.split("·").pop().trim()
      : "Georgia";
  const history = group.since ? `Active since ${group.since}` : "Active since 2021";
  return [
    { label: "Privacy", value: "Private group" },
    { label: "Members", value: group.memberCount || "—" },
    { label: "Location", value: loc },
    { label: "Activity", value: group.activityShort || "New posts this week" },
    { label: "History", value: history },
  ];
}
