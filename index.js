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
            'TR Trusty',
            'Cragle 3',
            'A Pregnant Nunn',
            'babaganoosh069',
            'Girthy Jello',
            'SirPuffingtin',
            'ya boi nar',
            'l swordzzz'
        ],
        minSquadSize: '2',
        game: 'Halo 3'
    });

    console.log(result);


    retVal = {
        hi2: "hi2 :)"
    };

    res.send(retVal);

});