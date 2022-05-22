import { authApi } from './services/AuthService'
import { userApi } from './services/UserService'
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import userReducer from './reducers/UserSlice'
import themeReducer from './reducers/ThemeSlice'
import { postApi } from './services/PostApi'

const rootReducer = combineReducers({
	themeReducer,
	userReducer,
	[userApi.reducerPath]: userApi.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[postApi.reducerPath]: postApi.reducer,
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware()
				.concat(userApi.middleware)
				.concat(authApi.middleware)
				.concat(postApi.middleware),
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
