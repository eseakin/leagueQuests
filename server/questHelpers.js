const axios = require('axios');
const { getSummonerInfoFromRiot, getRecentMatches, getMatchByGameId, } = require('./riotHelpers');
import _ from 'lodash';

const beginQuest = (params, db) => {
  const { region, summonerName, currentQuestId } = params;

  return db.ref(`/users/${region}/${summonerName.toUpperCase()}`).once('value')
  .then((snap) => {
    let user = snap.val();
    
    console.log('user', user)
    user.currentQuestId = currentQuestId;
    user.questStart = new Date().getTime();
    const update = Object.assign({}, user);

    db.ref(`/users/${region}/${summonerName.toUpperCase()}`).update(update)
      .then(() => `${summonerName} started quest ${currentQuestId} at ${user.questStart}`)
      .catch((error) => console.log(error));
    

  })
  .catch((error) => console.log(error));
}

const completeQuest = (params, db, questList, dbRef) => {

  return dbRef.once('value')
    .then((snap) => {
      const user = snap.val();
      const { region, summonerName, accountId } = user;
      console.log('retrieved user from db', user)
      
      return getRecentMatches(region, accountId)
        .then((response) => {
          // console.log('recent matches retrieved', response.data.matches[0])
          return getMatchByGameId(region, response.data.matches[0].gameId)
            .then((matchInfo) => {
              // console.log('match info retrieved', matchInfo.data)
              return checkQuestCompletion(matchInfo.data, summonerName, user, questList, db)
              .then((result) => result)
              .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));

      //TESTING ONLY***************
      // db.ref('/stubData/matchInfo').once('value')
      //   .then(matchInfo => {
          // checkQuestCompletion(matchInfo.val(), summonerName, user)
          // .then((result) => res.send(result))
          // .catch((error) => console.log(error));
      //   })
      //   .catch(err => console.log(err));
      //***************************
    })
    .catch((error) => console.log(error));
}

const checkQuestCompletion = (matchInfo, summonerName, user, questList, db) => {
  // quest must be started within 5 min of game start
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

    if(requirement.type === 'more than')
      return requirement.values.reduce((sum, value) => userData >= value ? sum + 1 : sum, 0);
    else if(requirement.type === 'less than')
      return requirement.values.reduce((sum, value) => userData <= value ? sum + 1 : sum, 0);
    else if(requirement.type === 'multipath bool')
      return 'not implemented yet'
  });

  return checkPriorQuestCompletion(result, db);
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

const checkPriorQuestCompletion = (result, db) => {
  let priorResults = 0;
  if(result.user.userQuests && result.user.userQuests[result.user.currentQuestId])
    priorResults = result.user.userQuests[result.user.currentQuestId].completion;

  const completion = result.completion.reduce((biggest, value) => Math.max(biggest, value), 0);
  result.completion = completion;

  return db.ref('/champData/keys').once('value')
    .then((champData) => {
      result.champ = champData.val()[result.user.$champion];
      result.time = new Date().getTime();
      console.log('compare', priorResults, completion)

      if(priorResults < completion) {
        result.message = 'Quest Success!'
        result.isComplete = true;
        const update = {};
        update[`userQuests/${result.questId}/completion`] = completion;
        update[`userQuests/${result.questId}/champ`] = result.champ;
        update[`userQuests/${result.questId}/time`] = result.time;
        update[`userQuests/${result.questId}/best`] = result.userData;

        return db.ref(`/users/${result.user.region}/${result.user.summonerName.toUpperCase()}`).update(update)
          .then((snap) => result)
          .catch((error) => console.log(error));
      } else {
        result.isComplete = false;
        result.message = 'Quest failed'
        return new Promise((resolve, reject) => resolve(result));
      }
    })
    .catch(err => console.log(err));
}


const saveQuestsToDb = (quests, db) => {
  return db.ref('/quests').set(quests).then((response) => console.log('quests saved')).catch((error) => console.log(error)); 
}

export {
  beginQuest,
  completeQuest,
  saveQuestsToDb
}