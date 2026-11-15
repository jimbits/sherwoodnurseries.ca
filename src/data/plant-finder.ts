/**
 * plant-finder.ts — filter options for the Plant Finder dialog and the
 * /plant-finder results page. `value` goes in the URL; `label` is shown.
 * Sizes are mature height, metric first.
 */

export type FinderOption = { value: string; label: string };
export type FinderField = {
  name: "type" | "sun" | "size";
  label: string;
  anyLabel: string;
  options: FinderOption[];
};

export const finderFields: FinderField[] = [
  {
    name: "type",
    label: "Plant type",
    anyLabel: "Any plant",
    options: [
      { value: "trees", label: "Trees" },
      { value: "fruit-trees", label: "Fruit trees" },
      { value: "evergreens", label: "Evergreens" },
      { value: "shrubs", label: "Shrubs" },
      { value: "hedges", label: "Privacy hedges" },
      { value: "perennials", label: "Perennials" },
    ],
  },
  {
    name: "sun",
    label: "Sunlight",
    anyLabel: "Any light",
    options: [
      { value: "full-sun", label: "Full sun" },
      { value: "part-shade", label: "Part shade" },
      { value: "full-shade", label: "Full shade" },
    ],
  },
  {
    name: "size",
    label: "Mature size",
    anyLabel: "Any size",
    options: [
      { value: "small", label: "Small (under 1 m)" },
      { value: "medium", label: "Medium (1–3 m)" },
      { value: "large", label: "Large (over 3 m)" },
    ],
  },
];

/** Quick links shown under the form and on the hero card. */
export const popularSearches = [
  { label: "Fruit trees", href: "/plant-finder?type=fruit-trees" },
  { label: "Hydrangeas", href: "/plant-finder?type=shrubs&q=hydrangea" },
  { label: "Privacy hedges", href: "/plant-finder?type=hedges" },
  { label: "Shade perennials", href: "/plant-finder?type=perennials&sun=full-shade" },
];
