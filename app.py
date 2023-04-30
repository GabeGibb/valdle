from flask import Flask, render_template, send_file

app = Flask(__name__)

# print(app.static_folder)
@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/<map>/<region>/<superRegion>')
def callout(map, region, superRegion):
    path = f'Valorant Maps/{map}/{region} - {superRegion}.png'
    return send_file(path)


# app.run(host='0.0.0.0')