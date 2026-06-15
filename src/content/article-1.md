# 🤖 Claude Code 安装与配置完全指南
## — 从零开始，5分钟上手AI编程助手

> **更新时间**: 2026-06-14  
> **适用平台**: macOS / Linux / Windows (WSL)  
> **前置条件**: Node.js 18+；如果使用 Anthropic 官方模型，需要 Anthropic API Key；也可以通过 cc-switch 配合 OpenAI 兼容的第三方模型使用，详见下文 §2.4

---

## 一、什么是 Claude Code？

Claude Code 是 Anthropic 推出的**终端原生 AI 编程助手**。不同于传统的 IDE 插件（如 GitHub Copilot），Claude Code 直接在终端中运行，能够：

- 理解和修改整个代码仓库
- 执行终端命令（git、npm、pip 等）
- 创建、编辑、删除文件
- 从零开始搭建项目
- 深度上下文理解（支持超长上下文窗口）

简单来说，**Claude Code = 终端里的 AI 结对编程伙伴**。

---

## 二、安装步骤

### 2.1 安装 Node.js（必需）

Claude Code 基于 Node.js 运行，需要 Node.js 18+：

```bash
# macOS (Homebrew)
brew install node

# 验证版本
node --version   # 需要 >= 18
npm --version
```

### 2.2 全局安装 Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

安装完成后，验证是否成功：

```bash
claude --version
```

### 2.3 配置 API Key（官方模型）

如果你直接使用 Anthropic 官方模型，Claude Code 需要 Anthropic API Key 才能工作。获取方式：

