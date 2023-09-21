from flask import Flask, render_template, send_file
import json
from requests import get
from json import dumps
from generateDailyAnswers import *

app = Flask(__name__)

@app.route('/riot.txt')
def riot():
    return send_file('riot.txt')

@app.route('/ifYouAreAUserPleaseDontDoThisEndpoint')
def updateAnswers():
    url = 'https://api.jsonbin.io/v3/b/64db06b59d312622a3915ec6'
    headers = {
    'X-Master-Key': '$2b$10$354hGEwJOHs9iL8O0llsh.c/2xKZd0gHK/n1GPYUtyanzP25KANy6'
    }

    req = get(url, headers=headers)
    json_object = dumps(req.json()['record'], indent=4)

    with open("dailyAnswers.json", "w") as outfile:
        outfile.write(json_object)

    return json_object

updateAnswers() # CALL THIS ON SERVER LOAD TO ENSURE ANSWERS UPDATE / ARE CREATED

@app.route('/sitemap')
def giveSiteMap():
    return send_file('sitemap.xml')

@app.route('/')
def valdle():
    return render_template('valdle.html')

@app.route('/guessMap')
def guessMap():
    return render_template('guessMap.html')

@app.route('/guessAgent')
def guessAgent():
    return render_template('guessAgent.html')

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



# Retrieves daily answers from JSON file

@app.route('/dayId')
def getDayId():
    f = open("dailyAnswers.json")
    dailyGameAnswers = json.load(f)
    f.close()
    dayIdDict = {}
    dayIdDict['dayId'] = dailyGameAnswers['dayId']
    return dayIdDict

def blankOfDay(mode):
    f = open("dailyAnswers.json")
    dailyGameAnswers = json.load(f)
    f.close()
    blankOfDay = {}
    blankOfDay = dailyGameAnswers[mode]
    blankOfDay['dayId'] = dailyGameAnswers['dayId']
    return blankOfDay


@app.route('/guessMap/mapOfDay')
def mapOfDay():
    return blankOfDay('map')

@app.route('/guessAgent/agentOfDay')
def agentOfDay():
    return blankOfDay('agent')

@app.route('/guessAbility/abilityOfDay')
def abilityOfDay():
    return blankOfDay('ability')

@app.route('/guessQuote/quoteOfDay')
def quoteOfDay():
    return blankOfDay('quote')

@app.route('/guessWeapon/weaponOfDay')
def weaponOfDay():
    return blankOfDay('weapon')
