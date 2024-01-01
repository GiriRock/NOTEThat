import { GetServerSideProps } from "next";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Main from "../../components/Main";
import Sidebar from "../../components/SideBar";
import SideNavBar from "../../components/SideNavBar";
import getNotes from "../../utils/getNotes";
import { uuid } from "../../utils/uuid";
const jwt = require('jsonwebtoken')

type Note = {
  id: string,
  title: string,
  body: string,
  fv: boolean
}

type Notes = {
  Notes: Note[]
}

type UserInfo = {
  Name: string,
  Token: string
}

type props = {
  Notes: Notes,
  UserInfo: UserInfo
}
const Home = ({ Notes, UserInfo }: props) => {
  const [notes, setNotes] = useState(Notes?.Notes);
  const [activeNote, setActiveNote] = useState('');
  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      fv: true
    };
    console.log(newNote)
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };
  const onDeleteNote = async (noteId: string) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
    console.log(noteId);
    if (!noteId.includes('-')) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notes/deleteNote`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${UserInfo.Token}`
        },
        body: JSON.stringify({
          "_id": noteId
        })
      })
      console.log(response)
      toast.error('deleted Successfully');
    }
  };

  const onUpdateNote = (updatedNote: Note) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };
  return (
    <div className="App mt-2">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <SideNavBar userName={UserInfo.Name} currentLocation={"Notes"} />
      <Sidebar
        userinfo={UserInfo}
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote} setNotes={setNotes}      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} token={UserInfo.Token}/>
    </div>
  );
};

export default Home;


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const notes = await getNotes(req.cookies)
  const token = req.cookies.OursiteJWT
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const userinfo = {
    Name: decoded.name,
    Token: token
  }
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  return {
    props: {
      Notes: notes,
      UserInfo: userinfo
    },
  }
}