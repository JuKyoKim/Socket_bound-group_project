# Group_project - twitter game

##Group members
- [Zoe](https://github.com/zoejab)
- [Caroline](https://github.com/carkim)
- [Tom](https://github.com/JuKyoKim)

##Technology used
- Body-Parser
- express
- express-sessions
- mongoose
- morgan
- socket.io
- twit
- phasor
- jquery
- ajax(jquery)

##User Stories
- hit this [link](https://trello.com/b/B4O97RDg/twitter-game) for trello board
- hit this [link](https://docs.google.com/document/d/1zRE_Uv--YuGn7qPR_i5EDwMpJ1uHh_qilmy1-szjoWA/edit?ts=564e46e8) for google docs

##installation instructions
- download, fork, or clone the files
- in terminal go to the directory and type "npm install"
- install mongo DB following the documentation labeled [here](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)
- after installing mongo run "mongod" to kick up your database
- once all the dependencies are all installed type "nodemon" to kick off the server
- open your browser and go to "http://localhost:3000/"

##Wireframes
Click [here](https://www.gliffy.com/go/publish/9485881) for Wireframes

##Unsolved Problems
- The game itself still has its limitations on broadcasting to different sockets. 
- Overall design could look prettier once the rest of the code is finalized
- Some bugs regarding the hitbox for player 1
- Slow to retrieve data from API to fire the bullet
- Sessions are not saved in the database at the moment

##Approach used
- Split research on animated CSS features, socket.io, phaser
- individually implemented each feature and connected them all at the end
- Pulled information from Twitter Streaming API to power the game