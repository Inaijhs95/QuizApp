// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD30sxoHhSnpH7xMwGj55SSjRkMRa0oRX8",
  authDomain: "inai95.firebaseapp.com",
  projectId: "inai95",
  storageBucket: "inai95.firebasestorage.app",
  messagingSenderId: "418002209728",
  appId: "1:418002209728:web:dc034e538d3bf0fae15625",
  measurementId: "G-58LP3ZDTLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Analyticsを初期化
const auth = getAuth(app); // Authenticationを初期化
console.log("Auth Object Initialized:", auth); // デバッグ用ログ

// reCAPTCHAの設定
const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  size: 'normal', // デバッグ用に表示
  callback: (response) => {
    console.log("reCAPTCHA成功:", response); // reCAPTCHAの成功ログ
  }
}, auth);

console.log("reCAPTCHA Verifier initialized:", recaptchaVerifier); // デバッグ用ログ

// 認証コード送信
document.getElementById('send-otp').addEventListener('click', async () => {
  console.log("送信ボタンが押されました");
  const phoneNumber = document.getElementById('phone-number').value; // 入力された電話番号を取得
  console.log("入力された電話番号:", phoneNumber);

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    window.confirmationResult = confirmationResult; // 確認用の結果をグローバルに保存
    alert("認証コードが送信されました。");
    document.getElementById('login-form').style.display = 'none'; // ログインフォームを隠す
    document.getElementById('verify-form').style.display = 'block'; // 認証フォームを表示
  } catch (error) {
    console.error("エラー:", error);
    alert("認証コードの送信に失敗しました。エラー内容: " + error.message);
  }
});

// 認証コード確認
document.getElementById('verify-code').addEventListener('click', async () => {
  const verificationCode = document.getElementById('verification-code').value; // 入力されたコードを取得
  try {
    const result = await window.confirmationResult.confirm(verificationCode);
    const user = result.user;
    alert(`ログイン成功！ ユーザーID: ${user.uid}`);
  } catch (error) {
    console.error("エラー:", error);
    alert("認証コードが正しくありません。");
  }
});
