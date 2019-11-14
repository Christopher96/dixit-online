
#### Description
An online version of the game Dixit. It will be played on a single computer in the web browser. Rules of the game are written below. 

#### API
The game uses the [Unsplash API](https://unsplash.com/developers "Unsplash API") to display pretty images as playing cards.

#### Backend
A lightweight back end server is run behind the scenes to store saved games and for making calls to the Unsplash API. The backend serves as a RESTful API where simple endpoints are used for fetching and storing data.

#### Frameworks
[React](https://reactjs.org/ "React") is the primary front end framework.

[Lightbox](https://www.lokeshdhakar.com/projects/lightbox2/ "Lightbox") is used for expanding images.

The back end server run on [Express](https://expressjs.com/ "Express"), [MongoDB](https://www.mongodb.com/ "MongoDB") and [Mongoose](https://mongoosejs.com/ "Mongoose").


#### [Dixit Rules](https://unsplash.com/developers "Dixit Rules")

The game is played in rounds. Every round is played as follows:
Everybody adds cards to his hand to total of 6 cards. One storyteller is assigned. The storyteller picks a card from his hand and adds a line of description. The chosen card is placed face-down on the table and the line of description is made public.
The other players all choose a card from their hand that best fits that same description. The cards are shuffled and placed face-up on the table. Now all the non-storyteller players chose the card which they think is the original card of the storyteller. One the count of three all the players reveal their choice. Now points are divided:
* If everybody correctly guessed the storyteller’s card or if nobody guessed the storyteller’s card, then the storyteller receives no points and all the other players receive 2 points.
* Otherwise the storyteller receives 3 points and every player who correctly guessed the storyteller’s card receives 3 points.
* Every non-storyteller player receives 1 point for every vote on their card.

Therefore, as a storyteller you want to a description that is vague enough that not everybody guesses the card, but precise enough that at least one person guesses the card. The game continues for either a predefined number of rounds or until someone reaches a retrain score.

#### What we have done so far
We have created a back end server which can fetch images, validate input by comparing it to predefined schemas, check if games exists as well as create and fetch new games.
As for the frontend only the starting screen is completed and working sufficiently for creating new games and continuing already existing games. Some of the game logic has been implemented but nothing visual so far.

#### What we are looking to do
As of planned we will expand the game and player schema in order to store more data needed to play the game, this will include an array of images for the players illustrating their hand of cards.illustrating their hand of cards. When we have the data structure we can finish the game, we may also need to add additional endpoints for saving game progress while playing and fetching different types of images.

#### Files
```
dixit-online
│
└───server
│   │
│   └───modules
│   │   │   // These files represent the data models in the database
│   │
│   └───routes
│   │   │   // The different routes that the backend uses
│   │
│   └───schemas
│   │   │   // These files are used for representing the data contained in the models
│   │
│   └───index.js
│       │   // This file sets up the Express server and MongoDB instance
│   
└───src
    │
    └───context/gameContext.js
    │   │   // This file sets up a context that can be used globally in the application
    │
    └───data/DixitModel.js
    │   │   // The model used for making API calls to the back end
    │
    └───game            // The container for the game view
    │   gameSetup       // Startpage view for creating and continuing games
    │   gameField       // The playing field of the game
    │   gameSidebar     // A sidebar containing the players in the game
    │   │   // Each view has a .css file for local styling
    │   │   // And a .js file for setting up the view component
    │
    └───images          // Images used as background and for containers
    │   fonts           // Fonts used for text fields
    │
    └───app.js
        │   // React component that contains the routing of the application
```
