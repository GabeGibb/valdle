from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def hello():
    return render_template('templates/index.html')

@app.route('/test')
def test():
    return 'hi'

# app.run(host='0.0.0.0')