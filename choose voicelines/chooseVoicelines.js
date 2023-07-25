//make 2d array [agentQuotes, agentAudio] from webscraper folder
//go through each quote and only choose whatever has at least 7 space characters (more than 8 words)
//output to new file in choose voicelines folder or just leave as array and have /static/guessQuote.js fetch this array
var fs = require ("fs")
var quoteArray;
var audioArray;
var numOfNewlines = 0;

fs.readFile('webscraper/AstraQuotes.txt', function read(err, data){
    if(err){
        throw err;
    }
    const content = data;
    splitData(content);
});

function splitData(content){
    console.log(content)
}

//[Name: Astra, quote: "insert quote", audio: "insert audio"]


// {'agentName': [['quote', 'audio'], ]}