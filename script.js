document.addEventListener('DOMContentLoaded', async () => {
    try {
        // LIFF初期化
        await liff.init({ liffId: '2006598432-qWoljXBn' }); // YOUR_LIFF_ID をLINEコンソールで取得した値に置き換え
        console.log("LIFF initialized");

        // ユーザーがログインしているか確認
        if (!liff.isLoggedIn()) {
            liff.login(); // ログインしていなければログイン画面にリダイレクト
        } else {
            console.log("User is logged in");
            const profile = await liff.getProfile(); // ユーザーのプロフィールを取得
            console.log("User profile:", profile);

            // 必要に応じてユーザーの情報を画面に表示
            document.getElementById('user-info').textContent = `こんにちは、${profile.displayName}さん！`;
        }
    } catch (error) {
        console.error("LIFF initialization failed", error);
    }
});
