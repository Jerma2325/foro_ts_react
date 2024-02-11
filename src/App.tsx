import React from "react";
import Header from "./components/header/header";
import "./styles/main.css";
import Sidebar from "./components/sidebar/sidebar";
import PostList from "./pages/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/about";
import Todos from "./pages/todos";
import Users from "./pages/users";
import UserPg from "./pages/userPg";
import Albums from "./pages/albums";
import Photos from "./pages/photos";
import GoUpBtn from "./components/upBtn/upbtn";
import SinglePost from "./pages/post";
import Todo from "./pages/todoPg";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={<PostList />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/todos"
            element={<Todos />}
          />
          <Route
            path="/users"
            element={<Users />}
          />
          <Route
            path="/users/:userId"
            element={<UserPg />}
          />
          <Route
            path="/users/:userId/posts"
            element={<PostList />}
          />
          <Route
            path="/users/:userId/todos"
            element={<Todos />}
          />
          <Route
            path="/users/:userId/albums"
            element={<Albums />}
          />
          <Route
            path="/albums/:albumId/photos"
            element={<Photos />}
          />
          <Route
            path="/albums"
            element={<Albums />}
          />
          <Route
            path="/photos"
            element={<Photos />}
          />
          <Route
            path="/post/:postId"
            element={<SinglePost />}
          />
          <Route
            path="/todos/:todoId"
            element={<Todo />}
          />
        </Routes>
        <GoUpBtn />
      </Router>
    </div>
  );
}

export default App;
