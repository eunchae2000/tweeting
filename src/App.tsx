import {createBrowserRouter} from "react-router-dom";
import { RouterProvider } from "../node_modules/react-router-dom/dist/index";
import Layout from "./components/layout";
import Home from "./routes/home";
import Login from "./routes/login";
import Profile from "./routes/profile";
import CreateAcccount from "./routes/create-account"
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout/>,
    children: [
      {
        path:"",
        element: <Home/>,
      },
      {
        path:"profile",
        element:<Profile/>,
      },
    ]
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/create-account", element:<CreateAcccount/>
  }
]);

const GlobalStyles = createGlobalStyle`
${reset};
*{
  box-sizing:border-box;
}
body {
  background-color:black;
  color: white;
  font-family:systme-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
  Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
  sans-serif;
}
`;


function App() {
  return 
    <>
    </>
  
}

export default App;
