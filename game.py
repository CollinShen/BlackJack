import random

deck = []   
for i in range(1, 10):
    for _ in range(4):
        deck.append(str(i))
for _ in range(4):
    deck.extend(['J', 'Q', 'K', 'A'])

values = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10}

def aAssign():
    while True:
        try:
            card = input('You got an Ace, would you like the value to be 1 or 11?: ')
            if card == '1':
                values['A'] = 1
                return 'A'
            elif card == '11':
                values['A'] = 11
                return 'A'
        except:
            print('Please choose 1 or 11')

def doubleA():
    while True:
        value = input('You have received double Aces, you may choose their combined values of either 2, 12, or 22: ')
        if value in ['2', '12', '22']:
            return int(value)

def tryAgain():
    while True:
        again = input("Would you like to play again? y or n: ")
        if again.lower() == 'y':
            main()
            break
        elif again.lower() == 'n':
            print("Thank you for playing!")
            break

def mainMenu():
    while True:
        print("P: Play")
        print("R: Rules")
        print("A: About")
        print("Q: Quit")
        usinput = input("Please enter your choice: ")
        if usinput.lower() == "p":
            main()
        elif usinput.lower() == "a":
            about()
        elif usinput.lower() == "q":
            break
        elif usinput.lower() == "r":
            rules()

def about():
    print("About the game...")

def rules():
    print("Rules of Blackjack...")

def main():
    g = random.choice(deck)
    f = random.choice(deck)

    if f == 'A' and g == 'A':
        valueTotal = doubleA()
        game(valueTotal)
    elif f == 'A':
        f = aAssign()
        valueTotal = values[f] + values[g]
        print('Your cards are:', f, 'and', g, "with a value of:", valueTotal)
        game(valueTotal)
    elif g == 'A':
        g = aAssign()
        valueTotal = values[f] + values[g]
        print('Your cards are:', f, 'and', g, "with a value of:", valueTotal)
        game(valueTotal)
    else:
        valueTotal = values[f] + values[g]
        print('Your cards are:', f, 'and', g, "with a value of:", valueTotal)
        game(valueTotal)

def game(valueTotal):
    while True:
        hit = input('Would you like to hit? y or n: ')
        if hit.lower() == 'y':
            addedcard = random.choice(deck)
            if addedcard == 'A':
                addedcardValue = aAssign()
            addedcardValue = values[addedcard]
            valueTotal += addedcardValue
            print('Your new card is:', addedcard, 'bringing the total to:', valueTotal)
            if valueTotal > 21:
                print('You have busted!')
                tryAgain()
                break
        elif hit.lower() == 'n':
            print("You've decided to stay at:", valueTotal)
            dealerTime(valueTotal)
            break

def dealerTime(playerTotal):
    dealerTotal = 0
    while dealerTotal < 17:
        addedCard = random.choice(deck)
        dealerTotal += values[addedCard]
        print("The dealer's new card is:", addedCard, "bringing their total to:", dealerTotal)
    if dealerTotal > 21:
        print("The dealer has busted! You win!")
    elif dealerTotal >= playerTotal:
        print("The dealer wins!")
    else:
        print("You win!")

mainMenu()
