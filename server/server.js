if(process.env.NODE_ENV!='production'){
  require('dotenv').config()
}

const express=require('express');
const app=express();
const connectToDb=require("./config/connectToDb");
connectToDb();
const port=process.env.PORT;
// const Note=require("./models/Note")
const notesController=require('./controllers/notesController')
app.use(express.json()); // its a middleware to handle the incoming request data and app.use() method with accept the body data in the json format

  // Enable cors at the server side. 
  const cors = require('cors')
  const corsOption = {
      origin: ['http://localhost:3001'],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
  }
  app.use(cors(corsOption));
  
app.get("/",(req,res)=>{
    res.json({hello:"helloworld"})
})
app.get("/notes",notesController.fetchNotes);

app.get("/notes/:id",notesController.fetchNote)

app.post("/notes",notesController.createNote )

app.put("/notes/:id",notesController.updateNote)

 app.delete("/notes/:id",notesController.deleteNote)



app.listen(port,()=>{
    console.log("listening on port 3000");
})

