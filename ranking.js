import { getFirestore, collection, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const db = getFirestore();

async function fetchRankings() {
  const rankingsRef = collection(db, "rankings");
  const rankingsQuery = query(rankingsRef, orderBy("score", "desc"), orderBy("time", "asc"), limit(10)); // 高得点順、時間順
  const querySnapshot = await getDocs(rankingsQuery);

  let rankingsHtml = "<h1>ランキング</h1><ol>";
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    rankingsHtml += `<li>${data.name} - スコア: ${data.score} - 時間: ${data.time}s</li>`;
  });
  rankingsHtml += "</ol>";

  document.getElementById("ranking-container").innerHTML = rankingsHtml;
}

// ページロード時にランキングを表示
document.addEventListener("DOMContentLoaded", () => {
  fetchRankings();
});
