// Firebaseの初期化
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebaseの設定
const firebaseConfig = {
  apiKey: "AIzaSyD30sxoHhSnpH7xMwGj55SSjRkMRa0oRX8",
  authDomain: "inai95.firebaseapp.com",
  projectId: "inai95",
  storageBucket: "inai95.firebasestorage.app",
  messagingSenderId: "418002209728",
  appId: "1:418002209728:web:dc034e538d3bf0fae15625",
  measurementId: "G-58LP3ZDTLJ"
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log("Firebase Auth Object:", auth); // 初期化されたauthを確認

// reCAPTCHAの設定
const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  size: 'normal', // デバッグ用に 'normal' に変更
  callback: (response) => {
    console.log("reCAPTCHA成功:", response);
  }
}, auth);

console.log("reCAPTCHA Verifier initialized:", recaptchaVerifier); // 初期化の確認ログ

// 認証コード送信
document.getElementById('send-otp').addEventListener('click', async () => {
  console.log("送信ボタンが押されました");
  const phoneNumber = document.getElementById('phone-number').value;
  console.log("入力された電話番号:", phoneNumber);

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    window.confirmationResult = confirmationResult;
    alert("認証コードが送信されました。");
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('verify-form').style.display = 'block';
  } catch (error) {
    console.error("エラー:", error);
    alert("認証コードの送信に失敗しました。エラー内容: " + error.message);
  }
});

// 認証コード確認
document.getElementById('verify-code').addEventListener('click', async () => {
  const verificationCode = document.getElementById('verification-code').value;
  try {
    const result = await window.confirmationResult.confirm(verificationCode);
    const user = result.user;
    alert(`ログイン成功！ ユーザーID: ${user.uid}`);
  } catch (error) {
    console.error("エラー:", error);
    alert("認証コードが正しくありません。");
  }
});
