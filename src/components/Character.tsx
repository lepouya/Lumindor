import { PropsWithChildren } from "react";

import RPG, { ComponentRendering, ComponentType } from "../model/RPG";
import Arr from "../utils/arrays";

export type CharacterProps = {
  components: (ComponentRendering | string)[];

  scale?: number;
  smallIcon?: boolean;

  className?: string;
  style?: React.CSSProperties;

  additionalComponentsClassName?: string;
  additionalComponentsStyle?: React.CSSProperties;
};

export default function Character(props: PropsWithChildren<CharacterProps>) {
  const components = props.components
    .map((component) =>
      typeof component === "string"
        ? RPG.itemByName[component]?.rendering
        : component,
    )
    .filter(Boolean) as ComponentRendering[];
  const overlayComponents = components.filter(
    (component) => component.overlayFileName || component.overlayIconFileName,
  );

  components.sort((a, b) => {
    const aOrder = a.zIndex ?? defaultComponentOrder[a.type];
    const bOrder = b.zIndex ?? defaultComponentOrder[b.type];
    return aOrder - bOrder;
  });
  overlayComponents.sort((a, b) => {
    const aOrder = a.overlayZIndex ?? a.zIndex ?? defaultComponentOrder[a.type];
    const bOrder = b.overlayZIndex ?? b.zIndex ?? defaultComponentOrder[b.type];
    return aOrder - bOrder;
  });

  let style = props.style;
  style = {
    ...style,
    "--scale": props.scale ?? 1,
    "--h-factor": props.smallIcon ? 0.125 : 1,
    "--v-factor": props.smallIcon ? 0.125 : 2,
  };

  // Set the default glow color to be the background rank color
  let glowClass = "",
    glowStyle: React.CSSProperties = {
      "--glow-scale": props.smallIcon ? 0.125 : 1,
    };
  components.forEach((component) => {
    if (component.type === "rank" && component.color) {
      glowClass = "glow";
      glowStyle = { ...glowStyle, "--glow-color": component.color };
    }
  });

  return (
    <div className={Arr.className("character", props.className)} style={style}>
      {components.map((component, idx) => {
        const fileName = props.smallIcon
          ? component.iconFileName
          : component.fileName;
        const zIndex =
          component.zIndex ?? defaultComponentOrder[component.type];
        const backgroundColor = props.smallIcon ? undefined : component.color;
        const backgroundImage = fileName
          ? `url(characters/${fileName}.png)`
          : undefined;
        const filter = component.effects;
        const animation = component.animation;
        const style = {
          ...component.style,
          ...props.additionalComponentsStyle,
          backgroundColor,
          backgroundImage,
          filter,
          animation,
          zIndex,
          ...glowStyle,
          "--glow-scale":
            (component.glowScale ?? 1) * (props.smallIcon ? 0.125 : 1),
        };
        const className = Arr.className(
          "item",
          component.className,
          props.additionalComponentsClassName,
          component.type !== "rank" && !component.color && glowClass,
        );

        return (
          <div
            className={className}
            style={style}
            key={`component-${component.type}-${idx}`}
          ></div>
        );
      })}
      {overlayComponents.map((component, idx) => {
        const fileName = props.smallIcon
          ? component.overlayIconFileName
          : component.overlayFileName;
        const zIndex =
          10 + (component.zIndex ?? defaultComponentOrder[component.type]);
        const backgroundImage = fileName
          ? `url(characters/${fileName}.png)`
          : undefined;
        const style = {
          ...component.style,
          backgroundImage,
          zIndex,
          ...glowStyle,
          "--glow-scale":
            (component.overlayGlowScale ?? 1) * (props.smallIcon ? 0.125 : 1),
        };
        const className = Arr.className(
          "item",
          component.className,
          component.overlayGlowScale && glowClass,
        );

        return (
          <div
            className={className}
            style={style}
            key={`component-overlay-${component.type}-${idx}`}
          ></div>
        );
      })}
      {props.children}
    </div>
  );
}

const defaultComponentOrder: Record<ComponentType, number> = {
  rank: 0,
  cloak: 1,
  character: 2,
  body: 3,
  head: 4,
  feet: 4,
  hand: 4,
  amulet: 5,
  extra: 5,
  offhand: 6,
  weapon: 7,
};
