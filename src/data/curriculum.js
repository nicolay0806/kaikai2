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
            content: "嗨！我是加法隊長。歡迎來到百變加法國度！我們要先學會「數字排排站」。",
            image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&q=80&w=1000",
            action: "next"
          },
          {
            type: "text",
            content: "你知道 352 是怎麼組成的嗎？它是由 3 個百、5 個十和 2 個一組成的喔！",
            action: "next"
          },
          {
            type: "visual",
            content: "看看這個數字積木：",
            data: { base: 300, add: 52 }, // Simplified representation logic for visual component
            visualType: "place_value", // Hint for component to render place value blocks
            exampleNumber: 352,
            action: "next"
          },
          {
            type: "interactive",
            content: "現在換你試試看！把積木放進對應的位子裡。",
            task: "place_value_drag", // Logic to be implemented in LessonPlayer
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
      { id: "u1-l2", title: "2. 森林合體技", description: "不進位的三位數加法基礎", slides: [], quiz: [] },
      { id: "u1-l3", title: "3. 魔法進位術", description: "十位滿十進到百位的練習", slides: [], quiz: [] },
      { id: "u1-l4", title: "4. 連環進位考驗", description: "個位與十位同時進位的進階題", slides: [], quiz: [] },
      { id: "u1-l5", title: "5. 勇者連擊", description: "三位數的連加運算", slides: [], quiz: [] }
    ]
  },
  {
    id: 2,
    title: "單元二：數字消消樂（千位數減法）",
    description: "學會減法魔法，把困難變不見！",
    lessons: [
      { id: "u2-l1", title: "1. 數字變小了", description: "不退位的三位數減法基礎", slides: [], quiz: [] },
      { id: "u2-l2", title: "2. 跟鄰居借一點", description: "十位借位到個位的退位練習", slides: [], quiz: [] },
      { id: "u2-l3", title: "3. 大方的百位", description: "百位借位到十位的退位練習", slides: [], quiz: [] },
      { id: "u2-l4", title: "4. 終極借位魔王", description: "連續借位挑戰", slides: [], quiz: [] },
      { id: "u2-l5", title: "5. 資源管理員", description: "減法在生活情境中的應用", slides: [], quiz: [] }
    ]
  },
  {
    id: 3,
    title: "單元三：乘法時光機（乘法基礎與應用）",
    description: "搭上時光機，計算速度變超快！",
    lessons: [
      { id: "u3-l1", title: "1. 連加的捷徑", description: "理解乘法是相同數字的重複加總", slides: [], quiz: [] },
      { id: "u3-l2", title: "2. 節奏律動", description: "2、5、10 的乘法表與規律", slides: [], quiz: [] },
      { id: "u3-l3", title: "3. 三三兩兩", description: "3、6、9 的乘法表與生活題", slides: [], quiz: [] },
      { id: "u3-l4", title: "4. 高難度挑戰", description: "4、7、8 的乘法記憶與遊戲", slides: [], quiz: [] },
      { id: "u3-l5", title: "5. 戰力加成", description: "兩位數乘以一位數的簡單邏輯", slides: [], quiz: [] }
    ]
  },
  {
    id: 4,
    title: "單元四：公平分果果（除法入門概念）",
    description: "學會分享，大家都很開心！",
    lessons: [
      { id: "u4-l1", title: "1. 大家都一樣", description: "平分的概念，每個人分到幾個？", slides: [], quiz: [] },
      { id: "u4-l2", title: "2. 幾個一組", description: "包含除的概念，可以分成幾組？", slides: [], quiz: [] },
      { id: "u4-l3", title: "3. 密碼還原", description: "理解乘法與除法的互逆關係", slides: [], quiz: [] },
      { id: "u4-l4", title: "4. 剩下的給誰", description: "認識餘數的基本概念", slides: [], quiz: [] },
      { id: "u4-l5", title: "5. 分配小劇場", description: "模擬分裝糖果或玩具的互動遊戲", slides: [], quiz: [] }
    ]
  },
  {
    id: 5,
    title: "單元五：終極數字聖殿（綜合挑戰）",
    description: "成為數學大師的最後考驗！",
    lessons: [
      { id: "u5-l1", title: "1. 加減大雜燴", description: "混合運算的基礎邏輯", slides: [], quiz: [] },
      { id: "u5-l2", title: "2. 超市採購員", description: "多項商品的總金額與找錢計算", slides: [], quiz: [] },
      { id: "u5-l3", title: "3. 估算超能力", description: "大概是多少？學習四捨五入的初步直覺", slides: [], quiz: [] },
      { id: "u5-l4", title: "4. 數字迷宮", description: "利用四則運算找出通往終點的路徑", slides: [], quiz: [] },
      { id: "u5-l5", title: "5. 終極 BOSS 戰", description: "千位數四則運算大總結", slides: [], quiz: [] }
    ]
  }
];
