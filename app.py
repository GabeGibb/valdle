from flask import Flask, render_template, send_file, request

from PIL import Image
from random import randint
from io import BytesIO

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

