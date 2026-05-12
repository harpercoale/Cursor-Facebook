/**
 * Group covers use Lorem Flickr (`lf`) with thematic tags plus a deterministic lock
 * derived from group id + variant + tags so:
 * - images match the group / filter theme, and
 * - no URL is reused across groups or between default vs chip states.
 *
 * coverByFilter: image when that chip is selected.
 * nameByFilter: optional display title per active chip (same keys as coverByFilter you care about).
 * filterTags: which chips include this group.
 * coverDefault: when no chip is selected (generic mix).
 * outdoorsHeavy: when true, group is hidden from Discover until a chip is selected
 *   (keeps the unfiltered grid light on hiking/outdoors; Nature & Outdoors still lists all tagged groups).
 */
function lf(tags, groupId, variant) {
  const seed = `${groupId}|${variant}|${tags}`;
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const lock = ((h >>> 0) % 9000000) + 100000;
  const path = tags
    .split(",")
    .map((t) => t.trim().replace(/\s+/g, "%20"))
    .join(",");
  return `https://loremflickr.com/640/400/${path}?lock=${lock}`;
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
    coverDefault: lf("hiking,forest", "g-hike-ga", "default"),
    coverByFilter: {
      "Nature & Outdoors": lf("hiking,trail", "g-hike-ga", chipSlug("Nature & Outdoors")),
      Travel: lf("roadtrip,mountain", "g-hike-ga", chipSlug("Travel")),
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
    coverDefault: lf("camping,women", "g-wild-women", "default"),
    coverByFilter: {
      "Nature & Outdoors": lf("mountain,hiking", "g-wild-women", chipSlug("Nature & Outdoors")),
      Travel: lf("kayak,lake", "g-wild-women", chipSlug("Travel")),
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
    coverDefault: lf("greenhouse,plants", "g-plant-sav", "default"),
    coverByFilter: {
      "Nature & Outdoors": lf("fern,forest", "g-plant-sav", chipSlug("Nature & Outdoors")),
      Crafts: lf("succulent,pot", "g-plant-sav", chipSlug("Crafts")),
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
    coverDefault: lf("waterfall,forest", "g-north-ga", "default"),
    coverByFilter: {
      "Nature & Outdoors": lf("mountain,trail", "g-north-ga", chipSlug("Nature & Outdoors")),
      Travel: lf("camping,tent", "g-north-ga", chipSlug("Travel")),
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
    coverDefault: lf("kayak,lake", "g-ga-outdoor", "default"),
    coverByFilter: {
      "Nature & Outdoors": lf("climbing,rock", "g-ga-outdoor", chipSlug("Nature & Outdoors")),
      Drink: lf("beer,pub", "g-ga-outdoor", chipSlug("Drink")),
      Travel: lf("highway,van", "g-ga-outdoor", chipSlug("Travel")),
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
    coverDefault: lf("dinner,table", "g-sav-food", "default"),
    coverByFilter: {
      Food: lf("gourmet,plate", "g-sav-food", chipSlug("Food")),
      Drink: lf("wine,glass", "g-sav-food", chipSlug("Drink")),
      Travel: lf("market,food", "g-sav-food", chipSlug("Travel")),
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
    coverDefault: lf("brunch,toast", "g-lowcountry-eats", "default"),
    coverByFilter: {
      Food: lf("seafood,shrimp", "g-lowcountry-eats", chipSlug("Food")),
      Travel: lf("restaurant,patio", "g-lowcountry-eats", chipSlug("Travel")),
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
    coverDefault: lf("dog,beach", "g-coast-dogs", "default"),
    coverByFilter: {
      Dogs: lf("dog,park", "g-coast-dogs", chipSlug("Dogs")),
      "Nature & Outdoors": lf("dog,hiking", "g-coast-dogs", chipSlug("Nature & Outdoors")),
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
    coverDefault: lf("laptop,office", "g-sav-tech", "default"),
    coverByFilter: {
      Technology: lf("laptop,code", "g-sav-tech", chipSlug("Technology")),
      Education: lf("classroom,students", "g-sav-tech", chipSlug("Education")),
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
    coverDefault: lf("kitten,portrait", "g-cat-lowcountry", "default"),
    coverByFilter: {
      Cats: lf("cat,yarn", "g-cat-lowcountry", chipSlug("Cats")),
      Crafts: lf("knitting,yarn", "g-cat-lowcountry", chipSlug("Crafts")),
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
    coverDefault: lf("concert,stage", "g-sav-music", "default"),
    coverByFilter: {
      Music: lf("vinyl,music", "g-sav-music", chipSlug("Music")),
      Drink: lf("cocktail,jazz", "g-sav-music", chipSlug("Drink")),
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
    coverDefault: lf("fashion,street", "g-sav-fashion", "default"),
    coverByFilter: {
      Fashion: lf("model,vintage", "g-sav-fashion", chipSlug("Fashion")),
      Crafts: lf("sewing,fabric", "g-sav-fashion", chipSlug("Crafts")),
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
    coverDefault: lf("conference,table", "g-civic-sav", "default"),
    coverByFilter: {
      Politics: lf("voting,ballot", "g-civic-sav", chipSlug("Politics")),
      Education: lf("lecture,hall", "g-civic-sav", chipSlug("Education")),
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
    coverDefault: lf("canoe,river", "g-ogeechee-paddle", "default"),
    coverByFilter: {
      "Nature & Outdoors": lf("kayak,mangrove", "g-ogeechee-paddle", chipSlug("Nature & Outdoors")),
      Travel: lf("roadtrip,bridge", "g-ogeechee-paddle", chipSlug("Travel")),
      Drink: lf("riverside,bar", "g-ogeechee-paddle", chipSlug("Drink")),
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
    coverDefault: lf("binoculars,birdwatcher", "g-coast-birding", "default"),
    coverByFilter: {
      "Nature & Outdoors": lf("heron,marsh", "g-coast-birding", chipSlug("Nature & Outdoors")),
      Education: lf("notebook,bird", "g-coast-birding", chipSlug("Education")),
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
    coverDefault: lf("running,beach", "g-tybee-trail-run", "default"),
    coverByFilter: {
      "Nature & Outdoors": lf("trail,runner", "g-tybee-trail-run", chipSlug("Nature & Outdoors")),
      Travel: lf("boardwalk,ocean", "g-tybee-trail-run", chipSlug("Travel")),
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
    coverDefault: lf("camera,lens", "g-nature-photo", "default"),
    coverByFilter: {
      "Nature & Outdoors": lf("sunset,marsh", "g-nature-photo", chipSlug("Nature & Outdoors")),
      Crafts: lf("gallery,frame", "g-nature-photo", chipSlug("Crafts")),
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
    coverDefault: lf("yoga,park", "g-forsyth-yoga", "default"),
    coverByFilter: {
      "Nature & Outdoors": lf("meditation,trees", "g-forsyth-yoga", chipSlug("Nature & Outdoors")),
      Education: lf("anatomy,book", "g-forsyth-yoga", chipSlug("Education")),
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
    coverDefault: lf("pine,forest", "g-longleaf-hike", "default"),
    coverByFilter: {
      "Nature & Outdoors": lf("hiking,path", "g-longleaf-hike", chipSlug("Nature & Outdoors")),
      Education: lf("ranger,forest", "g-longleaf-hike", chipSlug("Education")),
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
    coverDefault: lf("wildflower,meadow", "g-wildflower-low", "default"),
    coverByFilter: {
      "Nature & Outdoors": lf("butterfly,flower", "g-wildflower-low", chipSlug("Nature & Outdoors")),
      Crafts: lf("pressed,flower", "g-wildflower-low", chipSlug("Crafts")),
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
    coverDefault: lf("historic,building", "g-history-walks", "default"),
    coverByFilter: {
      Education: lf("library,books", "g-history-walks", chipSlug("Education")),
      Travel: lf("cobblestone,church", "g-history-walks", chipSlug("Travel")),
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
    coverDefault: lf("chess,pieces", "g-chess-coffee", "default"),
    coverByFilter: {
      Education: lf("chess,clock", "g-chess-coffee", chipSlug("Education")),
      Drink: lf("coffee,latte", "g-chess-coffee", chipSlug("Drink")),
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
    coverDefault: lf("bicycle,city", "g-bikes-brews", "default"),
    coverByFilter: {
      Drink: lf("beer,tap", "g-bikes-brews", chipSlug("Drink")),
      Travel: lf("bicycle,countryside", "g-bikes-brews", chipSlug("Travel")),
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
    coverDefault: lf("cinema,film", "g-indie-film", "default"),
    coverByFilter: {
      Education: lf("film,projector", "g-indie-film", chipSlug("Education")),
      Music: lf("orchestra,conductor", "g-indie-film", chipSlug("Music")),
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
    coverDefault: lf("shovel,park", "g-volunteer-parks", "default"),
    coverByFilter: {
      "Nature & Outdoors": lf("trail,maintenance", "g-volunteer-parks", chipSlug("Nature & Outdoors")),
      Education: lf("children,park", "g-volunteer-parks", chipSlug("Education")),
      Politics: lf("protest,sign", "g-volunteer-parks", chipSlug("Politics")),
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
