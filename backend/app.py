from flask import Flask, request, jsonify
from flask_cors import CORS
from blackjack import BlackjackGame

app = Flask(__name__)
CORS(app)

game = BlackjackGame()

@app.route('/start', methods=['POST'])
def start_game():
    game.reset()
    return jsonify(game.get_state())

@app.route('/action', methods=['POST'])
def game_action():
    action = request.json['action']
    if action == 'hit':
        game.hit()
    elif action == 'stay':
        game.stay()
    elif action == 'ace_value':
        value = int(request.json['value'])
        game.set_ace_value(value)
    return jsonify(game.get_state())

if __name__ == '__main__':
    app.run(debug=True)
