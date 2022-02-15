let playerDeck = [];
let opponentDeck = [];
let roundCards = [];

// Create a template for card objects
class card {
    constructor(value, name, suit, color) {
        this.value = value;
        this.name = name;
        this.suit = suit;
        this.color = color;
    }
}

// Creates an array of objects representing the standard deck of playing cards
const createDeck = () => {
    let deck = [];   // Initialize an array to store the created objects
    this.names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    this.suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
    this.color = ['black', 'red'];

    // Creates a card of every name in each suit
    // I used j+2 as the value, so numerical cards have the same value as the number they show
    //
    // For some games, the Ace might need to be altered to be valued as a 1
    // This could be easily achieved by placing the Ace at the beginning of the names array
    // and using j+1 as the card values in the loop below
    //
    for (let i = 0; i < this.suits.length; i++) {
        for (let j = 0; j < this.names.length; j++) {
            deck.push(new card(j+2, this.names[j], this.suits[i], this.color[i % 2]));
        }
    }
    return deck;
}


// Function for shuffling (randomizing) the array of cards
// Using the Fisher-Yates Shuffle algorithm for optimal randomization of shuffle
const shuffle = (deck) => {
    let temp;                                               // Using 'temp' to allow swapping of cards without splicing
    for (let i = deck.length - 1; i > 0; i--) {             // While there remain elements to shuffle…
      let rand = Math.floor(Math.random() * (i + 1));       // Pick a remaining element…
      temp = deck[i];                                       //
      deck[i] = deck[rand];                                 // And swap it with the current element.
      deck[rand] = temp;                                    //
    }
    return deck;
}

                              


// Evenly distribute the cards between 2 arrays
const dealCards = (deck) => {
    for (let i = 0; i < deck.length; i++) {
        if (i % 2 == 0) {
            playerDeck.push(deck[i]);
        }
        else opponentDeck.push(deck[i]);
    }
}

let gameDeck = createDeck();                                // Creates a new deck of standard cards
console.log(gameDeck);
gameDeck = shuffle(gameDeck);                               // Shuffles the deck -- Could shuffle any array


// ------------------------ TEST CODE START ------------------------
window.onload = function() {

	for(var i=0; i < gameDeck.length; i++){
		div = document.createElement('div');
		div.className = 'card';

		if(gameDeck[i].suit == 'Diamonds'){
			var ascii_char = '♦';
		} else {
			var ascii_char = '&' + gameDeck[i].suit.toLowerCase() + ';';
		}

		div.innerHTML = '' + gameDeck[i].name + '' + ascii_char + '';
		document.body.appendChild(div);
	}
}
// // ************************************************
//     const deckDisplay = div({ class: 'deck' });
    
//     cardsData.forEach((i) => {
//         const card = createCard(i);
        
//         deckDisplay.appendChild(card);
//       });
      
//       document.body.appendChild(deckDisplay);

// }
// ------------------------ TEST CODE END ------------------------
dealCards(gameDeck);                                        // Splits deck into 2 arrays (1 for each player)


const playRound = (playerDeck, opponentDeck) => {
    roundCards.push(playerDeck.shift());
    roundCards.push(opponentDeck.shift());

    // Test for a draw in the cards played and deal out cards in a "war" scenario
    // The do-while loop will repeat until there is not a draw between the last played card by each side
    do {
        if (roundCards[roundCards.length-2].value === roundCards[roundCards.length-1].value) {
            for (let i = 0; i < 4; i++) {
                roundCards.push(playerDeck.shift());
                roundCards.push(opponentDeck.shift());
            }
        }
    }
    while (roundCards[roundCards.length-2].value === roundCards[roundCards.length-1].value)

    // If the player's last played card is greater, all cards in the round go to the bottom of the player's deck
    if (roundCards[roundCards.length-2].value > roundCards[roundCards.length-1].value) {
        for (let j = roundCards.length; j > 0; j--) {
            playerDeck.push(roundCards.shift());
        }
    }

    // If the opponent's last played card is greater, all cards in the round go to the bottom of the opponent's deck
    else {
        for (let j = roundCards.length; j > 0; j--) {
            opponentDeck.push(roundCards.shift());
        }
    }

}


// STILL TO DO:
//
//DOM elements to create visuals and HTML interface
//Need to code for "war" scenario when a deck has <4 cards
//Need to code win/lose conditions
//Play test for unexpected errors