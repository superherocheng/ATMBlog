# GPT IMAGE2提示词集锦（九）：万能模板·艺术风格·动作姿态·排版构图
## — IMAGE2提示词工程完整指南（第一部分）

> **更新时间**: 2026-07-16  
> **用途**: GPT IMAGE2 图像生成提示词合集 · 万能骨架与基础库  
> **说明**: 本篇收录IMAGE2提示词工程的核心模块化模板（万能骨架）、艺术风格流派库、动作姿态安全姿势库与排版构图比例库，是所有出图的底层逻辑。附完整目录索引，可直接复制使用。

---

## 目录

一、🏗️ 万能提示词骨架（6层模块化结构）
- [6层结构模板](#6层结构模板)

二、🎨 艺术风格流派库（7组）
- [2.1 素描草稿风](#21-素描草稿风)
- [2.2 3D多层纸雕光影盒](#22-3d多层纸雕光影盒)
- [2.3 国风水墨/浮世绘风](#23-国风水墨浮世绘风)
- [2.4 高对比红黑白泼溅插画风](#24-高对比红黑白泼溅插画风)
- [2.5 彩色人物+黑白线稿背景](#25-彩色人物黑白线稿背景)
- [2.6 复古撕纸拼贴风](#26-复古撕纸拼贴风)
- [2.7 局部高亮色彩风格](#27-局部高亮色彩风格)

三、🤸 动作姿态与安全姿势库（4组）
- [3.1 10种安全收敛坐姿](#31-10种安全收敛坐姿)
- [3.2 10种微开宽距坐姿](#32-10种微开宽距坐姿)
- [3.3 3种电影级站姿](#33-3种电影级站姿)
- [3.4 低仰角巨物感站位](#34-低仰角巨物感站位)

四、📐 排版、构图与比例（4组）
- [4.1 竖版 3:4 / 9:16](#41-竖版-34--916)
- [4.2 横版 16:9](#42-横版-169)
- [4.3 倾斜对角排版](#43-倾斜对角排版)
- [4.4 四宫格/多分镜排版](#44-四宫格多分镜排版)

---

## 一、🏗️ 万能提示词骨架（6层模块化结构）

使用这套分层结构，AI能够精准区分"环境"、"人物"、"动作"和"排版"，避免描述混杂导致变形。您只需要根据需求替换对应模块的内容即可。

### 6层结构模板

```text
[Art Style]             → 美术风格（如：素描草稿、3D纸雕、浮世绘、红黑白泼溅）
[Theme & Mood]          → 主题与氛围（如：竞技热血、废土科幻、神圣肃杀）
[Subject]               → 主体描述（角色外貌、发色瞳色、穿搭细节）
[Action & Pose]         → 动作与姿态（安全收敛/微张/低仰角站姿等）
[Composition & Layout]  → 构图与排版（背景环境、画幅比例、空间排布）
[Typography & Text]     → 排版与文字（主标题、副标题、边框盒子、条形码）
[Color Palette]         → 配色方案（整体色调与强调色）
```

---

## 二、🎨 艺术风格流派库

### 2.1 素描草稿风

```text
Rough pencil sketch draft style, heavy cross-hatching shading, monochromatic charcoal and graphite tones, faint watercolor washes, textured vintage sketchbook paper, retro editorial graphic design.
```

**特点**：用交叉排线体现阴影，适合表现角色设定图和硬核竞技海报，背景通常是斑驳的涂鸦墙或废土。

### 2.2 3D多层纸雕光影盒

```text
Multi-layer paper-cut shadow box, paper carving layered light, soft side lighting, thick cardboard textures, tactile paper sculpting, deep drop shadows.
```

**特点**：极具手工质感，所有元素像厚卡纸一层层切割叠放，适合做精美角色群像或双人组合海报。

### 2.3 国风水墨/浮世绘风

```text
Ukiyo-e Japanese woodblock print style, stylized ink brush strokes, retro flat colors, aged rice paper textures.
```

**特点**：以靛蓝、墨色、米白为主，辅以传统的日式枯笔、泼墨效果，非常适合表现武士、忍者或传统古风角色。

### 2.4 高对比红黑白泼溅插画风

```text
High-contrast anime illustration, bold thick ink outlines, cel-shaded flat colors, heavy dynamic ink splatters, graphic street art poster aesthetic.
```

**特点**：极其强烈的视觉冲击力，用血红色飞溅泼墨和纯黑纯白撞色，适合战斗、格斗、潮牌海报。

### 2.5 彩色人物+黑白线稿背景

```text
Contrast art style: Full-color realistic anime character rendering combined with a completely monochromatic black-and-white charcoal and graphite pencil sketch background.
```

**特点**：视觉焦点集中在人物身上，背景线条淡化，适合突出角色特写的海报。

### 2.6 复古撕纸拼贴风

```text
Peeling vintage cinema poster wallpaper, torn paper cut-out and ripped collage effects, layered vintage scrapbook aesthetic.
```

**特点**：在背景上加入剥落的老电影海报、撕裂的纸张边缘、老式票根和胶片卷轴，增加文艺感和时代感。

### 2.7 局部高亮色彩（赛博/能量流）

```text
Selective color pencil sketch draft style, only the time machine and energy trails are rendered in vibrant neon blue, electric cyan, and fiery yellow.
```

**特点**：背景和人物是素描，只有能量线、飞行器或电流是霓虹彩色，适合科幻和未来主题。

---

## 三、🤸 动作姿态与安全姿势库

### 3.1 10种安全收敛坐姿

使用场景：需要角色露出全身，但绝对避开审核。

**盘腿后靠**：
```text
Sitting cross-legged on the concrete, palms resting flat on the ground behind her back, leaning backward slightly.
```

**抱膝凝望**：
```text
Sitting with both knees pulled up toward her chest, hands resting on her knees.
```

**侧身倾斜**：
```text
Sitting sideways with both knees bent and drawn together, leaning slightly back with hands resting on the ground behind her.
```

**蝴蝶坐**：
```text
Seated in a relaxed butterfly stretch (cobblers pose), soles of feet together, knees dropped gently to the sides, hands resting on ankles.
```

**单腿内收**：
```text
Sitting with one leg tucked under and the other knee bent upward, hands clasped around the raised knee.
```

**并腿前伸**：
```text
Sitting with both legs extended forward, slightly bent at the knees, hands resting on the ground behind her for support.
```

**侧坐回眸**：
```text
Sitting sideways on the ground, both legs tucked to one side, upper body turned slightly backward, hands resting on the ground.
```

**抱膝侧靠**：
```text
Sitting with knees pulled up, arms wrapped around shins, leaning slightly to one side with head resting on knee.
```

**盘腿冥想**：
```text
Sitting in a cross-legged meditative pose, palms resting on knees, spine straight, eyes gently closed.
```

**屈膝后撑**：
```text
Sitting with both knees bent and feet flat on the ground, palms planted behind her, leaning back slightly in a relaxed arch.
```

### 3.2 10种微开宽距坐姿

使用场景：需要展现张扬、霸气且放松的运动员姿态。

**八字外八字宽距**：
```text
Sitting with both knees bent and angled outward in a wide, relaxed stance, feet flat on the ground and spaced apart.
```

**单腿侧伸**：
```text
Sitting with one knee pulled in and the other leg extended outward diagonally, creating a wide angular base.
```

**深蹲改坐式**：
```text
Transitioning from a deep squat to a seated position, hips touching the ground, knees open wide.
```

**宽距前倾**：
```text
Sitting with legs spread wide in a V-shape, upper body leaning forward slightly, elbows resting on inner thighs.
```

**盘腿霸气坐**：
```text
Sitting in a wide cross-legged position, one arm resting on a raised knee, chin slightly lifted with a confident expression.
```

**侧开腿后靠**：
```text
Sitting with one leg extended to the side and the other bent inward, leaning back on both hands.
```

**宽距抱臂**：
```text
Sitting with knees open wide and feet planted, arms crossed over chest, torso upright and commanding.
```

**半跪转坐**：
```text
Transitioning from a half-kneeling position to seated, one knee on the ground and the other foot planted wide.
```

**分腿前撑**：
```text
Sitting with legs extended in a wide V, hands planted between the legs on the ground, leaning forward.
```

**宽距仰靠**：
```text
Sitting with legs spread wide and knees slightly bent, leaning back on elbows, head tilted slightly upward.
```

### 3.3 3种电影级站姿

使用场景：大幅海报、电影概念海报。

**对望**：
```text
Standing firmly, facing each other with intense, serious expressions.
```

**背对背**：
```text
Standing back-to-back in a defensive, confident stance, looking outward in opposite directions.
```

**击掌庆祝**：
```text
Mid-air high-five celebrating their success.
```

### 3.4 低仰角巨物感站位

使用场景：展现威严、宏伟的英雄气场。

```text
Standing confidently, shot from a dramatic low angle to emphasize a towering, majestic presence.
```

---

## 四、📐 排版、构图与比例

### 4.1 竖版 3:4 / 9:16

**竖版海报（最常用）**：
```text
Vertical poster layout, 3:4 aspect ratio.
```

**手机壁纸/塔罗牌**：
```text
Vertical cinematic poster layout, 9:16 aspect ratio.
```

### 4.2 横版 16:9

```text
Wide landscape poster layout, 16:9 aspect ratio.
```

### 4.3 倾斜对角排版

**复古街头大字报**：
左上方巨大斑驳标题，左侧巨大数字，右侧黑底分组框，左下角对话框与条形码。

**战术情报数据风（时透无一郎同款）**：
```text
Strong diagonal tilted layout, containing blade data (total length, blade length, weight), latitude/longitude coordinates, circular emblem, barcode, geometric grid lines and fog in background.
```

**极简艺术留白**：
顶部一条横向米色色块印名字，底部深色色块印台词，背景置入角色专属徽章。

### 4.4 四宫格/多分镜排版

适用于设定集、招式图解、四格拼贴。使用严格的分镜布局，各格之间有明确的分割线。
