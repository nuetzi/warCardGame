let playerDeck = [];
let opponentDeck = [];

// Create a template for card objects
class card {
    constructor(value, name, suit) {
        this.value = value;
        this.name = name;
        this.suit = suit;
    }
}

// Creates an array of objects representing the standard deck of playing cards
const createDeck = () => {
    let deck = [];   // Initialize an array to store the created objects
    this.names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    this.suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];

    // Creates a card of every name in each suit
    // I used j+2 as the value, so numerical cards have the same value as the number they show
    // For some games, the Ace might need to be altered to be valued as a 1
    for (let i = 0; i < this.suits.length; i++) {
        for (let j = 0; j < this.names.length; j++) {
            deck.push(new card(j+2, this.names[j], this.suits[i]));
        }
    }
    return deck;
}


// Function for shuffling (randomizing) the array of cards
// Using Fisher-Yates Shuffle for optimal randomization of shuffle
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

let gameDeck = createDeck();                                // Creates a new deck
gameDeck = shuffle(gameDeck);                               // Shuffles the deck


// Evenly distribute the cards between 2 arrays
const dealCards = (deck) => {
    for (let i = 0; i < deck.length; i++) {
        if (i % 2 == 0) {
            playerDeck.push(deck[i]);
        }
        else opponentDeck.push(deck[i]);
    }
}


dealCards(gameDeck);


// FOR TESTING
console.log(playerDeck);
console.log(opponentDeck);