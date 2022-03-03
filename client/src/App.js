import './App.css';
import {BrowserRouter as Router, Route, Routes, Link }  from 'react-router-dom';
import Home from "./pages/Home";
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register.js';
import {AuthContext} from "./helpers/AuthContext"; 
import {useState, useEffect} from "react";
import axios from 'axios';

//Routes and links to pages
function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios.get("http://localhost:3001/auth/auth", {     
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) =>{
      if (response.data.error){
        setAuthState({...authState, status: false });
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  }

  return (
    <div className="App"> 
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className='navbar'>
            <Link to="createpost"> Post </Link>
            <Link to="/"> Home </Link>
            {!authState.status ? (                //removing login and register if user is logged in
              <>
                <Link to="/login"> Login </Link>
                <Link to="/register"> Register </Link>
              </>
            ) : (
              <button onClick={logout}> Logout </button>    //logout only appears when logged in
            )}
            <h1>{authState.username} </h1>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </AuthContext.Provider>

    </div>
  );
}
export default App;
