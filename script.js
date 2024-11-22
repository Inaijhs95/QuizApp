// Firebaseの初期化
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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

// Firebaseアプリの初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM Content Loaded");

  // reCAPTCHAの初期化
  try {
    const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'normal', // UIで表示確認用
      callback: (response) => {
        console.log("reCAPTCHA成功:", response);
      },
      'expired-callback': () => {
        console.warn("reCAPTCHAが期限切れです。");
      }
    }, auth);

    recaptchaVerifier.render(); // reCAPTCHAをレンダリング
    console.log("reCAPTCHA Verifier initialized:", recaptchaVerifier);

   document.getElementById('send-otp').addEventListener('click', async () => {
  const phoneNumber = document.getElementById('phone-number').value.trim();
  console.log("入力された電話番号:", phoneNumber);

  if (!phoneNumber.startsWith('+') || phoneNumber.length < 10) {
    alert("正しい国際電話番号形式で入力してください（例: +81XXXXXXXXXX）");
    return;
  }

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    window.confirmationResult = confirmationResult;
    alert("認証コードが送信されました。");
  } catch (error) {
    console.error("認証コード送信エラー:", error);
    alert(`認証コードの送信に失敗しました。エラー: ${error.message}`);
  }
});

