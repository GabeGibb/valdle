from flask import Flask, render_template, send_file
import json
from requests import get
from json import dumps
from generateDailyAnswers import generateDailyAnswers

app = Flask(__name__)

@app.route('/riot.txt')
def riot():
    return send_file('riot.txt')

@app.route('/ifYouAreAUserPleaseDontDoThisEndpoint')
def updateAnswers():
    json_object = dumps(generateDailyAnswers(), indent=4)

    with open("dailyAnswers.json", "w") as outfile:
        outfile.write(json_object)
    return 'success'
    
updateAnswers()
# @app.route('/ifYouAreAUserPleaseDontDoThisEndpoint')
# def updateAnswers():
#     url = 'https://api.jsonbin.io/v3/b/64db06b59d312622a3915ec6'
#     headers = {
#     'X-Master-Key': '$2b$10$354hGEwJOHs9iL8O0llsh.c/2xKZd0gHK/n1GPYUtyanzP25KANy6'
#     }

#     req = get(url, headers=headers)
#     json_object = dumps(req.json()['record'], indent=4)

#     with open("dailyAnswers.json", "w") as outfile:
#         outfile.write(json_object)

#     return json_object

# updateAnswers() # CALL THIS ON SERVER LOAD TO ENSURE ANSWERS UPDATE / ARE CREATED

@app.route('/sitemap')
def giveSiteMap():
    return send_file('sitemap.xml')

@app.route('/')
def valdle():
    return render_template('valdle.html')

@app.route('/guessMap')
def guessMap():
    return render_template('guessMap.html')

@app.route('/guessAgent')
def guessAgent():
    return render_template('guessAgent.html')

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



# Retrieves daily answers from JSON file

@app.route('/guessMap/mapOfDay')
def mapOfDay():
    f = open("dailyAnswers.json")
    dailyGameAnswers = json.load(f)
    f.close()
    return dailyGameAnswers["map"]

@app.route('/guessAgent/agentOfDay')
def agentOfDay():
    f = open("dailyAnswers.json")
    dailyGameAnswers = json.load(f)
    f.close()
    return dailyGameAnswers["agent"]

@app.route('/guessAbility/abilityOfDay')
def abilityOfDay():
    f = open("dailyAnswers.json")
    dailyGameAnswers = json.load(f)
    f.close()
    return dailyGameAnswers["ability"]

@app.route('/guessQuote/quoteOfDay')
def quoteOfDay():
    f = open("dailyAnswers.json")
    dailyGameAnswers = json.load(f)
    f.close()
    return dailyGameAnswers["quote"]

@app.route('/guessWeapon/weaponOfDay')
def weaponOfDay():
    f = open("dailyAnswers.json")
    dailyGameAnswers = json.load(f)
    f.close()
    return dailyGameAnswers["weapon"]