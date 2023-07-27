from flask import Flask, render_template, send_file, request

from PIL import Image
from random import randint
from io import BytesIO
from json import load
from random import choice, randint

agents = ['Gekko', 'Fade', 'Breach', 'Deadlock', 'Raze', 'Chamber', 'KAYO', 'Skye', 'Cypher', 'Sova', 'Killjoy', 'Harbor', 'Viper', 'Phoenix', 'Astra', 'Brimstone', 'Neon', 'Yoru', 'Sage', 'Reyna', 'Omen', 'Jett']


app = Flask(__name__)

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

@app.route('/guessGun')
def guessGun():
    return render_template('guessGun.html')


@app.errorhandler(404) 
def default_handler(e):
    return render_template('invalidRoute.html')


@app.route('/guessMap/<map>/<region>/<superRegion>')
def callout(map, region, superRegion):
    path = f'Valorant Maps/{map}/{region} - {superRegion}.png'
    if 'partial' in request.args and request.args['partial'] == 'true':
        im = Image.open(path)
        w,h = im.size
        cropSize = 4
        smallW = w / cropSize
        smallH = h / cropSize
        startX = randint(0, w-smallW)
        startY = randint(0, h-smallH)
        im2 = im.crop((startX, startY, startX + smallW, startY + smallH))
        
        img_io = BytesIO()
        im2.save(img_io, 'PNG', quality=100)
        img_io.seek(0)
        return send_file(img_io, 'PNG')
        
    else:
        return send_file(path)


@app.route('/guessQuote/quoteOfDay')
def getQuote():
    f = open('static/quotes.json')
    data = load(f)
    index = randint(0, len(data)-1)
    qInfo = choice(data[index]['voiceInfo'])
    
    quoteOfDay = {}
    quoteOfDay['randIndex'] = index
    quoteOfDay['audioFile'] = qInfo['audioFile'] 
    quoteOfDay['quote'] = qInfo['quote'] 
    quoteOfDay['displayName'] = data[index]['displayName']
    
    f.close()
    return quoteOfDay


@app.route('/guessAbility/abilityOfDay')
def getAbility():
    abilityOfDay = {}
    index = randint(0, len(agents)-1)
    abilityOfDay['randIndex'] = index
    abilityOfDay['displayName'] = agents[index]
    return abilityOfDay


@app.route('/guessGun/gunOfDay')
def getGun():
    gunOfDay = {}
    index = randint(0, 17)
    gunOfDay['randIndex'] = index
    # bundleOfDay['displayName'] = agents[index]
    return gunOfDay
