import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './contexts/user-context';
import Home from './pages/home';
import Game from './pages/game'
import Login from './pages/login';

function App() {
  let defaultUserObj = {
    name: {
      firstName: "",
      middleName: "",
      lastName: "",
    },
    gameIndex: 0,
    authInfo: {
      authToken: "",
      isAuthenticated: false,
    },
    contactInfo: {
      email: "",
      username: "",
      password: "",
    },
    preferences: {
      darkMode: true,
      hardMode: false,
      contrastMode: false,
    },
    games: []
  };

  let localStorageUser = JSON.parse(localStorage.getItem('mdc_wordle_user'))
  const userData = localStorageUser ? localStorageUser : defaultUserObj;
  // || defaultUserObj));
  console.log(localStorageUser)
  return (
    <div className="App">
      <UserContext.Provider value={userData}>
      <Routes>
        <Route path={'/'} element={<Home />}/>
        <Route path={'/game'} element={<Game />}/>
        <Route path={'/login'} element={<Login />}/>
      </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
