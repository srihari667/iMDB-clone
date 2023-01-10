import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from './axios'

const initialState = {
  movies: [],
  movie: {},
  error: null,
  isLoading: false,
  deleteSuccess: false,
  addSuccess: false,
  updateSuccess: false,
}

export const getAllMovie = createAsyncThunk(
  'movie/getAll',
  async (obj, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { user } = getState()
    console.log(user)
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.user && user.user.token}`,
        },
      }

      const { data } = await axios.get('/', config)
      console.log(data)

      return fulfillWithValue(data)
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.message)
    }
  }
)

export const getAllProducerMovie = createAsyncThunk(
  'movie/getAllProducerMovie',
  async (obj, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { user } = getState()

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.user && user.user.token}`,
        },
      }

      const { data } = await axios.get('/movie', config)

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const getOneMovie = createAsyncThunk(
  'movie/getOne',
  async (obj, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { user } = getState()

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.user && user.user.token}`,
        },
      }

      const { data } = await axios.get(`/${obj}`, config)
      console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addMovie = createAsyncThunk(
  'movie/add',
  async (obj, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { user } = getState()

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.user && user.user.token}`,
        },
      }
      const { data } = await axios.post(`/movie`, { ...obj }, config)
      console.log(data)

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createReview = createAsyncThunk(
  'movie/createReview',
  async (obj, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { user } = getState()

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.user && user.user.token}`,
        },
      }
      const { data } = await axios.post(`/Review/rev`, { ...obj }, config)
      dispatch(getOneMovie(obj.movie))

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteMovie = createAsyncThunk(
  'movie/delete',
  async (obj, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { user } = getState()

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.user && user.user.token}`,
        },
      }
      const { data } = await axios.delete(`/movie/${obj}`, config)
      console.log(data)

      return fulfillWithValue(data)
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.message)
    }
  }
)

export const editMovie = createAsyncThunk(
  'movie/edit',
  async (
    { id, movie },
    { rejectWithValue, fulfillWithValue, getState, dispatch }
  ) => {
    const { user } = getState()

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.user && user.user.token}`,
        },
      }
      const { data } = await axios.put(`/movie/${id}`, { ...movie }, config)
      console.log(data)

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    resetState: (state) => {
      state.movie = {}
      state.error = ''
      state.addSuccess = false
      state.updateSuccess = false
      state.deleteSuccess = false
    },
  },
  extraReducers: {
    [getAllMovie.pending]: (state) => {
      state.isLoading = true
    },
    [getAllMovie.fulfilled]: (state, action) => {
      state.isLoading = false
      state.movies = action.payload
    },
    [getAllMovie.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [getAllProducerMovie.pending]: (state) => {
      state.isLoading = true
    },
    [getAllProducerMovie.fulfilled]: (state, action) => {
      state.isLoading = false
      state.movies = action.payload
    },
    [getAllProducerMovie.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [getOneMovie.pending]: (state) => {
      state.isLoading = true
    },
    [getOneMovie.fulfilled]: (state, action) => {
      state.isLoading = false
      state.movie = action.payload
    },
    [getOneMovie.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [addMovie.pending]: (state) => {
      state.isLoading = true
      state.addSuccess = false
      state.updateSuccess = false
      state.deleteSuccess = false
    },
    [addMovie.fulfilled]: (state, action) => {
      state.isLoading = false
      state.addSuccess = true
    },
    [addMovie.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
      state.addSuccess = false
      state.updateSuccess = false
      state.deleteSuccess = false
    },
    [deleteMovie.pending]: (state) => {
      state.isLoading = true
      state.addSuccess = false
      state.updateSuccess = false
      state.deleteSuccess = false
    },
    [deleteMovie.fulfilled]: (state, action) => {
      state.isLoading = false
      state.deleteSuccess = true
    },
    [deleteMovie.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
      state.addSuccess = false
      state.updateSuccess = false
      state.deleteSuccess = false
    },
    [editMovie.pending]: (state) => {
      state.isLoading = true
      state.addSuccess = false
      state.updateSuccess = false
      state.deleteSuccess = false
    },
    [editMovie.fulfilled]: (state, action) => {
      state.isLoading = false
      state.movies = action.payload
      state.updateSuccess = true
    },
    [editMovie.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
      state.addSuccess = false
      state.updateSuccess = false
      state.deleteSuccess = false
    },
    [createReview.pending]: (state) => {
      state.isLoading = true
    },
    [createReview.fulfilled]: (state, action) => {
      state.isLoading = false
    },
    [createReview.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { resetState } = movieSlice.actions

export default movieSlice.reducer
