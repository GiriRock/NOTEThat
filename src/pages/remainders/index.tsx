import { GetServerSideProps, type NextPage } from "next";
import SideNavBar from "../../components/SideNavBar";

const Home : NextPage = () => {
  
  return (
    <div className="App mt-2">
      <SideNavBar userName={"to Remainder section"} currentLocation={"Remainders"}  />
    </div>
  );
};

export default Home;


// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const notes = await getNotes(req.cookies)
//   const token = req.cookies.OursiteJWT
//   const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
//   const userinfo = {
//     Name: decoded.name,
//     Token: token
//   }
//   return {
//     props: {
//       Notes: notes,
//       UserInfo: userinfo
//     },
//   }
// }