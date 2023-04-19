# Lumindor

Web anime idle RPG

More details later

# Milestones

## M0

- ~~Port files from exp2 and clean up~~
- Create initial set of assets
- Basic character designer

# Todo plan

# StableDiffusion

- Checkpoint anything-v4.5 + vae-ft-mse-840000-ema-pruned
- img2img: base.png; Resize and fill; 512x1024
- DPM++ 2M; 30 steps; Restore faces; 4x4 batches; CFG Scale 9; Denoise 0.75
- Controlnet: openpose.png; control_v11p_sd15_openpose @1; Scale to Fit 512x1024
- ABG Remover: Only save background free pictures

## Character

- Positive: ((masterpiece)), HDR, a full body front shot photo of a beautiful young woman, blue-green eyes, full pink lips, defined cheekbones, size B breasts, toned body, long tussled orange hair with curled bangs, (long hair:1.3), (plain bra and panties:1.3), (ambient lighting:1.3), (smirking face), (happy), pretty eyes
- Negative: shadows, (deformed, distorted, disfigured, mutated, disgusting, blurry:1.4), shoes, gloves, hat, clothing, boots, ((mismatched eyes))

## Clothing

- Positive: ((masterpiece)), HDR, a full body front shot photo of a person, (wearing full metal plate gloves, metal plate boots:1.3)
- Negative: shadows, deformed, distorted, disfigured, mutated, disgusting, blurry, naked
