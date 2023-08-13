from flask import Flask, render_template, send_file
import json


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



# Retrieves daily answers from JSON file

@app.route('/guessMap/mapOfDay')
def mapOfDay():
    f = open("dailyAnswers.json")
    dailyGameAnswers = json.load(f)
    f.close()
    return dailyGameAnswers["map"]

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
    print(dailyGameAnswers["quote"])

@app.route('/guessWeapon/weaponOfDay')
def weaponOfDay():
    f = open("dailyAnswers.json")
    dailyGameAnswers = json.load(f)
    f.close()
    return dailyGameAnswers["weapon"]