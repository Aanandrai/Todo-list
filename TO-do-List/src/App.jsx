import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/users/Signup";
import SignIn from "./components/users/SignIn";
import Home from "./components/users/Home";
import TodoModelCard from "./components/TODO/TodoModelCard";
import Cardscomponent from "./components/Task/Cardscomponent";
import { CookiesProvider, useCookies } from 'react-cookie';


const App = () => {
  const [cookies, setCookie] = useCookies(['user']);

  const handleTodoSubmit = (Tododata) => {
    // This function will handle the submission of task data
    console.log("Task submitted:", Tododata);
  };

  function handleLogin(user) {
    setCookie('user', user, { path: '/' });
  }
  
  return (
    <CookiesProvider>
      {cookies.user ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="./Signup" element={<Signup />} />
            <Route path="/TodoModelCard" element={<TodoModelCard onSubmit={handleTodoSubmit} />} />
            <Route path="/Cardscomponent" element={<Cardscomponent />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <SignIn onLogin={handleLogin} />
      )}
    </CookiesProvider>
  );
};

export default App;
