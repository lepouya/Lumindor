# Lumindor

Web anime idle RPG

More details later

# Characters

- Every PC is made up of a base character and a bunch of equips / items / components (haven't unified termonology)
- Components can be merged to increase their ranks and boost their stats
- Ranks can have different visual effects. Character rank is most important and sets the background of player card

## Components

- In their rendering order:
  | component | order |
  | ---- | -- |
  | rank | 0 |
  | cloak | 1 |
  | char | 2 |
  | body | 3 |
  | head | 4 |
  | feet | 4 |
  | hand | 4 |
  | amulet | 5 |
  | extra | 5 |
  | offhand | 6 |
  | weapon | 7 |
- Components can have an overlay image to be displayed on second pass. This is used for things like hair going on top of clothing and such

## Ranks

- Every component (character, items, equips) has a rank. Some start at better ranks maybe?
- Currently thinking merging 2 items of the same rank gives the next rank. 3 is also a possibility
- Merging probably should be the same item and same rank to get to next rank. Maybe something like 2 of the same item, or 3 of different items of the same component type.
  | rank | bg color |
  | ---- | -------- |
  | F | lightgray |
  | D | white |
  | C | lightgreen |
  | B | lightblue |
  | A | orchid |
  | S | gold |
  | S+<sup>\*</sup> | gold with extra effects
- More +s added to S+, S++, ... as higher quality merges

## Primary Stats

- Keep it simple to just 3 classes
- Items naturally have preference towards one stat
  | stat | class |
  | ---- | ----- |
  | STR | heavy |
  | DEX | medium |
  | MAG | light |
- Not sure if characters should have inherent preference towards a class or just build-your-own type

## Secondary Stats

- Generally decided by combined primary stats
- Each type of item should have a different formula. for ex. heavy armor adds defence based on your STR, but medium armor uses DEX for defence instead
  | stat | effects |
  | ---- | ------- |
  | ATK | mostly based on weapon and accessories |
  | DEF | mostly based on armor and accessories |
  | AGI | mostly based on armor class? |
  | HP | |
  | SP | |
  | MP | |

# Milestones

## M0

- ~~Port files from exp2 and clean up~~
- Create initial set of assets
- Basic character designer

# Todo plan

- Image overlays have rough edges
- Look at ways other than css layers to compose images

# StableDiffusion

- Checkpoint anything-v4.5 + vae-ft-mse-840000-ema-pruned
- img2img: base.png; Resize and fill; 512x1024
- DPM++ 2M; 30 steps; Restore faces; 4x4 batches; CFG Scale 9; Denoise 0.75
- Controlnet: openpose.png; control_v11p_sd15_openpose @1; Scale to Fit 512x1024
- ABG Remover: Only save background free pictures

## Character Prompt

- Positive: ((masterpiece)), HDR, a full body front shot photo of a beautiful young woman, blue-green eyes, full pink lips, defined cheekbones, size B breasts, toned body, long tussled orange hair with curled bangs, (long hair:1.3), (plain bra and panties:1.3), (ambient lighting:1.3), (smirking face), (happy), pretty eyes
- Negative: shadows, (deformed, distorted, disfigured, mutated, disgusting, blurry:1.4), shoes, gloves, hat, clothing, boots, ((mismatched eyes))

## Clothing Prompt

- Positive: ((masterpiece)), HDR, a full body front shot photo of a person, (wearing full metal plate gloves, metal plate boots:1.3)
- Negative: shadows, deformed, distorted, disfigured, mutated, disgusting, blurry, naked
