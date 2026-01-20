import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Search from "./pages/Search.jsx";
import CarDetail from "./pages/CarDetail.jsx";

export default function App(){
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Search/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/car/:id" element={<CarDetail/>}/>
      </Routes>
    </>
  );
}