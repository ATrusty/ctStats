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

//stats init testing
app.get('/myStats', async (req, res) => {
    
    let result = await lib.halo.mcc['@0.0.11'].stats({
        gamertag: "TR Trusty"
    });

    console.log(result);

    retVal = {
        hi: "hi :)"
    };

    res.send(retVal);
});


//stats squad
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