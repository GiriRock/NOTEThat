import ReactMarkdown from "react-markdown";

type props = {
    activeNote: any,
    onUpdateNote: any,
    token: string
}

const Main = ({ activeNote, onUpdateNote, token } : props) => {
  const onEditField = (field: string, value: string) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
    //   lastModified: Date.now(),
    });
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  const handleSave = async(e: React.FormEvent)=>{
    e.preventDefault()
    const loader = document.getElementById('loader')
        const form = document.getElementById('form')
        if (loader) {
            if(form){
                loader.style.display = 'block'
                form.style.display = 'none'
            }
        }
        if (activeNote.id){
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notes/updateNote`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "_id" : activeNote.id,
                    "title": activeNote.title,
                    "body": activeNote.body
                })
            })
            console.log(response)
        }else{
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notes/postNote`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "title": activeNote.title,
                    "body": activeNote.body
                })
            })
            console.log(response)
        }
        if (loader){
            if(form){
                loader.style.display = 'none'
                form.style.display = 'block'
            }
        }
    }
   return (
    <div className="app-main">
      <div className="app-main-note-edit mb-10">
      <form 
      onSubmit={(e) => handleSave(e)}>
          <input
            type="text"
            id="title"
            placeholder="Note Title"
            value={activeNote.title}
            onChange={(e) => onEditField("title", e.target.value)}
            autoFocus
          />
          <textarea
            id="body"
            placeholder="Write your note here..."
            value={activeNote.body}
            onChange={(e) => onEditField("body", e.target.value)}
          />
          <button type="submit" className="bg-black p-2 text-white rounded-lg hover:text-black border border-black hover:bg-white transition-all">Save</button>
        </form>
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Main;
function onUpdateNote(arg0: any) {
    throw new Error("Function not implemented.");
}

