import { PropsWithChildren } from "react";

import Arr from "../utils/arrays";

export type CharacterProps = {
  components: (Component | string)[];

  scale?: number;

  className?: string;
  style?: React.CSSProperties;

  additionalComponentsClassName?: string;
  additionalComponentsStyle?: React.CSSProperties;
};

export default function Character(props: PropsWithChildren<CharacterProps>) {
  const components = props.components
    .map((component) =>
      typeof component === "string" ? componentRegistry[component] : component,
    )
    .filter(Boolean);
  const overlayComponents = components.filter(
    (component) => component.overlayFileName,
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
  if (props.scale && props.scale !== 1) {
    style = { ...style, "--scale": props.scale };
  }

  let glowClass = "",
    glowStyle = {};
  components.forEach((component) => {
    if (component.type === "rank" && component.color) {
      glowClass = "glow";
      glowStyle = { "--glow-color": component.color };
    }
  });

  return (
    <div className={Arr.className("character", props.className)} style={style}>
      {components.map((component, idx) => {
        const zIndex =
          component.zIndex ?? defaultComponentOrder[component.type];
        const backgroundColor = component.color;
        const backgroundImage = component.fileName
          ? `url(characters/${component.fileName}.png)`
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
          ...(component.type !== "rank" && !component.color ? glowStyle : {}),
          "--glow-scale": component.glowScale ?? 1,
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
        const zIndex =
          10 + (component.zIndex ?? defaultComponentOrder[component.type]);
        const backgroundImage = `url(characters/${component.overlayFileName}.png)`;
        const style = {
          ...component.style,
          backgroundImage,
          zIndex,
          ...(component.type !== "rank" &&
          !component.color &&
          component.overlayGlowScale
            ? glowStyle
            : {}),
          "--glow-scale": component.overlayGlowScale ?? 1,
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

export type Component = {
  type: ComponentType;
  name: string;

  fileName?: string;
  overlayFileName?: string;

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

type ComponentType =
  | "rank"
  | "char"
  | "body"
  | "head"
  | "feet"
  | "hand"
  | "weapon"
  | "offhand"
  | "cloak"
  | "amulet"
  | "extra";

const defaultComponentOrder: Record<ComponentType, number> = {
  rank: 0,
  cloak: 1,
  char: 2,
  body: 3,
  head: 4,
  feet: 4,
  hand: 4,
  amulet: 5,
  extra: 5,
  offhand: 6,
  weapon: 7,
};

const componentRegistry: Record<string, Component> = {};
const componentsByType: Record<ComponentType, Component[]> = {
  body: [],
  head: [],
  rank: [],
  char: [],
  feet: [],
  hand: [],
  weapon: [],
  offhand: [],
  cloak: [],
  amulet: [],
  extra: [],
};

Character.registerComponent = (component: Partial<Component>) => {
  const type = component.type ?? "extra";
  const name =
    component.name ?? type + "-" + (Object.keys(componentRegistry).length + 1);
  let newComponent: Component = { type, name };

  newComponent = {
    ...newComponent,
    ...componentRegistry[name],
    ...component,
  };
  componentRegistry[newComponent.name] = newComponent;
  componentsByType[newComponent.type] = componentsByType[
    newComponent.type
  ].filter((c) => c.name !== newComponent.name);
  componentsByType[newComponent.type].push(newComponent);
  componentsByType[newComponent.type].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return newComponent;
};

Character.getComponentByName = (name: string) => {
  return componentRegistry[name];
};

Character.getComponentsByType = (type: ComponentType) => {
  return componentsByType[type];
};
