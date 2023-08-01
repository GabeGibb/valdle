from flask import Flask, render_template, send_file, request

from random import randint
from json import load
from random import choice, randint

agents = ['Gekko', 'Fade', 'Breach', 'Deadlock', 'Raze', 'Chamber', 'KAYO', 'Skye', 'Cypher', 'Sova', 'Killjoy', 'Harbor', 'Viper', 'Phoenix', 'Astra', 'Brimstone', 'Neon', 'Yoru', 'Sage', 'Reyna', 'Omen', 'Jett']


app = Flask(__name__)

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


@app.route('/guessQuote/quoteOfDay')
def getQuote():
    f = open('static/quotes.json')
    data = load(f)
    index = randint(0, len(data)-1)
    qInfo = choice(data[index]['voiceInfo'])
    
    quoteOfDay = {}
    quoteOfDay['randIndex'] = index
    quoteOfDay['audioFile'] = qInfo['audioFile'] 
    quoteOfDay['quote'] = qInfo['quote'] 
    quoteOfDay['displayName'] = data[index]['displayName']
    
    return quoteOfDay


@app.route('/guessAbility/abilityOfDay')
def getAbility():
    abilityOfDay = {}
    index = randint(0, len(agents)-1)
    abilityOfDay['randIndex'] = index
    abilityOfDay['displayName'] = agents[index]
    return abilityOfDay


# Standard, Random
@app.route('/guessWeapon/weaponOfDay')
def getWeapon():
    f = open('static/weapons.json')
    data = load(f)['data']
    weaponIndex = randint(0, len(data)-1)
    skinIndex = randint(0, len(data[weaponIndex]['skins'])-1)
    # print(data[weaponIndex]['skins'][skinIndex]['displayIcon'])
    while('Standard' in data[weaponIndex]['skins'][skinIndex]['displayName'] or 'Random' in data[weaponIndex]['skins'][skinIndex]['displayName'] or data[weaponIndex]['skins'][skinIndex]['displayIcon'] == None):
        skinIndex = randint(0, len(data[weaponIndex]['skins'])-1)


    weaponOfDay = {}
    weaponOfDay['weaponRandIndex'] = weaponIndex
    weaponOfDay['skinRandIndex'] = skinIndex
    return weaponOfDay
