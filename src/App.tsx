import {createBrowserRouter} from "react-router-dom";
import { RouterProvider } from "../node_modules/react-router-dom/dist/index";
import Layout from "./components/layout";
import Home from "./routes/home";
import Login from "./routes/login";
import Profile from "./routes/profile";
import CreateAcccount from "./routes/create-account"
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";

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

// 스타일 정의
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
  const [isLoading, setIsLoading] = useState(true);
  const init = async() => {
    // wait for Firebase
    setIsLoading(false);
    // setTimeout(()=> setIsLoading(false), 2000);
  }
  useEffect(()=>{
    init();
  }, []);
  return (
    <>
      <GlobalStyles/>
      {isLoading ? <LoadingScreen/> :<RouterProvider router={router}/>}
    </>
  );
}

export default App;
