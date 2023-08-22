# PYTHON SCRIPT to generate a new set of answers every day (will be run by worker)

from random import randint
from json import load, dumps
import json
from random import choice, randint
from requests import get

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

def getAgent():
    f = open('static/api/agents/agents_en.json')
    data = load(f)
    f.close()

    index = randint(0, len(data)-1)
    index2 = randint(0, len(data)-1)

    agentOfDay = {}
    agentOfDay['randIndex'] = index
    agentOfDay['displayName'] = data[index]['displayName']
    agentOfDay['randIndex2'] = index2
    agentOfDay['displayName2'] = data[index2]['displayName']
    return agentOfDay

def getAbility():
    f = open('static/api/agents/agents_en.json')
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
    f = open('static/api/quotes/quotes_en.json')
    data = load(f)
    f.close()
    index = randint(0, len(data)-1)
    
    quoteOfDay = {}
    quoteOfDay['randIndex'] = index # Must only be index, because it needs to decide language later (cannot decide voiceline right now)
    
    return quoteOfDay

def getWeapon():

    f = open('static/api/weapons/weapons_en.json')
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
    # dailyAnswers = {"map": getMap(), "agent": getAgent(), "ability": getAbility(), "weapon": getWeapon(), "quote": getQuote()}
    dailyAnswers = {"map": getMap(), "agent": getAgent(), "ability": getAbility(), "weapon": getWeapon(), "quote": getQuote(), 'dayId': randint(1,100)}

    return dailyAnswers