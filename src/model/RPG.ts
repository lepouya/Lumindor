import { items } from "../data/items";
import { Optional, Replace } from "../utils/types";

export type ItemType =
  | "body"
  | "head"
  | "feet"
  | "hand"
  | "weapon"
  | "offhand"
  | "cloak"
  | "amulet"
  | "extra";

export type ComponentType = "rank" | "character" | ItemType;

export type ComponentRendering = {
  type: ComponentType;
  name: string;

  fileName?: string;
  iconFileName?: string;
  overlayFileName?: string;
  overlayIconFileName?: string;

  zIndex?: number;
  overlayZIndex?: number;

  glowScale?: number;
  overlayGlowScale?: number;

  color?: string;
  effects?: string;
  animation?: string;

  className?: string;
  style?: React.CSSProperties;
};

export type StatType =
  | "STR"
  | "DEX"
  | "MAG"
  | "HP"
  | "MP"
  | "ATK"
  | "DEF"
  | "SPD"
  | "ACC"
  | "EVA";

export type StatBoost = {
  stat: StatType;

  baseValue?: number;
  multiplier?: number;
  addBonus?: number;

  cumulativeMultiplier?: number;
  finalBonus?: number;
};

export type Item = {
  name: string;
  type: ComponentType;

  description?: string;
  rendering?: ComponentRendering;

  stats?: Partial<Record<StatType, number>>;
  statBoosts?: StatBoost[];
  rankBoosts?: Record<string, StatBoost[]>;
};

export type InventoyItem = {
  item: Item;
  rank: Item;
  count: number;

  unique?: boolean;
  customBoosts?: StatBoost[];
};

export type Character = InventoyItem & {
  equipment: Partial<Record<ItemType, InventoyItem>>;
};

export type Player = {
  name: string;
  level: number;

  characters: Character[];
  inventory: InventoyItem[];

  customBoosts?: StatBoost[];
};

const emptyStats: Record<StatType, number> = {
  STR: 0,
  DEX: 0,
  MAG: 0,
  HP: 0,
  MP: 0,
  ATK: 0,
  DEF: 0,
  SPD: 0,
  ACC: 0,
  EVA: 0,
};

function addStats(
  ...stats: Optional<Record<StatType, number>>[]
): Record<StatType, number> {
  return stats.reduce(
    (acc: Record<StatType, number>, stat) => {
      if (stat) {
        for (const [key, value] of Object.entries(stat)) {
          acc[key as StatType] += value ?? 0;
        }
      }
      return acc;
    },
    { ...emptyStats },
  );
}

function applyBaseStatBoosts(
  stats: Record<StatType, number>,
  statTypes: StatType[],
  ...boosts: StatBoost[]
): Record<StatType, number> {
  return boosts
    .filter((boost) => statTypes.includes(boost.stat))
    .reduce(
      (acc, boost) => {
        const stat = acc[boost.stat];
        const baseValue = boost.baseValue ?? 0;
        const multiplier = boost.multiplier ?? 1;
        const addBonus = boost.addBonus ?? 0;

        acc[boost.stat] = stat + baseValue * multiplier + addBonus;
        return acc;
      },
      { ...stats },
    );
}

function computeDerivativeStats(
  stats: Record<StatType, number>,
): Record<StatType, number> {
  return addStats(stats, {
    ...emptyStats,
    HP: stats.STR * 10 + stats.DEX * 5 + stats.MAG * 2,
    MP: stats.STR * 2 + stats.DEX * 5 + stats.MAG * 10,
    ATK: stats.STR + stats.DEX / 2 + stats.MAG,
    DEF: stats.STR * 2 + stats.DEX,
    SPD: stats.DEX * 2 + stats.MAG,
    ACC: stats.DEX / 2 + stats.MAG / 4,
    EVA: stats.DEX / 4 + stats.MAG / 2,
  });
}

function applyCumulativeStatBoosts(
  stats: Record<StatType, number>,
  ...boosts: StatBoost[]
): Record<StatType, number> {
  return boosts
    .filter((boost) => boost.cumulativeMultiplier || boost.finalBonus)
    .reduce(
      (acc, boost) => {
        const stat = acc[boost.stat];
        const multiplier = boost.cumulativeMultiplier ?? 1;
        const finalBonus = boost.finalBonus ?? 0;

        acc[boost.stat] = stat * multiplier + finalBonus;
        return acc;
      },
      { ...stats },
    );
}

function computeItemStats(
  inventoryItem: InventoyItem,
  customBoosts: StatBoost[] = [],
): [Record<StatType, number>, StatBoost[]] {
  const boosts = [
    ...(inventoryItem.item.statBoosts ?? []),
    ...(inventoryItem.rank.statBoosts ?? []),
    ...(inventoryItem.item.rankBoosts?.[inventoryItem.rank.name] ?? []),
    ...(inventoryItem.customBoosts ?? []),
  ];

  let stats = addStats(inventoryItem.item.stats, inventoryItem.rank.stats);
  stats = applyBaseStatBoosts(
    stats,
    ["STR", "DEX", "MAG"],
    ...boosts,
    ...customBoosts,
  );
  stats = computeDerivativeStats(stats);
  stats = applyBaseStatBoosts(
    stats,
    ["HP", "MP", "ATK", "DEF", "SPD", "ACC", "EVA"],
    ...boosts,
    ...customBoosts,
  );

  return [stats, boosts];
}

function computeCharacterStats(
  character: Character,
  customBoosts: StatBoost[] = [],
): Record<StatType, number> {
  let [stats, boosts] = Object.values(character.equipment).reduce(
    ([stats, boosts], equipment) => {
      if (!equipment) {
        return [stats, boosts];
      }

      const [equipmentStats, equipmentBoosts] = computeItemStats(
        equipment,
        customBoosts,
      );
      stats = addStats(stats, equipmentStats);
      boosts.push(...equipmentBoosts);

      return [stats, boosts];
    },
    computeItemStats(character, customBoosts),
  );

  stats = applyCumulativeStatBoosts(stats, ...boosts);

  return stats;
}

const itemRegistry: Record<string, Item> = {};
const itemsByType: Record<ComponentType, Item[]> = {
  body: [],
  head: [],
  rank: [],
  character: [],
  feet: [],
  hand: [],
  weapon: [],
  offhand: [],
  cloak: [],
  amulet: [],
  extra: [],
};

export type LoadablePartialItem = Replace<
  Partial<Item>,
  ComponentRendering,
  Partial<ComponentRendering>
>;

function registerItem(item: LoadablePartialItem) {
  const type = item.type ?? "extra";
  const name = item.name ?? type + "-" + (Object.keys(itemRegistry).length + 1);
  const newItem: Item = {
    type,
    name,
    ...item,
    rendering: { type, name, ...item.rendering },
  };

  itemRegistry[newItem.name] = newItem;
  itemsByType[newItem.type] = itemsByType[newItem.type].filter(
    (c) => c.name !== newItem.name,
  );
  itemsByType[newItem.type].push(newItem);
  itemsByType[newItem.type].sort((a, b) => a.name.localeCompare(b.name));

  return newItem;
}

for (let [type, its] of Object.entries(items)) {
  for (let [name, item] of Object.entries(its)) {
    registerItem({ type: type as ComponentType, name, ...item });
  }
}

const RPG = {
  itemByName: itemRegistry,
  itemsByType,
  registerItem,
  computeItemStats,
  computeCharacterStats,
};

export default RPG;
