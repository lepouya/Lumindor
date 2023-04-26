import { useState } from "react";

import Character, { ComponentType } from "../components/Character";
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

  for (let i = 1; i <= 14; i++) {
    const idx = i.toString().padStart(2, "0");
    Character.registerComponent({
      type: "body",
      name: `body-${idx}`,
      fileName: `body-${idx}`,
    });
  }

  for (let i = 1; i <= 2; i++) {
    const idx = i.toString().padStart(2, "0");
    Character.registerComponent({
      type: "head",
      name: `head-${idx}`,
      fileName: `head-${idx}`,
      overlayFileName: `head-${idx}-fg`,
      className: "glow-above",
    });
  }

  for (let i = 1; i <= 4; i++) {
    const idx = i.toString().padStart(2, "0");
    Character.registerComponent({
      type: "hand",
      name: `hand-${idx}`,
      fileName: `hand-${idx}`,
      // className: "glow-below",
    });
  }

  for (let i = 1; i <= 5; i++) {
    const idx = i.toString().padStart(2, "0");
    Character.registerComponent({
      type: "feet",
      name: `feet-${idx}`,
      fileName: `feet-${idx}`,
      className: "glow-below",
    });
  }

  for (let i = 1; i <= 1; i++) {
    const idx = i.toString().padStart(2, "0");
    Character.registerComponent({
      type: "amulet",
      name: `amulet-${idx}`,
      fileName: `amulet-${idx}`,
    });
  }
}

function CharDesigner() {
  const [rank, setRank] = useState("rank-00");
  const [char, setChar] = useState("char-03");
  const [body, setBody] = useState("");
  const [head, setHead] = useState("");
  const [hand, setHand] = useState("");
  const [feet, setFeet] = useState("");
  const [amulet, setAmulet] = useState("");

  return (
    <div className="panel">
      <div className="title-bar">Preview</div>
      <div className="left">
        <Character components={[rank, char, body, head, hand, feet, amulet]} />
      </div>

      <div className="panel right half">
        <div className="title-bar">Character Design</div>

        <CharDesignerSelector
          title="Rank"
          type="rank"
          value={rank}
          setValue={setRank}
        />

        <CharDesignerSelector
          title="Character"
          type="char"
          value={char}
          setValue={setChar}
        />

        <CharDesignerSelector
          title="Armor"
          type="body"
          value={body}
          setValue={setBody}
        />

        <CharDesignerSelector
          title="Helmet"
          type="head"
          value={head}
          setValue={setHead}
        />

        <CharDesignerSelector
          title="Hands"
          type="hand"
          value={hand}
          setValue={setHand}
        />

        <CharDesignerSelector
          title="Feet"
          type="feet"
          value={feet}
          setValue={setFeet}
        />

        <CharDesignerSelector
          title="Amulet"
          type="amulet"
          value={amulet}
          setValue={setAmulet}
        />
      </div>
    </div>
  );
}

type CharDesignerSelectorProps = {
  title: string;
  type: ComponentType;
  value: string;
  setValue: (value: string) => void;
};

function CharDesignerSelector(props: CharDesignerSelectorProps) {
  return (
    <>
      <div className="half right">
        <span>{props.title}: &nbsp;</span>
      </div>
      <div className="half left">
        <select
          name={props.type}
          value={props.value}
          onChange={(event) => props.setValue(event.target.value)}
        >
          <option value="">none</option>
          {Character.getComponentsByType(props.type).map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
