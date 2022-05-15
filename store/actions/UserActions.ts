import { IUser } from './../models/IUser'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const fetchUser = createAsyncThunk(`user/id`, async (_, thunkAPI) => {
	try {
		const response = await axios.get<IUser>(
			'http://192.168.1.4:5000/api/auth/check',
			{
				headers: {
					Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
				},
			}
		)
		return response
	} catch (error) {
		return thunkAPI.rejectWithValue('Не авторизован')
	}
})
