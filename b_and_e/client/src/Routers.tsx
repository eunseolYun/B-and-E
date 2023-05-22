import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Nav from "./component/Nav";
import Header from "./component/Header";
import Signup from "./pages/Signup";
import UserList from "./pages/UserList";
import Message from "./pages/Message";

export default function Routers() {
    return (
        <BrowserRouter>
            <Nav />
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/userlist" element={<UserList />} />
                <Route path="/message" element={<Message />} />
            </Routes>
        </BrowserRouter>
    );
}
