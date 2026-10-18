# CubeOLL 复现笔记：从零散想法到成品网站 + Mac App + PWA

> 面向学习者：记录本次从“想练 OLL”到做出**网页工具 / macOS App / iOS 可离线 PWA** 的全过程，尽量写成“照着能做出来”的教程，也可当复盘笔记。

## 1. 概览与最终成果

**一句话目标**：把 CFOP 的 OLL 练习做成顺手的工具——看得懂图案、能照着练、手机上随手可用。

**最终交付物**

| 成果 | 说明 | 位置 |
|---|---|---|
| `oll.html` | 57 式图解，按学习顺序分组，可切白底/黑底，内置“记号说明·旋转方向”折叠图例 | 仓库根 |
| `oll-practice.html` | 练习清单：逆公式打乱、点击看还原公式、可打印 | 仓库根 |
| `oll-trainer.html` | 交互训练器：逐条打乱→还原、打勾“会/不会”、按范围专项练习、进度本地保存 | 仓库根 |
| `CubeOLL.app` | macOS 原生窗口 App（内置以上页面，离线） | 本地（不发布） |
| PWA | 可添加到 iPhone 主屏、首次联网后离线可用 | https://lecsven.github.io/cubeoll/ |
| `build/` | 生成器源码（模拟器 + 数据 + 图示/主题公共模块） | 仓库（gitignore） |

**整体思路**：先用代码“生成”图形（保证与公式严格一致），再把生成物组织成网页；视觉上迭代出白/黑主题；最后分别用三种方式“发出去”——本地 Mac App、局域网/frp、GitHub Pages PWA。

## 2. 资料整理：57 条公式与顺序

- 数据来源：知乎专栏《【魔方进阶】CFOP之OLL学习顺序》（鸟杰魔方，https://zhuanlan.zhihu.com/p/49626173），按文章分 14 组的学习顺序抄录 57 条公式。
- 难点：文章**没标标准 OLL 编号**。做法是——把每条公式与“标准 57 式”自动匹配（见第 3 节），最终 57 条**一一对应、无重无漏**。
- 教训：转录公式极易出错（少一个撇、`R2 U` 写成 `R2 U'`、`(r U' r')` 写成 `(r' U' r)` 等）。**不要靠眼睛核对**，用程序校验。

## 3. 用代码生成图示（核心）

**为什么要“生成”而不是手画**：目标是“图和公式严格对应”，手画容易错，且要主题换色时无法复用。

**3×3 模拟器（`build/cube.js`）**
- 用“小方块（cubie）”建模：每个 cubie 有坐标 `(x,y,z)∈{-1,0,1}` 与 6 个贴纸（方向→颜色）。
- 每个操作（`R U F L D B`、`r u f l d b`、`M E S`、`x y z`）都是“绕某轴把某一层旋转 ±90°”。用旋转矩阵统一实现，宽层/中层/整体转体都是“选不同的层”。

**关键技巧：用“公式的逆”反推图案**
- 若公式 `A` 能复原情况 `C`，则 `C = A⁻¹(复原态)`。所以：把**复原好的魔方做一次 `A⁻¹`**，得到的就是该情况。
- 取顶面 3×3（外加四个侧面顶行的“边条”）就是识别图案。

**必须做的校验**：每条公式都应**只动顶层**（F2L 不变）。做法：施加 `A⁻¹` 后，检查所有 `y≤0` 的 cubie 是否与复原态完全相同；再要求顶面中心仍在原位。任一不符 = 公式抄错。

**匹配标准编号**：注意“只看顶面”会有**冲突**（如 OLL 1 与 2 顶面都只有中心黄）。所以用**完整朝向签名（顶面 9 + 边条 12）+ 绕竖直轴取 4 个朝向的最小值**做规范化，确保唯一匹配。

**踩过的坑**：
- 旋转方向写反 → 用“sexy 序 6、Sune 序 6、T-perm 对合”等**已知性质**回归测试才抓出来。
- 贴纸方向键一开始用 `+x/-x`、旋转后变成 `1,0,0`，导致比较失败 → **统一为数值键**。

## 4. 三个页面

