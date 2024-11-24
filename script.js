// LIFF SDKのインポート方法を変.更
import * as liff from "https://static.line-scdn.net/liff/edge/2.1/liff.js";

async function initializeLiff() {
  try {
    await liff.init({ liffId: "2006598432-qWoljXBn" }); // LIFF IDを正しく設定
    console.log("LIFF initialized");

    if (!liff.isLoggedIn()) {
      console.log("未ログイン: ログイン処理を開始します。");
      liff.login(); // ログイン画面を表示
    } else {
      console.log("ログイン済み: ユーザー情報を取得します。");
      const profile = await liff.getProfile();
      console.log("ユーザープロファイル:", profile);
      document.body.innerHTML += `<p>こんにちは、${profile.displayName}さん！</p>`;
    }
  } catch (error) {
    console.error("LIFF初期化エラー:", error);
  }
}

// ページが読み込まれたときにLIFFを初期化
document.addEventListener("DOMContentLoaded", initializeLiff);
