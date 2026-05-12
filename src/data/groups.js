/**
 * Group covers use Lorem Picsum seeded URLs (`cov`) so every group and every chip
 * state gets a distinct image — no reuse across rows or between default vs filters.
 * coverByFilter: image when that chip is selected.
 * nameByFilter: optional display title per active chip (same keys as coverByFilter you care about).
 * filterTags: which chips include this group.
 * coverDefault: when no chip is selected (generic mix).
 * outdoorsHeavy: when true, group is hidden from Discover until a chip is selected
 *   (keeps the unfiltered grid light on hiking/outdoors; Nature & Outdoors still lists all tagged groups).
 *
 * `cov(groupId, variant)` builds a unique Lorem Picsum seed per group + variant so no image is shared
 * across groups or between default and chip-selected states for the same card.
 */
function cov(groupId, variant) {
  const id = groupId.replace(/-/g, "");
  const v = String(variant).replace(/[^a-zA-Z0-9]/g, "");
  return `https://picsum.photos/seed/fbg${id}${v}/640/400`;
}

function chipSlug(filterLabel) {
  return filterLabel.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase();
}

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
    coverDefault: cov("g-hike-ga", "default"),
    coverByFilter: {
      "Nature & Outdoors": cov("g-hike-ga", chipSlug("Nature & Outdoors")),
      Travel: cov("g-hike-ga", chipSlug("Travel")),
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
    outdoorsHeavy: true,
    name: "Wild Women Wanderers",
    category: "Outdoors · Southeast GA",
    memberCount: "4.2K members",
    iconKey: "tree",
    blurb: "Women-led hikes, paddles, and camping weekends across Georgia.",
    filterTags: ["Nature & Outdoors", "Travel"],
    coverDefault: cov("g-wild-women", "default"),
    coverByFilter: {
      "Nature & Outdoors": cov("g-wild-women", chipSlug("Nature & Outdoors")),
      Travel: cov("g-wild-women", chipSlug("Travel")),
    },
    nameByFilter: {
      "Nature & Outdoors": "Ridge Trails & Summit Weekends (Women)",
      Travel: "Paddle & Camp Across the Southeast",
    },
  },
  {
    id: "g-plant-sav",
    outdoorsHeavy: true,
    name: "Savannah Plant Community",
    category: "Nature · Savannah, GA",
    memberCount: "8.3K members",
    iconKey: "tree",
    blurb: "Swaps, native species, and greenhouse tours in the Lowcountry.",
    filterTags: ["Nature & Outdoors", "Crafts"],
    coverDefault: cov("g-plant-sav", "default"),
    coverByFilter: {
      "Nature & Outdoors": cov("g-plant-sav", chipSlug("Nature & Outdoors")),
      Crafts: cov("g-plant-sav", chipSlug("Crafts")),
    },
    nameByFilter: {
      "Nature & Outdoors": "Lowcountry Native Plants & Greenhouse Tours",
      Crafts: "Plant Swaps & DIY Terrarium Studio",
    },
  },
  {
    id: "g-north-ga",
    outdoorsHeavy: true,
    name: "North GA Hiking & Camping Group",
    category: "Hiking · North Georgia",
    memberCount: "10K members",
    iconKey: "mountain",
    blurb: "Waterfalls, ridge trails, and cold-weather camps in the mountains.",
    filterTags: ["Nature & Outdoors", "Travel"],
    coverDefault: cov("g-north-ga", "default"),
    coverByFilter: {
      "Nature & Outdoors": cov("g-north-ga", chipSlug("Nature & Outdoors")),
      Travel: cov("g-north-ga", chipSlug("Travel")),
    },
    nameByFilter: {
      "Nature & Outdoors": "Waterfalls & Blue Ridge Backpacking",
      Travel: "Multi-Day Mountain Trek Planning",
    },
  },
  {
    id: "g-ga-outdoor",
    outdoorsHeavy: true,
    name: "Georgia Outdoor Adventures",
    category: "Outdoors · Georgia",
    memberCount: "19K members",
    iconKey: "compass",
    blurb: "Kayaking, backpacking, and climbing — all skill levels welcome.",
    filterTags: ["Nature & Outdoors", "Drink", "Travel"],
    coverDefault: cov("g-ga-outdoor", "default"),
    coverByFilter: {
      "Nature & Outdoors": cov("g-ga-outdoor", chipSlug("Nature & Outdoors")),
      Drink: cov("g-ga-outdoor", chipSlug("Drink")),
      Travel: cov("g-ga-outdoor", chipSlug("Travel")),
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
    coverDefault: cov("g-sav-food", "default"),
    coverByFilter: {
      Food: cov("g-sav-food", chipSlug("Food")),
      Drink: cov("g-sav-food", chipSlug("Drink")),
      Travel: cov("g-sav-food", chipSlug("Travel")),
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
    coverDefault: cov("g-lowcountry-eats", "default"),
    coverByFilter: {
      Food: cov("g-lowcountry-eats", chipSlug("Food")),
      Travel: cov("g-lowcountry-eats", chipSlug("Travel")),
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
    coverDefault: cov("g-coast-dogs", "default"),
    coverByFilter: {
      Dogs: cov("g-coast-dogs", chipSlug("Dogs")),
      "Nature & Outdoors": cov("g-coast-dogs", chipSlug("Nature & Outdoors")),
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
    coverDefault: cov("g-sav-tech", "default"),
    coverByFilter: {
      Technology: cov("g-sav-tech", chipSlug("Technology")),
      Education: cov("g-sav-tech", chipSlug("Education")),
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
    coverDefault: cov("g-cat-lowcountry", "default"),
    coverByFilter: {
      Cats: cov("g-cat-lowcountry", chipSlug("Cats")),
      Crafts: cov("g-cat-lowcountry", chipSlug("Crafts")),
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
    coverDefault: cov("g-sav-music", "default"),
    coverByFilter: {
      Music: cov("g-sav-music", chipSlug("Music")),
      Drink: cov("g-sav-music", chipSlug("Drink")),
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
    coverDefault: cov("g-sav-fashion", "default"),
    coverByFilter: {
      Fashion: cov("g-sav-fashion", chipSlug("Fashion")),
      Crafts: cov("g-sav-fashion", chipSlug("Crafts")),
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
    coverDefault: cov("g-civic-sav", "default"),
    coverByFilter: {
      Politics: cov("g-civic-sav", chipSlug("Politics")),
      Education: cov("g-civic-sav", chipSlug("Education")),
    },
    nameByFilter: {
      Politics: "Savannah Civic Forum",
      Education: "Civics 101 & Voter Workshops",
    },
  },
  {
    id: "g-ogeechee-paddle",
    outdoorsHeavy: true,
    name: "Ogeechee River Paddlers",
    category: "Kayaking · Coastal GA",
    memberCount: "2.6K members",
    iconKey: "waves",
    blurb: "Blackwater floats, shuttle days, and cold-water safety tips for new paddlers.",
    filterTags: ["Nature & Outdoors", "Travel", "Drink"],
    coverDefault: cov("g-ogeechee-paddle", "default"),
    coverByFilter: {
      "Nature & Outdoors": cov("g-ogeechee-paddle", chipSlug("Nature & Outdoors")),
      Travel: cov("g-ogeechee-paddle", chipSlug("Travel")),
      Drink: cov("g-ogeechee-paddle", chipSlug("Drink")),
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
    outdoorsHeavy: true,
    name: "Georgia Coast Birding Network",
    category: "Wildlife · Chatham & McIntosh",
    memberCount: "3.1K members",
    iconKey: "tree",
    blurb: "Rare sightings, refuge maps, and dawn field trips along the Atlantic flyway.",
    filterTags: ["Nature & Outdoors", "Education"],
    coverDefault: cov("g-coast-birding", "default"),
    coverByFilter: {
      "Nature & Outdoors": cov("g-coast-birding", chipSlug("Nature & Outdoors")),
      Education: cov("g-coast-birding", chipSlug("Education")),
    },
    nameByFilter: {
      "Nature & Outdoors": "Atlantic Flyway Field Trips",
      Education: "Bird ID & Conservation Workshops",
    },
  },
  {
    id: "g-tybee-trail-run",
    outdoorsHeavy: true,
    name: "Tybee Trail & Dune Runners",
    category: "Running · Tybee & Savannah",
    memberCount: "1.4K members",
    iconKey: "mountain",
    blurb: "Sand repeats, bridge tempo runs, and group long runs with ice bath meetups.",
    filterTags: ["Nature & Outdoors", "Travel"],
    coverDefault: cov("g-tybee-trail-run", "default"),
    coverByFilter: {
      "Nature & Outdoors": cov("g-tybee-trail-run", chipSlug("Nature & Outdoors")),
      Travel: cov("g-tybee-trail-run", chipSlug("Travel")),
    },
    nameByFilter: {
      "Nature & Outdoors": "Coastal Trail Miles & Ridge Repeats",
      Travel: "Racecation & Beach Run Weekends",
    },
  },
  {
    id: "g-nature-photo",
    outdoorsHeavy: true,
    name: "Savannah Nature Photographers",
    category: "Photography · Hostess City",
    memberCount: "5.6K members",
    iconKey: "compass",
    blurb: "Golden-hour meetups, marsh wading (carefully), and Lightroom critique nights.",
    filterTags: ["Nature & Outdoors", "Crafts"],
    coverDefault: cov("g-nature-photo", "default"),
    coverByFilter: {
      "Nature & Outdoors": cov("g-nature-photo", chipSlug("Nature & Outdoors")),
      Crafts: cov("g-nature-photo", chipSlug("Crafts")),
    },
    nameByFilter: {
      "Nature & Outdoors": "Marsh Light & Wildlife Photo Walks",
      Crafts: "Print Nights & Portfolio Reviews",
    },
  },
  {
    id: "g-forsyth-yoga",
    outdoorsHeavy: true,
    name: "Forsyth Park Outdoor Yoga",
    category: "Wellness · Downtown Savannah",
    memberCount: "920 members",
    iconKey: "tree",
    blurb: "Donation-based sunrise flows, shade-tree yin, and mindful walking meditations.",
    filterTags: ["Nature & Outdoors", "Education"],
    coverDefault: cov("g-forsyth-yoga", "default"),
    coverByFilter: {
      "Nature & Outdoors": cov("g-forsyth-yoga", chipSlug("Nature & Outdoors")),
      Education: cov("g-forsyth-yoga", chipSlug("Education")),
    },
    nameByFilter: {
      "Nature & Outdoors": "Sunrise Flow Under the Oaks",
      Education: "Anatomy & Breathwork Intensives",
    },
  },
  {
    id: "g-longleaf-hike",
    outdoorsHeavy: true,
    name: "Savannah Longleaf Trail Society",
    category: "Hiking · Longleaf pine belt",
    memberCount: "7.8K members",
    iconKey: "mountain",
    blurb: "Prescribed-burn awareness, rare longleaf hikes, and kid-friendly nature walks.",
    filterTags: ["Nature & Outdoors", "Education"],
    coverDefault: cov("g-longleaf-hike", "default"),
    coverByFilter: {
      "Nature & Outdoors": cov("g-longleaf-hike", chipSlug("Nature & Outdoors")),
      Education: cov("g-longleaf-hike", chipSlug("Education")),
    },
    nameByFilter: {
      "Nature & Outdoors": "Longleaf Pine & Sandhill Hikes",
      Education: "Fire Ecology & Stewardship Talks",
    },
    activityShort: "15+ posts a day",
  },
  {
    id: "g-wildflower-low",
    outdoorsHeavy: true,
    name: "Lowcountry Wildflower Watch",
    category: "Botany · GA & SC coast",
    memberCount: "2.2K members",
    iconKey: "tree",
    blurb: "Bloom maps, pollinator gardens, and seed exchanges for coastal plain natives.",
    filterTags: ["Nature & Outdoors", "Crafts"],
    coverDefault: cov("g-wildflower-low", "default"),
    coverByFilter: {
      "Nature & Outdoors": cov("g-wildflower-low", chipSlug("Nature & Outdoors")),
      Crafts: cov("g-wildflower-low", chipSlug("Crafts")),
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
    coverDefault: cov("g-history-walks", "default"),
    coverByFilter: {
      Education: cov("g-history-walks", chipSlug("Education")),
      Travel: cov("g-history-walks", chipSlug("Travel")),
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
    coverDefault: cov("g-chess-coffee", "default"),
    coverByFilter: {
      Education: cov("g-chess-coffee", chipSlug("Education")),
      Drink: cov("g-chess-coffee", chipSlug("Drink")),
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
    coverDefault: cov("g-bikes-brews", "default"),
    coverByFilter: {
      Drink: cov("g-bikes-brews", chipSlug("Drink")),
      Travel: cov("g-bikes-brews", chipSlug("Travel")),
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
    coverDefault: cov("g-indie-film", "default"),
    coverByFilter: {
      Education: cov("g-indie-film", chipSlug("Education")),
      Music: cov("g-indie-film", chipSlug("Music")),
    },
    nameByFilter: {
      Education: "Film Studies & Critique Nights",
      Music: "Live Scores & Soundtrack Swaps",
    },
  },
  {
    id: "g-volunteer-parks",
    outdoorsHeavy: true,
    name: "Chatham Parks Volunteers",
    category: "Service · County parks",
    memberCount: "1.1K members",
    iconKey: "tree",
    blurb: "Trail maintenance, invasive pulls, and family-friendly stewardship Saturdays.",
    filterTags: ["Nature & Outdoors", "Education", "Politics"],
    coverDefault: cov("g-volunteer-parks", "default"),
    coverByFilter: {
      "Nature & Outdoors": cov("g-volunteer-parks", chipSlug("Nature & Outdoors")),
      Education: cov("g-volunteer-parks", chipSlug("Education")),
      Politics: cov("g-volunteer-parks", chipSlug("Politics")),
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
  if (!activeFilter) {
    return groups.filter((g) => !g.outdoorsHeavy);
  }
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
