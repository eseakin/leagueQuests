const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const axios = require('axios');
import fb from 'firebase';
import _ from 'lodash';

const { stubQuestList } = require('../public/stubs/quests');
const { beginQuest, completeQuest, saveQuestsToDb } = require('./questHelpers');
const { getSummonerInfoFromRiot, saveSummonerInfo, getRecentMatches, getMatchByGameId, getChampDataFromRiot } = require('./riotHelpers');
const { createNewAccount, logIn, logOut } = require('./userHelpers');
const { resetStubUserData } = require('./stubHelpers');
const { logAndSend } = require('./logHelpers');

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
const auth = fb.auth();

//fb testing
// app.get('/config', (req, res) => {
//   res.send(config);
// })



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});


// // Save quests to DB
// saveQuestsToDb(stubQuestList, db);


// Make sure champion data is current
// getChampDataFromRiot(db); // Only needs to be run at patch time


// cache quests and champ data
let questList, champData;

db.ref('/quests/quests').once('value')
  .then((snap) => {
    console.log('quest list retrieved')
    questList = snap.val()
  })
  .catch((error) => console.log(error)); 

db.ref('/champData').once('value')
  .then((snap) => {
    console.log('champ data retrieved')
    champData = snap.val().data
  })
  .catch((error) => console.log(error)); 


// client creates account
app.post('/createNewAccount', (req, res) => {
  createNewAccount(req.body, auth, db)
    .then((accountInfo) => res.send(accountInfo))
    .catch((err) => logAndSend(res, err, 'create account failed'))


})


// client logs in
app.post('/login', (req, res) => {
  console.log('login received', req.body)
  logIn(auth, db, req.body)
    .then((response) => res.send(response))
    .catch((err) => logAndSend(res, err, 'create account failed'))
})


// client logs out
app.post('/logOut', (req, res) => {
  console.log('logout received')
  fb.auth().signOut()
    .then(
      (response) => {
        console.log('logged out')

        const success = { loggedIn: false }
        res.send(success)
      }, 
      (err) => {
        console.log('log out fail', err.code, err.message)

        const failed = { loggedIn: true, message: err.message }
        res.send(failed)
      }
  );
})


// get summoner info
app.get('/summonerInfo/:region/:summonerName', (req, res) => {
  getSummonerInfo(db, req.params)
    .then((info) => res.send(info))
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

  db.ref(`summonerInfo/${region}/${summonerName.toUpperCase()}`).once('value')
  .then((snap) => {

    if(snap.val()) {
      const user = {
        questStart: new Date(),
        currentQuestId
      };

      db.ref(`/summonerInfo/${region}/${summonerName.toUpperCase()}`).update(user)
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
  res.send('5741bdf2-f1e6-4c6e-923a-9dd6ac9a54c6')
})

app.get('/visitorCount', (req, res) => {
  db.ref('/visitorCount').transaction((count) => {
    count = count || 0;
    return count + 1;
  }).then(() => res.send())
    .catch(err => console.log(err));
});

let port = process.env.PORT || 3000;

app.listen(port);
console.log('app listening on ' + port);
