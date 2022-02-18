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
                card.value += 13;
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

    // Evenly distributes the cards between 2 arrays, which we will need to start this game
    // Could be modified to deal any number of cards between 2 players
    dealHalf() {
        for (let i = 0; i < this.deck.length; i++) {
            if (i % 2 == 0) {
                playerDeck.push(this.deck[i]);
            }
            else opponentDeck.push(this.deck[i]);
        }
    }

}


gameDeck = new fullDeck;            // Creates a shuffled deck named gameDeck
gameDeck.dealHalf();                // Creates 2 arrays, each containing half of the original gameDeck






//
//------------------- GAMEPLAY ------------------------
//

const playRound = (playerDeck, opponentDeck) => {
    document.querySelector("#active1").classList.remove("empty");
    document.querySelector("#active1").classList.add("obverse");
    document.querySelector("#active2").classList.remove("empty");
    document.querySelector("#active2").classList.add("obverse");
    document.querySelector(".playerCount").innerHTML = `Player 1 <br> ${playerDeck.length} remaining`;
    document.querySelector(".opponentCount").innerHTML = `Player 2 <br> ${opponentDeck.length} remaining`;

    if (playerDeck.length && opponentDeck.length > 0) {
        roundCards.unshift(playerDeck.pop());                    // NOTE: In this setup, player's card will always have an odd index# in roundCards array
        roundCards.unshift(opponentDeck.pop());
        document.querySelector(".card.player.obverse").innerHTML = `<br> ${roundCards[1].name} <br> ${roundCards[1].suit} `;
        if (roundCards[1].color == 'red') {
            document.querySelector("#active1").classList.remove("black");
            document.querySelector("#active1").classList.remove("red");
            document.querySelector("#active1").classList.add("red");
        }
        else {
            document.querySelector("#active1").classList.remove("black");
            document.querySelector("#active1").classList.remove("red");
            document.querySelector("#active1").classList.add("black");
        }
        document.querySelector(".card.opponent.obverse").innerHTML = `<br> ${roundCards[0].name} <br> ${roundCards[0].suit} `;
        if (roundCards[0].color == 'red') {
            document.querySelector("#active2").classList.remove("black");
            document.querySelector("#active2").classList.remove("red");
            document.querySelector("#active2").classList.add("red");
        }
        else {
            document.querySelector("#active2").classList.remove("black");
            document.querySelector("#active2").classList.remove("red");
            document.querySelector("#active2").classList.add("black");
        }

        // Test for a draw in the cards played and if so, deal out 4 more cards in a "war" scenario
        // The do-while loop will repeat until there is not a draw between the last played card by each side
        do {
            if (roundCards[1].value === roundCards[0].value) {
                document.querySelector(".status").innerHTML = "WAR!"
                alert(`                                                     WAR! 
                                                Click OK to continue`);
                if (playerDeck.length && opponentDeck.length >= 4) {
                    for (let i = 0; i < 4; i++) {
                        roundCards.unshift(playerDeck.pop());
                        roundCards.unshift(opponentDeck.pop());
                    }
                    document.querySelector(".card.player.obverse").innerHTML = `<br> ${roundCards[1].name} <br> ${roundCards[1].suit} `;
                    if (roundCards[1].color == 'red') {
                        document.querySelector("#active1").classList.remove("black");
                        document.querySelector("#active1").classList.remove("red");
                        document.querySelector("#active1").classList.add("red");
                    }
                    else {
                        document.querySelector("#active1").classList.remove("black");
                        document.querySelector("#active1").classList.remove("red");
                        document.querySelector("#active1").classList.add("black");
                    }                    
                    document.querySelector(".card.opponent.obverse").innerHTML = `<br> ${roundCards[0].name} <br> ${roundCards[0].suit} `;
                    if (roundCards[0].color == 'red') {
                        document.querySelector("#active2").classList.remove("black");
                        document.querySelector("#active2").classList.remove("red");
                        document.querySelector("#active2").classList.add("red");
                    }
                    else {
                        document.querySelector("#active2").classList.remove("black");
                        document.querySelector("#active2").classList.remove("red");
                        document.querySelector("#active2").classList.add("black");
                    }
                }

                if (playerDeck.length < 4) {
                    document.querySelector("#deck1").classList.remove("reverse");
                    document.querySelector("#deck1").classList.add("empty");
                    document.querySelector(".status").innerHTML = "<b> Player 1 is out of cards <br> Player 2 wins the game! </b>";
                    alert("Player 2 wins the game!");
                    return false;
                    }

                if (opponentDeck.length < 4) {
                    document.querySelector("#deck2").classList.remove("reverse");
                    document.querySelector("#deck2").classList.add("empty");
                    document.querySelector(".status").innerHTML = "<b> Player 2 is out of cards <br> Player 1 wins the game! </b>";
                    alert("Player 1 wins the game!");
                    return false;
                }      
            }
        }
        while (roundCards[1].value === roundCards[0].value);

        // If the player's last played card is greater, all cards in the round go to the bottom of the player's deck
        if (roundCards[1].value > roundCards[0].value) {
            document.querySelector(".status").innerHTML = "Player 1 wins this round"
            for (let j = roundCards.length; j > 0; j--) {
                playerDeck.unshift(roundCards.pop());
            }
            if (opponentDeck.length == 0) {
                document.querySelector("#deck2").classList.remove("reverse");
                document.querySelector("#deck2").classList.add("empty");
                document.querySelector(".status").innerHTML = "<b> Player 2 is out of cards <br> Player 1 wins the game! </b>";
                alert("Player 1 wins the game!");
            }
        }

        // If the opponent's last played card is greater, all cards in the round go to the bottom of the opponent's deck
        else {
            for (let j = roundCards.length; j > 0; j--) {
                document.querySelector(".status").innerHTML = "Player 2 wins this round";
                opponentDeck.unshift(roundCards.pop());
            }
            if (playerDeck.length == 0) {
                document.querySelector("#deck1").classList.remove("reverse");
                document.querySelector("#deck1").classList.add("empty");
                document.querySelector(".status").innerHTML = "<b> Player 1 is out of cards <br> Player 2 wins the game! </b>";
                alert("Player 2 wins the game!");
            }
        }
        document.querySelector(".playerCount").innerHTML = `Player 1 <br> ${playerDeck.length} remaining`;
        document.querySelector(".opponentCount").innerHTML = `Player 2 <br> ${opponentDeck.length} remaining`;
    }

// -------------------- Win conditions -------------------------------
    else {
        if (playerDeck.length == 0 && (roundCards[1] < roundCards[0])) {
            document.querySelector("#deck1").classList.remove("reverse");
            document.querySelector("#deck1").classList.add("empty");
            document.querySelector(".status").innerHTML = "<b> Player 1 is out of cards <br> Player 2 wins the game! </b>";
            alert("Player 2 wins the game!");
        }
        else if (opponentDeck.length == 0 && (roundCards[0] < roundCards[1])) {
            document.querySelector("#deck2").classList.remove("reverse");
            document.querySelector("#deck2").classList.add("empty");
            document.querySelector(".status").innerHTML = "<b> Player 2 is out of cards <br> Player 1 wins the game! </b>";
            alert("Player 1 wins the game!");
        }
    }

}

