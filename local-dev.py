import os

from flask import Flask, redirect, send_from_directory
app = Flask(__name__, static_folder=".", static_url_path="")

# Route rewrites for specific HTML files
@app.route("/guessAbility")
def guess_ability():
    return send_from_directory(".", "guessAbility.html")

@app.route("/guessAgent")
def guess_agent():
    return send_from_directory(".", "guessAgent.html")

@app.route("/guessMap")
def guess_map():
    return send_from_directory(".", "guessMap.html")

@app.route("/guessQuote")
def guess_quote():
    return send_from_directory(".", "guessQuote.html")

@app.route("/guessWeapon")
def guess_weapon():
    return send_from_directory(".", "guessWeapon.html")

@app.route("/guessRank")
def guess_rank():
    return send_from_directory(".", "guessRank.html")

@app.route("/")
def home():
    return send_from_directory(".", "valdle.html")

@app.route("/about")
def about():
    return send_from_directory(".", "about.html")

@app.route("/invalidRoute")
def invalid_route():
    return send_from_directory(".", "invalidRoute.html")

@app.route("/privacy")
def privacy():
    return send_from_directory(".", "privacy.html")

@app.route("/sitemap")
def sitemap():
    return send_from_directory(".", "sitemap.xml")

# Catch-all for serving static files (e.g., CSS, JS, images, etc.)
@app.route("/<path:filename>")
def serve_static_file(filename):
    if os.path.exists(filename):
        return send_from_directory(".", filename)
    else:
        return redirect("/")  # Redirect unknown paths to home if needed

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
