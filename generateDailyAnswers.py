# PYTHON SCRIPT to generate a new set of answers every day (will be run by worker)

import json
from json import dumps, load
from random import randint, shuffle


def getMap(past):
    f = open("static/api/maps/maps_en.json")
    data = json.load(f)
    f.close()

    index = randint(0, len(data) - 1)
    while index in past["mapIndex"]:
        index = randint(0, len(data) - 1)

    randCalloutIndex = randint(0, len(data[index]["callouts"]) - 1)

    mapOfDay = {}
    mapOfDay["mapIndex"] = index
    mapOfDay["mapName"] = data[index]["displayName"]

    mapOfDay["randCalloutIndex"] = randCalloutIndex
    mapOfDay["randCalloutEnglishRegion"] = data[index]["callouts"][randCalloutIndex][
        "regionName"
    ]
    mapOfDay["randCalloutEnglishSuperRegion"] = data[index]["callouts"][
        randCalloutIndex
    ]["superRegionName"]

    return mapOfDay


def getAgent(past):
    f = open("static/api/agents/agents_en.json")
    data = load(f)
    f.close()

    index = randint(0, len(data) - 1)
    index2 = randint(0, len(data) - 1)
    while index in past["randIndex"] or index2 in past["randIndex2"]:
        index = randint(0, len(data) - 1)
        index2 = randint(0, len(data) - 1)

    agentOfDay = {}
    agentOfDay["randIndex"] = index
    agentOfDay["displayName"] = data[index]["displayName"]
    agentOfDay["randIndex2"] = index2
    agentOfDay["displayName2"] = data[index2]["displayName"]
    return agentOfDay


def getAbility(past):
    f = open("static/api/agents/agents_en.json")
    data = load(f)
    f.close()

    nums16 = [x for x in range(1, 17)]
    randNums16 = []
    for i in range(16):
        randNumsIndex = randint(0, len(nums16) - 1)
        randNums16.append(nums16[randNumsIndex])
        nums16.pop(randNumsIndex)

    index = randint(0, len(data) - 1)
    while index in past["randIndex"]:
        index = randint(0, len(data) - 1)
    abilityIndex = randint(0, 3)

    abilityOfDay = {}
    abilityOfDay["randIndex"] = index
    abilityOfDay["randAbilityIndex"] = abilityIndex
    abilityOfDay["displayName"] = data[index]["displayName"]
    abilityOfDay["abilityName"] = data[index]["abilities"][abilityIndex]["displayName"]
    abilityOfDay["tileOrder"] = randNums16
    return abilityOfDay


def getQuote(past):
    f = open("static/api/quotes/quotes_en.json")
    data = load(f)
    f.close()
    index = randint(0, len(data) - 1)

    while index in past["randIndex"]:
        index = randint(0, len(data) - 1)

    quoteIndex = randint(0, len(data[index]["voiceInfo"]) - 1)

    """
    If a quotes json is updated, the quote must be added for all available languages.
    It's not necessary for all the agents to have the same amount of quotes.
    """

    quoteOfDay = {}
    quoteOfDay["randIndex"] = index
    quoteOfDay["randQuoteIndex"] = quoteIndex

    return quoteOfDay


def getWeapon(past):
    f = open("static/api/weapons/weapons_en.json")
    data = load(f)
    f.close()
    weaponIndex = randint(0, len(data) - 1)
    while (
        weaponIndex in past["weaponRandIndex"]
        or data[weaponIndex]["displayName"] == "Outlaw"
    ):  # TODO: Outlaw too few skins
        weaponIndex = randint(0, len(data) - 1)

    skinIndex = randint(0, len(data[weaponIndex]["skins"]) - 1)

    weaponSkins = [skinIndex]
    indexes = [x for x in range(0, len(data[weaponIndex]["skins"]))]
    indexes.pop(skinIndex)
    for _ in range(min(14, len(data[weaponIndex]["skins"]) - 1)):
        randNumsIndex = randint(0, len(indexes) - 1)
        weaponSkins.append(indexes[randNumsIndex])
        indexes.pop(randNumsIndex)
        # print(indexes)
    shuffle(weaponSkins)

    weaponOfDay = {}
    weaponOfDay["weaponRandIndex"] = weaponIndex
    weaponOfDay["skinRandIndex"] = skinIndex
    # weaponOfDay['gunName'] =  data[weaponIndex]['displayName']
    # weaponOfDay['skinName'] =  data[weaponIndex]['skins'][skinIndex]['displayName']

    weaponOfDay["weaponOptions"] = weaponSkins
    return weaponOfDay

