# OLL 互逆练习总表

> 口径：以文章里的那套公式为准；**只看顶层朝向复原（不管剩下的 PLL）**。从复原态出发先做 A，顶面会变成下一个情况的样子（可能需先做一次 `U` 对齐），再做 B 即可复原顶层。所有关系由程序逐一验证。

## 一、双向对（13）— 两条互为逆，先做哪条都行

| 情况 A | 公式 A | 情况 B | 公式 B | 精确互逆 |
|---|---|---|---|---|
| OLL 03 Anti-Mouse | `f (R U R’ U’) f’ U’ F (R U R’ U’) F’` | OLL 04 Mouse | `f (R U R’ U’) f’ U F (R U R’ U’) F’` |  |
| OLL 05 Lefty Square | `r’ U2 R U R’ U r` | OLL 08 Left-Wide Sune | `r’ U’ R U’ R’ U2 r` | ★ |
| OLL 06 Righty Square | `r U2 R’ U’ R U’ r’` | OLL 07 Wide Sune | `r U R’ U R U2’ r’` | ★ |
| OLL 09 Kite | `(R U R’ U’) (R’ F R2 U R’ U’ F’)` | OLL 13 Gun | `(r U’ r’) U’ (r U r’) y’ R’ U R` |  |
| OLL 24 T (OCLL) | `(r U R’ U’) (r’ F R F’)` | OLL 25 L (OCLL) | `F’ (r U R’ U’) r’ F R` |  |
| OLL 26 Anti-Sune | `(R U2 R’) U’ (R U’ R’)` | OLL 27 Sune | `(R U R’) U (R U2 R’)` | ★ |
| OLL 28 Arrow | `(r U R’ U’) M (U R U’ R’)` | OLL 57 H | `(R U R’ U’) M’ U R U’ r’` | ★ |
| OLL 31 Couch | `R’ U’ F (U R U’ R’) F’ R` | OLL 40 Anti-Fung | `R’ F (R U R’ U’) F’ U R` | ★ |
| OLL 33 Key | `(R U R’ U’) (R’ F R F’)` | OLL 37 Mounted Fish | `F (R U’ R’ U’ R U R’) F’` |  |
| OLL 44 P | `f (R U R’ U’) f’` | OLL 45 T | `F (R U R’ U’) F’` |  |
| OLL 48 Breakneck | `F R U R’ U’ R U R’ U’ F’` | OLL 51 Bottlecap | `f R U R’ U’ R U R’ U’ f’` |  |
| OLL 49 Squeezy | `R B’ R2 F R2 B R2 F’ R` | OLL 50 Anti-Squeezy | `r’ U r2 U’ r2 U’ r2 U r’` |  |
| OLL 54 Anti-Frying-Pan | `r U r’ R U R’ U’ R U R’ U’ r U’ r’` | OLL 56 Streetlights | `(r U r’) U R U’ R’ U R U’ R’ (r U’ r’)` | ★ |

> ★ = **精确互逆**：做完一条再做另一条，连 PLL 都不剩、无需 AUF（共 6 对：27⇄26、5⇄8、6⇄7、28⇄57、31⇄40、54⇄56）。其余双向对做完顶层全黄、可能残留一个 PLL。

## 二、单向（25）— 只能「先左、后右」
从复原态先做左列公式 →（AUF）→ 做右列公式 → 顶层复原；反过来不成立。

