import { useEffect, useState } from "react";
import CreateRepo from "./Components/CreateRepo";
import CreateBtn from "./Components/CreateBtn";
import AllRepos from "./Components/AllRepos";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";

function App() {

 
  return (
    <>
   <Header/>
   <Outlet/>
   <Footer/>
   </>
  );
}

export default App;
