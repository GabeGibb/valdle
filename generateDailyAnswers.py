# PYTHON SCRIPT to generate a new set of answers every day (will be run by worker)

from random import randint
from json import load, dumps
import json
from random import randint, shuffle

def getMap(past):
    f = open('static/api/maps/maps_en.json')
    data = json.load(f)
    f.close()

    index = randint(0, len(data)-1)
    while index == past['mapIndex']:
        index = randint(0, len(data)-1)

    randCalloutIndex = randint(0, len(data[index]['callouts'])-1)

    mapOfDay = {}
    mapOfDay['mapIndex'] = index
    mapOfDay['mapName'] = data[index]['displayName']

    mapOfDay['randCalloutIndex'] = randCalloutIndex
    mapOfDay['randCalloutEnglishRegion'] = data[index]['callouts'][randCalloutIndex]['regionName']
    mapOfDay['randCalloutEnglishSuperRegion'] = data[index]['callouts'][randCalloutIndex]['superRegionName']
    
    return mapOfDay

def getAgent(past):
    f = open('static/api/agents/agents_en.json')
    data = load(f)
    f.close()

    index = randint(0, len(data)-1)
    index2 = randint(0, len(data)-1)
    while past['randIndex'] == index or past['randIndex2'] == index2:
        index = randint(0, len(data)-1)
        index2 = randint(0, len(data)-1)

    agentOfDay = {}
    agentOfDay['randIndex'] = index
    agentOfDay['displayName'] = data[index]['displayName']
    agentOfDay['randIndex2'] = index2
    agentOfDay['displayName2'] = data[index2]['displayName']
    return agentOfDay

def getAbility(past):
    f = open('static/api/agents/agents_en.json')
    data = load(f)
    f.close()

    nums16 = [x for x in range(1,17)]
    randNums16 = []
    for i in range(16):
        randNumsIndex = randint(0, len(nums16) -1)
        randNums16.append(nums16[randNumsIndex])
        nums16.pop(randNumsIndex)
    
    index = randint(0, len(data)-1)
    while index == past['randIndex']:
        index = randint(0, len(data)-1)
    abilityIndex = randint(0, 3)


    abilityOfDay = {}
    abilityOfDay['randIndex'] = index
    abilityOfDay['randAbilityIndex'] = abilityIndex
    abilityOfDay['displayName'] = data[index]['displayName']
    abilityOfDay['abilityName'] = data[index]['abilities'][abilityIndex]['displayName']
    abilityOfDay['tileOrder'] = randNums16
    return abilityOfDay

def getQuote(past):
    f = open('static/api/quotes/quotes_en.json')
    data = load(f)
    f.close()
    index = randint(0, len(data)-1)

    while index == past['randIndex']:
        index = randint(0, len(data)-1)

    quoteIndex = randint(0, len(data[index]["voiceInfo"])-1) 
    
    """
    If a quotes json is updated, the quote must be added for all available languages.
    It's not necessary for all the agents to have the same amount of quotes.
    """

    quoteOfDay = {}
    quoteOfDay['randIndex'] = index
    quoteOfDay['randQuoteIndex'] = quoteIndex 
    
    return quoteOfDay

def getWeapon(past):

    f = open('static/api/weapons/weapons_en.json')
    data = load(f)
    f.close()
    weaponIndex = randint(0, len(data)-1)
    while weaponIndex == past['weaponRandIndex']:
        weaponIndex = randint(0, len(data)-1)

    skinIndex = randint(0, len(data[weaponIndex]['skins'])-1)

    weaponSkins = [data[weaponIndex]['skins'][skinIndex]['displayName']]
    indexes = [x for x in range(0, len(data[weaponIndex]['skins']))]
    indexes.pop(skinIndex)
    for _ in range(14):
        randNumsIndex = randint(0, len(indexes) -1)
        weaponSkins.append(data[weaponIndex]['skins'][indexes[randNumsIndex]]['displayName'])
        indexes.pop(randNumsIndex)
    shuffle(weaponSkins)

    weaponOfDay = {}
    weaponOfDay['weaponRandIndex'] = weaponIndex
    weaponOfDay['skinRandIndex'] = skinIndex
    weaponOfDay['gunName'] =  data[weaponIndex]['displayName']
    weaponOfDay['skinName'] =  data[weaponIndex]['skins'][skinIndex]['displayName']
    weaponOfDay['weaponOptions'] = weaponSkins
    return weaponOfDay

def generateDailyAnswers(past):
    dailyAnswers = {"map": getMap(past['map']), "agent": getAgent(past['agent']), "ability": getAbility(past['ability']), "weapon": getWeapon(past['weapon']), "quote": getQuote(past['quote'])}
    dailyAnswers['dayId'] = past['dayId'] + 1
    
    return dailyAnswers

# pastAns = {
#   "map": {
#     "mapIndex": 0,
#     "mapName": "Ascent",
#     "randCalloutIndex": 14,
#     "randCalloutEnglishRegion": "Garden",
#     "randCalloutEnglishSuperRegion": "A"
#   },
#   "agent": {
#     "randIndex": 10,
#     "displayName": "Killjoy",
#     "randIndex2": 3,
#     "displayName2": "Deadlock"
#   },
#   "ability": {
#     "randIndex": 0,
#     "randAbilityIndex": 1,
#     "displayName": "Gekko",
#     "abilityName": "Dizzy",
#     "tileOrder": [
#       5,
#       6,
#       10,
#       1,
#       13,
#       4,
#       2,
#       11,
#       9,
#       12,
#       7,
#       8,
#       14,
#       3,
#       16,
#       15
#     ]
#   },
#   "weapon": {
#     "weaponRandIndex": 7,
#     "skinRandIndex": 25,
#     "gunName": "Frenzy",
#     "skinName": "Aero Frenzy"
#   },
#   "quote": {
#     "randIndex": 0,
#     "randQuoteIndex": 0
#   },
#   "dayId": 63
# }
# # print(pastAns['map']['mapName'], pastAns['agent']['displayName'], pastAns['ability']['displayName'], pastAns['weapon']['gunName'], pastAns['quote']['randIndex'])

# # for _ in range(100):
# x = generateDailyAnswers(pastAns)
# #     print(x['map']['mapName'], x['agent']['displayName'], x['ability']['displayName'], x['weapon']['gunName'], x['quote']['randIndex'])
# #     print(x['dayId'])
