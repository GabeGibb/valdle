const axios = require('axios');
const cheerio = require('cheerio')
const fs = require('fs')
const url = 'https://valorant.fandom.com/wiki/Raze/Quotes';
    axios(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html)
            printQuotes();
            // printAudio();
            function printQuotes(){
                // const text = $('ul').find('li').remove('span').remove('audio').text()
                // const text = $(''ul').find('li').not('span', 'audio').text()'
                $('li').find('span').remove();
                $('li').find('audio').remove();
                $('li').find('a').remove();
                let text = $('li').text();
                // console.log(text);
                console.clear()
                console.log(text)
                text = text.replace("\t", "")
                text = text.replace("  ", "")
                text = text.replace(/(\r\n|\n|\r)/gm, "")
                // let quotes = text.split("\" ")
                quotes = text.split("\" ").join("\"\n")

                fs.writeFile('quotes.txt', quotes, err =>{
                    if (err) throw err;
                    });
                
            }

            function printAudio(){

                var voiceline;

                // const text = $('ul').find('li').find('span').find('span').find('audio').attr('src');

                let text = "";

                
                $('audio').each((index, audio)=>{
                    voiceline = $(audio).attr('src');

                    console.log(voiceline);

                    text += (voiceline + "\n")
                });

                fs.writeFile('audio.txt', text, err =>{
                    if (err) throw err;
                    });
            }
            

            


        })
        .catch(console.error);