from requests import get
from json import dump

def downloadWeapons():
    weapons = get('https://valorant-api.com/v1/weapons')
    if weapons.status_code == 200:
        weaponsFile = open("static/api/weapons.json", "w")
        weaponContent = weapons.json()['data']

        for i in range(len(weaponContent)):
            weaponContent[i]['skins'] = [x for x in weaponContent[i]['skins'] if x['themeUuid'] not in ('0d7a5bfb-4850-098e-1821-d989bbfd58a8', '5a629df4-4765-0214-bd40-fbb96542941f')]

        dump(weaponContent, weaponsFile, indent=4)
        weaponsFile.close()

def downloadAgents():
    agents = get('https://valorant-api.com/v1/agents?isPlayableCharacter=true')
    if agents.status_code == 200:
        agentsFile = open("static/api/agents.json", "w")
        agentsContent = agents.json()['data']
        dump(agentsContent, agentsFile, indent=4)
        agentsFile.close()

def downloadMaps():
    mapList = ['Ascent', 'Bind', 'Breeze', 'Fracture', 'Haven', 'Icebox', 'Lotus', 'Pearl', 'Split']
    maps = get('https://valorant-api.com/v1/maps')
    alteredMaps = []
    if maps.status_code == 200:
        mapsContent = maps.json()['data']
        for i in range(len(mapsContent)):
            if mapsContent[i]['displayName'] in mapList:
                alteredMaps.append(mapsContent[i])
                alteredMaps[-1]['rotation'] = 0

        mapsFile = open("static/api/newMaps.json", "w")

        dump(alteredMaps, mapsFile, indent=4)
        mapsFile.close()


# downloadWeapons()
# downloadAgents()
downloadMaps()