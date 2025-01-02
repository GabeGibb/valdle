import os
from json import dump, load

from requests import get

language_list = ["en-US"]  # , "es-ES", "tr-TR"


def downloadWeapons(lan):
    add_before_json("weapons_en.json")
    weapons = get("https://valorant-api.com/v1/weapons?language=" + lan)
    if weapons.status_code == 200:
        weaponsFile = open("static/api/weapons/weapons_" + lan[:2] + ".json", "w")
        weaponContent = weapons.json()["data"]

        for i in range(len(weaponContent)):
            weaponContent[i]["skins"] = [
                x
                for x in weaponContent[i]["skins"]
                if x["themeUuid"]
                not in (
                    "0d7a5bfb-4850-098e-1821-d989bbfd58a8",
                    "5a629df4-4765-0214-bd40-fbb96542941f",
                )
            ]

        dump(weaponContent, weaponsFile, indent=4)
        weaponsFile.close()


def downloadAgents(lan):
    add_before_json("agents_en.json")
    agents = get(
        "https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=" + lan
    )
    if agents.status_code == 200:
        agentsFile = open("static/api/agents/agents_" + lan[:2] + ".json", "w")
        agentsContent = agents.json()["data"]
        dump(agentsContent, agentsFile, indent=4)
        agentsFile.close()


# NOTE: ENGLISH MAPS_EN FILE MUST BE MANUALLY UPDATED FIRST.
# THE MAPS_EN MUST BE MANUALLY UPDATED WITH THE API'S UPDATED CALLOUTS/MAPS, AND THEN OUR CUSTOM COORDINATES.
# DO **NOT** UPDATE OTHER LANGUAGES FIRST.


def downloadMaps(lan):
    add_before_json("maps_en.json")
    mapList = [
        "Ascent",
        "Bind",
        "Breeze",
        "Fracture",
        "Haven",
        "Icebox",
        "Lotus",
        "Pearl",
        "Split",
        "Sunset",
        "Abyss",
    ]

    # First, get the new language json file
    maps = get("https://valorant-api.com/v1/maps?language=" + lan)
    alteredMaps = []
    if maps.status_code == 200:
        mapsContent = maps.json()["data"]
        for i in range(len(mapsContent)):
            fixedMapName = mapsContent[i]["displayName"].lower().capitalize()
            if fixedMapName in mapList:
                alteredMaps.append(mapsContent[i])
                alteredMaps[-1]["rotation"] = 0
        mapsFile = open("static/api/maps/maps_" + lan[:2] + ".json", "w")
        dump(alteredMaps, mapsFile, indent=4)
        mapsFile.close()

    # Then, copy language English coordinates to new language coordinates if callouts match
    with open("static/api/maps/maps_enOLD.json", "r") as start, open(
        "static/api/maps/maps_" + lan[:2] + ".json", "r"
    ) as to:
        oldData = load(start)
        newData = load(to)

        for i in range(len(newData)):
            for new_map in newData:
                for old_map in oldData:
                    if new_map["displayName"] == old_map["displayName"]:
                        for new_callout in new_map["callouts"]:
                            for old_callout in old_map["callouts"]:
                                if (
                                    new_callout.get("regionName")
                                    and new_callout.get("superRegionName")
                                    and new_callout["regionName"]
                                    == old_callout.get("regionName")
                                    and new_callout["superRegionName"]
                                    == old_callout.get("superRegionName")
                                ):
                                    new_callout["location"]["x"] = old_callout[
                                        "location"
                                    ]["x"]
                                    new_callout["location"]["y"] = old_callout[
                                        "location"
                                    ]["y"]
                        if "rotation" in old_map:
                            new_map["rotation"] = old_map["rotation"]

    with open("static/api/maps/maps_" + lan[:2] + ".json", "w") as file:
        dump(newData, file, indent=4)

    start.close()
    to.close()

def downloadRanks(language):
    add_before_json("ranks_en.json")
    ranks = get("https://valorant-api.com/v1/competitivetiers?language=" + language)
    if ranks.status_code == 200:
        ranksFile = open("static/api/ranks/ranks_" + language[:2] + ".json", "w")
        ranksContent = ranks.json()["data"]
        dump(ranksContent, ranksFile, indent=4)
        ranksFile.close()

def add_before_json(filename2):
    root_dir = "static/api"
    for root, dirs, files in os.walk(root_dir):
        for filename in files:
            if filename == filename2:
                new_filename = filename.replace("en.json", "enOLD.json")
                os.rename(
                    os.path.join(root, filename), os.path.join(root, new_filename)
                )


for language in language_list:
  # downloadWeapons(language)  # for weapons
  # downloadAgents(language)  # for agents
  # downloadMaps(language)  # for maps
  downloadRanks(language)  # for ranks