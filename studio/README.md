# Jessy's Monster AI Studio — v1.0

這是一個可持續修改的 3D 卡通怪物 AI 辦公室原型。

## 檔案
- `index.html`：網頁結構
- `style.css`：顏色、版面、RWD
- `config.js`：四隻怪物名稱、角色、任務文字
- `app.js`：Three.js 3D 場景、怪物模型、動畫與互動

## 部署到原本的 GitHub Pages
把整個 `studio` 資料夾內的四個網頁檔案上傳到 `jessy-creates.github.io` 儲存庫的 `studio/` 資料夾。網址會是 `https://jessy-creates.github.io/studio/`。

## 注意
- 目前所有求職任務為**模擬展示**，沒有串接 Gemini、OpenAI 或 Claude API，也沒有真實職缺搜尋。
- Three.js 從公開 CDN 載入，瀏覽時需要網路。
- 所有 3D 怪物都是 `app.js` 裡用幾何體製作的可編輯模型，不依賴封閉格式或付費素材。
- 之後串接 AI 時，API 金鑰**不可放在此公開儲存庫或前端 JS**；應另建安全的後端。
- 原本履歷首頁 `index.html` 不必修改；Studio 頁面已提供「返回履歷」連結。