- `oll.html`：卡片网格，按 14 组排；每卡＝编号 + 名称 + 顶面/边条图 + 公式。顶部有**记号说明**（可折叠，默认展开）。
- `oll-practice.html`：每格只显示**打乱（逆公式）**，点按钮才显示**还原（正公式）**；末尾附“方案 B 连击顺序”。已用程序验证“逆式打乱 → 正公式还原 == 复原”57/57。
- `oll-trainer.html`：逐条模式（先显示“打乱（逆公式）”，`回车` 才看“还原（正公式）”，`下一步` 直接切下一种情况）+ 打勾（✓已通过/✗不会/○清除）+ 范围筛选（跳过已通过/只练不会…）+ 进度用 `localStorage`。

## 5. 视觉迭代

- 主题：白底/黑底一键切换（`<html data-theme>` + CSS 变量），打印强制白底。
- 配色演进：浅色 → 全黑 → 深灰格 → 双色；最终统一为“未朝向灰、朝向黄”，并让**背景可切、魔方格随之换色**（用 SVG 的 `class` + CSS 变量实现，而不是写死 `fill`）。
- **记号图例**：自绘**等距（isometric）** 3×3 立体魔方，用“**阴影层 + 表面运动箭头**”表示转动方向（比“正面画圆环”直观且不出错）；`x/y/z` 用“三条环绕箭头”。全部跟随主题换色，且可折叠。

## 6. 打包 macOS 本地 App

- 思路：Swift + `WKWebView` 做壳，加载**内置**的 `index.html`；`localStorage` 用持久化 `WKWebsiteDataStore.default()`。
- 关键点：
  - 工具栏（后退/前进/刷新/主页/在浏览器打开）用 AppKit 手搭；外链（http/https）走系统浏览器。
  - 编译：`swiftc -swift-version 5 -O main.swift -o CubeOLL`（用 `-swift-version 5` 规避 Swift 6 的严格并发报错）。
  - 组装 `.app`：`Contents/MacOS/可执行文件` + `Info.plist` + `Resources/`（页面 + `AppIcon.icns`）。
  - 图标：用代码画一个黄黑魔方 SVG → 截图成 1024 PNG → `sips` 生成 `.iconset` → `iconutil -c icns`。
  - 本地自建 App 无 quarantine，双击即用；可选 `codesign --force --deep -s -` 做 ad-hoc 签名。
- 一键脚本：`bash app-src/build.sh`（渲染图标→生成 icns→编译→组装→签名）。

## 7. 内网穿透与 iOS 访问（frp）

- 目的：不在家 / 不同网络也能用手机访问本地网页。
- 分析现成 `~/frp`：客户端 `frpc.toml` 连自建服务器，原本只有 SSH/VNC 两条隧道；由 **system LaunchDaemon** 自启。
- 新增一条 `tcp` 代理，用 frp 自带的 **`static_file` 插件**直接把本地目录变成站点（**不用另跑 web 服务器**），并加 **HTTP Basic 认证**。
- 安全做法：**密码不写进配置**——用 `{{ .Envs.CUBE_PASS }}` 模板，由 `run-frpc.sh` 从 `.cube_pass`（权限 600、已 gitignore）读入环境变量注入；脚本**读不到就拒绝启动**（`exit 78`），避免变成无鉴权公开站点。
- 端口：先探测哪些远端端口“空闲且被放行”（起临时 frpc 看日志 `start proxy success` / `port already used`），再从公网 `curl` 验证安全组放行。
- 生效：`kill` 掉 frpc 进程即可（LaunchDaemon `KeepAlive` 会自动用新配置重启），或用 `sudo launchctl kickstart -k system/com.frp.frpc`。
- 注意：纯 HTTP 只适合临时/可信网络；密码在传输中仅 base64。

> 本文档不记录任何密钥、密码与服务器地址（一律省略/打码）。

## 8. PWA 与 iOS 离线

- 目标：iPhone 上“添加到主屏幕”，**首次联网后永久离线**可用。
- 组成：
  - `manifest.webmanifest`（名称/图标/`standalone`/主题色）
  - `apple-touch-icon.png`（180）与 192/512 图标（用同一套魔方图标生成）
  - `sw.js`：Service Worker 预缓存全部页面与图标，**cache-first**，离线兜底回 `index.html`
  - 每个页面注入 manifest 链接 + 注册脚本（`location.protocol` 为 http(s) 时才注册）
- 关键限制：**Service Worker 只在“安全上下文”（https 或 localhost）生效**。所以纯文件拷贝到手机、或局域网 HTTP 都不能离线；`127.0.0.1` 可用来本地测离线。
- 部署到 **GitHub Pages**：
  - 安装 `gh`（`brew install gh`）→ 你运行 `gh auth login` → 我以账号身份操作。
  - `gh repo create cubeoll --public --source=. --remote=origin --push`
  - 开启 Pages：`gh api -X POST repos/lecsven/cubeoll/pages -f 'source[branch]=main' -f 'source[path]=/'`
  - 得到地址 `https://lecsven.github.io/cubeoll/`。
