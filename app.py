from flask import Flask, render_template, send_file, request, jsonify

from random import randint
from json import load
from random import choice, randint
import schedule
import time
import threading

app = Flask(__name__)

@app.route('/riot.txt')
def riot():
    return send_file('riot.txt')

@app.route('/')
def valdle():
    return render_template('valdle.html')

@app.route('/guessMap')
def guessMap():
    return render_template('guessMap.html')

@app.route('/guessAbility')
def guessAbility():
    return render_template('guessAbility.html')

@app.route('/guessQuote')
def guessQuote():
    return render_template('guessQuote.html')

@app.route('/guessWeapon')
def guessWeapon():
    return render_template('guessWeapon.html')

@app.route('/about')
def aboutPage():
    return render_template('about.html')

@app.errorhandler(404) 
def default_handler(e):
    return render_template('invalidRoute.html')


@app.route('/guessMap/<map>/<region>/<superRegion>')
def callout(map, region, superRegion):
    path = f'Valorant Maps/{map}/{region} - {superRegion}.png'
    return send_file(path)




dailyGameAnswers = {}

@app.route('/guessMap/mapOfDay')
def retrieveDailyMap():
    return dailyGameAnswers["map"]


def getMap():
    f = open('static/api/maps.json')
    data = load(f)
    f.close()
    data.pop(8)

    # index = randint(0, len(data)-1)
    index = 0
    mapOfDay = {}
    mapOfDay['mapName'] = data[index]['displayName']

    randCallout = choice(data[index]['callouts'])
    mapOfDay['regionName'] = randCallout['regionName']
    mapOfDay['superRegionName'] = randCallout['superRegionName']
    
    return mapOfDay

@app.route('/guessAbility/abilityOfDay')
def retrieveDailyAbility():
    return dailyGameAnswers["ability"]


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


@app.route('/guessQuote/quoteOfDay')
def retrieveDailyQuote():
    return dailyGameAnswers["quote"]

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



# Standard, Random
@app.route('/guessWeapon/weaponOfDay')
def retrieveDailyWeapon():
    return dailyGameAnswers["weapon"]

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




# # Gets daily answers when asked for
# @app.route('/getDailyGameAnswers', methods=['GET'])
# def getDailyGameAnswers():
#     return dailyGameAnswers

# Stores new daily game answers
def generateDailyGameAnswers():
    global dailyGameAnswers
    dailyGameAnswers = {"map": getMap(), "ability": getAbility(), "weapon": getWeapon(), "quote": getQuote()}
    print(dailyGameAnswers)
    # return answers

# Function to update when it is midnight EST
schedule.every().day.at("00:02:00").do(generateDailyGameAnswers)

def run_schedule():
    while True:
        schedule.run_pending()
        time.sleep(1)



if __name__ == "__main__":
    # Start the Flask app in a separate thread

    generateDailyGameAnswers()

    app_thread = threading.Thread(target=app.run, kwargs={'host': '0.0.0.0'})

    # Start the schedule loop in another separate thread
    schedule_thread = threading.Thread(target=run_schedule)

    # Start both threads
    app_thread.start()
    schedule_thread.start()

    # Wait for both threads to finish (optional)
    app_thread.join()
    schedule_thread.join()
