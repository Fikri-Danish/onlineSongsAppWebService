# Song App Web Service (Express + MySQL)

A simple REST API built with **Express** and **mysql2/promise** to manage cards stored in a MySQL database.

---
## Routes

GET     /allsongs  
POST    /addsong              body: { card_name, card_pic }  
PUT     /editsong/:id         params: { id }, body: { song_name, song_artist, song_genre }  
DELETE  /deletesong/:id       params: { id }
