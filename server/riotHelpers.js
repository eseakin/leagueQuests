const axios = require('axios');
const hasher = require('object-hash');

const getSummonerInfoFromRiot = (region, summonerName) => {
  const route = `https://${region.toLowerCase()}.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_API_KEY}`;

  return axios.get(route)
    .then((response) => {

      const { id, accountId, name, profileIconId } = response.data;
      const info = {
        accountId,
        profileIconId,
        region,
        summonerId: id,
        summonerName: name,
      };
      
      console.log('getSummonerInfoFromRiot', info)
      return info;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

const saveSummonerInfo = (info, db) => {
  const { region, summonerName } = info;
  console.log('saveSummonerInfo', info)

  return db.ref(`/summonerInfo/${region}/${summonerName.toUpperCase()}`).set(info)
    .then(() => console.log('saved'))
    .catch((error) => {
      console.log(error);
      return error;
    });
}

const getSummonerInfo = (db, params) => {
  const { region, summonerName } = params;

  return db.ref(`/summonerInfo/${region}/${summonerName.toUpperCase()}`).once('value')
    .then((snap) => {
      if(snap.val())
        return snap.val();
      else {
        return getSummonerInfoFromRiot(region, summonerName)
          .then((info) => {
            return saveSummonerInfo(info, db)
              .then(() => info)
          })
          .catch((error) => {
            console.log(error);
            return error;
          });
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

const getRecentMatches = (region, accountId) => {
  const route = `https://${region.toLowerCase()}.api.riotgames.com/lol/match/v3/matchlists/by-account/${accountId}/recent?api_key=${process.env.RIOT_API_KEY}`

  return axios.get(route)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
      return error;
    });
}

const getMatchByGameId = (region, gameId) => {
  const route = `https://${region.toLowerCase()}.api.riotgames.com/lol/match/v3/matches/${gameId}?api_key=${process.env.RIOT_API_KEY}`
  
  return axios.get(route)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });          
}


const getChampDataFromRiot = function(db) {
  db.ref('/champData/hash').once('value')
    .then(snapshot => {
      const dbHash = snapshot.val();

      const route = `https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&tags=keys&tags=tags&dataById=false&api_key=${process.env.RIOT_API_KEY}`;

      axios.get(route)
        .then((response) => {
          console.log('champ data pulled from riot')
          let riotHash = hasher(response.data);
          
          if(riotHash != dbHash)
            db.ref('/champData').set(response.data)
              .then((response) => console.log('champ data saved.'))
              .catch((error) => {
                console.log(error);
              });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

export {
  getSummonerInfoFromRiot,
  saveSummonerInfo,
  getSummonerInfo,
  getRecentMatches,
  getMatchByGameId,
  getChampDataFromRiot,
}




