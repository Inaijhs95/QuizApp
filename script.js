document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMが読み込まれました");
    document.getElementById('send-otp').addEventListener('click', async () => {
        console.log("送信ボタンが押されました");
    });

    document.getElementById('verify-code').addEventListener('click', async () => {
        console.log("確認ボタンが押されました");
    });
});
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
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// reCAPTCHA初期化
const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  size: 'normal',
  callback: (response) => {
    console.log("reCAPTCHA成功:", response);
  },
  'expired-callback': () => {
    console.warn("reCAPTCHAが期限切れです。再度実行してください。");
  },
}, auth);

// 認証コード送信
document.getElementById('send-otp').addEventListener('click', async () => {
  const phoneNumber = document.getElementById('phone-number').value.trim();

  if (!phoneNumber) {
    alert("電話番号を入力してください。");
    return;
  }

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    window.confirmationResult = confirmationResult;
    alert("認証コードが送信されました。");
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('verify-form').style.display = 'block';
  } catch (error) {
    console.error("認証コード送信エラー:", error);
    alert("認証コード送信に失敗しました。エラー内容: " + error.message);
  }
});

// 認証コード確認
document.getElementById('verify-code').addEventListener('click', async () => {
  const verificationCode = document.getElementById('verification-code').value.trim();

  if (!verificationCode) {
    alert("認証コードを入力してください。");
    return;
  }

  try {
    const result = await window.confirmationResult.confirm(verificationCode);
    const user = result.user;
    alert(`ログイン成功！ ユーザーID: ${user.uid}`);
  } catch (error) {
    console.error("認証コード確認エラー:", error);
    alert("認証コードが正しくありません。");
  }
});
