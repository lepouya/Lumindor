import { Fragment, useState } from "react";

import Character, { ComponentType } from "../components/Character";
import Game from "../components/Game";
import { Context } from "../model/Context";
import Format from "../utils/format";

export default function initCharDesigner(_context: Context) {
  Game.registerTab({
    path: "/char_design",
    placement: "left",
    order: 3,
    heading: "Character Designer",
    body: () => <CharDesigner />,
  });
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

  return (
    <div className="panel">
      <div className="title-bar">Preview</div>
      <div className="left">
        <Character components={Object.values(char)} />
      </div>

      <div className="panel right half">
        <div className="title-bar">Character Design</div>
        {componentsOrder.map((type) => (
          <Fragment key={`frag-${type}`}>
            <div className="half right">
              <span>{Format.word(type, { capitalize: true })}: &nbsp;</span>
            </div>
            <div className="half left">
              <select
                name={type}
                value={char[type as ComponentType]}
                onChange={(event) =>
                  setChar({
                    ...char,
                    [type as ComponentType]: event.target.value,
                  })
                }
              >
                {type !== "rank" && type !== "character" && (
                  <option value="">--</option>
                )}
                {Character.componentsByType[type as ComponentType].map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
