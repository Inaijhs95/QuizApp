import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyD30sxoHhSnpH7xMwGj55SSjRkMRa0oRX8",
  authDomain: "inai95.firebaseapp.com",
  projectId: "inai95",
  storageBucket: "inai95.firebasestorage.app",
  messagingSenderId: "418002209728",
  appId: "1:418002209728:web:dc034e538d3bf0fae15625",
  measurementId: "G-58LP3ZDTLJ",
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestoreの初期化
console.log("Firebase Firestore Initialized:", db);

async function isNameUsed(name) {
  const nameRef = doc(db, "usedNames", name);
  const nameDoc = await getDoc(nameRef);

  if (nameDoc.exists()) {
    console.log("名前はすでに使用されています:", name);
    return true; // 名前がすでに使用されている
  } else {
    console.log("名前は未使用です:", name);
    return false; // 名前は未使用
  }
}

async function registerName(name, email) {
  // 名前をusedNamesコレクションに保存
  const nameRef = doc(db, "usedNames", name);
  await setDoc(nameRef, { email: email });

  // ユーザー情報をusersコレクションに保存
  const userId = name + "_" + Date.now(); // ユニークなユーザーIDを生成
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, { name: name, email: email });

  console.log("登録が完了しました: 名前:", name, "メールアドレス:", email);
}
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
      await registerName(name, email);
      alert("登録が完了しました！");
    }
  } catch (error) {
    console.error("エラー:", error);
    alert("登録中にエラーが発生しました。もう一度お試しください。");
  }
});

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /usedNames/{name} {
      allow create: if !exists(/databases/{database}/documents/usedNames/{name}); // 名前の重複を防ぐ
      allow read: if true;
      allow update, delete: if false; // 更新・削除を禁止
    }
    match /users/{userId} {
      allow create: if request.auth != null;
      allow read, update, delete: if false; // 読み取り・削除を禁止
    }
  }
}

