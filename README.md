# warCardGame

War is a simple card game I used to play with my sister when we were bored.
The rules are simple. Each player gets half a deck of cards.
Players turn over the top card of their stack, and the player with the higher card takes both.
If both cards have the same value, this is called "war".
Each player lays 3 more cards in the center face down, then flips the 4th one face up.
The highest card takes all of the cards in play.
If there is a tie in this scenario, the process is repeated.
If a player does not have enough cards to play, they are deemed the loser.

In practice, there is no strategy whatsoever to this game.
However, it can last a VERY long time, which made it ideal for killing time.

--------------------------

To play the game as presented, simply click the red "Click to play" button, which starts the first round.
The page automatically generates a new shuffled deck and gives each side half every time it is reloaded.
I included a shuffle option for each side, because scenarios can arise resulting in an ednless loop of each side
trading cards back and forth. In real life, we sometimes resorted to this too.
There is also a button to reset the whole game and start over, which resets the deck and player stacks.

For quicker play and convenience, I also enabled the option to press any character button on the keyboard to progress play.

--------------------------

Everything was done using HTML, CSS, and JavaScript to th ebest of my abilities.
Using the DOM, I coded the JavaScript to insert text and change the stylesheet as necessary.

For this exercise, I used a basic method of for loops to generate a deck containing an array of card objects with each of the 13 values for each of the 4 suits, totaling 52.

I used the Fisher-Yates alorithm for shuffling the deck, since it is noted for its minimal bias
and computational load.
The deck was then split into two halves, one for each "Player".

Coding for the winner of a typical round was a simple comparison of values.
The major complications for me were in CSS styling and end-game scenarios.

There are numerous examples of JavaScript code for a deck of cards, but since the purpose of this
project was not to copy and paste someone else's code, I had to accept the limitations of my
ability to create card faces and resort to simply have the card value and suit on the face.
Getting the hearts/diamonds to consistently show up as red and the clubs/spades to consistently
show up as black was a little tricky in itself.

I do think I managed to get it right by manipulating the CSS class correctly in the JS code.

I was unable to totally fix the end-game edge cases, so there are some questionable scenarios that still arise.

-------------------------
