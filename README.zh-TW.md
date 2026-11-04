> **翻譯說明：** 這是上游 README 的繁體中文（台灣）翻譯，說明這個專案在做什麼、有哪些功能，以及怎麼安裝與使用。程式碼區塊、指令和連結都保持原樣。若譯文和英文原文有出入，以原文為準。
>
> - 英文原文：[juliantanx/aiusage 的 README](https://github.com/juliantanx/aiusage/blob/main/README.md)
> - 上游儲存庫：[juliantanx/aiusage](https://github.com/juliantanx/aiusage)
> - 這個分叉裡的英文 README：[README.md](./README.md)
>
> 本分叉另外的繁中說明（儀表板 `zh-TW` 語系，以及非本機監聽時的密碼限制）在 [README_zh-TW.md](./README_zh-TW.md)。那一份不是這份上游翻譯。

<h1 align="center">
  <img src="https://cdn.jsdelivr.net/gh/juliantanx/aiusage@main/packages/site/static/logo-icon.svg" alt="AIUsage 標誌" width="42" align="absmiddle" />
  AIUsage
</h1>

<p align="center">
  給 AI 程式開發助手用的、以本機為先的用量追蹤工具。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@juliantanx/aiusage"><img src="https://img.shields.io/npm/v/@juliantanx/aiusage" alt="npm 版本" /></a>
  <a href="https://www.npmjs.com/package/@juliantanx/aiusage"><img src="https://img.shields.io/npm/dm/@juliantanx/aiusage" alt="npm 下載次數" /></a>
  <a href="https://github.com/juliantanx/aiusage/actions/workflows/test.yml"><img src="https://github.com/juliantanx/aiusage/actions/workflows/test.yml/badge.svg" alt="CI" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="授權：MIT" /></a>
</p>

<p align="center">
  <strong><a href="https://aiusage.jtanx.com">官方網站</a></strong> ·
  <strong><a href="https://aiusage.jtanx.com/docs">說明文件</a></strong> ·
  <strong><a href="https://aiusage.jtanx.com/leaderboard">排行榜</a></strong> ·
  <a href="https://github.com/juliantanx/aiusage/blob/main/README.md">English</a> | 繁體中文 | <a href="https://github.com/juliantanx/aiusage/blob/main/README_zh.md">簡體中文</a>
</p>

在同一個本機儀表板裡，追蹤 **20 款以上 AI 程式開發工具** 的 token、費用、工作階段、模型、專案、工具呼叫，以及配額使用壓力。只在本機使用時，不需要帳號、不會送出遙測，也不必做雲端同步。

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/juliantanx/aiusage@main/packages/site/static/screenshots/aiusage-demo.gif" alt="AIUsage 儀表板示範" width="92%" />
</p>

## 功能特色

- **一個本機儀表板**，集中看 token、費用、工作階段、模型、專案、工具呼叫和配額。
- **解析器涵蓋範圍廣**，支援 Claude Code、Codex、OpenCode、Cursor、Copilot、Gemini CLI 等。
- **可選的同步**，可以走 GitHub、S3、R2 或 MinIO。
- **可選的公開排行榜**，只上傳簽過名的彙總資料。
- **桌面小工具**，在系統匣或選單列瞄一眼最近的用量。
- **預設就是私密的**：本機解析和本機儀表板不會上傳你的 prompt、completion、原始碼或檔案路徑。

## 快速開始

**需求：** macOS、Linux 或 Windows，並安裝 Node.js 20 以上。

```bash
npm install -g @juliantanx/aiusage
aiusage serve
```

打開 `http://127.0.0.1:3847` 就能用儀表板。`serve` 會立刻啟動本機網頁介面，並在啟動過程中於背景解析本機日誌。

若偏好 pnpm：

```bash
pnpm add -g @juliantanx/aiusage
```

使用 Docker：

```bash
docker run -d \
  -p 3847:3847 \
  -e AIUSAGE_DASHBOARD_PASSWORD=change-me \
  -v ~/.aiusage:/root/.aiusage \
  juliantanx/aiusage
```

容器會繫結 `0.0.0.0`，所以從 Docker 外面連得到。`AIUSAGE_DASHBOARD_PASSWORD` 必須是非空值，否則啟動會被拒絕；請把 `change-me` 換成你自己的密碼。`~/.aiusage` 這個掛載用來存放 AIUsage 自己的資料。若要解析宿主機上的 AI 工具日誌，還得另外掛上每個來源日誌目錄，並設定對應的 `AIUSAGE_*_PATH` 變數。見 [Docker 說明](https://aiusage.jtanx.com/docs#docker)。

## 常用指令

| 指令 | 作用 |
|---|---|
| `aiusage` / `aiusage summary` | 在終端機印出摘要 |
| `aiusage parse` | 解析支援的本機 AI 工具日誌 |
| `aiusage serve` | 在連接埠 `3847` 啟動本機儀表板 |
| `aiusage status` | 顯示資料來源和本機資料庫狀態 |
| `aiusage export --format csv --range month` | 匯出用量資料 |
| `aiusage init` | 設定選用的同步 |
| `aiusage github login --repo OWNER/REPO` | 用 GitHub App 接上 GitHub 同步 |
| `aiusage sync` | 跟已設定的後端同步 |
| `aiusage sync --repair` | 檢查並修復跨裝置同步污染（預設只預覽，不寫入） |
| `aiusage widget` | 啟動桌面系統匣小工具 |
| `aiusage leaderboard` | 看公開排行榜名次 |
| `aiusage login` / `aiusage upload` | 授權這台裝置，並上傳彙總的排行榜資料 |
| `aiusage pm2-start` | 用 PM2 在背景跑儀表板和小工具 |

完整的 CLI 參考：[aiusage.jtanx.com/docs#cli-reference](https://aiusage.jtanx.com/docs#cli-reference)。

## 支援的工具

| | | | | |
|---|---|---|---|---|
| `Claude Code` | `Codex` | `OpenCode` | `Cursor` | `Hermes` |
| `Qoder` | `OpenClaw` | `KiloCode` | `Kelivo` | `Copilot` |
| `Gemini CLI` | `Kimi Code` | `CodeBuddy` | `Kiro` | `Grok Build` |
| `Antigravity` | `Roo Code` | `Zed` | `Goose` | `oh-my-pi` |
| `pi` | `Craft` | `Droid` | `ZCode` | `CodeFuse` |
| `Trae` | | | | |

預設路徑，以及用環境變數覆寫路徑的方式，寫在 [資料來源](https://aiusage.jtanx.com/docs#settings-sources) 和 [來源環境變數](https://aiusage.jtanx.com/docs#settings-env)。

## 儀表板密碼

儀表板預設只繫結 `127.0.0.1`。IPv6 迴路請用 `aiusage serve --host ::1`。本機存取可以不設密碼；一旦設定 `AIUSAGE_DASHBOARD_PASSWORD`，詳細 API 就需要驗證，包含詳細摘要、配額和設定。只有首頁上的彙總總數維持公開，而且只透過精簡的 `/api/home-summary` 端點。

| Shell | 指令 |
|---|---|
| macOS / Linux | `AIUSAGE_DASHBOARD_PASSWORD="change-me" aiusage serve` |
| Windows PowerShell | `$env:AIUSAGE_DASHBOARD_PASSWORD="change-me"; aiusage serve` |
| Windows CMD | `set AIUSAGE_DASHBOARD_PASSWORD=change-me && aiusage serve` |

若要開放網路存取，請明確加上 `aiusage serve --host 0.0.0.0`（IPv6 用 `--host ::`），並設定非空的 `AIUSAGE_DASHBOARD_PASSWORD`；沒設的話啟動會被拒絕。Docker 映像用的就是這種明確的網路繫結，所以在那裡密碼是必填。遠端存取請走可信的 HTTPS 反向代理。代理必須保留瀏覽器看到的 Host 標頭，並把 `X-Forwarded-Proto` 改成瀏覽器實際使用的協定。

API 只接受同源的瀏覽器請求，不再支援跨來源整合。本機的原生用戶端可以不帶 Origin。憑證設定只顯示已設定或未設定，並接受你換成新值；已經存著的秘密值與憑證參照不會回傳。欄位留空就維持原本存的值。見[本機 API 的安全性與相容性](docs/dashboard-security.md)。

用 PM2 在背景跑的時候，啟動 `aiusage pm2-start` 要帶同一個變數；改完之後執行 `pm2 restart aiusage-server --update-env`。細節見 [儀表板密碼](https://aiusage.jtanx.com/docs#dashboard-password) 和 [PM2](https://aiusage.jtanx.com/docs#pm2)。

## 隱私與資料

AIUsage 的設計以本機為先。

- 本機解析會讀取各工具的日誌，並把解析後的用量寫進 `~/.aiusage/cache.db`。
- 本機儀表板模式不需要帳號，也不會送出遙測。
- 同步是選用的，由你自己設定，可以用 GitHub、S3、R2 或 MinIO。
- 選用的排行榜上傳只包含各排名期間的彙總 token 總量，不含 prompt、completion、原始碼、檔案路徑，也不含本機算出的費用估計。
- 費用是依照定價中繼資料算出的估計值；定價重新整理或重算之後，數字可能改變。
- 歷史總量取決於各 AI 工具是否還留著來源日誌或本機資料庫。

安全性問題請盡量私下回報。見 [SECURITY.md](./SECURITY.md)。

## 同步與排行榜

同步和排行榜是兩件各自獨立的選用功能。

- **同步** 讓你自己的裝置透過 GitHub、S3、R2 或 MinIO 保持一致。先用 `aiusage init` 設定，再執行 `aiusage sync`。
  GitHub 同步建議用 `aiusage github login --repo OWNER/REPO`，或在本機設定裡按 **Connect GitHub**（連接 GitHub）。它走的是最小權限的 GitHub App，不需要 AIUsage 帳號。細粒度個人存取權杖（fine-grained PAT）仍可當作進階備用。見 [GitHub App 的設定與遷移](docs/github-sync.md)。
- **AIUsage Cloud 同步** 要先完成裝置授權：執行 `aiusage login`，再執行 `aiusage init --backend cloud` 和 `aiusage sync`。
- 若 1.5.13（含）以前的版本造成跨裝置的重複紀錄，可用 `aiusage sync --repair` 先檢查，再決定要不要清理。見[同步修復指南](./docs/sync-repair.md)。每台裝置的命名空間，都是以該裝置為準的快照；見[同步模型](./docs/sync-namespaces.md)。
- **排行榜** 是公開排名，只給明確上傳彙總總量的人。先用 `aiusage login` 授權裝置，再執行 `aiusage upload`。
- 參加排行榜時，可以在[網站設定](https://aiusage.jtanx.com/settings)裡開啟匿名模式。

官方網站負責帳號、OAuth 登入、個人資料設定、已授權裝置、上傳審核狀態，以及管理員審核。CLI 負責本機解析、本機儀表板、同步、終端機摘要，以及簽章上傳。

## 桌面小工具

安裝選用的系統匣／選單列小工具：

```bash
npm install -g @juliantanx/aiusage-widget
aiusage-widget
```

小工具讀的是同一個本機 AIUsage 資料庫，也可以從系統匣選單打開完整儀表板。見[小工具說明](https://aiusage.jtanx.com/docs#widget)。

## 開發

```bash
git clone https://github.com/juliantanx/aiusage.git
cd aiusage
pnpm install
pnpm build
pnpm test
pnpm dev
```

`pnpm dev` 會建置共用套件，並且只在 `http://127.0.0.1:3847` 啟動本機儀表板。若要對著本機的官方網站開發帳號、授權或雲端同步流程，請另外執行 `pnpm dev:site`（連接埠 `4000`），並在 `packages/cli/.env` 設定 `SITE_URL=http://localhost:4000`。沒有這項覆寫時，CLI 會使用 `https://aiusage.jtanx.com`。

專案結構：

| 路徑 | 用途 |
|---|---|
| `packages/core` | 共用型別、schema、定價與工具函式 |
| `packages/cli` | 發佈出去的 CLI、解析器、本機 API 伺服器、同步，以及 PM2 輔助功能 |
| `packages/web` | 打包進 CLI 的本機儀表板介面 |
| `packages/widget` | Electron 系統匣／選單列小工具 |
| `packages/site` | 官方網站、文件、帳號、上傳與排行榜 |

歡迎貢獻。請先讀 [CONTRIBUTING.md](./CONTRIBUTING.md)、使用 issue 範本，並在開 PR 之前執行 `pnpm test`。

## 說明文件

- [完整文件](https://aiusage.jtanx.com/docs)
- [CLI 參考](https://aiusage.jtanx.com/docs#cli-reference)
- [Docker 部署](https://aiusage.jtanx.com/docs#docker)
- [同步設定](https://aiusage.jtanx.com/docs#sync)
- [小工具](https://aiusage.jtanx.com/docs#widget)
- [變更紀錄](./CHANGELOG.md)
- [安全性政策](./SECURITY.md)

## 貢獻者

感謝這些人（[表情符號對照](https://allcontributors.org/en/reference/emoji-key)）：

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/juliantanx"><img src="https://avatars.githubusercontent.com/u/59169896?v=4?s=100" width="100px;" alt="Julian"/><br /><sub><b>Julian</b></sub></a><br /><a href="https://github.com/juliantanx/aiusage/commits?author=juliantanx" title="Code">💻</a> <a href="https://github.com/juliantanx/aiusage/commits?author=juliantanx" title="Documentation">📖</a> <a href="#infra-juliantanx" title="Infrastructure">🚇</a> <a href="#maintenance-juliantanx" title="Maintenance">🔧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Fiveo9"><img src="https://avatars.githubusercontent.com/u/57358895?v=4?s=100" width="100px;" alt="Fiveonine"/><br /><sub><b>Fiveonine</b></sub></a><br /><a href="https://github.com/juliantanx/aiusage/commits?author=Fiveo9" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/joyshan1986"><img src="https://avatars.githubusercontent.com/u/105418356?v=4?s=100" width="100px;" alt="joyshan1986"/><br /><sub><b>joyshan1986</b></sub></a><br /><a href="https://github.com/juliantanx/aiusage/commits?author=joyshan1986" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zhaolu83949426-hub"><img src="https://avatars.githubusercontent.com/u/260552457?v=4?s=100" width="100px;" alt="zhaolu83949426-hub"/><br /><sub><b>zhaolu83949426-hub</b></sub></a><br /><a href="https://github.com/juliantanx/aiusage/commits?author=zhaolu83949426-hub" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Mnoisec"><img src="https://avatars.githubusercontent.com/u/28181883?v=4?s=100" width="100px;" alt="Mnoisec"/><br /><sub><b>Mnoisec</b></sub></a><br /><a href="https://github.com/juliantanx/aiusage/commits?author=Mnoisec" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jlxyfll"><img src="https://avatars.githubusercontent.com/u/16436887?v=4?s=100" width="100px;" alt="jlxyfll"/><br /><sub><b>jlxyfll</b></sub></a><br /><a href="https://github.com/juliantanx/aiusage/commits?author=jlxyfll" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Ed-Bg"><img src="https://avatars.githubusercontent.com/u/68063080?v=4?s=100" width="100px;" alt="Harlan Hu"/><br /><sub><b>Harlan Hu</b></sub></a><br /><a href="https://github.com/juliantanx/aiusage/commits?author=Ed-Bg" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/lmingde"><img src="https://avatars.githubusercontent.com/u/38581341?v=4?s=100" width="100px;" alt="Mingde"/><br /><sub><b>Mingde</b></sub></a><br /><a href="https://github.com/juliantanx/aiusage/issues?q=author%3Almingde" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/aaroncchung"><img src="https://avatars.githubusercontent.com/u/121737839?v=4?s=100" width="100px;" alt="Aaron C"/><br /><sub><b>Aaron C</b></sub></a><br /><a href="https://github.com/juliantanx/aiusage/commits?author=aaroncchung" title="Code">💻</a> <a href="https://github.com/juliantanx/aiusage/commits?author=aaroncchung" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->


本專案遵循 [all-contributors](https://allcontributors.org) 規範。任何形式的貢獻都歡迎！

## 社群

- 錯誤回報：[GitHub Issues](https://github.com/juliantanx/aiusage/issues/new?template=bug_report.md)
- 功能建議：[GitHub Issues](https://github.com/juliantanx/aiusage/issues/new?template=feature_request.md)
- 問題討論：[GitHub Discussions](https://github.com/juliantanx/aiusage/discussions)

[**linux.do**](https://linux.do/) —— 感謝 linux.do 社群在這個專案開發過程中給的支持與啟發。

## 授權

[MIT](./LICENSE) © [Julian](https://github.com/juliantanx)
