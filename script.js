// Firebaseの初期化
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD30sxoHhSnpH7xMwGj55SSjRkMRa0oRX8",
  authDomain: "inai95.firebaseapp.com",
  projectId: "inai95",
  storageBucket: "inai95.firebasestorage.app",
  messagingSenderId: "418002209728",
  appId: "1:418002209728:web:dc034e538d3bf0fae15625",
  measurementId: "G-58LP3ZDTLJ"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log("Auth Initialized:", auth);

// テストモード用 (本番環境では削除)
auth.settings.appVerificationDisabledForTesting = true;

// reCAPTCHA初期化
let recaptchaVerifier;
try {
  recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    size: 'normal',
    callback: (response) => {
      console.log("reCAPTCHA成功:", response);
    },
    'expired-callback': () => {
      console.warn("reCAPTCHAが期限切れです。");
    }
  }, auth);
  console.log("reCAPTCHA Verifier initialized:", recaptchaVerifier);
} catch (error) {
  console.error("reCAPTCHA初期化エラー:", error);
}

// 認証コード送信
document.getElementById('send-otp').addEventListener('click', async () => {
  const phoneNumber = document.getElementById('phone-number').value.trim();
  console.log("送信ボタンが押されました:", phoneNumber);

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    window.confirmationResult = confirmationResult;
    alert("認証コードが送信されました。");
  } catch (error) {
    console.error("認証コード送信エラー:", error);
    alert("認証コードの送信に失敗しました。");
  }
});
