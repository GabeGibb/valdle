from requests import get
from json import dump

weapons = get('https://valorant-api.com/v1/weapons')
if weapons.status_code == 200:
    weaponsFile = open("static/api/weapons.json", "w")
    weaponContent = weapons.json()['data']

    for i in range(len(weaponContent)):
        weaponContent[i]['skins'] = [x for x in weaponContent[i]['skins'] if x['themeUuid'] not in ('0d7a5bfb-4850-098e-1821-d989bbfd58a8', '5a629df4-4765-0214-bd40-fbb96542941f')]

    dump(weaponContent, weaponsFile, indent=4)
    weaponsFile.close()


agents = get('https://valorant-api.com/v1/agents?isPlayableCharacter=true')
if agents.status_code == 200:
    agentsFile = open("static/api/agents.json", "w")
    agentsContent = agents.json()['data']
    dump(agentsContent, agentsFile, indent=4)
    agentsFile.close()