const axios = require('axios');
const cheerio = require('cheerio')
const fs = require('fs')
const url = 'https://valorant.fandom.com/wiki/Astra/Quotes';
    axios(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html)
            // printQuotes();
            printAudio();
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
                quotes = text.split("\" ").join("\n")

                // for(let i = 0; i < quotes.length; i++){
                //     if(quotes.includes("\\t")){
                //         continue;   
                //     }
                //     console.log(quotes[i]);
                // }
                // quotes = quotes.split("\t".ToCharAway)(2) 

                fs.writeFile('quotes.txt', quotes, err =>{
                    if (err) throw err;
                });

                console.log(quotes);

            }

            function printAudio(){
                // const text = $('ul').find('li').remove('span').remove('audio').text()
                // const text = $(''ul').find('li').not('span', 'audio').text()'
                // $('li').find('span').remove();
                // $('li').find('a').remove();
                let text = $('ul').find('li').find('span').find('span').find('audio').attr('src');
                console.log(text)
                // text = text.replace("\t", "")
                // text = text.replace("  ", "")
                // text = text.replace(/(\r\n|\n|\r)/gm, "")
                // // let quotes = text.split("\" ")
                // quotes = text.split("\" ").join("\n")

                // for(let i = 0; i < quotes.length; i++){
                //     if(quotes.includes("\\t")){
                //         continue;   
                //     }
                //     console.log(quotes[i]);
                // }
                // quotes = quotes.split("\t".ToCharAway)(2) 

                fs.writeFile('audio', text, err =>{
                    if (err) throw err;
                });

                // console.log(audio);
            }
            

            


        })
        .catch(console.error);