def getRank(past):
  # TODO: USE PAST + fix other things idk this whole system is weird with the indices
  with open("static/api/ranks/ranks_en.json") as f:
    ranks_data = load(f)
  
  with open("static/api/ranks/clips.json") as f:
    clips_data = load(f)
  
  clip_index = randint(0, len(clips_data) - 1)
  rank_name = clips_data[clip_index]["rank"]

  rank_index = 0
  for i in range(len(ranks_data)):
    if ranks_data[i]["tierName"] == rank_name:
      rank_index = i
      break
  
  rankOfDay = {}
  rankOfDay["clipIndex"] = clip_index
  rankOfDay["iframe"] = f"<iframe style='border: none;' src='{clips_data[clip_index]['url_for_iframe']}' allow='autoplay' allowfullscreen></iframe>"
  rankOfDay["randIndex"] = rank_index
  rankOfDay["displayName"] = ranks_data[rank_index]["tierName"]
  rankOfDay["displayIcon"] = ranks_data[rank_index]["largeIcon"]
  
  return rankOfDay

def generateDailyAnswers(past):
    pastAnswers = past["past"]
    if "rank" not in pastAnswers:
        pastAnswers["rank"] = {"clipIndex": []}
        
    dailyAnswers = {
        "map": getMap(pastAnswers["map"]),
        "agent": getAgent(pastAnswers["agent"]),
        "ability": getAbility(pastAnswers["ability"]),
        "weapon": getWeapon(pastAnswers["weapon"]),
        "quote": getQuote(pastAnswers["quote"]),
        "rank": getRank(pastAnswers.get("rank", {"clipIndex": []})),
    }
    dailyAnswers["dayId"] = past["dayId"] + 1

    pastAnswers["map"]["mapIndex"].append(dailyAnswers["map"]["mapIndex"])
    pastAnswers["agent"]["randIndex"].append(dailyAnswers["agent"]["randIndex"])
    pastAnswers["agent"]["randIndex2"].append(dailyAnswers["agent"]["randIndex2"])
    pastAnswers["ability"]["randIndex"].append(dailyAnswers["ability"]["randIndex"])
    pastAnswers["weapon"]["weaponRandIndex"].append(
        dailyAnswers["weapon"]["weaponRandIndex"]
    )
    pastAnswers["quote"]["randIndex"].append(dailyAnswers["quote"]["randIndex"])
    pastAnswers["rank"]["clipIndex"].append(dailyAnswers["rank"]["clipIndex"])

    n = 7
    pastAnswers["map"]["mapIndex"] = pastAnswers["map"]["mapIndex"][-n:]
    pastAnswers["agent"]["randIndex"] = pastAnswers["agent"]["randIndex"][-n:]
    pastAnswers["agent"]["randIndex2"] = pastAnswers["agent"]["randIndex2"][-n:]
    pastAnswers["ability"]["randIndex"] = pastAnswers["ability"]["randIndex"][-n:]
    pastAnswers["weapon"]["weaponRandIndex"] = pastAnswers["weapon"]["weaponRandIndex"][
        -n:
    ]
    pastAnswers["quote"]["randIndex"] = pastAnswers["quote"]["randIndex"][-n:]
    pastAnswers["rank"]["clipIndex"] = pastAnswers["rank"]["clipIndex"][-n:]

    dailyAnswers["past"] = pastAnswers

    return dailyAnswers
