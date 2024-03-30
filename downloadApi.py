from requests import get
from json import dump, load
import os


language_list = ["en-US"] #, "es-ES", "tr-TR"

def downloadWeapons(lan):
    weapons = get('https://valorant-api.com/v1/weapons?language=' + lan)
    if weapons.status_code == 200:
        weaponsFile = open("static/api/weapons/weapons_" + lan[:2] + ".json", "w")
        weaponContent = weapons.json()['data']

        for i in range(len(weaponContent)):
            weaponContent[i]['skins'] = [x for x in weaponContent[i]['skins'] if x['themeUuid'] not in ('0d7a5bfb-4850-098e-1821-d989bbfd58a8', '5a629df4-4765-0214-bd40-fbb96542941f')]

        dump(weaponContent, weaponsFile, indent=4)
        weaponsFile.close()

def downloadAgents(lan):
    agents = get('https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=' + lan)
    if agents.status_code == 200:
        agentsFile = open("static/api/agents/agents_" + lan[:2] + ".json", "w")
        agentsContent = agents.json()['data']
        dump(agentsContent, agentsFile, indent=4)
        agentsFile.close()

# NOTE: ENGLISH MAPS_EN FILE MUST BE MANUALLY UPDATED FIRST. 
# THE MAPS_EN MUST BE MANUALLY UPDATED WITH THE API'S UPDATED CALLOUTS/MAPS, AND THEN OUR CUSTOM COORDINATES.
# DO **NOT** UPDATE OTHER LANGUAGES FIRST.

def downloadMaps(lan):
    if lan == "en-US":
        return -1
    
    mapList = ['Ascent', 'Bind', 'Breeze', 'Fracture', 'Haven', 'Icebox', 'Lotus', 'Pearl', 'Split', 'Sunset']

    # First, get the new language json file
    maps = get('https://valorant-api.com/v1/maps?language=' + lan)
    alteredMaps = []
    if maps.status_code == 200:
        mapsContent = maps.json()['data']
        for i in range(len(mapsContent)):
            fixedMapName = mapsContent[i]['displayName'].lower().capitalize()
            if fixedMapName in mapList:
                alteredMaps.append(mapsContent[i])
                alteredMaps[-1]['rotation'] = 0
        mapsFile = open("static/api/maps/maps_" + lan[:2] + ".json", "w")
        dump(alteredMaps, mapsFile, indent=4)
        mapsFile.close()

    # Then, copy language English coordinates to new language coordinates
    with open("static/api/maps/maps_en.json", "r") as start, open("static/api/maps/maps_" + lan[:2] + ".json", "r") as to:
        data = load(start)
        data_lan = load(to)

    for i in range(len(data)):
        for j in range(len(data[i]["callouts"])):
            data_lan[i]["callouts"][j]["location"]["x"] = data[i]["callouts"][j]["location"]["x"]
            data_lan[i]["callouts"][j]["location"]["y"] = data[i]["callouts"][j]["location"]["y"]
            data_lan[i]["rotation"] = data[i]["rotation"]

    with open("static/api/maps/maps_" + lan[:2] + ".json", "w") as file:
        dump(data_lan, file, indent=4)

    start.close()
    to.close() 

def add_before_json():
    root_dir = "static/api"
    for root, dirs, files in os.walk(root_dir):
        for filename in files:
            if filename in ["agents_en.json", "weapons_en.json", "maps_en.json"]:
                new_filename = filename.replace("en.json", "enOLD.json")
                os.rename(os.path.join(root, filename), os.path.join(root, new_filename))

add_before_json()


for language in language_list:
    downloadWeapons(language) # for weapons
    downloadAgents(language) # for agents
    # downloadMaps(language) #for maps