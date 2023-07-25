import json

agentsDict = []

agents = ['Gekko', 'Fade', 'Breach', 'Deadlock', 'Raze', 'Chamber', 'KAYO', 'Skye', 'Cypher', 'Sova', 'Killjoy', 'Harbor', 'Viper', 'Phoenix', 'Astra', 'Brimstone', 'Neon', 'Yoru', 'Sage', 'Reyna', 'Omen', 'Jett']

for agent in agents:
    
    aFile = f'webscraper/{agent}Audio.txt'
    qFile = f'webscraper/{agent}Quotes.txt'

    audio = open(aFile, "r")
    quotes = open(qFile, "r", encoding='utf-8')

    aLines = audio.readlines()
    qLines = quotes.readlines()

    curAgentDict = {}
    curAgentList = []
    for (a, q) in zip(aLines, qLines):
        if len(q.split()) < 10:
            continue
        a = a.strip()
        q = q.strip()
        q = q.replace('\"', '')
        tempDict = {}
        tempDict['audioFile'] = a
        tempDict['quote'] = q
        curAgentList.append(tempDict)

    if agent == 'KAYO':
        curAgentDict['displayName'] = 'KAY/O'
    else:
        curAgentDict['displayName'] = agent

    curAgentDict['voiceInfo'] = curAgentList
    agentsDict.append(curAgentDict)

jsonObject = json.dumps(agentsDict, indent=4)
with open("static/quotes.json", "w") as outfile:
    outfile.write(jsonObject)    

