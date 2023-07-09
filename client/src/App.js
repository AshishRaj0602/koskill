import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import { register } from './store/userSlice';
function App() {
  const dispatch = useDispatch();
  let [user,setUser]=useState(null);
  useEffect(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      user = JSON.parse(localStorage.getItem("User"));
      setUser(user);
    dispatch(register(user));
  }, []);
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={user?<Home/>:<Login/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </div>
  );
}

export default App;
