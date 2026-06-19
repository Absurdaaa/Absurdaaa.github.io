# 个人简历网站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为林晖鹏构建一个 Claude Code 设计感的单页个人简历网站，可部署到 GitHub Pages，支持 4 套主题切换。

**Architecture:** 纯静态 HTML + CSS + 原生 JS，无构建步骤。配色用 CSS 自定义属性（CSS variables）驱动，主题切换通过 `<html data-theme>` + `localStorage` 实现。单页向下滚动，移动端单列堆叠。

**Tech Stack:** HTML5, CSS3 (custom properties, fl/grid), Vanilla JS, Google Fonts (Noto Serif SC / Newsreader / JetBrains Mono)。

**测试说明：** 本项目零依赖、无构建（见 spec 第 3 节），不引入 JS 测试框架。每个任务的"验证"= 在浏览器打开核对 + 主题逻辑用浏览器 console 断言。

参考设计文档：`docs/superpowers/specs/2026-06-19-personal-portfolio-site-design.md`

---

## File Structure

```
github-profile/
├── index.html           # 全部页面结构（单页）
├── css/styles.css       # 全局样式 + 4 套主题变量
├── js/theme.js          # 主题切换 + localStorage 持久化
├── assets/              # 照片 / favicon（占位）
└── README.md            # 部署说明
```

每个文件单一职责：`styles.css` 管视觉与主题变量，`theme.js` 只管切换逻辑，`index.html` 只管结构与内容。

---

### Task 1: 项目骨架 + 主题变量基础

**Files:**
- Create: `index.html`
- Create: `css/styles.css`

- [ ] **Step 1: 创建 `index.html` 骨架**

```html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="A">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>林晖鹏 · Huipeng Lin</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500;6..72,600&family=Noto+Serif+SC:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <!-- 后续任务填充各 section -->
  <main></main>
  <script src="js/theme.js"></script>
</body>
</html>
```

- [ ] **Step 2: 创建 `css/styles.css`——reset + 4 套主题变量**

```css
/* ===== Reset ===== */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
img{max-width:100%;display:block}

/* ===== Theme variables ===== */
:root,[data-theme="A"]{--bg:#F0EEE6;--surface:#FAF9F5;--text:#1F1E1D;--muted:#8A8780;--accent:#D97757;--border:#e0ded6;--code-str:#3F7D5A}
[data-theme="B"]{--bg:#F2F0EA;--surface:#FBFAF6;--text:#1E1E24;--muted:#86848F;--accent:#5B5BD6;--border:#e1ded4;--code-str:#3F7D5A}
[data-theme="C"]{--bg:#EFEEE7;--surface:#FAF9F4;--text:#1C1E1B;--muted:#82857E;--accent:#3F7D5A;--border:#dfddd2;--code-str:#2f6f8f}
[data-theme="D"]{--bg:#1A1714;--surface:#24201B;--text:#ECE7DC;--muted:#8A8175;--accent:#D97757;--border:#3a342c;--code-str:#7ec699}

/* ===== Base ===== */
body{background:var(--bg);color:var(--text);font-family:-apple-system,"Noto Serif SC",sans-serif;line-height:1.6;transition:background .3s,color .3s}
.serif{font-family:"Newsreader","Noto Serif SC",Georgia,serif}
.mono{font-family:"JetBrains Mono",ui-monospace,monospace}
.section{max-width:820px;margin:0 auto;padding:48px 24px}
.section-label{font-family:"JetBrains Mono",monospace;font-size:12px;letter-spacing:1px;color:var(--accent);margin-bottom:18px}
a{color:inherit}
```

- [ ] **Step 3: 验证**

打开 `index.html`：页面应为奶油底色、空白。改 `<html data-theme="D">` 后刷新，背景应变暖深色。确认 4 个值都能切。改回 `data-theme="A"`。

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: 项目骨架 + 4套主题CSS变量"
```

---

### Task 2: 主题切换器（导航 + theme.js）

**Files:**
- Modify: `index.html`（在 `<main>` 前加 `<nav>`）
- Create: `js/theme.js`

- [ ] **Step 1: 在 `index.html` 的 `<body>` 顶部加导航**

```html
<nav class="nav">
  <div class="nav-name serif">林晖鹏 <span class="mono nav-en">Huipeng Lin</span></div>
  <div class="nav-right">
    <div class="nav-links mono">
      <a href="#about">关于</a><a href="#research">科研</a><a href="#pub">论文</a><a href="#awards">获奖</a><a href="#contact">联系</a>
    </div>
    <div class="theme-switch" role="group" aria-label="主题切换">
      <button class="dot" data-set="A" style="background:#D97757" title="珊瑚"></button>
      <button class="dot" data-set="B" style="background:#5B5BD6" title="靛蓝"></button>
      <button class="dot" data-set="C" style="background:#3F7D5A" title="森绿"></button>
      <button class="dot" data-set="D" style="background:#1A1714" title="暖深"></button>
    </div>
  </div>
