'''
Hi! my name is Collin X Shen, or Cshen. feel free to play around with my
first solo github project that has probably been done a thousand times
with better quality, but I felt was a fun challenge nonetheless to make
on my own. Python code, written using mostly intro topics to keep simple
'''
import random    
    
        
#This will run automatically creating a class for the datas above, and a deck of cards!

'''The actual blackjack game function
created a deck with a for loop
'''
deck = []   
x = 1
for i in range(1, 10):
    x += 1
    deck.append(str(x))
    deck.append(str(x))
    deck.append(str(x))
    deck.append(str(x))
for i in range(1,5):
    deck.append('J')
    deck.append('Q')
    deck.append('K')
    deck.append('A')

values = {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'J':10, 'Q':10, 'K':10}
'''
dictionary of values for cards without A since it is flexible
'''


#Below are the helper functions for little nuances of the game
def aAssign():
    '''
    when one of the cards is A, this function runs to determine its desired value
    '''
    while True:
        try:
            card = input('You got an Ace, would you like the value to be 1 or 11?: ', )
            if card == '1':
                values['A'] = 1
                return 'A'
            elif card == '11':
                values['A'] = 11
                return 'A'
        except:
            print('Please choose 1 or 11')

def doubleA():
    '''
    if the player gets 2 aces, they can just decide the value total because
    te way IS
    '''
    while True:
            value = input('You have recieved double Aces, you may choose their combined values of either 2, 12, or 22: ', )
            if value == '2':
                game(2)
                break
            elif value == '12':
                game(12)
                break
            elif value == '22':
                print('')
                print('Since your total is: ', 22)
                print('You have busted! hopefully the dealer will also bust')
                dealerTime(22)
                break
        
def tryAgain():
    '''
if they lose by busting or by score to the dealer, they can try again
'''
    while True:
        print('===============================================================================')
        print("You lost to the dealer!")
        again = input("Would you like to play again? y or n: ",)
        if again == 'y':
            main()
            break
        elif again == 'n':
            print('')
            print("Thank's for playing! check to see leadeboard if you'd like!")
            print('===============================================================================')
            mainMenu()
            break
        else:
            print('')
            

def draw():
    '''
    many options considering I could include betting... lets just say they lose?
    '''
    print('===============================================================================')
    print("You and the dealer have both busted")
    again = input("Would you like to play again? y or n: ",)
    while True:
        if again == 'y':
            main()
            break
        elif again == 'n':
            print("Thank's for playing! check to see leadeboard if you'd like!")
            print('===============================================================================')
            mainMenu()
            break
    

score = 0
def scoreAdd(score):
    '''
    the player has won a round and can continue to boost their streak
    '''
    print('===============================================================================')
    print("You have beaten the dealer this round!")
    again = input("Would you like to keep playing? y or n: ", )
    while True:
        if again == 'y':
            score += 1
            main()
            break
        elif again == 'n':
            print('Chow big man')
            print('===============================================================================')
            mainMenu()
            break

#The main function of the game that runs values with their dictionary.
def mainMenu():
    while True:
        print('')
        print("P: Play")
        print("R: Rules")
        print("A: About")
        print("Q: Quit")
        usinput = input("Please enter the corresponding letter for what you desire: ", )
        if usinput == "P" or usinput == "p":
            main()
        elif usinput == "A" or usinput == "a":
            print("==========================================================================")
            print("Hi, my name is Collin Shen, a freshman comp sci major at Stevens Tech, I made this github account")
            print("to upload classwork or fun projects to share with friends, employers, or anyone curious!")
            print("I expect to look back at this project with more knowledge in the future, so any bugs reported are much appreciated!")
            print("I have an Insta for my projects as well for sharing the process of making")
            print("IG: @Cshen.stem")
            print("==========================================================================")
        elif usinput == "Q" or usinput == 'q':
            break
        elif usinput == "R" or usinput == 'r':
            print("==========================================================================")
            print("This version of black jack will be based on no bets and a winstreak")
            print("The player will be dealt 2 cards, and can choose the value of an Ace to be 1 or 11")
            print("The player can then choose to hit or stay, if they stay it passes to dealers turn")
            print("If the player chooses to hit, their value increases, if it passes 21 they bust")
            print("If the dealer's card are below 17, they are forced to hit, if they are above, they must stay")
            print("If the dealer and player tie values and niehter bust, the dealer wins")
            print("==========================================================================")
