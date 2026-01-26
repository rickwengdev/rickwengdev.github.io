export const blogPosts = [
  {
    id: 1,
    title: '外國人如何申請 ITIN 並取得首張美國信用卡',
    date: '2026-01-26',
    emoji: '🇺🇸',
    tags: ['Finance', 'ITIN', 'Credit Cards'],
    excerpt: '人不在美國也能辦美卡？這篇文章完整記錄了我如何透過 CAA 代辦申請 ITIN，並透過雲端方式累積 FICO 信用分數，成功拿下第一張美國信用卡(Capital One)。',
    content: `
      <p>對於許多非美國居民（Non-Resident Alien, NRA）來說，美國信用卡的高額開卡禮（Sub）與靈活的點數系統（MR/UR points）是信用卡界的頂配。但苦於沒有 SSN 與美國地址，不過我們還有 <strong>ITIN</strong>。</p>
      
      <h3>為什麼需要 ITIN？</h3>
      <p>ITIN (Individual Taxpayer Identification Number) 是美國國稅局發給沒有資格取得 SSN、但有報稅需求人士的編號。但現在在金融系統中，ITIN也可以用來申請信用卡，建立信用記錄。</p>
      
      <h3>簡易版申請攻略</h3>
      <p>「雲居民」申請路徑，完全不需要親自飛往美國：</p>
      
      <h4>1. 取得 ITIN </h4>
      <p>目前最簡單的方式是找 IRS 認證的 <strong>CAA (Certifying Acceptance Agent)</strong>。雖然需要支付一筆費用（通常 $200-$300 USD），但好處顯而易見：</p>
      <ul>
        <li>不需要寄出護照。</li>
        <li>CAA 會處理身份驗證。</li>
        <li>CAA 會處理 W-7 表格。</li>
        <li>只需要付錢等通知。</li>
      </ul>

      <h4>2. 搞定美國地址與電話</h4>
      <p>有了 ITIN 只是第一步，還需要地址和電話：</p>
      <ul>
        <li><strong>地址 (Address)：</strong> 推薦使用 Anytime Mailbox 或租用私人地址，避免使用商業轉運倉地址（CMRA），銀行系統不予許CMRA地址，可以透過smarty.com確認地址類型。</li>
        <li><strong>電話 (Phone)：</strong> 建議使用 Tello 或 Ultra Mobile PayGo，這些實體運營商能接收銀行簡訊驗證碼 (OTP)，現在銀行已經不予許使用 VOIP(Google Voice)。</li>
      </ul>

      <h4>3. 第一張卡的選擇</h4>
      <p>當你拿到 ITIN 信函後， 就可以開始申請信用卡：</p>
      <p>如果你在原本國家持有 American Express (運通卡)，可以使用 <strong>Amex Global Transfer (轉卡)</strong> 功能。這是最快建立美國信用記錄 (FICO Score) 的捷徑，通常可以直接略過信用小白期，拿到較好的額度。</p>
      <p>如果沒有 Amex 卡，可以考慮Capital One入門卡，Capital One在申請第一張卡時，會查詢美國三家信用局，幫你在三家信用局建立信用記錄：</p>
      <ul>
        <li><strong>Capital One Savor ：</strong> 無年費，吃飯3%回饋，是一張適合作為第一張卡長期持有的選擇。</li>
        <li><strong>Capital One Quicksilver Secured Card：</strong> 押金式信用卡，消費1.5%回饋，最多可以押1000$，適合第一張沒辦法申請的人。</li>
      </ul>

      <h4>4. 持續累積信用分數</h4>
      <p>拿到第一張卡後，持續使用並按時還款。建議每月使用卡片，並控制使用率在30%以下，以最大化信用分數的提升。</p>

      <h3>總結</h3>
      <p>雖然身為非美國居民申請美國信用卡有一定的挑戰，但透過申請 ITIN 並選擇合適的信用卡，完全可以在美國建立起良好的信用記錄。希望這篇文章能幫助到有需要你們！祝大家申請順利，早日拿到夢想中的美國信用卡！

      <img src="/images/posts/1/credit-cards.HEIC" alt="Credit Cards" style="width: 100%; border-radius: 8px; margin-top: 12px;" /></p>
      
      <div style="background-color: #63e2b7; padding: 12px; border-radius: 8px; margin-top: 20px;">
        <small>⚠️ 免責聲明：本文純屬經驗分享，不構成稅務或投資建議。相關法規變動頻繁，請自行查核最新資訊。</small>
      </div>
    `
  },
];