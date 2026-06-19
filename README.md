# 个人主页 · 林晖鹏

Claude Code 设计感的单页个人简历网站。纯静态 HTML/CSS/JS，无构建步骤，支持 4 套主题切换。

## 本地预览

直接双击 `index.html`，或：

```bash
python3 -m http.server
# 访问 http://localhost:8000
```

## 部署到 GitHub Pages

1. 新建仓库 `Absurdaaa/Absurdaaa.github.io`（或任意仓库）。
2. 推送本目录所有文件到 `main`。
3. 仓库 Settings → Pages → Source 选 `main` / `(root)`。
4. 几分钟后访问 https://absurdaaa.github.io 。

## 改内容

- **文字**：直接改 `index.html` 对应 section。
- **配色**：改 `css/styles.css` 顶部 `[data-theme]` 变量。
- **默认主题**：改 `index.html` 里 `<html data-theme="A">`。
- **照片**：放进 `assets/`，把 `.hero-photo` 占位 div 换成 `<img>`。

## 待替换的占位内容

- 关于我里的一句自述（`/* TODO */` 处）
- `learning` / `hobbies` 实际内容
- 技术栈增删
- 个人照片
