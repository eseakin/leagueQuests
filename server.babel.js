const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const axios = require('axios');
const fb = require('firebase');
const hasher = require('object-hash');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(favicon(path.join(__dirname, './public', 'favicon.png')));
app.use(express.static(path.join(__dirname, 'public')));


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
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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

app.get('/visitorCount', (req, res) => {
  db.ref('/visitorCount').transaction((count) => {
    count = count || 0;
    return count + 1;
  })
    .catch(err => console.log(err));
});

app.get('/summonerData/:summonerName', (req, res) => {
  const { summonerName } = req.params;
  const route = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_API_KEY}`;

  axios.get(route)
    .then((response) => {
      const { id, accountId } = response.data;
      // const route = `https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/${id}?api_key=${process.env.RIOT_API_KEY}`
      const route = `https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}/recent?api_key=${process.env.RIOT_API_KEY}`

      axios.get(route)
        .then((response) => {
          console.log(response.data)
          const gameId = response.data.matches[0].gameId;
          const route = `https://na1.api.riotgames.com/lol/match/v3/matches/${gameId}?api_key=${process.env.RIOT_API_KEY}`
          axios.get(route)
            .then((response) => {
                
              console.log(response.data)
              res.send(response.data);
            })
            .catch((error) => {
              console.log(error);
            });          
          // console.log(response.data.matches[0].gameId)
          // res.send(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
})

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

let port = process.env.PORT || 9000;

app.listen(port);
console.log('app listening on ' + port)










