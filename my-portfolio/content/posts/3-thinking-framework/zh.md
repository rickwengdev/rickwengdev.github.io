---
id: 3
modelName: "思考框架"
modelStatus: stable
title: "思考框架完整規格"
emoji: "◆"
date: 2026-07-03
category: systems
tags:
  - "框架"
  - "決策紀錄"
  - "設計凍結"
excerpt: "一套能持續修正自身的思考方法。Version v0.0.1 — Design Freeze，傳承思考如何演化，而非答案本身。"
---

<div class="doc-meta">
  <p><strong>Version:</strong> v0.0.1</p>
  <p><strong>Author / Maintainer:</strong> Rick</p>
  <p><strong>Created:</strong> 2026-06-30</p>
  <p><strong>Last Updated:</strong> 2026-07-03</p>
</div>

<blockquote class="doc-quote">
  <p>"The purpose is not to be right. The purpose is to become less wrong."</p>
  <p class="doc-quote-note">（"Less wrong" 源自理性主義社群 LessWrong；可證偽性源自 Karl Popper；校準方法源自 Philip Tetlock 的 Good Judgment Project。此處不宣稱原創這些組件，只宣稱其組合與規格化——增量主張見 Issue #0。）</p>
</blockquote>

<hr />

<h3>0. 設計目標</h3>
<p>不提供答案。</p>
<p>提供一套能持續修正自身的思考方法。</p>
<p>目的不是讓所有人得到相同答案，而是讓任何人在不同情境下，都能建立、驗證、修正自己的模型。</p>
<p>傳承的不是思考（Thinking），而是思考如何演化（Thinking Evolution）。</p>

<hr />

<h3>1. Core Principles</h3>

<h4>P1. Falsifiability（可被推翻）</h4>
<p>任何模型、Framework、甚至本規格本身，都必須存在失敗條件。</p>
<p>如果沒有任何證據可以證明它錯，它不是模型，而是信仰。</p>
<p><strong>推論：</strong>判定標準（Criteria）若設計成必然通過或必然失敗，等同於包裝好的結論，違反 P1。</p>

<h4>P2. Context First（情境優先）</h4>
<p>不存在脫離情境的最佳答案。</p>
<p>思考開始前，必須先回答：</p>
<ul>
  <li>我目前的情境是什麼？</li>
  <li>我真正要解決的問題是什麼？</li>
  <li>這是什麼型別的問題？（描述問題 / 設計問題 / 決策問題）</li>
</ul>
<p>問題比答案重要。問錯問題，所有答案都是浪費。</p>

<h4>P3. Action Completes Thinking（行動完成思考）</h4>
<p>思考不是目的。決策與行動才是。</p>
<p>沒有進入現實接受回饋的思考，永遠無法完成驗證。</p>
<p>思考必須有停止條件（實作見 S5）。</p>
<p><strong>推論：</strong>承諾要開始的第一筆記錄若沒有真的開始，它就是第一個需要被記錄的失敗。</p>

<hr />

<h3>2. Specification</h3>

<h4>S1. 建立模型</h4>
<p>模型必須包含：</p>
<table class="doc-table">
  <thead>
    <tr><th>元素</th><th>內容</th></tr>
  </thead>
  <tbody>
    <tr><td>Question</td><td>真正的問題</td></tr>
    <tr><td>Assumptions</td><td>關鍵假設（區分假設與事實）</td></tr>
    <tr><td>Reasoning</td><td>推理過程</td></tr>
    <tr><td>Prediction</td><td>可驗證的預測</td></tr>
    <tr><td>Failure Condition</td><td>什麼證據下承認模型錯誤</td></tr>
  </tbody>
</table>

<h4>S2. 驗證模型（型別分拆）</h4>
<p>模型分兩種型別，適用相反的規則：</p>
<p><strong>Description Model（描述模型）</strong>——描述世界是什麼。</p>
<blockquote><p>模型與世界不一致 → 修改模型，不要修改世界。</p></blockquote>
<p><strong>Design Model（設計模型）</strong>——主張世界應該是什麼。</p>
<blockquote><p>模型與世界不一致 → 不一致本身是行動的理由。修改對象是世界。</p></blockquote>
<p>設計模型仍受 P1 約束：必須宣告在什麼證據下，承認這個「應該」不成立。</p>

<h4>S3. 修正模型</h4>
<p>修正不是否定過去，而是新資訊加入後，更新目前最好的模型。</p>
<p>Version 永遠存在。Final Version 永遠不存在。</p>

<h4>S4. Framework 也是模型</h4>
<p>Framework 必須接受與模型相同的檢驗：可驗證、可推翻、可修正、可淘汰。</p>
<p>Framework 沒有特權。作者也沒有。<strong>作者對自己系統的寬容，是系統最不該允許的偏誤。</strong></p>

<h4>S5. Stop Rule</h4>
<p>任何決策開始前，必須事前宣告停止條件，宣告後不得因「還想再想」而延展。</p>
<table class="doc-table">
  <thead>
    <tr><th>層級</th><th>內容</th></tr>
  </thead>
  <tbody>
    <tr><td>Principle</td><td>思考必須有停止條件（P3）</td></tr>
    <tr><td>Specification</td><td>停止條件必須事前承諾，事後不得任意修改</td></tr>
    <tr><td>Implementation</td><td>Deadline / 成本上限 / 實驗次數 / 資訊預算（擇一或組合）</td></tr>
  </tbody>
