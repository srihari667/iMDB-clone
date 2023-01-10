import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import actorReducer from './features/actorsSlice'
import movieReducer from './features/movieSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    actors: actorReducer,
    movies: movieReducer,
  },
})
