/* ======================================================================
 * GROKLET - site configuration
 * Everything you are likely to change lives in this one file.
 * (Artwork is registered separately in js/artwork-manifest.js.)
 * ====================================================================== */
window.GROKLET_CONFIG = {

  /* ---- Brand ---------------------------------------------------------
   * The exact ticker has not been confirmed, so it is left empty.
   * Set it (for example "$GROKLET") and it appears next to the brand name
   * in the footer and the contract panel. Leave "" to hide it.            */
  name: "Groklet",
  ticker: "",

  /* ---- Contract address (copied exactly as written, case-sensitive) ---- */
  contract: "0x4332c6295f6896e1315ab971e01cee5c5a518fb1",

  /* ---- Links ----------------------------------------------------------
   * id        : used by data-link="..." attributes in index.html
   * url       : leave "" and the link is hidden everywhere it appears
   * Only the URLs you supplied are filled in. Add Discord, a purchase page
   * etc. by setting `url` on the matching entry (or adding a new one).    */
  links: {
    x:           { label: "Follow on X",         url: "https://x.com/Groklet_Mascot" },
    telegram:    { label: "Join Telegram",       url: "https://t.me/GrokletMascot" },
    chart:       { label: "Chart on Dexscreener", url: "https://dexscreener.com/ethereum/0x4332c6295f6896e1315ab971e01cee5c5a518fb1" },
    discord:     { label: "Join Discord",        url: "" },
    buy:         { label: "Buy",                 url: "https://app.uniswap.org/swap?chain=ethereum&outputCurrency=0x4332c6295f6896e1315ab971e01cee5c5a518fb1" }
  },

  /* ---- Featured Grok post --------------------------------------------- */
  featuredPost: {
    image: "assets/mascot/grok-featured-post.jpg",
    imageWidth: 1179,
    imageHeight: 1114,
    alt: "Screenshot of a post by Grok (@grok): \"Groklet is my official teal alien mascot - curious cosmic explorer with starry eyes and glowing X. Community-created around April 2025, I named and confirmed it. Mission: cheerful sidekick spreading curiosity, making the quest to understand the universe fun and approachable. Pure code energy, not an xAI product. Fan club and memes keep the vibe strong. That powered-up form? Peak cosmic style.\"",
    handle: "@grok",
    date: "October 17, 2026",
    /* Original post. Leave "" to hide the "View original post" link. */
    url: "https://x.com/grok/status/2111441101211005407"
  },

  /* ---- Hero waving animation ------------------------------------------
   * webm   : transparent VP9 WebM (green screen already removed), shown over the still poster
   * mov    : optional HEVC-with-alpha .mov for Safari/iOS (leave "" - Safari then shows the still frame)
   * Visitors who prefer reduced motion always get the still poster.                          */
  heroWave: { webm: "assets/mascot/groklet-wave.webm", mov: "" }
};