</nav>
```

- [ ] **Step 2: 在 `styles.css` 追加导航样式**

```css
.nav{position:sticky;top:0;z-index:10;display:flex;justify-content:space-between;align-items:center;padding:12px 24px;background:color-mix(in srgb,var(--surface) 88%,transparent);backdrop-filter:blur(8px);border-bottom:1px solid var(--border)}
.nav-name{font-weight:700;font-size:16px}
.nav-en{font-size:12px;font-weight:400;color:var(--muted)}
.nav-right{display:flex;align-items:center;gap:16px}
.nav-links{display:flex;gap:14px;font-size:12px}
.nav-links a{color:var(--muted);text-decoration:none}
.nav-links a:hover{color:var(--accent)}
.theme-switch{display:flex;gap:5px;border-left:1px solid var(--border);padding-left:12px}
.dot{width:14px;height:14px;border-radius:50%;border:1px solid #00000022;cursor:pointer;padding:0;transition:transform .15s}
.dot:hover{transform:scale(1.2)}
.dot[aria-current="true"]{outline:2px solid var(--accent);outline-offset:2px}
@media(max-width:640px){.nav-links{display:none}}
```

- [ ] **Step 3: 创建 `js/theme.js`**

```js
(function () {
  var KEY = "hl-theme";
  var root = document.documentElement;
  var saved = localStorage.getItem(KEY);
  if (saved) root.setAttribute("data-theme", saved);

  function mark() {
    var cur = root.getAttribute("data-theme");
    document.querySelectorAll(".dot").forEach(function (d) {
      d.setAttribute("aria-current", d.dataset.set === cur ? "true" : "false");
    });
  }
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    localStorage.setItem(KEY, t);
    mark();
  }
  document.querySelectorAll(".dot").forEach(function (d) {
    d.addEventListener("click", function () { setTheme(d.dataset.set); });
  });
  mark();
  window.__setTheme = setTheme; // 便于 console 验证
})();
```

- [ ] **Step 4: 验证（浏览器 + console 断言）**

打开页面，点右上角四个圆点，背景应即时切换，当前点有外圈高亮。在 console 跑：

```js
__setTheme("D");
console.assert(localStorage.getItem("hl-theme")==="D","persist failed");
console.assert(getComputedStyle(document.body).backgroundColor==="rgb(26, 23, 20)","bg D failed");
__setTheme("A");
```
刷新页面，应停留在上次选的主题。预期：两个 assert 都不报错。

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css js/theme.js
git commit -m "feat: 导航 + 4主题切换器(localStorage持久化)"
```

---

### Task 3: Hero 区

**Files:**
- Modify: `index.html`（`<main>` 内首个 section）
- Modify: `css/styles.css`

- [ ] **Step 1: 在 `<main>` 内加 Hero**

```html
<header class="hero section">
  <div class="hero-text">
    <p class="mono hero-greet">👋 hi, I'm</p>
    <h1 class="serif hero-name">林晖鹏</h1>
    <p class="hero-tagline">计算机科学本科生 · 系统 &amp; 机器学习方向<br>喜欢把复杂的问题拆开，再亲手实现出来。</p>
    <div class="hero-btns">
      <a class="btn btn-primary" href="#research">查看科研 →</a>
      <a class="btn" href="https://github.com/Absurdaaa" target="_blank" rel="noopener">GitHub</a>
      <a class="btn" href="mailto:2312966@mail.nankai.edu.cn">Email</a>
    </div>
  </div>
  <div class="hero-photo" aria-hidden="true">照片(可选)</div>
</header>
```

- [ ] **Step 2: 追加样式**

