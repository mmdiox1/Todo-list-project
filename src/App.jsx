import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoLayout from "./Pages/Home/Todo.jsx";
import Layout from "./component/Layout/Layout.jsx";
import { TodoProvider } from "./Contexts/TodoContext.jsx";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TodoLayout />} />
      </Routes>
    </Layout>
  );
}

export default App;