1. 访问 [console.anthropic.ai](https://console.anthropic.ai)
2. 注册/登录账号
3. 在 API Keys 页面创建新 Key
4. 设置环境变量：

```bash
# 写入 shell 配置文件（~/.zshrc 或 ~/.bashrc）
export ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxx"

# 立即生效
source ~/.zshrc
```

> **安全提示**：不要将 API Key 硬编码在项目文件或提交到 Git 仓库中。

### 2.4 安装 cc-switch 管理多 Provider

如果你有多个 provider（DeepSeek、GLM、Anthropic 等）或多个账号的 API Key，推荐使用 **cc-switch 桌面版**，通过 GUI 界面完成配置，一键切换。

#### 下载与安装

前往 cc-switch 官方发布页下载桌面版安装包：

```bash
# macOS: 下载 .dmg 文件，拖入 Applications 文件夹
# Windows: 下载 .exe 安装程序
# Linux: 下载 .AppImage 文件
```

#### GUI 配置

打开 cc-switch 桌面版，通过图形界面填写 Provider 信息：

| 品牌 | Provider 类型 | 示例 API Endpoint | 推荐模型 |
|------|:------------:|-------------------|----------|
| **DeepSeek** | OpenAI 兼容 | `https://api.deepseek.com/v1` | `deepseek-chat` |
| **GLM (智谱)** | OpenAI 兼容 | `https://open.bigmodel.cn/api/paas/v4` | `glm-5-flash` |

> ⚠️ **切记**：API Key 存储在 cc-switch 本地，不会泄露到项目目录中。无需担心 `.gitignore` 问题。

#### 使用方式

配置完成后，通过桌面端**点击切换**即可秒级更换当前 Claude Code 使用的模型：

```
┌─ cc-switch ──────────────────────────┐
│                                       │
│  当前: DeepSeek V4 Flash              │
│                                       │
│  ┌─────────────────────────────────┐  │
│  │ ○ DeepSeek V4 Flash     活跃中   │  │
│  │ ○ GLM V5 Turbo                   │  │
│  └─────────────────────────────────┘  │
│                                       │
│  [⚡ 一键切换]  [📊 用量统计]         │
│                                       │
└───────────────────────────────────────┘
```

**核心优势**：
- 🖱️ **鼠标点击切换**，无需记忆命令行参数
- 🔒 **API Key 本地存储**，不写入项目文件
- 📊 **用量可视化**，实时查看各 provider 的 Token 消耗
- ⚡ **即时生效**，切换后 Claude Code 下一次请求自动使用新配置

---

## 三、基础配置

### 3.1 初始化项目配置

在项目根目录运行：

```bash
cd your-project
claude
```

首次启动时会自动创建 `.claude` 配置文件目录，包含：

```
.claude/
├── CLAUDE.md    # 项目级指令文件（全局规则）
└── settings.json # 本地设置
```

### 3.2 CLAUDE.md 配置文件

`CLAUDE.md` 是 Claude Code 的**项目级行为指令文件**，相当于 AI 的 README。内容示例：

```markdown
# CLAUDE.md — 项目开发规范

## 技术栈
- 前端: React 18 + Tailwind CSS + Vite
- 后端: FastAPI + PostgreSQL
- 包管理: npm

## 代码风格
- 使用函数式组件，避免 class 组件
- 文件命名采用 kebab-case
- 组件文件使用 .jsx 扩展名

## 测试
- 运行测试: npm test
- 测试框架: Vitest
- 要求每个工具函数都有单元测试

## Git 规范
- 分支命名: feature/xxx, fix/xxx
- 提交信息使用中文描述变更内容

## 重要提醒
- 不要修改 src/config/ 下的配置文件
- 数据库迁移使用 Alembic，不要直接修改表结构
```

> ⚠️ CLAUDE.md 的优先级非常高，Claude Code 会在**每次交互前**读取该文件。这将极大提升 AI 输出的准确性和一致性。

### 3.3 settings.json 配置——开启完整权限

默认配置下，Claude Code 对一些操作会弹出审批提示（如执行命令、读写文件等）。为了**减少人工审批打断**，建议将 settings.json 配置为尽可能开放：

```json
{
  "permissions": {
    "allow_commands": true,
    "allow_file_ops": true,
    "allow_network": false,
    "allow_auto_write": true,
    "allow_auto_command": true,
    "allow_auto_edit": true,
    "dangerous_commands": [],
    "approval_mode": "never"
  },
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 8192,
  "theme": "dark",
  "verbose": false,
  "auto_updates": true
}
```

| 配置项 | 值 | 作用 |
|--------|:--:|------|
| `allow_auto_write` | `true` | 允许自动写入文件，无需逐一确认 |
| `allow_auto_command` | `true` | 允许自动执行终端命令（npm install、git 等） |
| `allow_auto_edit` | `true` | 允许自动编辑已有文件 |
| `approval_mode` | `"never"` | **完全关闭审批提示**，不再弹窗询问 |
| `dangerous_commands` | `[]` | 空数组表示不限制任何命令（生产环境需谨慎） |

> ⚠️ **权衡**：开启全部权限会大幅提升效率，但也意味着 Claude Code 可以自由操作文件和执行命令。建议在**个人开发环境**中启用，团队协作或多用户服务器上应保留一定限制。

### 3.4 提升第三方模型缓存命中率——禁用动态请求头

Claude Code 默认会在每次请求中注入**动态请求头**（attribution / 会话标识等动态参数），这对 Anthropic 官方 API 不是问题。但当你通过 cc-switch 切换到**第三方模型（如 DeepSeek、GLM 等）** 时，这些动态参数会让每次请求的"指纹"都不同，服务端无法识别为同一会话，从而**无法命中语义缓存（Semantic Cache）**，造成：

- 相同 Prompt 反复消耗 Token
- 响应速度变慢（无法命中缓存）
- API 费用增加（对按量计费模型尤其明显）

#### 核心必杀技：禁用 Claude Code 的动态请求头

这是解决缓存问题的**最关键一步**。通过设置环境变量，直接阻止 Claude Code 注入动态参数。

**操作步骤**：

1. 打开你的终端配置文件（例如 `~/.bashrc`、`~/.zshrc`）。
2. 在文件末尾添加以下行：

```bash
export CLAUDE_CODE_ATTRIBUTION_HEADER="0"
```

3. 保存文件，并运行以下命令使其立即生效（或重启终端）：

```bash
source ~/.bashrc
```

4. 同时，也可以检查并修正配置文件 `~/.claude/settings.json`，确保没有冲突设置：

```json
{
  "env": {
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0"
  }
}
```

> ⚠️ **注意**：如果此方法不生效，建议彻底清理 Claude Code 的所有缓存文件（通常位于 `~/.claude/` 目录下），并重启 Claude Code。

---

## 四、CLAUDE.md 最佳实践

### 4.1 按项目类型配置

**React 项目**：

```markdown
- 使用 Tailwind CSS 进行样式设计，不使用普通 CSS
- 组件放在 src/components/ 目录下
- 页面组件放在 src/pages/ 目录下
- 使用 react-router-dom v6 的路由方式
```

**Python 项目**：

```markdown
- 使用 ruff 进行代码检查
- 类型注解必须完整
- 文档字符串使用 Google 风格
- 依赖管理使用 poetry
```

### 4.2 核心技巧

| 技巧 | 说明 |
|------|------|
| **明确约束** | 列出"不允许做什么"比"允许做什么"更有效 |
| **路径优先** | 告诉 Claude Code 文件存放位置，避免到处乱放 |
| **安全第一** | 限制网络请求和危险命令执行 |
| **逐层细化** | 先从大方向写起，逐步补充细节 |

---

## 五、扩展配置

### 5.1 安装 Skills

Claude Code 的 Skills 相当于 AI 的"预装知识包"，能让你在特定领域获得更专业的表现。推荐安装以下两个 Skill：

**ECC（Effortless Code Companion）**：
ECC 是一个综合性 Skill，提供了大量高质量的编码规则和最佳实践模板：

```bash
# 安装 ECC Skill
claude skill install ecc
```

安装后，ECC 会自动在项目中生成或推荐相关配置规则，涵盖代码质量、安全审查、测试规范等方面。

**Frontend Design Skill**：
前端设计 Skill 专为 UI 开发场景优化，让 Claude Code 对前端技术栈有更深的理解：

```bash
# 安装 Frontend Design Skill
claude skill install frontend-design
```

这个 Skill 包含了：
- 响应式设计最佳实践
- Tailwind CSS / shadcn/ui 组件规范
- 无障碍访问（a11y）规则
- 动画与交互设计模式
- 设计系统组件架构建议

**查看已安装的 Skills**：

```bash
# 列出所有已安装的 Skills
claude skill list

# 查看某个 Skill 的具体内容
claude skill show ecc
```

### 5.2 安装 HUD——实时监控 Token 与上下文

HUD（Heads-Up Display）是 Claude Code 的实时监控面板，让你清楚了解当前的资源消耗情况：

```bash
# 全局安装 HUD
npm install -g @anthropic-ai/claude-code-hud
```

安装后启动 Claude Code 时，HUD 会自动在终端底部或侧边显示实时信息面板，包含：

```
┌─ Claude Code HUD ─────────────────────┐
│                                        │
│  Token 使用量                          │
│  本会话: 12,847 / 200,000              │
│  今日累计: 87,432                      │
│                                        │
│  上下文占用                            │
│  已用: 45.2% (36.2K / 80K)           │
│  当前文件: 1,284 tokens               │
│  历史消息: 28,416 tokens              │
│  项目索引: 6,500 tokens               │
│                                        │
│  响应速度                              │
│  平均: 2.3s                            │
│  最慢: 4.8s                            │
│                                        │
│  会话信息                              │
│  持续时长: 00:23:15                    │
│  消息轮次: 17                          │
│  当前 Provider: anthropic-main         │
│                                        │
└────────────────────────────────────────┘
```

**HUD 自定义配置**：
可以在 `.claude/settings.json` 中添加 HUD 相关配置：

```json
{
  "hud": {
    "enabled": true,
    "position": "bottom",
    "refresh_interval": 2000,
    "show_token_usage": true,
    "show_context_usage": true,
    "show_latency": true,
    "compact_mode": false
  }
}
```

| 配置项 | 说明 |
|--------|------|
| `position` | 面板位置：`"bottom"`（底部）、`"right"`（右侧） |
| `refresh_interval` | 刷新间隔（毫秒），默认 2000ms |
| `compact_mode` | 紧凑模式，仅显示核心指标 |
| `show_latency` | 是否显示响应延迟 |

> 💡 **使用建议**：HUD 对长时间会话非常有用——你可以在上下文接近上限时主动发起新会话，或在 Token 配额接近限制时切换到备用 provider。

---

## 六、常见问题

### Q1：`command not found: claude`

```bash
# 检查 npm 全局安装路径是否在 PATH 中
npm config get prefix
# 输出类似 /usr/local 或 /Users/xxx/.npm-global
# 确保该路径下的 bin 目录在 PATH 中
export PATH=$(npm config get prefix)/bin:$PATH
```

### Q2：API Key 验证失败

```bash
# 检查环境变量是否设置
echo $ANTHROPIC_API_KEY

# 如果为空，检查是否写入了正确的 shell 配置文件
# 重新执行 source ~/.zshrc
```

### Q3：如何升级 Claude Code？

```bash
claude update
```

### Q4：Claude Code 支持中文吗？

完全支持！Claude Code 可以理解中文指令并生成中文注释和文档。你完全可以用中文与它对话。

---

## 七、总结

Claude Code 的安装和配置非常简单，核心就三步：

```
1️⃣ npm install -g @anthropic-ai/claude-code
2️⃣ 设置 API Key（配合 cc-switch 管理多 provider）
3️⃣ 在项目根目录运行 claude 启动
```

进阶配置建议：

```
✅ 安装 cc-switch 管理多个 API 账号/品牌
✅ 开启 settings.json 全部权限，减少审批打断
✅ 安装 ECC + Frontend Design Skills 增强 AI 能力
✅ 安装 HUD 实时监控 Token 与上下文占用
✅ 配置 CLAUDE.md 让 AI 更懂你的项目
```

Claude Code 生态的不断完善，正在让"AI 编程"从辅助工具进化为真正的开发伙伴。下一篇文章我们将深入探讨 Claude Code 的多种工作模式和使用技巧。

---

> **一句话总结：** Claude Code 安装仅需 3 步、5 分钟，终端原生 AI 编程体验，配合 CLAUDE.md 配置文件能大幅提升 AI 输出的准确性和一致性。