```css
.hero{display:flex;gap:32px;align-items:center;padding-top:56px;padding-bottom:56px}
.hero-text{flex:1}
.hero-greet{font-size:13px;color:var(--accent);margin-bottom:10px}
.hero-name{font-size:clamp(38px,7vw,56px);font-weight:700;line-height:1.05}
.hero-tagline{color:var(--muted);margin:16px 0 24px;font-size:15px}
.hero-btns{display:flex;gap:10px;flex-wrap:wrap}
.btn{font-family:"JetBrains Mono",monospace;font-size:13px;padding:9px 18px;border-radius:8px;border:1px solid var(--text);opacity:.9;text-decoration:none;transition:.15s}
.btn:hover{opacity:1;transform:translateY(-1px)}
.btn-primary{background:var(--accent);color:#fff;border-color:var(--accent)}
.hero-photo{width:120px;height:150px;border-radius:12px;background:var(--surface);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--muted);font-size:11px;flex-shrink:0}
@media(max-width:640px){.hero{flex-direction:column-reverse;align-items:flex-start}}
```

- [ ] **Step 3: 验证**

刷新页面：Hero 显示衬线大字姓名、副标题、三个按钮、右侧照片占位。窗口缩到手机宽度，应变成上下堆叠。四主题下按钮/强调色都随之变。

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: Hero 区"
```

---

### Task 4: 关于我（内联代码风）

**Files:**
- Modify: `index.html`, `css/styles.css`

- [ ] **Step 1: 加 About section**

```html
<section id="about" class="section">
  <p class="section-label">// ABOUT · 关于我</p>
  <div class="about-code mono">
    <p class="c-comment"># 我是谁</p>
    <p>我是 <span class="c-accent">林晖鹏</span>，南开大学计算机系在读，</p>
    <p>喜欢钻研系统底层与机器学习。<span class="c-comment">/* TODO: 换成一句有温度的自述 */</span></p>
    <p class="about-vars">
      <span class="c-key">working_on</span> <span class="c-op">=</span> <span class="c-str">"十亿级像素病理图像端到端"</span><br>
      <span class="c-key">learning</span>&nbsp;&nbsp;&nbsp;<span class="c-op">=</span> <span class="c-str">"CUDA / 分布式训练"</span><br>
      <span class="c-key">hobbies</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-op">=</span> <span class="c-str">["待补充", "待补充"]</span>
    </p>
  </div>
  <div class="stack">
    <span class="stack-label">🛠️ 技术栈</span>
    <span class="tag mono">C / C++</span><span class="tag mono">Python</span><span class="tag mono">PyTorch</span><span class="tag mono">SQL</span>
  </div>
