import { GetRelation } from './../services/FriendService'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: GetRelation = {
	relation_id: 0,
	status: null,
}

export const friendSlice = createSlice({
	name: 'relation',
	initialState,
	reducers: {},
	extraReducers: builder => {},
})

export const {} = friendSlice.actions

export default friendSlice.reducer

export const selectCurrentRelation = (state: RootState) =>
	state.relationReducer.status
