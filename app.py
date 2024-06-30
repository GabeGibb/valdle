from flask import Flask, render_template, send_file, request
from flask_compress import Compress
import json
from requests import get
from json import dumps
from generateDailyAnswers import *

from dotenv import load_dotenv
load_dotenv()
import os
masterKey = os.getenv('MASTER')



app = Flask(__name__)
Compress(app)
dailyGameAnswers = None

def loadDailyAnswers():
    global dailyGameAnswers
    f = open("dailyAnswers.json")
    dailyGameAnswers = json.load(f)
    f.close()
    print(dailyGameAnswers)

@app.after_request
def add_header(response):
    if "/api" in request.path:
        response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
    elif os.getenv('ENV') != 'LOCAL':
        response.headers['Cache-Control'] = 'public, max-age=3600'
    return response


@app.route('/riot.txt')
def riot():
    return send_file('riot.txt')


@app.route('/ifYouAreAUserPleaseDontDoThisEndpoint')
def updateAnswers():
    url = 'https://api.jsonbin.io/v3/b/64db06b59d312622a3915ec6'
    headers = {
    'X-Master-Key': masterKey
    }

    req = get(url, headers=headers)
    json_object = dumps(req.json()['record'], indent=4)

    with open("dailyAnswers.json", "w") as outfile:
        outfile.write(json_object)
    loadDailyAnswers()
    return json_object

updateAnswers() # CALL THIS ON SERVER LOAD TO ENSURE ANSWERS UPDATE / ARE CREATED

@app.route('/sitemap')
def giveSiteMap():
    return send_file('sitemap.xml')

@app.route('/robots.txt')
def giveRobots():
    return send_file('robots.txt')

@app.route('/ads.txt')
def giveAds():
    return send_file('ads.txt')

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

@app.route('/privacy')
def privacyPage():
    return render_template('privacy.html')

@app.errorhandler(404) 
def default_handler(e):
    return render_template('invalidRoute.html')


@app.route('/guessMap/<map>/<region>/<superRegion>')
def callout(map, region, superRegion):
    path = f'Valorant Maps/{map}/{region} - {superRegion}.webp'
    return send_file(path)

# API ENDPOINTS

# Retrieves daily answers from JSON file
@app.route('/api/dayId')
def getDayId():
    global dailyGameAnswers
    dayIdDict = {}
    dayIdDict['dayId'] = dailyGameAnswers['dayId']
    return dayIdDict

def blankOfDay(mode):
    global dailyGameAnswers
    blankOfDay = {}
    blankOfDay = dailyGameAnswers[mode]
    blankOfDay['dayId'] = dailyGameAnswers['dayId']
    return blankOfDay


@app.route('/guessMap/api/mapOfDay')
def mapOfDay():
    return blankOfDay('map')

@app.route('/guessAgent/api/agentOfDay')
def agentOfDay():
    return blankOfDay('agent')

@app.route('/guessAbility/api/abilityOfDay')
def abilityOfDay():
    return blankOfDay('ability')

@app.route('/guessQuote/api/quoteOfDay')
def quoteOfDay():
    return blankOfDay('quote')

@app.route('/guessWeapon/api/weaponOfDay')
def weaponOfDay():
    return blankOfDay('weapon')
