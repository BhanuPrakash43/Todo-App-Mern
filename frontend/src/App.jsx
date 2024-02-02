import { useEffect } from "react";
import axios from "axios";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import SingleTodo from "./pages/SingleTodo";
import Layout from "./pages/Layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/singletodo/:id" element={<SingleTodo />} />
    </Route>
  )
);

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/todos")
      .then((res) => console.log(res.data));
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
