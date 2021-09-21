#!/usr/bin/env node

const fs = require ('fs');
const path = require ('path');
const axios = require('axios');

//get input for country
const readline = require ("readline");
//convert country to code
const { getCode, getName } = require('country-list');

//get current year
let year = new Date().getFullYear();

const rl = readline.createInterface({
    input : process.stdin,
    output: process.stdout,
});

rl.question("Type in a country: ", function (name){
    country = getCode(name);
    
    axios.get('https://date.nager.at/api/v3/PublicHolidays/' + year +'/' + country)
        .then((response) => {
            for (x=0; x<response.data.length;x++){
                console.log(" ");
                console.log ("Holiday " + (x+1));
                console.log ("Date: " + response.data[x].date);
                console.log ("Name: " + response.data[x].name);
            }
        })
        .catch((error) => {
            console.log("There was an error");
        })
  
    rl.close();
});




