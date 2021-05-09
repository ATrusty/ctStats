const path = require('path');
const express = require('express');
const app = express();
const port = 8080;
const axios = require('axios');
const lib = require('lib')({token: null /* link an account to create an identity */});

//Cors stuffs
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
  
app.listen(port, () => {
    console.log(`CT STATS app listening at http://localhost:${port}`)
});

//individual stats general
app.get('/myStats', async (req, res) => {
    let gamertag = req.query.gt;
    let numGames = req.query.numGames;
    if(numGames == undefined) {
        numGames = 20;
    }

    let result = await lib.halo.mcc['@0.0.11'].games.history({
        gamertag: gamertag,
        count: numGames
    });

    retVal = {
        data: result
    };

    res.send(retVal);
});


//stats squad group
app.get('/squadStats', async (req, res) => {

    let result = await lib.halo.mcc['@0.0.11'].squad.activity({
        gamertags: [
            'sagwasswagga',
            'Cragle 3',
            'A Pregnant Nunn',
            'babaganoosh069',
            'Girthy Jello',
            'SirPuffingtin',
            'ya boi nar',
            'l swordzzz'
        ],
        minSquadSize: '3',
        game: 'Halo 3'
    });


    let games = result.games;

    /*
        Aggregated Squad Stats objects will be of the form
        {
            win: bool,
            avgHeadshotRate: double,
            avgKD: double,
            avgScore: double,
            avgKills: double,
            avgDeaths: double,
            avgAssists: double,
            playedAt: DateTime
        }

        This is for each game, so all of our stats will be averaged together
    */
    let aggregSqdStats = [];
    
    for(let match of games) {
        let numStats = match.stats.length;
        let win = match.squadWon;
        let avgHeadshotRate = 0.0;
        let avgKD = 0.0;
        let avgScore = 0.0;
        let avgKills = 0.0;
        let avgDeaths = 0.0;
        let avgAssists = 0.0;
        let playedAt = match.playedAt;

        for(let stat of match.stats) {
            //normalize & aggregate them all here
            avgHeadshotRate+=(stat.headshotRate/numStats);
            avgKD+=(stat.killDeathRatio/numStats);
            avgScore+=(stat.score/numStats);
            avgKills+=(stat.kills/numStats);
            avgDeaths+=(stat.deaths/numStats);
            avgAssists+=(stat.assists/numStats);
        }

        let aggStat = {
            win: win,
            avgHeadshotRate: avgHeadshotRate,
            avgKD: avgKD,
            avgScore: avgScore,
            avgKills: avgKills,
            avgDeaths: avgDeaths,
            avgAssists: avgAssists,
            playedAt: playedAt
        };
        
        aggregSqdStats.push(aggStat);
        
    }


    retVal = {
        data: aggregSqdStats
    };

    res.send(retVal);

});

//stats squad individual
app.get('/squadStatsIndiv', async (req, res) => {

    let gt = req.query.gt;

    let result = await lib.halo.mcc['@0.0.11'].squad.activity({
        gamertags: [
            'sagwasswagga',
            'Cragle 3',
            'A Pregnant Nunn',
            'babaganoosh069',
            'Girthy Jello',
            'SirPuffingtin',
            'ya boi nar',
            'l swordzzz'
        ],
        minSquadSize: '3',
        game: 'Halo 3'
    });


    let games = result.games;

    let aggregSqdStats = [];
    
    for(let match of games) {
        let win = match.squadWon;
        let avgHeadshotRate = 0.0;
        let avgKD = 0.0;
        let avgScore = 0.0;
        let avgKills = 0.0;
        let avgDeaths = 0.0;
        let avgAssists = 0.0;
        let playedAt = match.playedAt;

        for(let stat of match.stats) {
            if(stat.gamertag.toUpperCase() == gt.toUpperCase()) {
                console.log(stat)
                //aggregate them all here
                avgHeadshotRate+=(stat.headshotRate);
                avgKD+=(stat.killDeathRatio);
                avgScore+=(stat.score);
                avgKills+=(stat.kills);
                avgDeaths+=(stat.deaths);
                avgAssists+=(stat.assists);
            }
        }

        let aggStat = {
            win: win,
            avgHeadshotRate: avgHeadshotRate,
            avgKD: avgKD,
            avgScore: avgScore,
            avgKills: avgKills,
            avgDeaths: avgDeaths,
            avgAssists: avgAssists,
            playedAt: playedAt
        };
        
        aggregSqdStats.push(aggStat);
        
    }


    retVal = {
        data: aggregSqdStats
    };

    res.send(retVal);

});
