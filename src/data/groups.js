/**
 * Stock imagery — Unsplash URLs verified HTTP 200.
 * coverByFilter: image when that chip is selected (thematic to filter + group).
 * nameByFilter: optional display title per active chip (same keys as coverByFilter you care about).
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
  paddleRiver: U("1544551763-46a013bb70d5"),
  /** Outdoor wellness — verified HTTP 200 */
  yogaPark: U("1506126613408-eca07ce68773"),
  /** Cycling / motion — verified HTTP 200 */
  bikePath: U("1558618666-fcd25c85cd64"),
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
    nameByFilter: {
      "Nature & Outdoors": "Georgia Trail Reports & Day Hikes",
      Travel: "Coast-to-Foothills Hiking Meetups",
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
    nameByFilter: {
      "Nature & Outdoors": "Ridge Trails & Summit Weekends (Women)",
      Travel: "Paddle & Camp Across the Southeast",
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
    nameByFilter: {
      "Nature & Outdoors": "Lowcountry Native Plants & Greenhouse Tours",
      Crafts: "Plant Swaps & DIY Terrarium Studio",
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
    nameByFilter: {
      "Nature & Outdoors": "Waterfalls & Blue Ridge Backpacking",
      Travel: "Multi-Day Mountain Trek Planning",
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
    nameByFilter: {
      "Nature & Outdoors": "Backpacking, Climbing & Trail Crew",
      Drink: "Post-Adventure Pints & Tacos",
      Travel: "Road Trips to National Forests",
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
    nameByFilter: {
      Food: "Savannah Supper Club",
      Drink: "Wine Bars & Chef Pop-Ups",
      Travel: "Lowcountry Food Road Trips",
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
    nameByFilter: {
      Food: "Lowcountry Foodies",
      Travel: "Coastal Day-Trip Eats",
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
    nameByFilter: {
      Dogs: "Coastal Georgia Dog Walkers",
      "Nature & Outdoors": "Leash-Friendly Trails & Beach Romps",
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
    nameByFilter: {
      Technology: "Savannah Tech & Startups",
      Education: "Build in Public Study Hall",
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
    nameByFilter: {
      Cats: "Lowcountry Cat Lounge Friends",
      Crafts: "DIY Cat Toys & Enrichment Crafts",
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
    nameByFilter: {
      Music: "Savannah Live & Local",
      Drink: "Jazz Nights & Late Venues",
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
    nameByFilter: {
      Fashion: "Hostess City Style",
      Crafts: "Stitch & Style Workshops",
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
    nameByFilter: {
      Politics: "Savannah Civic Forum",
      Education: "Civics 101 & Voter Workshops",
    },
  },
  {
    id: "g-ogeechee-paddle",
    name: "Ogeechee River Paddlers",
    category: "Kayaking · Coastal GA",
    memberCount: "2.6K members",
    iconKey: "waves",
    blurb: "Blackwater floats, shuttle days, and cold-water safety tips for new paddlers.",
    filterTags: ["Nature & Outdoors", "Travel", "Drink"],
    coverDefault: STOCK.paddleRiver,
    coverByFilter: {
      "Nature & Outdoors": STOCK.paddleRiver,
      Travel: STOCK.alpineLake,
      Drink: STOCK.restaurant,
    },
    nameByFilter: {
      "Nature & Outdoors": "Ogeechee Blackwater Paddle Club",
      Travel: "Shuttle Weekends & Coastal Paddles",
      Drink: "Après-Paddle Riverside Hangs",
    },
    since: "June 2017",
    activityShort: "20+ posts a week",
  },
  {
    id: "g-coast-birding",
    name: "Georgia Coast Birding Network",
    category: "Wildlife · Chatham & McIntosh",
    memberCount: "3.1K members",
    iconKey: "tree",
    blurb: "Rare sightings, refuge maps, and dawn field trips along the Atlantic flyway.",
    filterTags: ["Nature & Outdoors", "Education"],
    coverDefault: STOCK.mistForest,
    coverByFilter: {
      "Nature & Outdoors": STOCK.mountains,
      Education: STOCK.classroom,
    },
    nameByFilter: {
      "Nature & Outdoors": "Atlantic Flyway Field Trips",
      Education: "Bird ID & Conservation Workshops",
    },
  },
  {
    id: "g-tybee-trail-run",
    name: "Tybee Trail & Dune Runners",
    category: "Running · Tybee & Savannah",
    memberCount: "1.4K members",
    iconKey: "mountain",
    blurb: "Sand repeats, bridge tempo runs, and group long runs with ice bath meetups.",
    filterTags: ["Nature & Outdoors", "Travel"],
    coverDefault: STOCK.dogBeach,
    coverByFilter: {
      "Nature & Outdoors": STOCK.hikeTrail,
      Travel: STOCK.alpineLake,
    },
    nameByFilter: {
      "Nature & Outdoors": "Coastal Trail Miles & Ridge Repeats",
      Travel: "Racecation & Beach Run Weekends",
    },
  },
  {
    id: "g-nature-photo",
    name: "Savannah Nature Photographers",
    category: "Photography · Hostess City",
    memberCount: "5.6K members",
    iconKey: "compass",
    blurb: "Golden-hour meetups, marsh wading (carefully), and Lightroom critique nights.",
    filterTags: ["Nature & Outdoors", "Crafts"],
    coverDefault: STOCK.alpineLake,
    coverByFilter: {
      "Nature & Outdoors": STOCK.mistForest,
      Crafts: STOCK.abstractBlue,
    },
    nameByFilter: {
      "Nature & Outdoors": "Marsh Light & Wildlife Photo Walks",
      Crafts: "Print Nights & Portfolio Reviews",
    },
  },
  {
    id: "g-forsyth-yoga",
    name: "Forsyth Park Outdoor Yoga",
    category: "Wellness · Downtown Savannah",
    memberCount: "920 members",
    iconKey: "tree",
    blurb: "Donation-based sunrise flows, shade-tree yin, and mindful walking meditations.",
    filterTags: ["Nature & Outdoors", "Education"],
    coverDefault: STOCK.yogaPark,
    coverByFilter: {
      "Nature & Outdoors": STOCK.yogaPark,
      Education: STOCK.classroom,
    },
    nameByFilter: {
      "Nature & Outdoors": "Sunrise Flow Under the Oaks",
      Education: "Anatomy & Breathwork Intensives",
    },
  },
  {
    id: "g-longleaf-hike",
    name: "Savannah Longleaf Trail Society",
    category: "Hiking · Longleaf pine belt",
    memberCount: "7.8K members",
    iconKey: "mountain",
    blurb: "Prescribed-burn awareness, rare longleaf hikes, and kid-friendly nature walks.",
    filterTags: ["Nature & Outdoors", "Education"],
    coverDefault: STOCK.mistForest,
    coverByFilter: {
      "Nature & Outdoors": STOCK.hikeTrail,
      Education: STOCK.classroom,
    },
    nameByFilter: {
      "Nature & Outdoors": "Longleaf Pine & Sandhill Hikes",
      Education: "Fire Ecology & Stewardship Talks",
    },
    activityShort: "15+ posts a day",
  },
  {
    id: "g-wildflower-low",
    name: "Lowcountry Wildflower Watch",
    category: "Botany · GA & SC coast",
    memberCount: "2.2K members",
    iconKey: "tree",
    blurb: "Bloom maps, pollinator gardens, and seed exchanges for coastal plain natives.",
    filterTags: ["Nature & Outdoors", "Crafts"],
    coverDefault: STOCK.mountains,
    coverByFilter: {
      "Nature & Outdoors": STOCK.alpineLake,
      Crafts: STOCK.abstractBlue,
    },
    nameByFilter: {
      "Nature & Outdoors": "Coastal Plain Bloom Chasers",
      Crafts: "Seed Swap & Pressed-Flower Art",
    },
  },
  {
    id: "g-history-walks",
    name: "Savannah History Walks Society",
    category: "Tours · Historic district",
    memberCount: "4.4K members",
    iconKey: "waves",
    blurb: "Architectural deep dives, cemetery symbolism, and after-dark lantern tours.",
    filterTags: ["Education", "Travel"],
    coverDefault: STOCK.meetingTable,
    coverByFilter: {
      Education: STOCK.classroom,
      Travel: STOCK.fashionWalk,
    },
    nameByFilter: {
      Education: "Archives & Research Walks",
      Travel: "Weekend Heritage Road Trips",
    },
  },
  {
    id: "g-chess-coffee",
    name: "Chess & Coffee Savannah",
    category: "Games · Midtown cafés",
    memberCount: "640 members",
    iconKey: "compass",
    blurb: "Blitz nights, beginner coaching, and pastry-fueled endgame drills.",
    filterTags: ["Education", "Drink"],
    coverDefault: STOCK.meetingTable,
    coverByFilter: {
      Education: STOCK.classroom,
      Drink: STOCK.brunch,
    },
    nameByFilter: {
      Education: "Chess & Coffee Savannah",
      Drink: "Latte League Blitz Nights",
    },
  },
  {
    id: "g-bikes-brews",
    name: "Coastal Bikes & Brews",
    category: "Cycling · Savannah metro",
    memberCount: "1.9K members",
    iconKey: "compass",
    blurb: "Slow rolls to breweries, charity centuries, and safe-street advocacy.",
    filterTags: ["Drink", "Travel"],
    coverDefault: STOCK.bikePath,
    coverByFilter: {
      Drink: STOCK.restaurant,
      Travel: STOCK.bikePath,
    },
    nameByFilter: {
      Drink: "Taproom Tuesday Social Rides",
      Travel: "Century Weekends & Rail Trails",
    },
  },
  {
    id: "g-indie-film",
    name: "Hostess City Indie Film",
    category: "Film · Lucas Theatre circle",
    memberCount: "3.3K members",
    iconKey: "waves",
    blurb: "Screenings, Q&As with directors, and crowdfunded shorts from local crews.",
    filterTags: ["Education", "Music"],
    coverDefault: STOCK.vinylMusic,
    coverByFilter: {
      Education: STOCK.classroom,
      Music: STOCK.vinylMusic,
    },
    nameByFilter: {
      Education: "Film Studies & Critique Nights",
      Music: "Live Scores & Soundtrack Swaps",
    },
  },
  {
    id: "g-volunteer-parks",
    name: "Chatham Parks Volunteers",
    category: "Service · County parks",
    memberCount: "1.1K members",
    iconKey: "tree",
    blurb: "Trail maintenance, invasive pulls, and family-friendly stewardship Saturdays.",
    filterTags: ["Nature & Outdoors", "Education", "Politics"],
    coverDefault: STOCK.hikeTrail,
    coverByFilter: {
      "Nature & Outdoors": STOCK.hikeTrail,
      Education: STOCK.classroom,
      Politics: STOCK.meetingTable,
    },
    nameByFilter: {
      "Nature & Outdoors": "Trail Build & Habitat Restoration",
      Education: "Youth Outdoor Leadership",
      Politics: "Parks Funding & Green Space Advocacy",
    },
  },
];

export function getGroupCoverUrl(group, activeFilter) {
  if (activeFilter && group.coverByFilter?.[activeFilter]) {
    return group.coverByFilter[activeFilter];
  }
  return group.coverDefault || Object.values(group.coverByFilter || {})[0];
}

/** Display title for the active chip; falls back to canonical `name`. */
export function getGroupDisplayName(group, activeFilter) {
  if (activeFilter && group.nameByFilter?.[activeFilter]) {
    return group.nameByFilter[activeFilter];
  }
  return group.name;
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
