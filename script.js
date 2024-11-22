// Firebaseの初期化
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyD30sxoHhSnpH7xMwGj55SSjRkMRa0oRX8",
  authDomain: "inai95.firebaseapp.com",
  projectId: "inai95",
  storageBucket: "inai95.firebasestorage.app",
  messagingSenderId: "418002209728",
  appId: "1:418002209728:web:dc034e538d3bf0fae15625",
  measurementId: "G-58LP3ZDTLJ"
};

// アプリの初期化
const app = initializeApp(firebaseConfig);
console.log("Firebase App Initialized:", app);

const analytics = getAnalytics(app); // Analyticsの初期化
const auth = getAuth(app); // Authの初期化
console.log("Auth Object Initialized:", auth); // デバッグ用ログ

// reCAPTCHAの初期化
let recaptchaVerifier;
try {
  recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    size: 'normal', // 'invisible'に変更可能
    callback: (response) => {
      console.log("reCAPTCHA成功:", response);
    },
    'expired-callback': () => {
      console.warn("reCAPTCHAが期限切れです。再読み込みしてください。");
    }
  }, auth);

  console.log("reCAPTCHA Verifier initialized:", recaptchaVerifier);
} catch (error) {
  console.error("reCAPTCHA初期化エラー:", error);
}

// 認証コード送信
document.getElementById('send-otp').addEventListener('click', async () => {
  console.log("送信ボタンが押されました");
  const phoneNumber = document.getElementById('phone-number').value.trim(); // 電話番号を取得
  console.log("入力された電話番号:", phoneNumber);

  if (!phoneNumber) {
    alert("電話番号を入力してください。");
    return;
  }

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    window.confirmationResult = confirmationResult; // 確認用の結果をグローバルに保存
    alert("認証コードが送信されました。");
    document.getElementById('login-form').style.display = 'none'; // ログインフォームを隠す
    document.getElementById('verify-form').style.display = 'block'; // 認証フォームを表示
  } catch (error) {
    console.error("認証コード送信エラー:", error);
    alert("認証コードの送信に失敗しました。エラー内容: " + error.message);
  }
});

// 認証コード確認
document.getElementById('verify-code').addEventListener('click', async () => {
  const verificationCode = document.getElementById('verification-code').value.trim(); // 認証コードを取得
  console.log("入力された認証コード:", verificationCode);

  if (!verificationCode) {
    alert("認証コードを入力してください。");
    return;
  }

  try {
    const result = await window.confirmationResult.confirm(verificationCode);
    const user = result.user;
    alert(`ログイン成功！ ユーザーID: ${user.uid}`);
    console.log("ログイン成功:", user);
  } catch (error) {
    console.error("認証コード確認エラー:", error);
    alert("認証コードが正しくありません。");
  }
});
