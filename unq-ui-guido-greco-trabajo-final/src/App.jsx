import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MemoTest from './pages/MemoTest';
import HomeScreen from './pages/HomeScreen';
import GameOver from './pages/GameOver';

function App() {

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/play" element={<MemoTest/>} />
          <Route path="/game-over" element={<GameOver/>} />
        </Routes>
      </main>
    </Router>
  )
}

export default App