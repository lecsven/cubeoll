# CubeOLL · 魔方 OLL 工具

一套用于练习 **CFOP 中 OLL（顶层朝向）** 的网页工具：57 式图解、练习清单、交互训练器。纯静态页面，可安装到手机主屏并**离线使用**。

> 在线 / 离线地址：**https://lecsven.github.io/cubeoll/**

## 功能

三个工具，从落地页进入：

| 工具 | 文件 | 说明 |
|---|---|---|
| **57 式图解** | `oll.html` | 按学习顺序（分 14 组）排列的 57 个 OLL 情况，配图形与公式；内置「记号说明 · 旋转方向」图例；可切白底 / 黑底 |
| **练习清单** | `oll-practice.html` | 每格：打乱用「逆公式」、点击查看「还原公式」；附「方案 B 连击顺序」；可打印 |
| **交互训练器** | `oll-trainer.html` | 逐条「打乱 → 还原」，回车看答案；可打勾「✓已通过 / ✗不会」、按范围专项练习；进度保存在本机 |

配图说明：魔方格自上而下为俯视顶面（下方为前 F）；黄色 = 已朝向 / 侧面露出黄，灰 = 未朝向。全部图形由程序反推生成，与公式严格对应。

## iOS 离线使用（PWA）

1. iPhone 用 **Safari** 打开 https://lecsven.github.io/cubeoll/
2. 点 **分享 → 添加到主屏幕**，得到一个名为 **CubeOLL** 的独立图标
3. **首次打开需联网**（Service Worker 会把页面缓存下来）；之后**断网也能用**
4. 训练器的打勾进度通过 `localStorage` 保存在本机

## 目录结构

```
├─ index.html              # 落地页（入口 + 添加到主屏幕引导）
├─ oll.html                # 57 式图解
├─ oll-practice.html       # 练习清单
├─ oll-trainer.html        # 交互训练器
├─ manifest.webmanifest    # PWA 清单（名称/图标/standalone）
├─ sw.js                   # Service Worker（预缓存，离线）
├─ apple-touch-icon.png    # iOS 主屏图标（180）
├─ icon-192.png / icon-512.png
└─ build/                  # 本地生成器（不发布，见 .gitignore）
```

## 本地预览

```sh
cd <本项目目录>
python3 -m http.server 8787 --bind 127.0.0.1
# 浏览器打开 http://127.0.0.1:8787/
```

> 提示：Service Worker 只在**安全上下文**（`https` 或 `localhost`）下生效，所以用 `127.0.0.1` 预览才能测离线。

## 重新生成页面（可选）

3 个工具页由生成器产出（数据 + 模拟器校验），生成器在 `build/`：

```sh
node build/build-chart.js   # 生成 oll.html
node build/build.js         # 生成 oll-practice.html 与 oll-trainer.html
```

- `build/cube.js`：3×3 魔方模拟器（用于由公式反推图形、校验公式）。
- `build/oll-data.js` / `build/article-data.js`：OLL 公式数据（后者为知乎文章的公式与顺序）。
- `build/notation.js` / `build/pwa.js`：记号图例、PWA 标签的公共模块。

## 发布更新

```sh
git add -A
git commit -m "update"
# 更新缓存版本号：编辑 sw.js，把 cubeoll-v1 递增为 cubeoll-v2（每次改动都要）
git push
```

GitHub Pages 会在推送后约 1 分钟重建完成。递增 `sw.js` 里的缓存名，已安装到主屏的 App 才会拉取新版本。

## Mac 桌面版（可选，不随仓库发布）

`app-src/` 下有把同一套页面打包成 macOS 原生窗口应用（WKWebView）的源码：

```sh
bash app-src/build.sh        # 产出 CubeOLL.app（内置 4 个页面，离线可用）
```

需要 macOS + Swift 工具链；`app-src/` 已加入 `.gitignore`，不参与 Pages 发布。

## 数据来源

公式与学习顺序取自知乎专栏《【魔方进阶】CFOP之OLL学习顺序》（鸟杰魔方）：

- https://zhuanlan.zhihu.com/p/49626173

旋转记号方向参考 GAN 魔方教程：https://www.gancube.cn/3x3x3-cfop-guide-of-gancube/

## 说明

- 本仓库仅包含网页静态文件；训练器进度等数据都保存在访问者本机，不涉及服务器。
- 仅用于个人学习魔方之用。
