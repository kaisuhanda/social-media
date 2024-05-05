import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import { Box } from '@chakra-ui/react';
import BookMarksPage from './pages/bookmarks';
import ProfilePage from './pages/profile';
import ViewProfilePage from './pages/viewProfile';
import ExplorePage from './pages/explore';
import FollowingsPage from './pages/following';
import FollowersPage from './pages/followers';

function App() {
  return (
    <Box overflow={'hidden'} height={'100vh'}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/bookmarks' element={<BookMarksPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/view/:user_id' element={<ViewProfilePage />} />
        <Route path='/explore' element={<ExplorePage />} />
        <Route path='/profile/following' element={<FollowingsPage />} />
        <Route path='/profile/followers' element={<FollowersPage />} />
      </Routes>
    </Box>
  )
}

export default App
