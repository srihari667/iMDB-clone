import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from './axios'

const initialState = {
  actors: [],
  error: null,
  isLoading: false,
}

export const addActors = createAsyncThunk(
  'actors/add',
  async (obj, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { user } = getState()

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.user && user.user.token}`,
        },
      }

      const { data } = await axios.post(
        '/actor/createActor',
        { ...obj },
        config
      )
      console.log(data)
      dispatch(getActors())
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const getActors = createAsyncThunk(
  'actors/get',
  async (obj, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
    const { user } = getState()

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.user && user.user.token}`,
        },
      }

      const { data } = await axios.get('/actor/getall', config)

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const actorsSlice = createSlice({
  name: 'actors',
  initialState,

  extraReducers: {
    [addActors.pending]: (state) => {
      state.isLoading = true
    },
    [addActors.fulfilled]: (state, action) => {
      state.isLoading = false
    },
    [addActors.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    [getActors.pending]: (state) => {
      state.isLoading = true
    },
    [getActors.fulfilled]: (state, action) => {
      state.isLoading = false
      state.actors = action.payload
    },
    [getActors.rejected]: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default actorsSlice.reducer
