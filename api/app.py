import json
import os
from json import dumps

from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS
from requests import get

load_dotenv()
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

@app.route("/guessRank/api/rankOfDay")
def rankOfDay():
  if "rank" not in dailyGameAnswers:
    # Hardcoded rank
    obj = {
      "iframe": "<iframe width='640' height='360' style='border: none;' src='https://medal.tv/games/valorant/clip/joqfElZhfXbcFvLE0?invite=cr-MSwxalcsMTE2NTgxNjgxLA' allow='autoplay' allowfullscreen></iframe>",
      "randIndex": 2,
      "displayName": "SILVER",
      "displayIcon": "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/11/largeicon.png",
      "dayId": dailyGameAnswers['dayId']
    }
    return obj
    
  return blankOfDay('rank')