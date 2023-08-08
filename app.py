from flask import Flask, render_template, send_file, request

from random import randint
from json import load
from random import choice, randint

app = Flask(__name__)

@app.route('/riot.txt')
def riot():
    return send_file('riot.txt')

@app.route('/')
def valdle():
    return render_template('valdle.html')

@app.route('/guessMap')
def guessMap():
    return render_template('guessMap.html')

@app.route('/guessAbility')
def guessAbility():
    return render_template('guessAbility.html')

@app.route('/guessQuote')
def guessQuote():
    return render_template('guessQuote.html')

@app.route('/guessWeapon')
def guessWeapon():
    return render_template('guessWeapon.html')

@app.route('/about')
def aboutPage():
    return render_template('about.html')

@app.errorhandler(404) 
def default_handler(e):
    return render_template('invalidRoute.html')


@app.route('/guessMap/<map>/<region>/<superRegion>')
def callout(map, region, superRegion):
    path = f'Valorant Maps/{map}/{region} - {superRegion}.png'
    return send_file(path)


@app.route('/guessMap/mapOfDay')
def getMap():
    f = open('static/maps.json')
    data = load(f)
    f.close()
    data.pop(8)

    index = randint(0, len(data)-1)
    mapOfDay = {}
    mapOfDay['mapName'] = data[index]['displayName']

    randCallout = choice(data[index]['callouts'])
    mapOfDay['regionName'] = randCallout['regionName']
    mapOfDay['superRegionName'] = randCallout['superRegionName']
    
    return mapOfDay




@app.route('/guessAbility/abilityOfDay')
def getAbility():
    f = open('static/agents.json')
    data = load(f)['data']
    f.close()

    index = randint(0, len(data)-1)
    abilityIndex = randint(0, len(data[index]['abilities']) - 1)

    abilityOfDay = {}
    abilityOfDay['randIndex'] = index
    abilityOfDay['randAbilityIndex'] = abilityIndex
    abilityOfDay['displayName'] = data[index]['displayName']
    abilityOfDay['abilityName'] = data[index]['abilities'][abilityIndex]['displayName']
    return abilityOfDay


@app.route('/guessQuote/quoteOfDay')
def getQuote():
    f = open('static/quotes.json')
    data = load(f)
    f.close()
    index = randint(0, len(data)-1)
    qInfo = choice(data[index]['voiceInfo'])
    
    quoteOfDay = {}
    quoteOfDay['randIndex'] = index
    quoteOfDay['audioFile'] = qInfo['audioFile'] 
    quoteOfDay['quote'] = qInfo['quote'] 
    quoteOfDay['displayName'] = data[index]['displayName']
    
    return quoteOfDay



# Standard, Random
@app.route('/guessWeapon/weaponOfDay')
def getWeapon():
    f = open('static/weapons.json')
    data = load(f)['data']
    f.close()
    weaponIndex = randint(0, len(data)-1)
    # weaponIndex = 17
    skinIndex = randint(0, len(data[weaponIndex]['skins'])-1)
    # print(data[weaponIndex]['skins'][skinIndex]['displayIcon'])
    while('Standard' in data[weaponIndex]['skins'][skinIndex]['displayName'] or 'Random' in data[weaponIndex]['skins'][skinIndex]['displayName'] or data[weaponIndex]['skins'][skinIndex]['displayIcon'] == None):
        skinIndex = randint(0, len(data[weaponIndex]['skins'])-1)


    weaponOfDay = {}
    weaponOfDay['weaponRandIndex'] = weaponIndex
    weaponOfDay['skinRandIndex'] = skinIndex
    weaponOfDay['gunName'] =  data[weaponIndex]['displayName']
    weaponOfDay['skinName'] =  data[weaponIndex]['skins'][skinIndex]['displayName']
    return weaponOfDay
