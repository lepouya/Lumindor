import { useState } from "react";

import Character from "../components/Character";
import Game from "../components/Game";
import { Context } from "../model/Context";

export default function initCharDesigner(_context: Context) {
  Game.registerTab({
    path: "/char_design",
    placement: "left",
    order: 3,
    heading: "Character Designer",
    body: () => <CharDesigner />,
  });

  ["lightgray", "white", "lightgreen", "lightblue", "orchid", "gold"].map(
    (color, idx) =>
      Character.registerComponent({
        type: "rank",
        name: `rank-${idx.toString().padStart(2, "0")}`,
        color,
      }),
  );

  for (let i = 0; i <= 18; i++) {
    const idx = i.toString().padStart(2, "0");
    Character.registerComponent({
      type: "char",
      name: `char-${idx}`,
      fileName: `char-${idx}`,
      overlayFileName: i > 0 ? `char-${idx}-fg` : undefined,
    });
  }

  for (let i = 1; i <= 12; i++) {
    const idx = i.toString().padStart(2, "0");
    Character.registerComponent({
      type: "body",
      name: `body-${idx}`,
      fileName: `body-${idx}`,
    });
  }

  for (let i = 1; i <= 1; i++) {
    const idx = i.toString().padStart(2, "0");
    Character.registerComponent({
      type: "head",
      name: `head-${idx}`,
      fileName: `head-${idx}`,
      overlayFileName: `head-${idx}-fg`,
      className: "glow-above",
    });
  }

  for (let i = 1; i <= 1; i++) {
    const idx = i.toString().padStart(2, "0");
    Character.registerComponent({
      type: "feet",
      name: `feet-${idx}`,
      fileName: `feet-${idx}`,
      glowScale: 1,
      className: "glow-below",
    });
  }
}

function CharDesigner() {
  const [rank, setRank] = useState("rank-02");
  const [char, setChar] = useState("char-16");
  const [body, setBody] = useState("body-11");
  const [head, setHead] = useState("head-01");
  const [feet, setFeet] = useState("feet-01");

  return (
    <div className="panel">
      <div className="title-bar">Preview</div>
      <div className="left">
        <Character components={[rank, char, body, head, feet]} />
      </div>

      <div className="panel right half">
        <div className="title-bar">Character Design</div>
        <div className="half right">
          <span>Rank: &nbsp;</span>
        </div>
        <div className="half left">
          <select
            name="rank"
            value={rank}
            onChange={(event) => setRank(event.target.value)}
          >
            <option value="">none</option>
            {Character.getComponentsByType("rank").map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="half right">
          <span>Character: &nbsp;</span>
        </div>
        <div className="half left">
          <select
            name="char"
            value={char}
            onChange={(event) => setChar(event.target.value)}
          >
            <option value="">none</option>
            {Character.getComponentsByType("char").map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="half right">
          <span>Armor: &nbsp;</span>
        </div>
        <div className="half left">
          <select
            name="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
          >
            <option value="">none</option>
            {Character.getComponentsByType("body").map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="half right">
          <span>Helmet: &nbsp;</span>
        </div>
        <div className="half left">
          <select
            name="head"
            value={head}
            onChange={(event) => setHead(event.target.value)}
          >
            <option value="">none</option>
            {Character.getComponentsByType("head").map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="half right">
          <span>Feet: &nbsp;</span>
        </div>
        <div className="half left">
          <select
            name="feet"
            value={feet}
            onChange={(event) => setFeet(event.target.value)}
          >
            <option value="">none</option>
            {Character.getComponentsByType("feet").map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
