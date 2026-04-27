// Google Apps Script (GAS) 用のコード
// 手順:
// 1. 売上を記録したいGoogleスプレッドシートを開く
// 2. メニューから「拡張機能」>「Apps Script」を選択
// 3. 最初から入っているコードを消し、このファイルの中身をすべて貼り付ける
// 4. コード内の sheetName の値が、実際のシート名（デフォルトは "シート1" または "Sheet1"）と一致しているか確認
// 5. 「デプロイ」>「新しいデプロイ」を選択
// 6. 種類の選択（歯車アイコン）から「ウェブアプリ」を選択
// 7. アクセスできるユーザーを「全員」にして「デプロイ」をクリック
// 8. 承認が求められたら許可する
// 9. 発行された「ウェブアプリのURL」をコピーし、tipapp の `js/services/sheetApi.js` 内の GAS_WEB_APP_URL に貼り付ける

const sheetName = 'シート1'; // お使いのスプレッドシート名に合わせて変更してください

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    
    // 見出しがない場合は1行目に作成する
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Customer Name', 'Base Amount', 'Tip %', 'Tip Amount', 'Total Amount']);
    }

    // アプリから送られてきたデータを受け取る
    const data = JSON.parse(e.postData.contents);
    
    // スプレッドシートに追記する
    sheet.appendRow([
      data.timestamp || new Date(),
      data.customerName || '',
      data.baseAmount || 0,
      data.tipPercent !== null ? data.tipPercent + '%' : 'No Tip',
      data.tipAmount || 0,
      data.totalAmount || 0
    ]);
    
    // 成功の返答を返す（CORS制約があるため、JSONPやテキストで返すのが一般的です）
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
