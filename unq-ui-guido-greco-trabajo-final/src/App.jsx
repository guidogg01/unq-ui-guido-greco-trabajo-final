import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MemoTest from './pages/MemoTest';
import HomeScreen from './pages/HomeScreen';

function App() {

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/play" element={<MemoTest/>} />
        </Routes>
      </main>
    </Router>
  )
}

export default App