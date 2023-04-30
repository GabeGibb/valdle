from flask import Flask, render_template

app = Flask(__name__)

# print(app.static_folder)
@app.route('/')
def hello():
    return render_template('index.html')




app.run(host='0.0.0.0')