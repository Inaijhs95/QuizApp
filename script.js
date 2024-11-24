import liff from "https://static.line-scdn.net/liff/edge/2.1/liff.js";

async function initializeLiff() {
  try {
    await liff.init({ liffId: "2006598432-qWoljXBn" }); // LIFF IDを入力
    console.log("LIFF initialized");
    
    if (!liff.isLoggedIn()) {
      liff.login(); // ユーザーがログインしていない場合にログインを実行
    } else {
      const profile = await liff.getProfile();
      console.log("ユーザープロファイル:", profile);
      alert(`こんにちは、${profile.displayName}さん！`);
    }
  } catch (error) {
    console.error("LIFF初期化エラー:", error);
  }
}

// ページが読み込まれたときにLIFFを初期化
document.addEventListener("DOMContentLoaded", () => {
  initializeLiff();
});
