import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase設定
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "inai95.firebaseapp.com",
  projectId: "inai95",
  storageBucket: "inai95.firebasestorage.app",
  messagingSenderId: "418002209728",
  appId: "1:418002209728:web:dc034e538d3bf0fae15625",
  measurementId: "G-58LP3ZDTLJ",
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("Firebase Firestore Initialized:", db);

// 名前が使用済みか確認
async function isNameUsed(name) {
  const nameRef = doc(db, "usedNames", name);
  const nameDoc = await getDoc(nameRef);
  return nameDoc.exists(); // true: 使用済み, false: 未使用
}

// 名前とメールを登録
async function registerUser(name, email) {
  const nameRef = doc(db, "usedNames", name);
  await setDoc(nameRef, { email: email });
  console.log("登録成功:", { name, email });
}

// ボタンクリック時の処理
document.getElementById("register").addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !email) {
    alert("名前とメールアドレスを入力してください。");
    return;
  }

  try {
    const used = await isNameUsed(name);
    if (used) {
      alert("この名前は既に使用されています。");
    } else {
      await registerUser(name, email);
      alert("登録が完了しました！");
    }
  } catch (error) {
    console.error("エラー:", error);
    alert("登録中にエラーが発生しました。");
  }
});
