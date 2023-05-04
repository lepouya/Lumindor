import { Fragment, useState } from "react";

import Character from "../components/Character";
import Game from "../components/Game";
import { Context } from "../model/Context";
import RPG, { ComponentType } from "../model/RPG";
import Format from "../utils/format";
import Obj from "../utils/objects";

export default function initCharDesigner(_context: Context) {
  Game.registerTab({
    path: "/char_design",
    placement: "left",
    order: 3,
    heading: "Character Designer",
    body: () => <CharDesigner />,
  });
}

function getJson(name = "") {
  return (
    name &&
    JSON.stringify(
      { stats: {}, statBoosts: [], rankBoosts: {}, ...RPG.itemByName[name] },
      (key, value) =>
        (typeof key === "string" && key.startsWith("_")) ||
        ["name", "type", "rendering"].includes(key)
          ? undefined
          : value,
      2,
    )
  );
}

function CharDesigner() {
  const componentsOrder = [
    "character",
    "rank",
    "body",
    "head",
    "feet",
    "hand",
    "cloak",
    "amulet",
    "weapon",
    "offhand",
    "extra",
  ];

  const [char, setChar] = useState<Record<ComponentType, string>>({
    body: "",
    head: "",
    rank: "E",
    character: "Nobody",
    feet: "",
    hand: "",
    weapon: "",
    offhand: "",
    cloak: "",
    amulet: "",
    extra: "",
  });

  const [items, setItems] = useState<Record<ComponentType, string>>(() =>
    Obj.map(char, getJson),
  );

  return (
    <div className="panel">
      <div className="title-bar">Preview</div>
      <div className="left">
        <Character components={Object.values(char)} />
      </div>

      <div className="panel full">
        <div className="title-bar">Character Design</div>
        {componentsOrder.map((type) => (
          <Fragment key={`frag-${type}`}>
            <div className="full bold left">
              <span>{Format.word(type, { capitalize: true })}</span>
            </div>

            <div className="half left">
              <select
                name={type}
                value={char[type as ComponentType]}
                onChange={(event) => {
                  const name = event.target.value;
                  setChar({ ...char, [type]: name });
                  setItems({ ...items, [type]: getJson(name) });
                }}
                style={{ width: "90%" }}
              >
                {type !== "rank" && type !== "character" && (
                  <option value="">--</option>
                )}
                {RPG.itemsByType[type as ComponentType].map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="half left">
              <Character
                components={[char[type as ComponentType], char["rank"]]}
                smallIcon={true}
              />
            </div>

            <div className="half left">
              <textarea
                value={items[type as ComponentType]}
                onChange={(event) => {
                  const name = char[type as ComponentType];
                  const value = event.target.value;
                  setItems({
                    ...items,
                    [type]: name ? value : undefined,
                  });
                  try {
                    const parsed = JSON.parse(value);
                    if (parsed && typeof parsed === "object") {
                      Obj.copy(parsed, RPG.itemByName[name]);
                    }
                  } catch (_) {}
                }}
                style={{ width: "90%", height: "10em" }}
              />
            </div>

            <div className="half left">
              <pre>
                {char[type as ComponentType] &&
                  JSON.stringify(
                    RPG.computeItemStats({
                      item: char[type as ComponentType],
                      rank: type !== "rank" ? char["rank"] : "",
                      count: 1,
                    }),
                    null,
                    2,
                  )}
              </pre>
            </div>

            <hr className="underlined separator" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
