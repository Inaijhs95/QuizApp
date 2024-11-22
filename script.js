<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LINE Login Example</title>
</head>
<body>
    <h1>LINEログイン</h1>
    <button id="login-button">LINEでログイン</button>
    <button id="logout-button" style="display:none;">ログアウト</button>
    <div id="profile" style="display:none;">
        <p id="user-name"></p>
        <img id="user-picture" alt="User Picture">
    </div>

    <script>
        // LIFF ID を設定
        const LIFF_ID = "2006598432-qWoljXBn";

        // LIFF初期化
        async function initializeLiff() {
            try {
                await liff.init({ liffId: LIFF_ID });
                console.log("LIFF初期化成功:", liff.isLoggedIn());
                
                // ユーザーがログイン済みか確認
                if (liff.isLoggedIn()) {
                    displayProfile();
                } else {
                    document.getElementById("login-button").style.display = "block";
                }
            } catch (error) {
                console.error("LIFF初期化エラー:", error);
            }
        }

        // プロフィール表示
        async function displayProfile() {
            try {
                const profile = await liff.getProfile();
                document.getElementById("user-name").textContent = `名前: ${profile.displayName}`;
                document.getElementById("user-picture").src = profile.pictureUrl;
                document.getElementById("profile").style.display = "block";
                document.getElementById("logout-button").style.display = "block";
            } catch (error) {
                console.error("プロフィール取得エラー:", error);
            }
        }

        // イベントリスナー
        document.getElementById("login-button").addEventListener("click", () => {
            liff.login();
        });

        document.getElementById("logout-button").addEventListener("click", () => {
            liff.logout();
            window.location.reload();
        });

        // LIFFスクリプトの読み込み完了後に初期化
        document.addEventListener("DOMContentLoaded", initializeLiff);
    </script>

    <script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
</body>
</html>
