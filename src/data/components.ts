import { Component, ComponentType } from "../components/Character";

export const components: Record<
  ComponentType,
  Record<string, Partial<Component>>
> = {
  rank: {
    E: { color: "#D3D3D3", overlayIconFileName: "rank-E-icon" },
    D: { color: "#FFFFFF", overlayIconFileName: "rank-D-icon" },
    C: { color: "#90EE90", overlayIconFileName: "rank-C-icon" },
    B: { color: "#ADD8E6", overlayIconFileName: "rank-B-icon" },
    A: { color: "#DA70D6", overlayIconFileName: "rank-A-icon" },
    S: { color: "#FFD700", overlayIconFileName: "rank-S-icon" },
  },
  cloak: {},
  character: {
    Nobody: { fileName: "char-00", iconFileName: "char-00-icon" },
    "Man A": {
      fileName: "char-01",
      iconFileName: "char-01-icon",
      overlayFileName: "char-01-fg",
    },
    "Man B": {
      fileName: "char-02",
      iconFileName: "char-02-icon",
      overlayFileName: "char-02-fg",
    },
    "Woman A": {
      fileName: "char-03",
      iconFileName: "char-03-icon",
      overlayFileName: "char-03-fg",
    },
    "Woman B": {
      fileName: "char-04",
      iconFileName: "char-04-icon",
      overlayFileName: "char-04-fg",
    },
    "Boy A": {
      fileName: "char-05",
      iconFileName: "char-05-icon",
      overlayFileName: "char-05-fg",
    },
    "Boy B": {
      fileName: "char-06",
      iconFileName: "char-06-icon",
      overlayFileName: "char-06-fg",
    },
    "Girl A": {
      fileName: "char-07",
      iconFileName: "char-07-icon",
      overlayFileName: "char-07-fg",
    },
    "Girl B": {
      fileName: "char-08",
      iconFileName: "char-08-icon",
      overlayFileName: "char-08-fg",
    },
    "Young Man A": {
      fileName: "char-09",
      iconFileName: "char-09-icon",
      overlayFileName: "char-09-fg",
    },
    "Young Man B": {
      fileName: "char-10",
      iconFileName: "char-10-icon",
      overlayFileName: "char-10-fg",
    },
    "Young Woman A": {
      fileName: "char-11",
      iconFileName: "char-11-icon",
      overlayFileName: "char-11-fg",
    },
    "Young Woman B": {
      fileName: "char-12",
      iconFileName: "char-12-icon",
      overlayFileName: "char-12-fg",
    },
    "Mature Man A": {
      fileName: "char-13",
      iconFileName: "char-13-icon",
      overlayFileName: "char-13-fg",
    },
    "Mature Man B": {
      fileName: "char-14",
      iconFileName: "char-14-icon",
      overlayFileName: "char-14-fg",
    },
    "Mature Woman A": {
      fileName: "char-15",
      iconFileName: "char-15-icon",
      overlayFileName: "char-15-fg",
    },
    "Mature Woman B": {
      fileName: "char-16",
      iconFileName: "char-16-icon",
      overlayFileName: "char-16-fg",
    },
    "Catgirl A": {
      fileName: "char-17",
      iconFileName: "char-17-icon",
      overlayFileName: "char-17-fg",
    },
    "Catgirl B": {
      fileName: "char-18",
      iconFileName: "char-18-icon",
      overlayFileName: "char-18-fg",
    },
  },
  body: {
    "Casual Light A": { fileName: "body-01", iconFileName: "body-01-icon" },
    "Casual Light B": { fileName: "body-02", iconFileName: "body-02-icon" },
    "Casual Light C": { fileName: "body-03", iconFileName: "body-03-icon" },
    "Casual Light D": { fileName: "body-04", iconFileName: "body-04-icon" },
    "Fur Medium A": { fileName: "body-05", iconFileName: "body-05-icon" },
    "Fur Medium B": { fileName: "body-06", iconFileName: "body-06-icon" },
    "Fur Medium C": { fileName: "body-07", iconFileName: "body-07-icon" },
    "Fur Medium D": { fileName: "body-08", iconFileName: "body-08-icon" },
    "Leather Medium A": { fileName: "body-09", iconFileName: "body-09-icon" },
    "Leather Medium B": { fileName: "body-10", iconFileName: "body-10-icon" },
    "Leather Medium C": { fileName: "body-11", iconFileName: "body-11-icon" },
    "Leather Medium D": { fileName: "body-12", iconFileName: "body-12-icon" },
    "Khakis Medium A": { fileName: "body-13", iconFileName: "body-13-icon" },
    "Dress Light A": { fileName: "body-14", iconFileName: "body-14-icon" },
    "Officer Light A": { fileName: "body-15", iconFileName: "body-15-icon" },
  },
  head: {
    "Witch Hat A": {
      fileName: "head-01",
      iconFileName: "head-01-icon",
      overlayFileName: "head-01-fg",
      className: "glow-above",
    },
    "Bronze Helmet A": {
      overlayFileName: "head-02",
      overlayIconFileName: "head-02-icon",
      className: "glow-above",
    },
    "Crown A": {
      overlayFileName: "head-03",
      overlayIconFileName: "head-03-icon",
      className: "glow-above",
    },
    "Top Hat A": {
      fileName: "head-04",
      iconFileName: "head-04-icon",
      overlayFileName: "head-04-fg",
      className: "glow-above",
    },
    "Top Hat B": {
      fileName: "head-05",
      iconFileName: "head-05-icon",
      overlayFileName: "head-05-fg",
      className: "glow-above",
    },
    "Top Hat C": {
      fileName: "head-06",
      iconFileName: "head-06-icon",
      overlayFileName: "head-06-fg",
      className: "glow-above",
    },
    "Crown B": {
      overlayFileName: "head-07",
      overlayIconFileName: "head-07-icon",
      className: "glow-above",
    },
    "Top Hat D": {
      overlayFileName: "head-08",
      overlayIconFileName: "head-08-icon",
      className: "glow-above",
    },
    "Top Hat E": {
      fileName: "head-09",
      iconFileName: "head-09-icon",
      overlayFileName: "head-09-fg",
      className: "glow-above",
    },
    "Bonnet A": {
      overlayFileName: "head-10",
      overlayIconFileName: "head-10-icon",
      className: "glow-above",
    },
    "Top Hat F": {
      fileName: "head-11",
      iconFileName: "head-11-icon",
      overlayFileName: "head-11-fg",
      className: "glow-above",
    },
    "Witch Hat B": {
      fileName: "head-12",
      iconFileName: "head-12-icon",
      overlayFileName: "head-12-fg",
      className: "glow-above",
    },
  },
  feet: {
    "Metal Boots A": {
      fileName: "feet-01",
      iconFileName: "feet-01-icon",
      className: "glow-below",
    },
    "Metal Boots B": {
      fileName: "feet-02",
      iconFileName: "feet-02-icon",
      className: "glow-below",
    },
    "Fur Boots A": {
      fileName: "feet-03",
      iconFileName: "feet-03-icon",
      className: "glow-below",
    },
    "Fur Boots B": {
      fileName: "feet-04",
      iconFileName: "feet-04-icon",
      className: "glow-below",
    },
    "Formal Shoes A": {
      fileName: "feet-05",
      iconFileName: "feet-05-icon",
      className: "glow-below",
    },
    "Leather Shoes A": {
      fileName: "feet-06",
      iconFileName: "feet-06-icon",
      className: "glow-below",
    },
    "Leather Shoes B": {
      fileName: "feet-07",
      iconFileName: "feet-07-icon",
      className: "glow-below",
    },
    "Casual Shoes A": {
      fileName: "feet-08",
      iconFileName: "feet-08-icon",
      className: "glow-below",
    },
  },
  hand: {
    "Leather Gloves A": { fileName: "hand-01", iconFileName: "hand-01-icon" },
    "Bronze Gloves A": { fileName: "hand-02", iconFileName: "hand-02-icon" },
    "Fur Gloves A": { fileName: "hand-03", iconFileName: "hand-03-icon" },
    "Cloth Armlets A": { fileName: "hand-04", iconFileName: "hand-04-icon" },
    "Leather Armlets A": { fileName: "hand-05", iconFileName: "hand-05-icon" },
    "Crystal Armlets A": { fileName: "hand-06", iconFileName: "hand-06-icon" },
  },
  amulet: {
    "Emerald Amulet": { fileName: "amulet-01", iconFileName: "amulet-01-icon" },
    "Diamond Choker": { fileName: "amulet-02", iconFileName: "amulet-02-icon" },
    "Blue Crystal": { fileName: "amulet-03", iconFileName: "amulet-03-icon" },
  },
  extra: {
    Bow: { fileName: "extra-01", iconFileName: "extra-01-icon" },
    Star: { fileName: "extra-02", iconFileName: "extra-02-icon" },
    "Ruby Star": { fileName: "extra-03", iconFileName: "extra-03-icon" },
    "Teddy Pouch": { fileName: "extra-04", iconFileName: "extra-04-icon" },
  },
  offhand: {
    "Officer Blade": {
      fileName: "offhand-01",
      iconFileName: "offhand-01-icon",
    },
    "Ring of Magic": {
      fileName: "offhand-02",
      iconFileName: "offhand-02-icon",
    },
    "Sapphire Whip": {
      fileName: "offhand-03",
      iconFileName: "offhand-03-icon",
    },
    Lasso: { fileName: "offhand-04", iconFileName: "offhand-04-icon" },
    "Teddy Bear": { fileName: "offhand-05", iconFileName: "offhand-05-icon" },
    "Star of Sorcery": {
      fileName: "offhand-06",
      iconFileName: "offhand-06-icon",
    },
    "Crystal Staff": {
      fileName: "offhand-07",
      iconFileName: "offhand-07-icon",
    },
  },
  weapon: {
    Sabre: { fileName: "weapon-01", iconFileName: "weapon-01-icon" },
    Dagger: { fileName: "weapon-02", iconFileName: "weapon-02-icon" },
    Shortsword: { fileName: "weapon-03", iconFileName: "weapon-03-icon" },
    Machete: { fileName: "weapon-04", iconFileName: "weapon-04-icon" },
    Gladius: { fileName: "weapon-05", iconFileName: "weapon-05-icon" },
    Scimitar: { fileName: "weapon-06", iconFileName: "weapon-06-icon" },
    "Crystal Wand": { fileName: "weapon-07", iconFileName: "weapon-07-icon" },
    "Plasma Sword": { fileName: "weapon-08", iconFileName: "weapon-08-icon" },
    "Long Whip": { fileName: "weapon-09", iconFileName: "weapon-09-icon" },
    "Scaled Whip": { fileName: "weapon-10", iconFileName: "weapon-10-icon" },
    Zephyr: { fileName: "weapon-11", iconFileName: "weapon-11-icon" },
    "Crystall Blade": { fileName: "weapon-12", iconFileName: "weapon-12-icon" },
    "Frost Wand": { fileName: "weapon-13", iconFileName: "weapon-13-icon" },
    "Crystal Spear": { fileName: "weapon-14", iconFileName: "weapon-14-icon" },
    "Officer Sword": { fileName: "weapon-15", iconFileName: "weapon-15-icon" },
    "Wooden Wand": { fileName: "weapon-16", iconFileName: "weapon-16-icon" },
  },
};
