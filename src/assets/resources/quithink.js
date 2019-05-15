
let QUI = {
  level: null,
  qno: 0,
  length: 2, // 每個向度要出幾題
  dimensionLength: [3, 3], // 每個向度有幾題
  random: []
}

// 每個attribute對應到一個關卡(共10個)
const data = {
  '001': [
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