</table>
<p><strong>Resolution Date 結算在成本上，不是時間上</strong>——決策的正確結算點，是決策成本開始改變的時刻。</p>
<p><strong>所有 Threshold 必須在決策當下寫死數字</strong>——留白的閾值等於把裁量權留給未來的自己。</p>
<p>沒有停止規則的修正循環，在現實中叫做拖延。</p>

<hr />

<h3>3. RFC-0001 — Compression Principle</h3>
<p>任何新增 Rule，必須證明無法由現有 Rule 推導，否則 Reject。</p>
<p>同一原則管理三個方向：</p>
<ol>
  <li><strong>新增：</strong>可推導者不得加入。</li>
  <li><strong>刪除：</strong>當一個 Framework 的所有適用情境被假設更少的 Framework 覆蓋，淘汰。</li>
  <li><strong>外部：</strong>若本規格某部分相對已知方法（見 Issue #0）貢獻為零，該部分應被壓縮掉。名字也不例外。</li>
</ol>
<p>目的不是減少文字，而是提高生成能力（Generative Power）。</p>

<hr />

<h3>4. Framework Generation Rule（Backlog 中，暫記方向）</h3>
<p>當同一類問題重複使用所有已知 Framework 仍然失敗：</p>
<p>分析失敗共同模式 → 抽象新限制條件 → 壓縮為新 Framework → 跨情境驗證 → 通過則加入 Library。</p>
<p>生成 = 從失敗模式中提取規律。（完整定義凍結中，待 Report #1 後 Review。）</p>

<hr />

<h3>5. Development Culture</h3>
<ol>
  <li>任何 Rule 都可以被 Reject。包括創始人提出的。</li>
  <li>任何 Merge 都必須有 Reality。不能只有 Logic。讚美不算 Reality。文獻是合法的 Reality 輸入。</li>
  <li>Design Freeze。當規格足以產生可驗證假說後：停止設計，開始驗證。把下一步交給世界。</li>
</ol>
<p>Decision Log 記錄的是 Commitment，不是 Opinion。Opinion 可以很多，Commitment 只能有一個。Decision 欄位必須描述真正承諾的行動（Keep / Rename / Defer…），不是傾向。</p>

<hr />

<h3>6. Review Gate（Merge 前檢查）</h3>
<p>任何條款進入 Spec 前，四題全過才能 Merge：</p>
<ol>
  <li><strong>自洽嗎？</strong>不違反自己的規則。</li>
  <li><strong>可執行嗎？</strong>不同的人在相似情境下能做出可比較的決策。</li>
  <li><strong>可壓縮嗎？</strong>無法由現有條款推導。</li>
  <li><strong>可被世界驗證嗎？</strong>存在外部失敗條件。</li>
</ol>
<blockquote><p>Spec 裡不可執行的條款，比沒有條款更糟。</p></blockquote>

<hr />

<h3>7. Decision Log（測量工具）</h3>
<p>三組共用同一張表；完整規格組唯一差別是填表前多跑一次 Spec 流程。</p>
<table class="doc-table">
  <thead>
    <tr><th>欄位</th><th>說明</th></tr>
  </thead>
  <tbody>
    <tr><td>Date</td><td>決策日期</td></tr>
    <tr><td>Context</td><td>情境</td></tr>
    <tr><td>Question</td><td>真正的問題</td></tr>
    <tr><td>Assumptions</td><td>關鍵假設</td></tr>
    <tr><td>Decision</td><td><strong>承諾的行動</strong>（非傾向）</td></tr>
    <tr><td>Prediction</td><td>可驗證的預測</td></tr>
    <tr><td>Confidence</td><td>信心水準（0–100%）</td></tr>
    <tr><td>Resolution Date</td><td>事前寫死；錨定成本變化點，非方便時間</td></tr>
    <tr><td>Resolution Criteria</td><td>事前寫死，含具體數字 Threshold</td></tr>
    <tr><td>Outcome</td><td>實際結果</td></tr>
    <tr><td>Calibration</td><td>信心 vs. 命中</td></tr>
    <tr><td>Model Updated?</td><td>是否更新模型，如何更新</td></tr>
  </tbody>
</table>
<p><strong>作廢規則：</strong>Resolution Date / Criteria / Threshold 事後補寫或修改者，該筆資料作廢。</p>

<hr />

<h3>Philosophy</h3>
<p>不要追求永遠正確。追求永遠有能力修正自己。</p>
<p>不要傳承答案。傳承方法。</p>
<p>不要讓人相信它。讓它接受世界的檢驗。</p>
<p>Decision Log 的真正價值，不是幫助當下做決策，而是讓六個月後的自己，不能靠記憶重寫歷史。</p>

<hr />

<h3>Design Freeze Declaration</h3>
<p>從此版本開始：任何沒有外部資料支持的新增設計，一律不得 Merge。</p>
<p>一個沒有通過 Integration Test 的 Framework，不是錯的——它只是還沒有資格宣稱自己是 Framework。</p>
<blockquote>
  <p><strong>Signed:</strong> Rick — Author / Maintainer<br />Date: 2026-07-03</p>
</blockquote>