| 先做 | 再（AUF 后）做 |
|---|---|
| OLL 01 Runway　`(R U2 R’) (R’ F R F’) U2 (R’ F R F’)` | OLL 02 Zamboni　`F (R U R’ U’) F’ f (R U R’ U’) f’` |
| OLL 10 Anti-Kite　`(R U R’ U) (R’ F R F’) (R U2 R’)` | OLL 08 Left-Wide Sune　`r’ U’ R U’ R’ U2 r` |
| OLL 11 Downstairs　`M (R U R’ U R U2 R’) U M’` | OLL 06 Righty Square　`r U2 R’ U’ R U’ r’` |
| OLL 12 Upstairs　`M (L’ U’ L U’ L’ U2 L) U’ M’` | OLL 05 Lefty Square　`r’ U2 R U R’ U r` |
| OLL 14 Anti-Gun　`R’ F (R U R’) F’ R y’ R U’ R’` | OLL 10 Anti-Kite　`(R U R’ U) (R’ F R F’) (R U2 R’)` |
| OLL 15 Squeegee　`(r’ U’ r) (R’ U’ R U) (r’ U r)` | OLL 08 Left-Wide Sune　`r’ U’ R U’ R’ U2 r` |
| OLL 16 Anti-Squeegee　`(r U r’) (R U R’ U’) (r U’ r’)` | OLL 07 Wide Sune　`r U R’ U R U2’ r’` |
| OLL 17 Diagonal　`R U R’ U (R’ F R F’) U2 (R’ F R F’)` | OLL 18 Crown　`(r U R’ U R U2 r’) (r’ U’ R U’ R’ U2 r)` |
| OLL 18 Crown　`(r U R’ U R U2 r’) (r’ U’ R U’ R’ U2 r)` | OLL 19 Bunny　`M U (R U R’ U’) M’ (R’ F R F’)` |
| OLL 19 Bunny　`M U (R U R’ U’) M’ (R’ F R F’)` | OLL 17 Diagonal　`R U R’ U (R’ F R F’) U2 (R’ F R F’)` |
| OLL 23 Headlights　`R2’ D’ (R U2 R’) D (R U2 R)` | OLL 25 L (OCLL)　`F’ (r U R’ U’) r’ F R` |
| OLL 29 Chameleon　`(R U R’ U’) R U’ R’ (F’ U’ F) R U R’` | OLL 44 P　`f (R U R’ U’) f’` |
| OLL 30 Anti-Chameleon　`f R U R2 U’ R’ U R2 U’ R’ f’` | OLL 44 P　`f (R U R’ U’) f’` |
| OLL 32 Anti-Couch　`S (R U R’ U’) R’ F R f’` | OLL 40 Anti-Fung　`R’ F (R U R’ U’) F’ U R` |
| OLL 34 C　`(R U R’ U’) y’ (r’ U’ R U) M’` | OLL 37 Mounted Fish　`F (R U’ R’ U’ R U R’) F’` |
| OLL 35 Fish Salad　`(R U2 R’) (R’ F R F’) (R U2 R’)` | OLL 37 Mounted Fish　`F (R U’ R’ U’ R U R’) F’` |
| OLL 36 Wario　`(R U R’ U’) (F’ U2 F) U (R U R’)` | OLL 43 Anti-P　`f’ (L’ U’ L U) f` |
| OLL 38 Mario　`(R U R’ U) (R U’ R’ U’) (R’ F R F’)` | OLL 31 Couch　`R’ U’ F (U R U’ R’) F’ R` |
| OLL 39 Fung　`(R U R’) (F’ U’ F) U (R U2 R’)` | OLL 32 Anti-Couch　`S (R U R’ U’) R’ F R f’` |
| OLL 41 Dalmation　`(R U R’ U R U2 R’) F (R U R’ U’) F’` | OLL 43 Anti-P　`f’ (L’ U’ L U) f` |
| OLL 42 Anti-Dalmation　`(L’ U’ L U’ L’ U2 L) f (U R U’ R’) f’` | OLL 41 Dalmation　`(R U R’ U R U2 R’) F (R U R’ U’) F’` |
| OLL 43 Anti-P　`f’ (L’ U’ L U) f` | OLL 45 T　`F (R U R’ U’) F’` |
| OLL 46 C-Headlight　`R’ U’ (R’ F R F’) U R` | OLL 43 Anti-P　`f’ (L’ U’ L U) f` |
| OLL 47 Anti-Breakneck　`F’ L’ U’ L U L’ U’ L U F` | OLL 51 Bottlecap　`f R U R’ U’ R U R’ U’ f’` |
| OLL 55 Highway　`R U2’ R2’ U’ R U’ R’ U2’ (F R F’)` | OLL 48 Breakneck　`F R U R’ U’ R U R’ U’ F’` |

## 三、自练（6）— 同一条做两遍
做完这条 →（若顶面歪着先做一次 `U` 对齐）→ 再做同一条 → 顶层复原：
- OLL 02 Zamboni　`F (R U R’ U’) F’ f (R U R’ U’) f’`
- OLL 20 X　`(r U R’ U’) M2 (U R U’ R’) U’ M’`
- OLL 21 Double Sune / H　`F R U R’ U’ R U R’ U’ R U R’ U’ F’`
- OLL 22 Pi / Bruno　`R U2’ (R2’ U’) (R2 U’) R2’ U2’ R`
- OLL 52 Rice Cooker　`(R’ F’ U’ F) U’ (R U R’ U R)`
- OLL 53 Frying-Pan　`r’ U2 (R U R’ U’) R U R’ U r`

## 用法
1. **双向对**：复原 → 做 A →（出现 B）→ 做 B → 复原 → 循环。
2. **单向**：复原 → 做左列那条 → 做右列那条 → 复原 → 循环。
3. **自练**：复原 → 做该公式 → 对齐后再做一遍 → 循环。
4. 顶面图案“歪着”时先做一次 `U` 对齐（AUF）。

> 由 `build/build-inverse.js` 生成；交互版见 `oll-inverse.html`。
