
import './App.css';
import {useState,useEffect} from "react"
import axios from "axios"

function App() {
  
  const [notes,setNotes]=useState(null);
  const[createForm,setCreateForm]=useState({
    title:'',
    body:''
  });

  const [updateForm,setUpdateform]=useState({
    _id:null,
     title:"",
     body:"",
   })

  useEffect(()=>{
    fetchNotes();
    
  },[])



  const fetchNotes = async () => {
    try {
        const res = await axios.get("http://localhost:3000/notes"); // Ensure this matches your server configuration
        
        setNotes(res.data.notes);
        // console.log(res); // Assuming your response contains data property with the notes
    } catch (error) {
        console.error("Error fetching notes:", error);
    }
  };
const updateCreateFormField=(e)=>{
   const {name,value}= e.target;
   console.log({name,value});

   setCreateForm({
    ...createForm,[name]:value,
  })
}

const createNote=async (e)=>{
  e.preventDefault();
  const res=await axios.post("http://localhost:3000/notes",createForm);

  setNotes([...notes,res.data.note]);
  console.log(res);

  //clearstate

  setCreateForm({title:"",body:""})
  


}
const deleNote=async (_id)=>{
  //del note 

  const res=await axios.delete(`http://localhost:3000/notes/${_id}`)
  const newNotes=[...notes].filter(note=>{
    return note._id!==_id
  })
  setNotes(newNotes)


  //update state

}

const handleUpdateFieldChange=(e)=>{
  const {value,name}=e.target
  setUpdateform({
    ...updateForm,
    [name]:value
  })

}
const toggleUpdate=(note)=>{
  //get cureent  note values 

  console.log(note)


  //set state on update form
}
 

  return (
    <div className="App">
      <h2>notes:</h2>

      <div>
       {notes&&notes.map((note)=>{
        return(
          <div>
           
           <div key={note._id}>
               <h1>{note.title}</h1>
               <button onClick={()=>deleNote(note._id)}>Delete note</button>
               <button onClick={()=>toggleUpdate(note)}>Update Note</button>
            </div>
      </div>
        )
      })}
    </div>
   
    <div>
      <h2>update note</h2>
      <form >
        <input onChange={handleUpdateFieldChange}  value={updateForm.title} name='title'></input>
        <textarea onChange={handleUpdateFieldChange} value={updateForm.body} name='body'></textarea>
        <button type='submit'>update note</button>
      </form>
    </div>
    
    <div>
              <h2>create note</h2>
              <form onSubmit={createNote}> 
                <input onChange={updateCreateFormField} value={createForm.title} name="title"></input>
                <textarea  onChange={updateCreateFormField} value={createForm.body} name="body"/>
                <button type='submit'>Create note</button>
              </form>
            </div>
    </div>
  );
}

export default App;


