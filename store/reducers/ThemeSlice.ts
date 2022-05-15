import { ThemeType } from './../models/ITheme'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITheme } from '../models/ITheme'
import { RootState } from '../store'

const initialState: ITheme = {
	theme: 'light',
}

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme(state: ITheme, action: PayloadAction<ThemeType>) {
			state.theme = action.payload
		},
	},
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer

export const selectCurrentTheme = (state: RootState) => state.themeReducer.theme
