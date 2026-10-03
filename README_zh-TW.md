# AIUsage 繁體中文與本機安全分叉

這是 [juliantanx/aiusage](https://github.com/juliantanx/aiusage) 的個人分叉，額外做了兩件事：

- 儀表板與桌面 widget 新增 `zh-TW`（繁體中文，台灣用詞）。側邊欄語言按鈕會在 EN、繁中、简中之間切換。瀏覽器語言是 `zh-TW` / `zh-HK` 時會預設繁中。
- 非本機監聽不再能以空密碼或 `change-me` 這類占位密碼啟動。Docker 映像也會在入口腳本直接拒絕。

## 安全差異

- `--host` 不是 `127.0.0.1`、`localhost` 或 `::1` 時，必須設定至少 12 字元、且不是已知占位字串的 `AIUSAGE_DASHBOARD_PASSWORD`。
- 這種綁定下，`/api/home-summary` 也不再匿名公開。
- 這種綁定下，API 回傳的本機路徑會拿掉家目錄與使用者名稱，例如 `/Users/you/work/client` 會變成 `~/work/client`。
- 只在本機使用時維持原行為：`aiusage serve` 仍只聽 `127.0.0.1`，可不設密碼。

Docker 範例：

```bash
docker run -d -p 3847:3847 \
  -e AIUSAGE_DASHBOARD_PASSWORD='請換成至少12字元的密碼' \
  -v ~/.aiusage:/root/.aiusage \
  juliantanx/aiusage
```

不要使用文件裡的 `change-me`。這個分叉會拒絕它。

同步與排行榜仍是選用功能。不要執行 `aiusage login`、`init`、`sync`、`upload`，用量就不會離開這台電腦。
