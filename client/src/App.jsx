import './App.scss';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import Game from './pages/game'
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Home />}/>
        <Route path={'/game'} element={<Game />}/>
        <Route path={'/login'} element={<Login />}/>
        <Route path={'/register'} element={<Register />}/>
      </Routes>
    </div>
  );
}

export default App;
