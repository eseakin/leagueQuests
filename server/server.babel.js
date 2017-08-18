const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const axios = require('axios');
const fb = require('firebase');
import _ from 'lodash';

const { stubQuestList } = require('../public/stubs/quests');
const { beginQuest, completeQuest, saveQuestsToDb } = require('./questHelpers');
const { getSummonerInfoFromRiot, saveSummonerInfo, getRecentMatches, getMatchByGameId, getChampDataFromRiot } = require('./riotHelpers');
const {  } = require('./userHelpers');
const { resetStubUserData } = require('./stubHelpers');

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


// // Save quests to DB
// saveQuestsToDb(stubQuestList, db);


// Make sure champion data is current
// getChampDataFromRiot(db); // Only needs to be run at patch time


// cache quests and champ data
let questList, champData;

db.ref('/quests/quests').once('value')
  .then((snap) => questList = snap.val())
  .catch((error) => console.log(error)); 

db.ref('/champData').once('value')
  .then((snap) => champData = snap.val().data)
  .catch((error) => console.log(error)); 



// get summoner info
app.get('/summonerData/:region/:summonerName', (req, res) => {
  const { region, summonerName } = req.params;

  db.ref(`users/${region}/${summonerName.toUpperCase()}`).once('value')
  .then((snap) => {
    // summoner was in db
    if(snap.val())
      res.send(snap.val())

    // pull summoner from riot
    else {
      getSummonerInfoFromRiot(region, summonerName)
        .then((response) => {
          const { id, accountId, name, profileIconId } = response;
          const info = {
            accountId,
            profileIconId,
            region,
            summonerId: id,
            summonerName: name,
          };

          saveSummonerInfo(info, db)
            .then((response) => res.send(info))
            .catch((error) => console.log(error)); 
        })
        .catch((error) => console.log(error)); 
    }
  })
  .catch((error) => console.log(error)); 
});


// Client pulls main quest list
app.get('/quests', (req, res) => {
  console.log('get quests');

  db.ref('/quests').once('value')
    .then((snap) => res.send(snap.val()))
    .catch((error) => console.log(error));
});

// Client pulls champion data
app.get('/champData', (req, res) => {
  console.log('champData');
  db.ref('/champData').once('value')
    .then(snap => res.send(snap.val()))
    .catch(err => console.log(err));
});

// Client begins quest
app.get('/beginQuest/:region/:summonerName/:currentQuestId', (req, res) => {
  const { region, summonerName, currentQuestId } = req.params;

  db.ref(`users/${region}/${summonerName.toUpperCase()}`).once('value')
  .then((snap) => {

    if(snap.val()) {
      const user = {
        questStart: new Date(),
        currentQuestId
      };

      db.ref(`/users/${region}/${summonerName.toUpperCase()}`).update(user)
        .then(() => res.send(`${summonerName} started quest ${currentQuestId} at ${user.questStart}`))
        .catch((error) => console.log(error));

    } else {
      getSummonerInfoFromRiot(region, summonerName)
        .then((response) => {
          const { id, accountId, name, profileIconId } = response;
          const info = {
            accountId,
            profileIconId,
            region,
            summonerId: id,
            summonerName: name,
            questStart: new Date(),
            currentQuestId
          };

          saveSummonerInfo(info, db)
            .then((response) => {
              res.send(`${summonerName} started quest ${currentQuestId} at ${user.questStart}`);
            })
            .catch((error) => console.log(error)); 
        })
        .catch((error) => console.log(error)); 
    }
  });

  // beginQuest(req.params, res, db);
});


//client completes quest
app.get('/completeQuest/:region/:summonerName', (req, res) => {
  completeQuest(req.params, db, questList)
    .then((result) => res.send(result))
    .catch((error) => console.log(error)); 
});


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
console.log('app listening on ' + port);