const shuffle = (array) => {
    let temp;                                                 // Using 'temp' to allow swapping of cards without array splicing
    for (let i = array.length - 1; i > 0; i--) {               // While there remain elements to shuffle…
        let rand = Math.floor(Math.random() * (i + 1));       // Pick a remaining element…
        temp = array[i];                                       //
        array[i] = array[rand];                                 // And swap it with the current element.
        array[rand] = temp;                                    //
    }
    return array;
}

// --------------------- Button functions ---------------------
const shuffle1 = () => {
    shuffle(playerDeck);
}

const shuffle2 = () => {
    shuffle(opponentDeck);
}

const PLAY = () => {
    playRound(playerDeck, opponentDeck);
};

const RESET = () => {
    document.querySelector(".playerCount").innerHTML = "Player 1";
    document.querySelector(".opponentCount").innerHTML = "Player 2";
    document.querySelector(".status").innerHTML = "";
    document.querySelector("#active1").innerHTML = "";
    document.querySelector("#active2").innerHTML = "";
    document.querySelector(".status").innerHTML = "<b> Click the start button to begin </b>"
    document.querySelector("#deck1").classList.remove("empty");
    document.querySelector("#deck1").classList.add("reverse");
    document.querySelector("#active1").classList.remove("obverse");
    document.querySelector("#active1").classList.add("empty");
    document.querySelector("#active2").classList.remove("obverse");
    document.querySelector("#active2").classList.add("empty");
    document.querySelector("#deck2").classList.remove("empty");
    document.querySelector("#deck2").classList.add("reverse");
    playerDeck = [];
    opponentDeck = [];
    roundCards = [];
    gameDeck = new fullDeck;
    gameDeck.dealHalf();
}


document.querySelector('.playButton').addEventListener('click', PLAY);
document.addEventListener("keypress", PLAY);                                    // Can use key presses to speed up the game
document.querySelector('.resetButton').addEventListener('click', RESET);
document.querySelector('#shuffle1').addEventListener('click', shuffle1);
document.querySelector('#shuffle2').addEventListener('click', shuffle2);


// STILL TO DO:
//Errors in endgame