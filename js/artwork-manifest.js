/* Groklet artwork manifest
 * ------------------------------------------------------------------
 * One object per image. Fields:
 *   file      path to the full-size image            (required)
 *   title     short display title                    (required)
 *   alt       descriptive alt text for screen readers (required)
 *   category  filter label, e.g. "Cosmic Scenes"      (optional - leave "" to show only under "All")
 *   thumb     path to a small preview (webp)          (optional - set by tools/update-artwork.py)
 *   w, h      real pixel size of `file`               (optional - set by tools/update-artwork.py)
 *
 * Easiest way to add art: drop files into assets/artwork/ and run
 *     python tools/update-artwork.py
 * No Python? Copy an existing entry below and change file/title/alt/category -
 * `thumb`, `w` and `h` can simply be left out (the page still works).
 * Keep valid JSON: double quotes, commas between entries, no trailing comma.
 */
window.GROKLET_ARTWORK = [
  {
    "file": "assets/artwork/groklet-moonwatch.jpg",
    "thumb": "assets/artwork/thumbs/groklet-moonwatch.webp",
    "w": 1028,
    "h": 1530,
    "title": "Moonwatch",
    "alt": "Groklet resting an arm on a stone ledge in front of a huge full moon at night.",
    "category": "Character Art"
  },
  {
    "file": "assets/artwork/groklet-the-throne.jpg",
    "thumb": "assets/artwork/thumbs/groklet-the-throne.webp",
    "w": 1024,
    "h": 1536,
    "title": "The Throne",
    "alt": "Groklet seated on a gilded marble throne with a laurel wreath, purple robe and golden scepter.",
    "category": "Imperial Series"
  },
  {
    "file": "assets/artwork/groklet-light-speed.jpg",
    "thumb": "assets/artwork/thumbs/groklet-light-speed.webp",
    "w": 1080,
    "h": 1080,
    "title": "Light Speed",
    "alt": "Groklet flying through black space with arms spread wide and trails of golden light streaming behind.",
    "category": "Cosmic Scenes"
  },
  {
    "file": "assets/artwork/groklet-helmet-check.jpg",
    "thumb": "assets/artwork/thumbs/groklet-helmet-check.webp",
    "w": 1448,
    "h": 1086,
    "title": "Helmet Check",
    "alt": "Anime-style Groklet inside a white spacesuit helmet marked with the Groklet logo, glancing sideways.",
    "category": "Character Art"
  },
  {
    "file": "assets/artwork/groklet-reach-for-earth.jpg",
    "thumb": "assets/artwork/thumbs/groklet-reach-for-earth.webp",
    "w": 1254,
    "h": 1254,
    "title": "Reach for Earth",
    "alt": "Groklet floating among asteroids with one hand stretched toward a glowing Earth, a spiral galaxy and purple nebula behind.",
    "category": "Cosmic Scenes"
  },
  {
    "file": "assets/artwork/groklet-cavalry-charge.jpg",
    "thumb": "assets/artwork/thumbs/groklet-cavalry-charge.webp",
    "w": 1254,
    "h": 1254,
    "title": "Cavalry Charge",
    "alt": "Groklet in a red cloak riding a rearing white horse in a painterly battlefield scene.",
    "category": "Imperial Series"
  },
  {
    "file": "assets/artwork/groklet-on-the-shoulder.jpg",
    "thumb": "assets/artwork/thumbs/groklet-on-the-shoulder.webp",
    "w": 1280,
    "h": 960,
    "title": "On the Shoulder",
    "alt": "AI-generated fan artwork of Groklet perched on the shoulder of a man in Roman armor at golden-hour sunset.",
    "category": "Imperial Series"
  },
  {
    "file": "assets/artwork/groklet-parked-saucer.jpg",
    "thumb": "assets/artwork/thumbs/groklet-parked-saucer.webp",
    "w": 853,
    "h": 1280,
    "title": "Parked Saucer",
    "alt": "A small Groklet sitting on the edge of a silver flying saucer against a soft blue-grey backdrop.",
    "category": "Cosmic Scenes"
  },
  {
    "file": "assets/artwork/groklet-the-walk.jpg",
    "thumb": "assets/artwork/thumbs/groklet-the-walk.webp",
    "w": 1855,
    "h": 848,
    "title": "The Walk",
    "alt": "Groklet walking on a white background, leading a line of colorful blob companions on leashes.",
    "category": "Memes"
  },
  {
    "file": "assets/artwork/groklet-golden-coin.jpg",
    "thumb": "assets/artwork/thumbs/groklet-golden-coin.webp",
    "w": 1294,
    "h": 1216,
    "title": "Golden Coin",
    "alt": "A gold coin embossed with Groklet's profile, laurel wreath and X pendant.",
    "category": "Imperial Series"
  },
  {
    "file": "assets/artwork/groklet-window-to-earth.jpg",
    "thumb": "assets/artwork/thumbs/groklet-window-to-earth.webp",
    "w": 1572,
    "h": 1001,
    "title": "Window to Earth",
    "alt": "Groklet in a spacesuit reflected in a spacecraft window with Earth glowing beyond the glass.",
    "category": "Cosmic Scenes"
  },
  {
    "file": "assets/artwork/groklet-starry-gaze.jpg",
    "thumb": "assets/artwork/thumbs/groklet-starry-gaze.webp",
    "w": 1454,
    "h": 1082,
    "title": "Starry Gaze",
    "alt": "Close-up anime portrait of Groklet with starry blue eyes and a glowing X on the forehead.",
    "category": "Character Art"
  },
  {
    "file": "assets/artwork/groklet-infinity-gauntlet.jpg",
    "thumb": "assets/artwork/thumbs/groklet-infinity-gauntlet.webp",
    "w": 1254,
    "h": 1254,
    "title": "Infinity Gauntlet",
    "alt": "Groklet smiling and holding up a gauntlet set with colorful gems, mountains and rainbow light behind.",
    "category": "Memes"
  },
  {
    "file": "assets/artwork/groklet-two-halves.jpg",
    "thumb": "assets/artwork/thumbs/groklet-two-halves.webp",
    "w": 1254,
    "h": 1254,
    "title": "Two Halves",
    "alt": "AI-generated fan artwork split down the middle: half a man's face on the left, half of Groklet's face with the glowing X on the right, joined by a line of blue light.",
    "category": "Memes"
  },
  {
    "file": "assets/artwork/groklet-laurel.jpg",
    "thumb": "assets/artwork/thumbs/groklet-laurel.webp",
    "w": 1184,
    "h": 1328,
    "title": "Laurel",
    "alt": "Portrait of Groklet crowned with a golden laurel wreath in a columned hall with purple banners.",
    "category": "Imperial Series"
  },
  {
    "file": "assets/artwork/groklet-deep-thought.jpg",
    "thumb": "assets/artwork/thumbs/groklet-deep-thought.webp",
    "w": 1674,
    "h": 940,
    "title": "Deep Thought",
    "alt": "Groklet in a futuristic suit with a hand at the chin, lost in thought in a dark, teal-lit space.",
    "category": "Character Art"
  },
  {
    "file": "assets/artwork/groklet-ruins-at-dusk.jpg",
    "thumb": "assets/artwork/thumbs/groklet-ruins-at-dusk.webp",
    "w": 853,
    "h": 1280,
    "title": "Ruins at Dusk",
    "alt": "Groklet in red cloak and bronze armor lounging on classical ruins under a dramatic sunset sky.",
    "category": "Imperial Series"
  },
  {
    "file": "assets/artwork/groklet-slime-rider.jpg",
    "thumb": "assets/artwork/thumbs/groklet-slime-rider.webp",
    "w": 930,
    "h": 1175,
    "title": "Slime Rider",
    "alt": "Groklet riding a giant glowing cyan blob with starry eyes and an X, surrounded by small blob friends.",
    "category": "Memes"
  },
  {
    "file": "assets/artwork/groklet-two-at-the-window.jpg",
    "thumb": "assets/artwork/thumbs/groklet-two-at-the-window.webp",
    "w": 960,
    "h": 1280,
    "title": "Two at the Window",
    "alt": "Two Groklets in black vests peering side by side through a dark window.",
    "category": "Character Art"
  },
  {
    "file": "assets/artwork/groklet-illuminated-court.jpg",
    "thumb": "assets/artwork/thumbs/groklet-illuminated-court.webp",
    "w": 1254,
    "h": 1254,
    "title": "Illuminated Court",
    "alt": "Medieval illuminated-manuscript style scene of Groklet enthroned and holding an orb, with attendants.",
    "category": "Imperial Series"
  },
  {
    "file": "assets/artwork/groklet-rest-cycle.jpg",
    "thumb": "assets/artwork/thumbs/groklet-rest-cycle.webp",
    "w": 1675,
    "h": 939,
    "title": "Rest Cycle",
    "alt": "Anime-style Groklet lying back in a white and orange spacesuit with a Groklet logo on the shoulder.",
    "category": "Character Art"
  },
  {
    "file": "assets/artwork/groklet-last-stand.jpg",
    "thumb": "assets/artwork/thumbs/groklet-last-stand.webp",
    "w": 1536,
    "h": 1024,
    "title": "Last Stand",
    "alt": "Tiny Groklet with a green lightsaber facing a burning red landscape and a huge ship, with blob companions at its feet.",
    "category": "Memes"
  },
  {
    "file": "assets/artwork/groklet-coronation.jpg",
    "thumb": "assets/artwork/thumbs/groklet-coronation.webp",
    "w": 927,
    "h": 1280,
    "title": "Coronation",
    "alt": "Groklet in an ermine-trimmed red robe holding a crown aloft on a small dais.",
    "category": "Imperial Series"
  },
  {
    "file": "assets/artwork/groklet-arena-light.jpg",
    "thumb": "assets/artwork/thumbs/groklet-arena-light.webp",
    "w": 853,
    "h": 1280,
    "title": "Arena Light",
    "alt": "Groklet raising a fist and a glowing blue sword above a blurred crowd.",
    "category": "Memes"
  },
  {
    "file": "assets/artwork/groklet-centurion-profile.jpg",
    "thumb": "assets/artwork/thumbs/groklet-centurion-profile.webp",
    "w": 1254,
    "h": 1254,
    "title": "Centurion Profile",
    "alt": "Side profile of Groklet in a crested golden centurion helmet and red cloak on a weathered painted wall.",
    "category": "Imperial Series"
  },
  {
    "file": "assets/artwork/groklet-olive-branch.jpg",
    "thumb": "assets/artwork/thumbs/groklet-olive-branch.webp",
    "w": 853,
    "h": 1280,
    "title": "Olive Branch",
    "alt": "Painterly Groklet in flowing white and red robes reaching up toward an olive branch.",
    "category": "Imperial Series"
  },
  {
    "file": "assets/artwork/groklet-sword-and-crown.jpg",
    "thumb": "assets/artwork/thumbs/groklet-sword-and-crown.webp",
    "w": 720,
    "h": 1280,
    "title": "Sword and Crown",
    "alt": "Close-up of a stern, crowned Groklet in armor gripping a large sword.",
    "category": "Imperial Series"
  },
  {
    "file": "assets/artwork/groklet-marked-in-stone.jpg",
    "thumb": "assets/artwork/thumbs/groklet-marked-in-stone.webp",
    "w": 1280,
    "h": 960,
    "title": "Marked in Stone",
    "alt": "Groklet in Roman armor and red cape touching a stone block carved with the number 80 at sunset.",
    "category": "Imperial Series"
  }
];
