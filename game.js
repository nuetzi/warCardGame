let playerDeck = [];
let opponentDeck = [];
let roundCards = [];
const div = document.createElement("div")



class card {
    constructor(value, name, suit, color) {
        this.value = value;
        this.name = name;
        this.suit = suit;
        this.color = color;
    }
}

// Since I had a number of functions using the deck as an argument, I just made them methods of a fullDeck object
class fullDeck {
    constructor() {
        this.deck = [];         
        this.sort();            // Calling this actually creates the deck
        this.shuffle();         // Since we need a shuffled deck anyway, this saves using the method later
    }

    // Method that produces a full deck in order, as you might see in a brand new pack
    // It could be useful to 'reset' the deck at some point, so I made it a method also
    sort() {
        this.deck = [];
        this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',];
        this.suits = ['&spades;', '&hearts;', '&clubs;', '&diams;'];
        this.colors = ['black', 'red'];              // I think this key will help me when I create visuals

        // Creates a card of every name in each suit
        for (let i = 0; i < this.suits.length; i++) {
            for (let j = 0; j < this.names.length; j++) {
                this.deck.push(new card(j+1, this.names[j], this.suits[i], this.colors[i % 2]));
            }
        }

        // In this game, I want Aces to be the highest value card
        // This bit of code can be commented out if a game requires Aces to count as 1
        this.deck.forEach((card) => {
            if (card.value == 1) {
                card.value += 13
            }
            if (card.color == 'red') {
                document.querySelector(".card").className += 'red';
            }
        });

    }
    

    // Method for shuffling (randomizing) the array of cards
    // I'm using the Fisher-Yates Shuffle algorithm for optimal randomization
    shuffle() {
        const deck = this.deck;
        let temp;                                                 // Using 'temp' to allow swapping of cards without array splicing
        for (let i = deck.length - 1; i > 0; i--) {               // While there remain elements to shuffle…
            let rand = Math.floor(Math.random() * (i + 1));       // Pick a remaining element…
            temp = deck[i];                                       //
            deck[i] = deck[rand];                                 // And swap it with the current element.
            deck[rand] = temp;                                    //
        }
        return deck;
    }

    // Simple method for dealing the first card and removing it from the deck
    dealOne() {
        return this.deck.shift();
    }

    // Evenly distributes the cards between 2 arrays, which we will need in this game
    dealHalf() {
        for (let i = 0; i < this.deck.length; i++) {
            if (i % 2 == 0) {
                playerDeck.push(this.deck[i]);
            }
            else opponentDeck.push(this.deck[i]);
        }
    }

}



gameDeck = new fullDeck;
console.log(gameDeck.deck[0]);
gameDeck.dealHalf();






//
//------------------- GAMEPLAY ------------------------
//

const playRound = (playerDeck, opponentDeck) => {
    if (playerDeck.length && opponentDeck.length > 0) {
        roundCards.unshift(playerDeck.pop());                    // NOTE: Player's card will always have an odd index# in roundCards array
        roundCards.unshift(opponentDeck.pop());
        document.querySelector(".card.player.obverse").innerHTML = ` ${roundCards[1].name} ${roundCards[1].suit} `;
        document.querySelector(".card.opponent.obverse").innerHTML = ` ${roundCards[0].name} ${roundCards[0].suit} `;

        // Test for a draw in the cards played and if so, deal out cards in a "war" scenario
        // The do-while loop will repeat until there is not a draw between the last played card by each side
        do {
            if (roundCards[1].value === roundCards[0].value) {
                alert(`                                                     WAR! 
                                                Click OK to continue`);
                if (playerDeck.length && opponentDeck.length >= 4) {
                    for (let i = 0; i < 4; i++) {
                        roundCards.unshift(playerDeck.pop());
                        roundCards.unshift(opponentDeck.pop());
                    }
                }
                else {
                    for (let i = Math.min(playerDeck.length, opponentDeck.length); i > 0; i--) {
                        roundCards.unshift(playerDeck.pop());
                        roundCards.unshift(opponentDeck.pop());
                    }
                }
            }
        }
        while (roundCards[1].value === roundCards[0].value && roundCards[1] !== undefined && roundCards[0] !== undefined);

        // If the player's last played card is greater, all cards in the round go to the bottom of the player's deck
        if (roundCards[1].value > roundCards[0].value) {
            for (let j = roundCards.length; j > 0; j--) {
                playerDeck.unshift(roundCards.pop());
            }
        }

        // If the opponent's last played card is greater, all cards in the round go to the bottom of the opponent's deck
        else {
            for (let j = roundCards.length; j > 0; j--) {
                opponentDeck.unshift(roundCards.pop());
            }
        }
    }
    else {
        if (playerDeck.length == 0) {
            alert("Player 2 wins!");
        }
        else alert("Player 1 wins!");
    }

}

const PLAY = () => {
    playRound(playerDeck, opponentDeck);
    console.log(playerDeck.length);
    console.log(opponentDeck.length);
};



document.querySelector('.playButton').addEventListener('click', PLAY);
document.addEventListener("keypress", PLAY);

console.log(playerDeck);
console.log(opponentDeck);

// STILL TO DO:
//** Need to show red suits properly */
//DOM elements to create visuals and HTML interface
//Need to code logic for "war" scenario when a deck has <4 cards **(Still needs testing)
//Play-test for unexpected errors