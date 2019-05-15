
let QUI = {
  level: null,
  qno: 0,
  length: 2, // 每個向度要出幾題
  dimensionLength: [3, 3], // 每個向度有幾題
  random: []
}

// 每個attribute對應到一個關卡(共10個)
const data = {
  '白爛題': [
    {
      question: '請問「欸～你是誰？」是誰的口頭禪？',
      choices: [
        '趟延思',
        '趙廷思',
        '趙廷恩',
        '趙延恩'
      ],
      ans: 3
    },
    {
      question: 'Google首頁的字母O分別是甚麼顏色',
      choices: [
        '紅色/黃色',
        '黃色/藍色',
        '藍色/綠色',
        '綠色/紅色'
      ],
      ans: 1
    },
    {
      question: '請問Mac系列筆電從哪一年開始蘋果LOGO燈不再發亮',
      choices: [
        '2014',
        '2015',
        '2016',
        '2017'
      ],
      ans: 2
    }
  ],
  '002': [
    {
      question: '有天阿志打電話到四次函數家找常數，\n請問阿志要喂幾次才能找到他？',
      choices: [
        '喂',
        '喂喂',
        '喂喂喂',
        '喂喂喂喂'
      ],
      ans: 4
    },
    {
      question: 'This is a question<br>Ans: Option d',
      choices: [
        'Option a',
        'Option b',
        'Option c',
        'Option d'
      ],
      ans: 4
    },
    {
      question: 'This is a good question<br>Ans: Option ii',
      choices: [
        'Option i',
        'Option ii',
        'Option iii',
        'Option iv'
      ],
      ans: 2
    }
  ]
}

export { QUI, data }
