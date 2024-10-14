# app.py
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

# blackjack.py
import random

class BlackjackGame:
    def __init__(self):
        self.deck = []
        self.values = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': 11}
        self.player_hand = []
        self.dealer_hand = []
        self.player_total = 0
        self.dealer_total = 0
        self.game_over = False
        self.message = ""
        self.reset()

    def reset(self):
        self.create_deck()
        self.player_hand = [self.draw_card(), self.draw_card()]
        self.dealer_hand = [self.draw_card(), self.draw_card()]
        self.player_total = self.calculate_total(self.player_hand)
        self.dealer_total = self.calculate_total(self.dealer_hand)
        self.game_over = False
        self.message = ""

    def create_deck(self):
        self.deck = []
        for _ in range(4):
            for card in ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']:
                self.deck.append(card)
        random.shuffle(self.deck)

    def draw_card(self):
        return self.deck.pop()

    def calculate_total(self, hand):
        total = sum(self.values[card] for card in hand if card != 'A')
        aces = hand.count('A')
        for _ in range(aces):
            if total + 11 <= 21:
                total += 11
            else:
                total += 1
        return total

    def hit(self):
        self.player_hand.append(self.draw_card())
        self.player_total = self.calculate_total(self.player_hand)
        if self.player_total > 21:
            self.game_over = True
            self.message = "You busted! Dealer wins."
        elif self.player_total == 21:
            self.stay()

    def stay(self):
        while self.dealer_total < 17:
            self.dealer_hand.append(self.draw_card())
            self.dealer_total = self.calculate_total(self.dealer_hand)
        
        self.game_over = True
        if self.dealer_total > 21:
            self.message = "Dealer busted! You win!"
        elif self.dealer_total > self.player_total:
            self.message = "Dealer wins!"
        elif self.dealer_total < self.player_total:
            self.message = "You win!"
        else:
            self.message = "It's a tie! Dealer wins."

    def set_ace_value(self, value):
        if 'A' in self.player_hand:
            self.values['A'] = value
            self.player_total = self.calculate_total(self.player_hand)

    def get_state(self):
        return {
            'player_hand': self.player_hand,
            'dealer_hand': self.dealer_hand,
            'player_total': self.player_total,
            'dealer_total': self.dealer_total,
            'game_over': self.game_over,
            'message': self.message
        }

# requirements.txt
Flask==2.0.1
Flask-CORS==3.0.10
