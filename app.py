from flask import Flask, render_template, send_file, request
import json
from flask_cors import CORS
from requests import get
from json import dumps
from generateDailyAnswers import *

from dotenv import load_dotenv
load_dotenv()
import os
masterKey = os.getenv('MASTER')


app = Flask(__name__)
CORS(app)
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



@app.errorhandler(404) 
def default_handler(e):
    return render_template('invalidRoute.html')

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
