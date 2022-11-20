import { GetServerSideProps, type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import DisplayNote from "../../components/DisplayNote";
import Main from "../../components/Main";
import Sidebar from "../../components/SideBar";
import getNotes from "../../utils/getNotes";
const jwt = require('jsonwebtoken')

type Note = {
  id: string,
  title: string,
  body: string
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
      id : '123',
      title: "Untitled Note",
      body: "",
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };
  const onDeleteNote = async (noteId : string) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
    console.log(noteId)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notes/deleteNote`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${UserInfo.Token}`
      },
      body: JSON.stringify({
          "_id" : noteId
      })
  })
  console.log(response)
  };

  const onUpdateNote = (updatedNote : Note) => {
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
    <Sidebar
        userinfo = {UserInfo}
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
    <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} token = {UserInfo.Token}/>
    </div>
  );
};

export default Home;


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const notes = await getNotes(req.cookies)
  const token = req.cookies.OursiteJWT
  let decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  const userinfo = {
    Name: decoded.name,
    Token: token
  }
  return {
    props: {
      Notes: notes,
      UserInfo: userinfo
    },
  }
}