def main():
    '''
    first we randomly select 2 cards from the deck, then the game will check if they
    got 2 aces, because the way I designed the dict values, it will break if they want
    to assign them to different values, but otherwise they are given a choice if they
    only get 1 Ace, then they will see their total and be given the oppurtunity to hit
    or stay at their value. If they choose to hit, another card will be randomly
    selected to be added to their value, and if exceeding 21, then they bust and have
    to hope the dealer will bust
'''
    print("==========================================================")
    g = random.choice(deck)
    f = random.choice(deck)
    if f == 'A' and g == 'A':
        valueTotal = doubleA()
        game(valueTotal)
    elif f == 'A':
        print(g)
        f = aAssign()
        valueTotal = values[str(f)]+ values[str(g)]
        print('')
        print('Your cards are:',f ,'and' , g, "with a value of:", valueTotal)
        game(valueTotal)
    elif g == 'A':
        print(f)
        g = aAssign()
        valueTotal = values[str(f)]+ values[str(g)]
        print('')
        print('Your cards are:',f ,'and' , g, "with a value of:", valueTotal)
        game(valueTotal)
    else:
        valueTotal = values[str(f)]+ values[str(g)]
        print('')
        print('Your cards are:',f ,'and' , g, "with a value of:", valueTotal)
        game(valueTotal)

#The secondary function which is all the user interaction       
def game(valueTotal):
    '''
    This function will be the hit or stay function, with a situation for every outcome
    whether they hit and can hit again, stay at their current value, or bust from a hit.
    
'''
    while True:

        hit = input('Would you like to hit? y or n: ', )
        if hit == 'y':
            addedcard = random.choice(deck)
            if addedcard == 'A':
                addedcardValue = aAssign()
            addedcardValue = values[str(addedcard)]
            valueTotal += addedcardValue
            print('')
            print('Your new card is:', addedcard, ' which brings the total to: ', valueTotal)
            if valueTotal > 21:
                print('')
                print('Since your total is: ', valueTotal)
                print('You have busted! hopefully the dealer will also bust')
                dealerTime(valueTotal)
                break
        elif hit == 'n':
            print('')
            print("You've decided to stay at: ", valueTotal)
            dealerTime(valueTotal)
            break



def dealerTime(playerTotal):
    '''
    In this version of BlackJack, I decided to just roll with Aces are 11 as
    the dealer is always going to have to hit until they get to a value of 17
    '''
    g = random.choice(deck)
    f = random.choice(deck)
    values['A'] = 11
    print('===============================================================================')
    print("The dealer began with cards: ", g, "and", f," for a value of: ", values[str(f)] + values[str(g)])
    dealerTotal = values[str(f)]+ values[str(g)]
    while True:
        if dealerTotal < 17:
            print('')
            print("The dealer must hit since their value is below 17")
            addedCard = random.choice(deck)
            dealerTotal += values[str(addedCard)]
            print('')
            print("Their new card is: ", addedCard, " bringing their total to: ", dealerTotal)
        else:
            if dealerTotal < playerTotal and playerTotal <= 21:
                scoreAdd(score)
                break
            elif dealerTotal > 21 and playerTotal <= 21:
                print('')
                print("The dealer has busted, but you didn't!")
                scoreAdd(score)
                break
            elif dealerTotal > 21 and playerTotal > 21:
                draw()
                break
            else:
                tryAgain()
                break
    

          
        
            
            
mainMenu()
    
    
    
        

    
        

        