- **为什么是这个域名**：`lecsven`＝用户名，`github.io`＝GitHub Pages 的共享域名，`/cubeoll`＝**仓库名对应的路径**（项目站点）。任何仓库都能这样各得一个网址：`https://<用户名>.github.io/<仓库名>/`；若仓库名恰为 `<用户名>.github.io`，则是根域。GitHub 免费自动签发 HTTPS——这正是 PWA 能离线的关键。
- 验证离线：用无头浏览器把该域名解析“黑洞”（模拟断网）后仍能渲染 → 说明走的是 SW 缓存。

## 9. 维护流程

- 改文案/公式：直接改 HTML，或改 `build/` 生成器后 `node build/build-chart.js && node build/build.js`。
- 更新 `sw.js` 里的缓存名（`cubeoll-v1 → v2 → …` 递增），已装到主屏的 App 才会拉到新版。
- Mac App 的页面是**副本**：改了 HTML 要 `bash app-src/build.sh` 重新打包，App 里才会更新。
- README 与文档同步：`git add -A && git commit -m "..." && git push`；Pages 约 1 分钟重建。

## 10. 踩坑与解决对照

| 现象 | 原因 | 解决 |
|---|---|---|
| 图示方向全反 | 旋转矩阵/移动方向符号写反 | 用已知性质回归测试（sexy/Sune 的“序”、T-perm 对合） |
| F2L 校验失败、图案对不上 | 公式抄错（少撇/多撇） | 用“只动顶层”校验逐条筛出并修正 |
| 两个不同情况“顶面一样” | 只看顶面不足以区分 | 用“顶面+四侧边条”的完整签名并按旋转规范化 |
| `file://` 下 SW 不生效 | 不是安全上下文 | 用 `127.0.0.1` 本地测试；正式用 https |
| 无头浏览器截图时好时坏 | 进程偶发不退出 | `sleep` 后 `kill`；Retina 截图坐标要 ×2 |
| 知乎文章抓不到 | 403 / 页面巨大 | 用本地 PDF 渲染成图片，再逐张识读 |
| 端口“已占用/被拒” | 服务端端口占用或未放行 | 临时起代理看日志，逐个探测空闲端口，再从公网验证 |
| 密码怕泄露 | 明文入配置/仓库 | 模板 `{{ .Envs.X }}` + 独立 `.cube_pass`（600、gitignore）+ 缺失即拒启动 |

## 附录 A：关键命令速查

```sh
# —— 生成页面 ——
node build/build-chart.js            # oll.html
node build/build.js                  # oll-practice.html / oll-trainer.html

# —— 本地预览（测离线要用 127.0.0.1）——
python3 -m http.server 8787 --bind 127.0.0.1 --directory .

# —— 打包 Mac App ——
bash app-src/build.sh                # 产出 CubeOLL.app

# —— 发布到 GitHub Pages ——
git add -A && git commit -m "update" && git push
# 记得先把 sw.js 的缓存版本号 +1

# —— GitHub 一次性操作 ——
brew install gh
gh auth login                       # 选 GitHub.com → HTTPS → Login with a web browser
gh repo create <repo> --public --source=. --remote=origin --push
gh api -X POST repos/<user>/<repo>/pages -f 'source[branch]=main' -f 'source[path]=/'

# —— frp（内网穿透，密码走文件不落明文）——
# frpc.toml 增加 [[proxies]]：type=tcp, remotePort=<端口>, plugin=static_file
# httpPassword = "{{ .Envs.CUBE_PASS }}"，由 run-frpc.sh 从 .cube_pass 注入
# 生效：kill 掉 frpc（LaunchDaemon 自动重启）或 launchctl kickstart
```

## 附录 B：文件清单

```
index.html  oll.html  oll-practice.html  oll-trainer.html   # 页面
manifest.webmanifest  sw.js                                 # PWA
apple-touch-icon.png  icon-192.png  icon-512.png            # 图标
build/  (cube.js oll-data.js article-data.js notation.js pwa.js build-chart.js build.js)
app-src/ (main.swift icon-gen.js Info.plist build.sh)       # Mac App 源码
README.md  docs/session-notes.md
```
