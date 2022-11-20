import { GetServerSideProps, type NextPage } from "next";
import Link from "next/link";
import DisplayNote from "../../components/DisplayNote";
import getNotes from "../../utils/getNotes";


type Note = {
  _id: string,
  title : string,
  body: string
}

type Notes = {
  Notes : Note[]
}

type UserInfo = {
  Name : string
}

type props ={
  Notes : Notes,
  UserInfo : UserInfo
}
const Home = ({Notes,UserInfo}: props) => {
  const noteObjs = Notes?.Notes
  console.log(Notes)
  return (
    <>
      <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {noteObjs?.map((note)=>(<DisplayNote key={note._id} title={note.title} body={note.body}  />))}
        </div>
      </main>
    </>
  );
};

export default Home;


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const notes = await getNotes(req.cookies)
  return {
    props: {
      Notes : notes
    }, 
  }
}