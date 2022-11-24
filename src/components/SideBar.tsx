import SearchBar from "./SearchBar"

type Note = {
    id: string, title: string, body: string
}
type UserInfo = {
    Name: string
}

type props = {
    userinfo : UserInfo
    notes: Note[],
    onAddNote : any,
    onDeleteNote: any,
    activeNote: any,
    setActiveNote: any,
    setNotes: any
}

function Sidebar({
  userinfo,  notes , onAddNote, onDeleteNote, activeNote, setActiveNote, setNotes
} : props) {
    // const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
    return (
        <div className="app-sidebar">
            <div className="app-sidebar-header">
                <h1>{userinfo?.Name}&apos;s Notes</h1>
                <button onClick={onAddNote}>Add</button>
            </div>
            <div>
                <SearchBar setNotes={setNotes} notes={notes} />
            </div>
            <div className="app-sidebar-notes scrollbar-thin scrollbar-track-white scrollbar-thumb-black">
                {notes.map(({ id, title, body }, i) => (
                    <div
                        key={id}
                        className={`app-sidebar-note ${id === activeNote && "active"}`}
                        onClick={() => setActiveNote(id)}
                    >
                        <div className="sidebar-note-title">
                            <strong>{title}</strong>
                            <button onClick={(e) => onDeleteNote(id)}>Delete</button>
                        </div>

                        <p>{body && body.substr(0, 100) + "..."}</p>
                        {/* <small className="note-meta">
            Last Modified{" "}
            {new Date(lastModified).toLocaleDateString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </small> */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
