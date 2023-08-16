# PYTHON SCRIPT to generate a new set of answers every day (will be run by worker)

from random import randint
from json import load, dumps
import json
from random import choice, randint

def getMap():
    f = open('static/api/maps.json')
    data = json.load(f)
    f.close()
    data.pop(8)

    index = randint(0, len(data)-1)
    mapOfDay = {}
    mapOfDay['mapName'] = data[index]['displayName']

    randCallout = choice(data[index]['callouts'])
    mapOfDay['regionName'] = randCallout['regionName']
    mapOfDay['superRegionName'] = randCallout['superRegionName']
    
    return mapOfDay

def getAbility():
    f = open('static/api/agents.json')
    data = load(f)
    f.close()

    index = randint(0, len(data)-1)
    abilityIndex = randint(0, 3)

    abilityOfDay = {}
    abilityOfDay['randIndex'] = index
    abilityOfDay['randAbilityIndex'] = abilityIndex
    abilityOfDay['displayName'] = data[index]['displayName']
    abilityOfDay['abilityName'] = data[index]['abilities'][abilityIndex]['displayName']
    return abilityOfDay

def getQuote():
    f = open('static/api/quotes.json')
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

def getWeapon():

    f = open('static/api/weapons.json')
    data = load(f)
    f.close()
    weaponIndex = randint(0, len(data)-1)
    skinIndex = randint(0, len(data[weaponIndex]['skins'])-1)

    weaponOfDay = {}
    weaponOfDay['weaponRandIndex'] = weaponIndex
    weaponOfDay['skinRandIndex'] = skinIndex
    weaponOfDay['gunName'] =  data[weaponIndex]['displayName']
    weaponOfDay['skinName'] =  data[weaponIndex]['skins'][skinIndex]['displayName']
    return weaponOfDay

def generateDailyAnswers():
    dailyAnswers = {"map": getMap(), "ability": getAbility(), "weapon": getWeapon(), "quote": getQuote()}

    return dailyAnswers
    # json_object = dumps(dailyAnswers, indent=4)

    # with open("dailyAnswers.json", "w") as outfile:
    #     outfile.write(json_object)
    #     print('success')