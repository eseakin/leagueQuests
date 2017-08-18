const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const axios = require('axios');
const fb = require('firebase');
const hasher = require('object-hash');
const { stubQuestList } = require('../public/stubs/quests');
import _ from 'lodash';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(favicon(path.join(__dirname, '../public', 'favicon.png')));
app.use(express.static(path.join(__dirname, '../public')));


// Initialize Firebase
const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
};

fb.initializeApp(config);
const db = fb.database();

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Save quests to DB
// db.ref('/quests').set(stubQuestList).then((response) => console.log('quests saved')).catch((error) => console.log(error)); 

// const escapeGoat = {
//   summonerName: 'eScape Goat',
//   accountId: '43757987',
//   profileIcon: '2095',
//   region: 'NA1',
//   summonerId: '29549543',
//   userQuests: new Array(23).fill({completion: 0, champ: '', time: ''})
// }
// db.ref('/users/NA1/ESCAPE GOAT').set(escapeGoat).then((response) => console.log('user saved')).catch((error) => console.log(error)); 

let questList, champData;

db.ref('/quests/quests').once('value')
  .then((snap) => questList = snap.val())
  .catch((error) => console.log(error)); 

db.ref('/champData').once('value')
  .then((snap) => champData = snap.val().data)
  .catch((error) => console.log(error)); 

