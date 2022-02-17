let playerDeck = [];
let opponentDeck = [];
let roundCards = [];



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
        this.createVisuals();
    }

    // Method that produces a full deck in order, as you might see in a brand new pack
    // It could be useful to 'reset' the deck at some point, so I made it a method also
    sort() {
        this.deck = [];
        this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',];
        this.suits = ['Spades', 'Hearts', 'Clubs', 'Diamonds'];
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
        });
    }

    createVisuals() {
        
        const elementCreator = (tagName, attributes, children) => {
            const element = document.createElement(tagName);
            
            if (attributes) {
              for (const attrName in attributes) {
                element.setAttribute(attrName, attributes[attrName]);
              }
            }
            
            if (children) {
              for (let i = 0; i < children.length; i++) {
                const child = children[i];
                
                if (typeof child === 'string') {
                  element.appendChild(document.createTextNode(child));
                } else {
                  element.appendChild(child);
                }
              }
            }
            
            return element;
        };
          
        const div = (attributes, children) => elementCreator('div', attributes, children);
        



            const deck = this.deck;
            // const div = document.createElement('div');
            for (let i = 0; i < deck.length; i++) {                                  // Create a div for each card
                let suitSymbol;
                div.className = 'card';
        
                if (this.deck[i].suit == 'Diamonds') {                               // Generates the viewable symbols for each suit
                    suitSymbol = '&diams;';
                } else {
                    suitSymbol = '&' + deck[i].suit.toLowerCase() + ';';
                }
        
                div.innerHTML = '' + deck[i].name + '' + suitSymbol + '';           // Displays card name and suit
                document.body.appendChild(document.createElement('div'));           // Make the div a child element of the body
            }
        
            
            const createSuit = (suit) => (position) => {
                const [x, y, mirrored] = position;
                let mirrorClass;
                if (mirrored) {
                    mirrorClass = " mirrored";
                } else { mirrorClass = ""}
            
                return div({
                    class: 'cardSuitSymbol' + mirrorClass,
                    style: `left: ${x * 100}%; top: ${y * 100}%;`
                }, [suit]);
            };
            

            // This bit of code is the best way I found to show the suits on the card faces
            // I didn't want to use an image for each card
            // Format is shown in rows, with each array in the format:
            // [x-position, y-position, upside-down]
            const suitPositions = [
                [
                [0, 0]                                    // A
                ],

                [
                [0, -1],
                [0, 1, true]                              // 2
                ],

                [
                [0, -1],
                [0, 0],                                   // 3
                [0, 1, true]
                ],

                [
                [-1, -1], [1, -1],
                [-1, 1, true], [1, 1, true]               // 4
                ],

                [
                [-1, -1], [1, -1],
                [0, 0],                                   // 5
                [-1, 1, true], [1, 1, true]
                ],

                [
                [-1, -1], [1, -1],
                [-1, 0], [1, 0],                          // 6
                [-1, 1, true], [1, 1, true]
                ],

                [
                [-1, -1], [1, -1],
                [0, -0.5],                                // 7
                [-1, 0], [1, 0],
                [-1, 1, true], [1, 1, true]
                ],

                [
                [-1, -1], [1, -1],
                [0, -0.5],
                [-1, 0], [1, 0],                          // 8
                [0, 0.5, true],
                [-1, 1, true], [1, 1, true]
                ],

                [
                [-1, -1], [1, -1],
                [-1, -1 / 3], [1, -1 / 3],
                [0, 0],                                   // 9
                [-1, 1 / 3, true], [1, 1 / 3, true],
                [-1, 1, true], [1, 1, true]
                ],

                [
                [-1, -1], [1, -1],
                [0, -2 / 3],
                [-1, -1 / 3], [1, -1 / 3],
                [-1, 1 / 3, true], [1, 1 / 3, true],      // 10
                [0, 2 / 3, true],
                [-1, 1, true], [1, 1, true]
                ],

                [
                [0, 0]                                    // J
                ],

                [
                [0, 0]                                    // Q
                ],

                [
                [0, 0]                                    // K
                ]
            ];




            deck.forEach((card) => {
                const colorClass = 'card ' + card.color;
        
                return div({class: colorClass}, [
                  div({ class: 'cardFaceSuits'},
                    suitPositions[card.value % 13].map(createSuit(card.suit))        // ************NEED TO FIX********************
                  ),
                  div({ class: 'cardTopLeft'}, [
                    div({ class: 'cardCornerName'}, [
                     card.name
                    ]),
                    div({ class: 'cardCornerSuit' }, [
                     card.suit
                    ])
                  ]),
                  div({ class: 'cardBottomRight' }, [
                    div({ class: 'cardCornerName' }, [
                      card.name
                    ]),
                    div({ class: 'cardCornerSuit' }, [
                      card.suit
                    ])
                  ])
                ]);
            })
        };

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
    roundCards.push(playerDeck.shift());                    // NOTE: Player's card will always have an even index# in roundCards array
    document.querySelector(".playerHand").innerHTML = roundCards[0]

    roundCards.push(opponentDeck.shift());


    // Test for a draw in the cards played and if so, deal out cards in a "war" scenario
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
//Need to code logic for "war" scenario when a deck has <4 cards
//Need to code win/lose conditions
//Play-test for unexpected errors