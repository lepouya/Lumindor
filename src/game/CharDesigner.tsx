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

  ["lightgray", "white", "lightgreen", "lightblue", "gold", "orchid"].map(
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

  for (let i = 1; i <= 11; i++) {
    const idx = i.toString().padStart(2, "0");
    Character.registerComponent({
      type: "body",
      name: `body-${idx}`,
      fileName: `body-${idx}`,
    });
  }
}

function CharDesigner() {
  const [rank, setRank] = useState("rank-02");
  const [char, setChar] = useState("char-12");
  const [body, setBody] = useState("body-11");

  return (
    <div className="panel">
      <div className="title-bar">Preview</div>
      <div className="left">
        <Character components={[rank, char, body]} />
      </div>
      <div className="panel right">
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
      </div>
    </div>
  );
}
