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
    while index in past['mapIndex']:
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
    while index in past['randIndex'] or index2 in past['randIndex2']:
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
    while index in past['randIndex']:
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

    while index in past['randIndex']:
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
    while weaponIndex in past['weaponRandIndex']:
        weaponIndex = randint(0, len(data)-1)

    skinIndex = randint(0, len(data[weaponIndex]['skins'])-1)

    weaponSkins = [skinIndex]
    print(weaponSkins)
    indexes = [x for x in range(0, len(data[weaponIndex]['skins']))]
    indexes.pop(skinIndex)
    for _ in range(14):
        randNumsIndex = randint(0, len(indexes) -1)
        weaponSkins.append(indexes[randNumsIndex])
        indexes.pop(randNumsIndex)
        # print(indexes)
    shuffle(weaponSkins)

    weaponOfDay = {}
    weaponOfDay['weaponRandIndex'] = weaponIndex
    weaponOfDay['skinRandIndex'] = skinIndex
    # weaponOfDay['gunName'] =  data[weaponIndex]['displayName']
    # weaponOfDay['skinName'] =  data[weaponIndex]['skins'][skinIndex]['displayName']

    weaponOfDay['weaponOptions'] = weaponSkins
    return weaponOfDay

def generateDailyAnswers(past):
    pastAnswers = past['past']
    dailyAnswers = {"map": getMap(pastAnswers['map']), "agent": getAgent(pastAnswers['agent']), "ability": getAbility(pastAnswers['ability']), "weapon": getWeapon(pastAnswers['weapon']), "quote": getQuote(pastAnswers['quote'])}
    dailyAnswers['dayId'] = past['dayId'] + 1

    pastAnswers['map']['mapIndex'].append(dailyAnswers['map']['mapIndex'])
    pastAnswers['agent']['randIndex'].append(dailyAnswers['agent']['randIndex'])
    pastAnswers['agent']['randIndex2'].append(dailyAnswers['agent']['randIndex2'])
    pastAnswers['ability']['randIndex'].append(dailyAnswers['ability']['randIndex'])
    pastAnswers['weapon']['weaponRandIndex'].append(dailyAnswers['weapon']['weaponRandIndex'])
    pastAnswers['quote']['randIndex'].append(dailyAnswers['quote']['randIndex'])

    n = 7
    pastAnswers['map']['mapIndex'] = pastAnswers['map']['mapIndex'][-n:]
    pastAnswers['agent']['randIndex'] = pastAnswers['agent']['randIndex'][-n:]
    pastAnswers['agent']['randIndex2'] = pastAnswers['agent']['randIndex2'][-n:]
    pastAnswers['ability']['randIndex'] = pastAnswers['ability']['randIndex'][-n:]
    pastAnswers['weapon']['weaponRandIndex'] = pastAnswers['weapon']['weaponRandIndex'][-n:]
    pastAnswers['quote']['randIndex'] = pastAnswers['quote']['randIndex'][-n:]

    dailyAnswers['past'] = pastAnswers
    
    return dailyAnswers

# pastAns = {
#   "map": {
#     "mapIndex": 2,
#     "mapName": "Fracture",
#     "randCalloutIndex": 2,
#     "randCalloutEnglishRegion": "Arcade",
#     "randCalloutEnglishSuperRegion": "B"
#   },
#   "agent": {
#     "randIndex": 11,
#     "displayName": "Harbor",
#     "randIndex2": 9,
#     "displayName2": "Sova"
#   },
#   "ability": {
#     "randIndex": 1,
#     "randAbilityIndex": 1,
#     "displayName": "Fade",
#     "abilityName": "Haunt",
#     "tileOrder": [
#       6,
#       8,
#       9,
#       7,
#       1,
#       10,
#       12,
#       2,
#       3,
#       16,
#       14,
#       13,
#       11,
#       15,
#       4,
#       5
#     ]
#   },
#   "weapon": {
#     "weaponRandIndex": 1,
#     "skinRandIndex": 10,
#     "gunName": "Ares",
#     "skinName": "Infantry Ares",
#     "weaponOptions": [
#       "Outpost Ares",
#       "Endeavour Ares",
#       "Spitfire Ares",
#       "Premiere Collision Ares",
#       "Magepunk Ares",
#       "Sakura Ares",
#       "Hivemind Ares",
#       "Infantry Ares",
#       "Divine Swine Ares",
#       "Nunca Olvidados Ares",
#       "Oni Ares",
#       "Nebula Ares",
#       "Rush Ares",
#       "Sentinels of Light Ares",
#       "Monstrocity Ares"
#     ]
#   },
#   "quote": {
#     "randIndex": 9,
#     "randQuoteIndex": 0
#   },
#   "dayId": 86,
#   "past": {
#     "map": {
#       "mapIndex": [
#         2
#       ]
#     },
#     "agent": {
#       "randIndex": [
#         11
#       ],
#       "randIndex2": [
#         9
#       ]
#     },
#     "ability": {
#       "randIndex": [
#         1
#       ]
#     },
#     "weapon": {
#       "weaponRandIndex": [
#         1
#       ]
#     },
#     "quote": {
#       "randIndex": [
#         9
#       ]
#     }
#   }
# }


# cur = pastAns
# for _ in range(10):
#     cur = generateDailyAnswers(cur)
#     print(cur)
#     print()