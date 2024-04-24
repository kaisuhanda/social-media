import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Authentication from './pages/auth';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import { Box } from '@chakra-ui/react';
import BookMarksPage from './pages/bookmarks';
import ProfilePage from './pages/profile';

function App() {
  return (
    <Box overflow={'hidden'} height={'100vh'}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/bookmarks' element={<BookMarksPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </Box>
  )
}

export default App
