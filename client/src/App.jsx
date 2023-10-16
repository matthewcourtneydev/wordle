import './App.scss';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import Game from './pages/game'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Home />}/>
        <Route path={'/game'} element={<Game />}/>
      </Routes>
    </div>
  );
}

export default App;
