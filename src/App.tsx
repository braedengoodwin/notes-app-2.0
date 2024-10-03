import { useState } from "react";
import "./App.css";

type Note = {
  id: number;
  title: string;
  content: string;
};

const App = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Title 1",
      content: "Content 1",
    },
    {
      id: 2,
      title: "Title 2",
      content: "Content 2",
    },
    {
      id: 3,
      title: "Title 3",
      content: "Content 3",
    },
    {
      id: 4,
      title: "Title 4",
      content: "Content 4",
    },
    {
      id: 5,
      title: "Title 5",
      content: "Content 5",
    },
  ]);

  // funct for adding not
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
    
  };

  // funct for clicking and populating edit not
  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);

  };

  // funct for updating note
  const handleUpdateNote = (e: React.FormEvent) =>{
    e.preventDefault()

    if(!selectedNote){
      return;
    }
    
    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content
    }

    const updatedNotesList = notes.map((note) => note.id === selectedNote.id ? updatedNote : note)
    setNotes(updatedNotesList)
    setTitle("")
    setContent("")
    setSelectedNote(null)
  }

  // funct for canceling update
  const handleCancel = () => {
    setTitle("")
    setContent("")
    setSelectedNote(null)
  }

  return (
    // we can split this into 2 main sections, 1 section for title, content, button 1 section for notes
    <div className="app-container">
      {/*this first section will be for the inputs and add button(s)*/}
      <form className="note-form" onSubmit={(e) => selectedNote ? handleUpdateNote(e) : handleAddNote(e)}>
        <input
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <textarea
          required
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
        ></textarea>
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button> <button  onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
        
      </form>

      {/* this second section will be for the notes */}
      <div className="notes-grid">
        {notes.map((note) => (
          <div
            key={note.id}
            className="note-item"
            onClick={() => handleNoteClick(note)}
          >
            {/* the x will be for the header */}
            <div className="notes-header">
              <button>X</button>
            </div>

            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
