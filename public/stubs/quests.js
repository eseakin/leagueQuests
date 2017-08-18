const quests = [
  {
    id: 0,
    name: 'Hellrazer',
    description: 'Deal $/$/$ damage to objectives in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 360,
      left: 460
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Caitlyn.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Shyvana_0.jpg',
    requirements: [
      {
        type: 'greater than',
        displayValues: ['5k', '10k', '15k'],
        values: [5000, 10000, 15000],
        path: 'participants/$participantIndex/stats/damageDealtToObjectives'
      }
    ],
  },
  {
    id: 1,
    name: 'Helping Hand',
    description: 'Get $/$/$ assists in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 40,
      left: 40
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Xayah.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Blitzcrank_6.jpg',
    // completed: {
    //   completedTimestamp: ,
    //   matchid: ,
    //   playerid: ,
    //   completionLevel: 
    // },
    // dataPaths: [],
    requirements: [
      {
        type: 'greater than',
        displayValues: [15, 25, 35],
        values: [15, 25, 35],
        path: 'participants/$participantIndex/stats/assists'
      },
    ],
    // nextQuests: []
  },
  {
    id: 2,
    name: 'The Fields Have Eyes',
    description: 'Place $/$/$ wards in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 40,
      left: 180
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/LeeSin.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Evelynn_0.jpg',
    requirements: [
      {
        type: 'greater than',
        displayValues: [15, 20, 25],
        values: [15, 20, 25],
        path: 'participants/$participantIndex/stats/wardsPlaced'
      }
    ],
  },
  {
    id: 3,
    name: 'Lights Out',
    description: 'Kill $/$/$ wards in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 200,
      left: 40
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Tristana.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nocturne_2.jpg',
    requirements: [
      {
        type: 'greater than',
        displayValues: [10, 15, 25],
        values: [10, 15, 25],
        path: 'participants/$participantIndex/stats/wardsKilled'
      }
    ],
  },
  {
    id: 4,
    name: 'Have a Banana',
    description: 'Heal champions for $/$/$ in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 360,
      left: 40
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Sona.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kennen_4.jpg',
    requirements: [
      {
        type: 'greater than',
        displayValues: ['5k', '10k', '15k'],
        values: [5000, 10000, 15000],
        path: 'participants/$participantIndex/stats/totalHeal'
      }
    ],
  },
  {
    id: 5,
    name: 'Hold Em Steady!',
    description: 'Crowd control enemies for $/$/$ seconds in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 200,
      left: 180
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Alistar.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Morgana_3.jpg',
    requirements: [
      {
        type: 'greater than',
        displayValues: [100, 200, 300],
        values: [100, 200, 300],
        path: 'participants/$participantIndex/stats/totalTimeCrowdControlDealt'
      }
    ],
  },
  {
    id: 6,
    name: 'Deuces!',
    description: 'Get $/$/$ Double Kills in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 360,
      left: 180
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Tristana.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/TwistedFate_6.jpg',
    requirements: [
      {
        type: 'greater than',
        displayValues: [1, 2, 3],
        values: [1, 2, 3],
        path: 'participants/$participantIndex/stats/doubleKills'
      }
    ],
  },
  {
    id: 7,
    name: 'Bullets N Blades',
    description: 'Deal $/$/$ physical damage to champions in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 40,
      left: 320
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Ezreal.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Caitlyn_6.jpg',
    requirements: [
      {
        type: 'greater than',
        displayValues: ['35k', '50k', '65k'],
        values: [35000, 50000, 65000],
        path: 'participants/$participantIndex/stats/physicalDamageDealtToChampions'
      }
    ],
  },
  {
    id: 8,
    name: 'Demolition Man',
    description: 'Last hit $/$/$ turrets in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 200,
      left: 320
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Kayle.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_2.jpg',
    requirements: [
      {
        type: 'greater than',
        displayValues: [2, 3, 4],
        values: [2, 3, 4],
        path: 'participants/$participantIndex/stats/turretKills'
      }
    ],
  },
  {
    id: 9,
    name: 'Dragon Slayer',
    description: 'Kill $/$/$ dragons in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 360,
      left: 320
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Fiddlesticks.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/JarvanIV_2.jpg',
    requirements: [
      {
        type: 'greater than',
        displayValues: [1, 2, 3],
        values: [1, 2, 3],
        path: 'teams/$team/dragonKills'
      }
    ],
  },
  {
    id: 10,
    name: 'Hella Buff',
    description: 'Get $/$/$ in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 40,
      left: 460
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Varus.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/LeeSin_4.jpg',
    requirements: [
      {
        type: 'multipath bool',
        displayValues: ['First Herald', 'First Dragon', 'First Baron'],
        values: ['firstHerald', 'firstDragon', 'firstBaron'],
        paths: [
          'teams/$team/'
        ]
      }
    ],
  },
  {
    id: 11,
    name: 'Nothing But Rubble',
    description: 'Team kill $/$/$ enemy turrets in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 200,
      left: 460
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Kled.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/JarvanIV_1.jpg',
    requirements: [
      {
        type: 'greater than',
        displayValues: [7, 9, 11],
        values: [7, 9, 11],
        path: 'teams/$team/towerKills'
      }
    ]
  },
  {
    id: 12,
    name: 'Legendary Loot',
    description: 'End the game with $/$/$ items',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 200,
      left: 460
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Bard.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kayle_3.jpg',
    requirements: [
      {
        type: 'multipath bool',
        displayValues: [4, 5, 6],
        values: [4, 5, 6],
        path: ''
      }
    ],
  },
  {
    id: 13,
    name: 'Spellbound',
    description: 'Deal $/$/$ magic damage to champions in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 40,
      left: 40
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Heimerdinger.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg',
    // completed: {
    //   completedTimestamp: ,
    //   matchid: ,
    //   playerid: ,
    //   completionLevel: 
    // },
    // dataPaths: [],
    requirements: [
      {
        type: 'greater than',
        displayValues: ['35k', '50k', '65k'],
        values: [35000, 50000, 65000],
        path: 'participants/$participantIndex/stats/magicDamageDealtToChampions'
      }
    ],
    // nextQuests: []
  },
  {
    id: 14,
    name: 'Powder Keg',
    description: 'Deal $/$/$ true damage to champions in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 40,
      left: 180
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Blitzcrank.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Darius_1.jpg',
    requirements: [
      {
        type: 'greater than',
        displayValues: ['5k', '10k', '15k'],
        values: [5000, 10000, 15000],
        path: 'participants/$participantIndex/stats/trueDamageDealtToChampions'
      }
    ],
  },
  {
    id: 15,
    name: 'Do You Feel Lucky?',
    description: 'Get a critical strike over $/$/$ in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 200,
      left: 40
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Tristana.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Graves_1.jpg',
    requirements: [
      {
        type: 'greater than',
        displayValues: [800, 1000, 1200],
        values: [800, 1000, 1200],
        path: 'participants/$participantIndex/stats/largestCriticalStrike'
      }
    ],
  },
  {
    id: 16,
    name: 'Midas Touch',
    description: 'Earn $/$/$ gold in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 360,
      left: 40
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/TwistedFate.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Draven_2.jpg',
    requirements: [
      {
        type: 'greater than',
        displayValues: ['15k', '18k', '20k'],
        values: [15000, 18000, 20000],
        path: 'participants/$participantIndex/stats/goldEarned'
      }
    ],
  },
  {
    id: 17,
    name: 'Monster Hunter',
    description: 'Kill $/$/$ neutral monsters in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 200,
      left: 180
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Morgana.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Chogath_6.jpg',
    requirements: [
      {
        type: 'greater than',
        displayValues: [75, 125, 150],
        values: [75, 125, 150],
        path: 'participants/$participantIndex/stats/neutralMinionsKilled'
      }
    ],
  },
  {
    id: 18,
    name: 'The Golden Goose',
    description: 'Get $/$/$ gold per minute in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 360,
      left: 180
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Fiddlesticks.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Anivia_7.jpg',
    requirements: [
      {
        type: 'division',
        displayValues: [300, 350, 400],
        values: [300, 350, 400],
        paths: [
          'participants/$participantIndex/stats/goldEarned',
          'gameDuration'
        ]
      }
    ],
  },
  {
    id: 19,
    name: 'Highway Robbery',
    description: 'Get more than $/$/$ CS in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 40,
      left: 320
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Varus.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jhin_1.jpg',
    requirements: [
      {
        type: 'addition',
        displayValues: [200, 275, 350],
        values: [200, 275, 350],
        paths: [
          'participants/$participantIndex/stats/totalMinionsKilled',
          'participants/$participantIndex/stats/neutralMinionsKilled'
        ]
      }
    ],
  },
  {
    id: 20,
    name: 'Headhunter',
    description: 'Get more than $/$/$ kills in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 200,
      left: 320
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/MasterYi.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/MasterYi_5.jpg',
    // completed: {
    //   completedTimestamp: ,
    //   matchid: ,
    //   playerid: ,
    //   completionLevel: 
    // },
    // dataPaths: [],
    requirements: [
      {
        type: 'greater than',
        displayValues: [8, 12, 16],
        values: [8, 12, 16],
        path: 'participants/$participantIndex/stats/kills'
      }
    ],
    // nextQuests: []
  },
  {
    id: 21,
    name: 'Hoarder',
    description: 'Win the game with $/$/$ unspent gold',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 360,
      left: 320
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Jinx.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gragas_4.jpg',
    requirements: [
      {
        type: 'subtraction',
        displayValues: [1000, 3000, 5000],
        values: [1000, 3000, 5000],
        paths: [
          'participants/$participantIndex/stats/goldEarned',
          'participants/$participantIndex/stats/goldSpent'
        ]
      }
    ],
  },
  {
    id: 22,
    name: 'Knock Knock!',
    description: 'Personally get $ / $ / $ in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 40,
      left: 460
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Twitch.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Graves_4.jpg',
    requirements: [
      {
        type: 'multipath bool',
        displayValues: ['First Blood', 'First Tower', 'First Inhib'],
        values: ['firstBlood', 'firstTower', 'firstInhib'],
        path: 'participants/$participantIndex/stats/'
      }
    ],
  },
  {
    id: 23,
    name: 'Can\'t Touch This!',
    description: 'Die no more than $ / $ / $ times in a single game',
    // category: ,
    completion: 0,
    startedTimestamp: null,
    isComplete: false,
    style: {
      top: 200,
      left: 460
    },
    iconPath: 'http://ddragon.leagueoflegends.com/cdn/7.13.1/img/champion/Twitch.png',
    backgroundImg: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jayce_0.jpg',
    requirements: [
      {
        type: 'less than',
        displayValues: [4, 2, 0],
        values: [4, 2, 0],
        path: 'participants/$participantIndex/stats/deaths'
      }
    ],
  }
]

const tristanasQuests = {
  cardTitle: 'Tristana\'s Buckaneers',
  cardBackground: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Tristana_6.jpg',
  cardColor: '#1f1f3d',
  quests: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
}

const nocturnesQuests = {
  cardTitle: 'Nocturne\'s Nightwatch',
  cardBackground: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Nocturne_5.jpg',
  cardColor: '#5b0e0e',
  quests: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
}

const singedsQuests = {
  cardTitle: 'Singed\'s Scientists',
  cardBackground: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Singed_0.jpg',
  cardColor: '#193700',
  quests: [
    

  ]
}

const stubQuestList = {
  questCards: [
    tristanasQuests,
    nocturnesQuests,
  ],
  quests
  // singedsQuests 
}

export {
  stubQuestList
}