</section>
```

- [ ] **Step 2: 追加样式**

```css
.about-code{font-size:14px;line-height:1.9;border-left:3px solid var(--accent);padding-left:18px}
.c-comment{color:var(--muted)}
.c-accent{color:var(--accent);font-weight:600}
.about-vars{margin-top:12px}
.c-key{color:var(--muted)}
.c-op{color:var(--accent)}
.c-str{color:var(--code-str)}
.stack{margin-top:24px;display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.stack-label{font-size:13px;color:var(--muted);margin-right:4px}
.tag{font-size:12px;background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:4px 10px}
```

- [ ] **Step 3: 验证**

刷新：About 区呈现代码风（注释灰、变量名灰、`=` 珊瑚、字符串绿/蓝），左侧珊瑚边框；技术栈标签一行。四主题切换颜色协调。

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: 关于我(内联代码风) + 技术栈"
```

---

### Task 5: 科研经历

**Files:** Modify `index.html`, `css/styles.css`

- [ ] **Step 1: 加 Research section**

```html
<section id="research" class="section">
  <p class="section-label">// RESEARCH · 科研经历</p>
  <article class="rcard rcard-key">
    <div class="rcard-top"><b>面向 MLLM 的有序选择性缩放</b><span class="mono badge">ECCV 2026 · 共一</span></div>
    <p class="rcard-meta">Nankai CV Lab · 杨巨峰教授</p>
    <p class="rcard-desc">多阶段细化 + 多尺度输入切换 + 风险动态剪枝，在提升精度的同时大幅降低计算开销。负责核心算法设计与全部对比/消融实验。</p>
  </article>
  <article class="rcard rcard-key">
    <div class="rcard-top"><b>十亿级像素病理图像端到端诊疗</b><span class="mono badge">TPAMI · 共一在投</span></div>
    <p class="rcard-meta">南开大学媒体计算实验室 · 程明明教授</p>
    <p class="rcard-desc">基于双缓冲缓存模块筛选关键图块做梯度反传，大幅降低训练显存、加速整体流程，使大规模编码器端到端训练成为可能。</p>
  </article>
  <article class="rcard">
    <div class="rcard-top"><b>图像-点云跨模态配准粗对应剪枝</b><span class="mono badge badge-mut">ECCV 2026 · 三作</span></div>
    <p class="rcard-meta">Nankai CV Lab · 杨巨峰教授</p>
    <p class="rcard-desc">设计跨坐标对应剪枝策略 + 多密度点集成，过滤粗匹配外点，提升精匹配与位姿估计鲁棒性。</p>
  </article>
</section>
```

- [ ] **Step 2: 追加样式**

```css
.rcard{background:var(--surface);border:1px solid var(--border);border-left:3px solid var(--border);border-radius:8px;padding:16px 18px;margin-bottom:12px}
.rcard-key{border-left-color:var(--accent)}
.rcard-top{display:flex;justify-content:space-between;gap:12px;align-items:baseline;flex-wrap:wrap}
.rcard-top b{font-size:15px}
.badge{font-size:11px;color:var(--accent);white-space:nowrap}
.badge-mut{color:var(--muted)}
.rcard-meta{font-size:12px;color:var(--muted);margin:6px 0}
.rcard-desc{font-size:13px;color:var(--text);opacity:.85;line-height:1.6}
```

- [ ] **Step 3: 验证**

刷新：3 张科研卡，前两张珊瑚左边框、第三张灰边框；标题与 venue 徽章两端对齐，窄屏徽章换行不破。

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: 科研经历(3卡)"
```

---

### Task 6: 论文

**Files:** Modify `index.html`, `css/styles.css`

- [ ] **Step 1: 加 Publications section**

```html
<section id="pub" class="section">
  <p class="section-label">// PUBLICATIONS · 论文</p>
  <p class="pub">R. Qin, Y. Liu, <b>H. Lin</b>. "Orderly Selective Zoom Extension with Risk-Based Pruning for High-Resolution Image Perception in MLLMs." <i>ECCV</i>, 2026. <span class="pub-tag">(共一在投)</span></p>
  <p class="pub">X. Liu, R. Qin, <b>H. Lin</b>. "Cross-Coordinate Correspondence Pruning for Image-to-Point Cloud Registration." <i>ECCV</i>, 2026. <span class="pub-tag">(三作在投)</span></p>
</section>
```

- [ ] **Step 2: 追加样式**

```css
.pub{font-size:13px;line-height:1.7;margin-bottom:10px;padding-left:18px;border-left:2px solid var(--border)}
.pub b{color:var(--text)}
.pub-tag{color:var(--accent)}
```

- [ ] **Step 3: 验证**

刷新：两条论文，本人名 `H. Lin` 加粗，署位珊瑚色，标题斜体。

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: 论文列表"
```

---

### Task 7: 竞赛获奖（时间线）

**Files:** Modify `index.html`, `css/styles.css`

- [ ] **Step 1: 加 Awards section（时间线）**

```html
<section id="awards" class="section">
  <p class="section-label">// AWARDS · 竞赛获奖</p>
  <ol class="timeline">
    <li class="tl-item tl-key"><div class="tl-top"><b>🥇 全国密码学技术竞赛</b><span class="mono tl-date">2025.11</span></div><span class="tl-lvl">全国一等奖</span></li>
    <li class="tl-item tl-key"><div class="tl-top"><b>🥈 全国大学生系统能力大赛 · 数据库管理系统设计赛</b><span class="mono tl-date">2025.08</span></div><span class="tl-lvl">全国二等奖</span></li>
    <li class="tl-item tl-key"><div class="tl-top"><b>🏆 智能计算创新设计赛（先导杯）· 校内赛</b><span class="mono tl-date">2025.07</span></div><span class="tl-lvl">特等奖</span></li>
    <li class="tl-item"><div class="tl-top"><b>🥇 全国大学生数学建模竞赛</b><span class="mono tl-date">2025.09</span></div><span class="tl-lvl">天津市一等奖</span></li>
    <li class="tl-item"><div class="tl-top"><b>🥈 第八届 CCF-TCARCH 计算机体系结构挑战赛</b><span class="mono tl-date">2025.09</span></div><span class="tl-lvl">二等奖</span></li>
    <li class="tl-item"><div class="tl-top"><b>🥉 OceanBase 数据库创新设计赛</b><span class="mono tl-date">2024.11</span></div><span class="tl-lvl">天津市第三名</span></li>
  </ol>
</section>
```

- [ ] **Step 2: 追加样式**

```css
.timeline{list-style:none;border-left:2px solid var(--border);padding-left:20px;display:flex;flex-direction:column;gap:18px}
.tl-item{position:relative}
.tl-item::before{content:"";position:absolute;left:-27px;top:4px;width:10px;height:10px;border-radius:50%;background:var(--border)}
.tl-key::before{background:var(--accent)}
.tl-top{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
.tl-top b{font-size:14px}
.tl-date{font-size:11px;color:var(--muted);white-space:nowrap}
.tl-lvl{font-size:12px;color:var(--accent)}
```

- [ ] **Step 3: 验证**

刷新：纵向时间线，左侧竖线串圆点；一等/特等用珊瑚实心点、其余灰点；赛事名与日期两端对齐，等级珊瑚色。

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: 竞赛获奖(时间线)"
```

---

### Task 8: 联系页脚（终端风）

**Files:** Modify `index.html`, `css/styles.css`

- [ ] **Step 1: 加 footer**

```html
<footer id="contact" class="footer">
  <span class="mono foot-prompt">$ contact --me</span>
  <span class="mono foot-info">
    <a href="https://github.com/Absurdaaa" target="_blank" rel="noopener">github.com/Absurdaaa</a>
    · <a href="mailto:2312966@mail.nankai.edu.cn">2312966@mail.nankai.edu.cn</a>
  </span>
</footer>
```

- [ ] **Step 2: 追加样式（页脚固定暖深色，跨主题统一）**

```css
.footer{background:#1A1714;color:#ECE7DC;padding:22px 24px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;font-size:13px}
.foot-prompt{color:#8A8175}
.foot-info a{color:#ECE7DC;text-decoration:none}
.foot-info a:hover{color:#D97757}
```

- [ ] **Step 3: 验证**

刷新：页脚暖深色块，左 `$ contact --me`，右 GitHub/邮箱链接可点；邮箱链接打开邮件客户端。

- [ ] **Step 4: Commit**

```bash
git add index.html css/styles.css
git commit -m "feat: 联系页脚(终端风)"
```

---

### Task 9: 响应式收尾 + favicon + 跨主题自查

**Files:** Modify `css/styles.css`, `index.html`

- [ ] **Step 1: 追加移动端微调**

```css
@media(max-width:640px){
  .section{padding:36px 18px}
  .rcard-top,.tl-top{flex-direction:column;gap:2px}
  .hero-name{font-size:40px}
}
```

- [ ] **Step 2: 加 favicon（简单 emoji svg，内联）**

在 `index.html` `<head>` 加：

```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✳️</text></svg>">
```

- [ ] **Step 3: 验证（四主题 × 响应式）**

逐一切换 A/B/C/D，在桌面宽与手机宽（≤640px）各看一遍：无溢出、无对比度过低、页脚始终深色统一。检查所有锚点链接（关于/科研/论文/获奖/联系）能平滑滚动到位。

- [ ] **Step 4: Commit**

```bash
git add css/styles.css index.html
git commit -m "feat: 响应式收尾 + favicon"
```

---

### Task 10: README + GitHub Pages 部署说明

**Files:** Create `README.md`

- [ ] **Step 1: 写 `README.md`**

```markdown
# 个人主页 · 林晖鹏

Claude Code 设计感的单页个人简历网站。纯静态 HTML/CSS/JS，无构建。

## 本地预览
直接双击 `index.html`，或 `python3 -m http.server` 后访问 localhost:8000。

## 部署到 GitHub Pages
1. 新建仓库 `Absurdaaa/Absurdaaa.github.io`（或任意仓库）。
2. 推送本目录所有文件到 `main`。
3. 仓库 Settings → Pages → Source 选 `main` / `(root)`。
4. 几分钟后访问 https://absurdaaa.github.io 。

## 改内容
- 文字：直接改 `index.html` 对应 section。
- 配色：改 `css/styles.css` 顶部 `[data-theme]` 变量。
- 默认主题：改 `<html data-theme="A">`。
```

- [ ] **Step 2: 验证**

`python3 -m http.server` 启动，浏览器访问 localhost:8000，整站正常。

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: README + 部署说明"
```

---

## 待本人替换的占位内容（实现后）

- 自我介绍那句（`/* TODO */` 处）
- `learning` / `hobbies` 实际内容
- 技术栈增删
- 照片：放 `assets/` 并把 `.hero-photo` 占位换成 `<img>`
- 是否单列教育背景行
```