// Make sure data is current
const compareRiotDataHash = function() {
  db.ref('/champData/hash').once('value')
    .then(snapshot => {
      const dbHash = snapshot.val();

      const route = `https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&tags=skins&dataById=false&api_key=${process.env.RIOT_API_KEY}`;

      axios.get(route)
        .then((response) => {
          console.log('success')
          let riotHash = hasher(response.data);
          
          if(riotHash != dbHash)
            db.ref('/champData').set(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}
// Only needs to be run at patch time
// compareRiotDataHash();


// Client requests champion data
app.get('/champData', (req, res) => {
  console.log('champData');
  db.ref('/champData').once('value')
    .then(snap => res.send(snap.val()))
    .catch(err => console.log(err));
});



app.get('/summonerData/:region/:summonerName', (req, res) => {
  const { region, summonerName } = req.params;
  const route = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_API_KEY}`;

  db.ref(`users/${region}/${summonerName.toUpperCase()}`).once('value')
  .then((snap) => {
    if(snap.val())
      res.send(snap.val())
    else
      res.send('user not found');
  })
  .catch((error) => console.log(error)); 

  // axios.get(route)
  //   .then((response) => {
  //     const { id, accountId } = response.data;
  //     // const route = `https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/${id}?api_key=${process.env.RIOT_API_KEY}`
  //     const route = `https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}/recent?api_key=${process.env.RIOT_API_KEY}`

  //     axios.get(route)
  //       .then((response) => {
  //         console.log(response.data)
  //         const gameId = response.data.matches[0].gameId;
  //         const route = `https://na1.api.riotgames.com/lol/match/v3/matches/${gameId}?api_key=${process.env.RIOT_API_KEY}`
  //         axios.get(route)
  //           .then((response) => {
                
  //             console.log(response.data)
  //             res.send(response.data);
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //           });          
  //         // console.log(response.data.matches[0].gameId)
  //         // res.send(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
})

// Client gets quests
app.get('/quests', (req, res) => {
  console.log('get quests');

  db.ref('/quests').once('value')
    .then((snap) => res.send(snap.val()))
    .catch((error) => console.log(error));
});

// Client begins quest
app.get('/beginQuest/:region/:summonerName/:questId', (req, res) => {
  console.log('beginQuest', req.params.summonerName, req.params.questId);

  const region = req.params.region;
  const summonerName = req.params.summonerName;
  const questId = req.params.questId;

  db.ref(`/users/${region}/${summonerName.toUpperCase()}`).once('value')
  .then((snap) => {
    //ADD CODE FOR USER NOT FOUND
    if(!snap.val()) {
      res.send('user not found');
      return
    }

    const user = snap.val();
    user.currentQuestId = questId;
    user.questStart = new Date().getTime();
    const update = Object.assign({}, user);

    db.ref(`/users/${region}/${summonerName.toUpperCase()}`).update(update)
    .then(() => res.send(`${summonerName} started quest ${questId} at ${user.questStart}`))
    .catch((error) => console.log(error));
    

  })
  .catch((error) => console.log(error));

});


//client completes quest
app.get('/completeQuest/:region/:summonerName', (req, res) => {
  const { region, summonerName } = req.params;
  const route = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_API_KEY}`;
  
  db.ref(`/users/${region}/${summonerName.toUpperCase()}`).once('value')
  .then((snap) => {
    const user = snap.val();
    if(!user.currentQuestId)
      res.send('no quest selected')
    
    //MATCH INFO TESTING ONLY***************
    db.ref('/stubData/matchInfo').once('value')
      .then(matchInfo => {
        checkQuestCompletion(matchInfo.val(), summonerName, user)
        .then((result) => res.send(result))
        .catch((error) => console.log(error));
      })
      .catch(err => console.log(err));
    //***************************
  })
  .catch((error) => console.log(error));


})

const checkQuestCompletion = (matchInfo, summonerName, user) => {
  // if(parseInt(matchInfo.gameCreation) + 5 * 60 * 60 * 1000 < user.questStart)
  //   return 'Quest started too late: ' + matchInfo.gameCreation + ' ' + user.questStart

  let result = {};
  const questId = user.currentQuestId;
  const quest = questList[questId];

  const participant = _.find(matchInfo.participantIdentities, (participant) => participant.player.summonerName.toUpperCase() === summonerName.toUpperCase());

  user.$participantId = participant.participantId;
  user.$participantIndex = user.$participantId - 1;
  user.$team = user.$participantIndex < 5 ? 0 : 1;
  user.$champion = matchInfo.participants[user.$participantIndex].championId;

  result.questId = questId;
  result.user = user;
  result.userData = [];

  result.completion = quest.requirements.map((requirement, i) => {
    let userData = matchInfoPathParser(requirement.path, matchInfo, user);
    result.userData[i] = userData;

    if(requirement.type === 'greater than')
      return requirement.values.reduce((sum, value) => userData >= value ? sum + 1 : sum, 0);
    else if(requirement.type === 'less than')
      return requirement.values.reduce((sum, value) => userData <= value ? sum + 1 : sum, 0);
    else if(requirement.type === 'multipath bool')
      return 'not implemented yet'
  });

  return checkPriorQuestCompletion(result);
}

const matchInfoPathParser = (path, matchInfo, user) => {
  // path = 'participants/$participantIndex/stats/assists'

  path = path.split('/');
  let result = Object.assign({}, matchInfo);

  path.forEach((key) => {
    if(key[0] === '$') {
      key = user[key];
    }
    result = result[key];
  });

  return result;
}

const checkPriorQuestCompletion = (result) => {
  let priorResults = 0;
  if(result.user.userQuests[result.user.currentQuestId])
    priorResults = result.user.userQuests[result.user.currentQuestId].completion;
  
  const completion = result.completion.reduce((biggest, value) => Math.max(biggest, value), 0);
  result.completion = completion;
  result.champ = _.find(champData, (champ) => champ.id === result.user.$champion).key;
  result.time = new Date().getTime();
  console.log('compare', priorResults, completion)

  if(priorResults < completion) {
    result.message = 'Quest Success!'
    const update = {};
    update[`userQuests/${result.questId}/completion`] = completion;
    update[`userQuests/${result.questId}/champ`] = result.champ;
    update[`userQuests/${result.questId}/time`] = result.time;

    return db.ref(`/users/${result.user.region}/${result.user.summonerName.toUpperCase()}`).update(update)
      .then((snap) => {
        return result;
      })
      .catch((error) => console.log(error));


  } else {
    result.message = 'Quest failed'
    return new Promise((resolve, reject) => resolve(result));
  }
}

app.post('/youtube', (req, res) => {
  // console.log('youtube')
  let skinName = req.body.skinName;
  let key = process.env.youtube_key;
  let path = 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC0NwzCHb8Fg89eTB5eYX17Q&maxResults=5&q=' + skinName + '&key=' + key;
  // let path = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=' + skinName + '&key=' + key;

  axios.get(path)
  .then((result) => {
    res.send(result.data);
  })
  .catch(err => console.log(err));
});

app.get('/riot.txt', (req, res) => {
  res.send('11ebdc3c-c815-4533-b331-55e5434144df')
})

app.get('/visitorCount', (req, res) => {
  db.ref('/visitorCount').transaction((count) => {
    count = count || 0;
    return count + 1;
  })
    .catch(err => console.log(err));
});

let port = process.env.PORT || 9000;

app.listen(port);
console.log('app listening on ' + port)










