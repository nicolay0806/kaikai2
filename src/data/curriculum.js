export const curriculum = [
  {
    id: 1,
    title: "單元一：百變加法國度（千位數加法）",
    description: "一起來學習變身術，把數字變大吧！",
    lessons: [
      {
        id: "u1-l1",
        title: "1. 數字排排站",
        description: "認識百位、十位與個位的數值",
        slides: [
          {
            type: "text",
            content: "嗨！特務，我是加法隊長。歡迎來到百變加法國度！首先要確認你對「位置」的敏感度。",
            image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&q=80&w=1000",
          },
          {
            type: "text",
            content: "數字 352 是由 3 個百、5 個十和 2 個一組成的。就像積木一樣堆起來！",
          },
          {
            type: "visual",
            visualType: "place_value",
            content: "仔細觀察這些積木的數量：",
            exampleNumber: 352,
          },
          {
            type: "interactive",
            task: "place_value_drag",
            content: "現在換你操作！啟動物質合成儀，把積木放進對應的位子裡。",
            target: 352
          }
        ],
        quiz: [
          {
            question: "數字 845 的「4」是在什麼位？",
            options: ["百位", "十位", "個位", "千位"],
            answer: 1
          },
          {
            question: "7 個百、0 個十、9 個一合起來是多少？",
            options: ["790", "709", "907", "79"],
            answer: 1
          },
          {
            question: "在 523 中，數字 5 表示多少？",
            options: ["5", "50", "500", "5000"],
            answer: 2
          }
        ]
      },
      { 
        id: "u1-l2", 
        title: "2. 森林合體技", 
        description: "不進位的三位數加法基礎", 
        slides: [
           { type: "text", content: "進入運算森林！我們要學習將兩股能量合體。", image: "https://images.unsplash.com/photo-1448375240586-dfd8d3f5d891?auto=format&fit=crop&q=80&w=1000" },
           { type: "text", content: "100 + 200 = 300，百位對百位，十位對十位，這是基本法則。" },
           { type: "interactive", task: "count_to_target", content: "點擊按鈕，注入能量完成合體！" }
        ], 
        quiz: [
           { question: "200 + 300 = ?", options: ["400", "500", "600"], answer: 1 },
           { question: "120 + 30 = ?", options: ["150", "160", "250"], answer: 0 }
        ] 
      },
      { 
        id: "u1-l3", 
        title: "3. 魔法進位術", 
        description: "十位滿十進到百位的練習", 
        slides: [
            { type: "text", content: "注意！能量過載！當十位數滿 10 個時，要變成 1 個百，這就是「進位」。" },
            { type: "interactive", task: "count_to_target", content: "執行進位程序，將多餘能量轉換！" }
        ], 
        quiz: [
            { question: "80 + 30 = ?", options: ["100", "110", "120"], answer: 1 },
            { question: "150 + 60 = ?", options: ["200", "210", "220"], answer: 1 }
        ] 
      },
      { id: "u1-l4", title: "4. 連環進位考驗", description: "個位與十位同時進位的進階題", slides: [{type:"text", content:"連續進位挑戰！保持專注。"}, {type:"interactive", task:"count_to_target", content:"開始運算"}], quiz: [{question:"99+1=?", options:["100","101","991"], answer:0}] },
      { id: "u1-l5", title: "5. 勇者連擊", description: "三位數的連加運算", slides: [{type:"text", content:"連續加法挑戰！"}, {type:"interactive", task:"count_to_target", content:"充能中"}], quiz: [{question:"100+100+100=?", options:["200","300","400"], answer:1}] }
    ]
  },
  {
    id: 2,
    title: "單元二：數字消消樂（千位數減法）",
    description: "學會減法魔法，把困難變不見！",
    lessons: [
      { 
        id: "u2-l1", 
        title: "1. 數字變小了", 
        description: "不退位的三位數減法基礎", 
        slides: [
            { type: "text", content: "減法就是消耗能量。500 點能量用掉 200 點，還剩多少？", image: "https://images.unsplash.com/photo-1633469924738-52101af51d87?auto=format&fit=crop&q=80&w=1000" },
            { type: "text", content: "口訣：大減小，位對位，直接減。" },
            { type: "interactive", task: "count_to_target", content: "發射減法光束！" }
        ], 
        quiz: [
            { question: "500 - 200 = ?", options: ["200", "300", "700"], answer: 1 },
            { question: "350 - 50 = ?", options: ["300", "345", "400"], answer: 0 }
        ] 
      },
      { id: "u2-l2", title: "2. 跟鄰居借一點", description: "十位借位到個位的退位練習", slides: [{type:"text", content:"個位不夠減？向十位借 1 個當作 10！"}, {type:"interactive", task:"count_to_target", content:"執行借位"}], quiz: [{question:"32 - 5 = ?", options:["27", "28", "25"], answer:0}] },
      { id: "u2-l3", title: "3. 大方的百位", description: "百位借位到十位的退位練習", slides: [{type:"text", content:"這次向百位借！原理是一樣的。"}, {type:"interactive", task:"count_to_target", content:"執行借位"}], quiz: [{question:"120 - 50 = ?", options:["70", "80", "60"], answer:0}] },
      { id: "u2-l4", title: "4. 終極借位魔王", description: "連續借位挑戰", slides: [{type:"text", content:"連續借位警報！"}, {type:"interactive", task:"count_to_target", content:"全力運算"}], quiz: [{question:"1000 - 1 = ?", options:["990", "999", "900"], answer:1}] },
      { id: "u2-l5", title: "5. 資源管理員", description: "減法在生活情境中的應用", slides: [{type:"text", content:"應用題時間！"}, {type:"interactive", task:"count_to_target", content:"計算庫存"}], quiz: [{question:"有 500 元，買了 100 元的東西，剩多少？", options:["300", "400", "600"], answer:1}] }
    ]
  },
  {
    id: 3,
    title: "單元三：乘法時光機（乘法基礎與應用）",
    description: "搭上時光機，計算速度變超快！",
    lessons: [
      { 
        id: "u3-l1", 
        title: "1. 連加的捷徑", 
        description: "理解乘法是相同數字的重複加總", 
        slides: [
            { type: "text", content: "特務，如果你要加 2 + 2 + 2 + 2... 太慢了！", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000" },
            { type: "text", content: "使用「乘法時光機」，2 出現 3 次，就是 2 x 3。" },
            { type: "interactive", task: "count_to_target", content: "啟動時光機加速！" }
        ], 
        quiz: [
            { question: "5 + 5 + 5 可以寫成？", options: ["5 x 3", "5 + 3", "5 x 5"], answer: 0 },
            { question: "2 x 4 代表什麼？", options: ["2 加 4", "4 個 2 相加", "2 個 2"], answer: 1 }
        ] 
      },
      { id: "u3-l2", title: "2. 節奏律動", description: "2、5、10 的乘法表與規律", slides: [{type:"text", content:"背誦口訣：二一得二、二二得四..."}, {type:"interactive", task:"count_to_target", content:"跟上節奏"}], quiz: [{question:"5 x 3 = ?", options:["10", "15", "20"], answer:1}] },
      { id: "u3-l3", title: "3. 三三兩兩", description: "3、6、9 的乘法表與生活題", slides: [{type:"text", content:"進階乘法表，準備好了嗎？"}, {type:"interactive", task:"count_to_target", content:"計算中"}], quiz: [{question:"3 x 3 = ?", options:["6", "9", "12"], answer:1}] },
      { id: "u3-l4", title: "4. 高難度挑戰", description: "4、7、8 的乘法記憶與遊戲", slides: [{type:"text", content:"高難度區域！"}, {type:"interactive", task:"count_to_target", content:"突破極限"}], quiz: [{question:"7 x 2 = ?", options:["14", "12", "16"], answer:0}] },
      { id: "u3-l5", title: "5. 戰力加成", description: "兩位數乘以一位數的簡單邏輯", slides: [{type:"text", content:"當數字變大時..."}, {type:"interactive", task:"count_to_target", content:"計算戰力"}], quiz: [{question:"10 x 5 = ?", options:["50", "15", "105"], answer:0}] }
    ]
  },
  {
    id: 4,
    title: "單元四：公平分果果（除法入門概念）",
    description: "學會分享，大家都很開心！",
    lessons: [
      { 
        id: "u4-l1", 
        title: "1. 大家都一樣", 
        description: "平分的概念，每個人分到幾個？", 
        slides: [
            { type: "text", content: "除法就是「公平分配」。有 6 顆能量石，分給 2 位特務，每人拿多少？", image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&q=80&w=1000" },
            { type: "text", content: "6 ÷ 2 = 3。每人拿到 3 顆，這就是除法。" },
            { type: "interactive", task: "count_to_target", content: "開始分配物資！" }
        ], 
        quiz: [
            { question: "8 個蘋果分給 2 人，一人幾個？", options: ["2", "4", "6"], answer: 1 },
            { question: "10 ÷ 5 = ?", options: ["2", "5", "10"], answer: 0 }
        ] 
      },
      { id: "u4-l2", title: "2. 幾個一組", description: "包含除的概念，可以分成幾組？", slides: [{type:"text", content:"10 個糖果，每 2 個裝一袋，可以裝幾袋？"}, {type:"interactive", task:"count_to_target", content:"開始分裝"}], quiz: [{question:"12 ÷ 4 = ?", options:["3", "4", "2"], answer:0}] },
      { id: "u4-l3", title: "3. 密碼還原", description: "理解乘法與除法的互逆關係", slides: [{type:"text", content:"除法是乘法的反向操作！"}, {type:"interactive", task:"count_to_target", content:"解碼中"}], quiz: [{question:"如果 3 x 4 = 12，那 12 ÷ 3 = ?", options:["4", "3", "12"], answer:0}] },
      { id: "u4-l4", title: "4. 剩下的給誰", description: "認識餘數的基本概念", slides: [{type:"text", content:"分不完怎麼辦？那就是「餘數」。"}, {type:"interactive", task:"count_to_target", content:"處理餘數"}], quiz: [{question:"7 ÷ 3 = ?", options:["2 餘 1", "2 餘 2", "3"], answer:0}] },
      { id: "u4-l5", title: "5. 分配小劇場", description: "模擬分裝糖果或玩具的互動遊戲", slides: [{type:"text", content:"生活應用題！"}, {type:"interactive", task:"count_to_target", content:"解決問題"}], quiz: [{question:"有 9 張貼紙，分給 3 人，每人幾張？", options:["2", "3", "4"], answer:1}] }
    ]
  },
  {
    id: 5,
    title: "單元五：終極數字聖殿（綜合挑戰）",
    description: "成為數學大師的最後考驗！",
    lessons: [
      { id: "u5-l1", title: "1. 加減大雜燴", description: "混合運算的基礎邏輯", slides: [{type:"text", content:"混合運算開始！先乘除後加減（目前先學順序）。"}, {type:"interactive", task:"count_to_target", content:"開始挑戰"}], quiz: [{question:"10 + 5 - 2 = ?", options:["13", "15", "12"], answer:0}] },
      { id: "u5-l2", title: "2. 超市採購員", description: "多項商品的總金額與找錢計算", slides: [{type:"text", content:"買東西是最棒的練習！"}, {type:"interactive", task:"count_to_target", content:"結帳"}], quiz: [{question:"買 20 元和 30 元的東西，付 100 元要找多少？", options:["40", "50", "60"], answer:1}] },
      { id: "u5-l3", title: "3. 估算超能力", description: "大概是多少？學習四捨五入的初步直覺", slides: [{type:"text", content:"不用算太準，大概是多少？"}, {type:"interactive", task:"count_to_target", content:"發動估算"}], quiz: [{question:"98 + 103 大約是多少？", options:["200", "100", "300"], answer:0}] },
      { id: "u5-l4", title: "4. 數字迷宮", description: "利用四則運算找出通往終點的路徑", slides: [{type:"text", content:"走出迷宮的鑰匙就是數學。"}, {type:"interactive", task:"count_to_target", content:"尋找路徑"}], quiz: [{question:"5 + 5 + 5 - 5 = ?", options:["10", "15", "20"], answer:0}] },
      { 
        id: "u5-l5", 
        title: "5. 終極 BOSS 戰", 
        description: "千位數四則運算大總結", 
        slides: [
            { type: "text", content: "這是最後的戰役，特務！整合你學會的一切！", image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&q=80&w=1000" },
            { type: "text", content: "加減乘除，聽我號令！" },
            { type: "interactive", task: "count_to_target", content: "發射最終必殺技！" }
        ], 
        quiz: [
            { question: "300 + 50 - 10 = ?", options: ["340", "360", "240"], answer: 0 },
            { question: "一包餅乾 25 元，買 2 包要多少錢？", options: ["40", "50", "60"], answer: 1 },
            { question: "1000 - 400 = ?", options: ["500", "600", "700"], answer: 1 },
            { question: "恭喜完成訓練！你喜歡數學特攻隊嗎？", options: ["喜歡！", "超愛！", "我是數學大師"], answer: 2 }
        ] 
      }
    ]
  }
];
