// LIFFの初期化とログイン処理
async function initializeLiff() {
  try {
    // LIFFの初期化
    await liff.init({ liffId: "2006598432-qWoljXBn" }); // LIFF IDを正しく設定
    console.log("LIFF initialized");

    // ユーザーがログインしているか確認
    if (!liff.isLoggedIn()) {
      console.log("未ログイン: ログイン処理を開始します。");
      liff.login(); // ログイン画面を表示
    } else {
      console.log("ログイン済み: ユーザー情報を取得します。");
      // プロファイル情報を取得して表示
      const profile = await liff.getProfile();
      console.log("ユーザープロファイル:", profile);
      document.body.innerHTML += `<p>こんにちは、${profile.displayName}さん！</p>`;
    }
  } catch (error) {
    console.error("LIFF初期化エラー:", error);
  }
}

// ページ読み込み時にLIFFを初期化
document.addEventListener("DOMContentLoaded", initializeLiff);
