import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Authentication from './pages/auth';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box overflow={'hidden'} height={'100vh'}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Box>
  )
}

export default App
