import '../styles/App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"

// lets import the components
import Main from './Main';
import Quiz from './Quiz';
import Result from './Result';


// React routers 

const router = createBrowserRouter([
  {
    path : "/",
    element : <Main></Main>
  },
  {
    path : "/quiz",
    element : <Quiz></Quiz>
  },
  {
    path : "/result",
    element : <Result></Result>
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
