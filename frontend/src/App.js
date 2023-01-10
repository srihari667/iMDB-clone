import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import HomeScreen from './pages/home/HomeScreen'
import MoviePage from './pages/moviepage/MoviePage'
import RegisterScreen from './pages/register/RegisterScreen.jsx'
import LoginScreen from './pages/login/LoginScreen.jsx'
import AddMovie from './pages/addMovie/AddMovie'
import MovieList from './pages/movieList/MovieList'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/'>
            <Route index element={<HomeScreen />} />
            <Route path='movies'>
              <Route path=':id' element={<MoviePage />} />
              <Route path=':id/edit' element={<AddMovie />} />
              <Route path='movie/add' element={<AddMovie />} />
              <Route path='list' element={<MovieList />} />
            </Route>
            <Route path='login' element={<LoginScreen />} />
            <Route path='register' element={<RegisterScreen />} />

            <Route
              path='*'
              element={<h1 className='mt-5 text-center'>error page</h1>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
