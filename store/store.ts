import { chatApi } from './services/ChatService'
import { friendApi } from './services/FriendService'
import { authApi } from './services/AuthService'
import { userApi } from './services/UserService'
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import userReducer from './reducers/UserSlice'
import themeReducer from './reducers/ThemeSlice'
import relationReducer from './reducers/RelationSlice'
import { postApi } from './services/PostService'
import { messageApi } from './services/MessageService'

const rootReducer = combineReducers({
	themeReducer,
	userReducer,
	relationReducer,
	[userApi.reducerPath]: userApi.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[postApi.reducerPath]: postApi.reducer,
	[friendApi.reducerPath]: friendApi.reducer,
	[chatApi.reducerPath]: chatApi.reducer,
	[messageApi.reducerPath]: messageApi.reducer,
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware()
				.concat(userApi.middleware)
				.concat(authApi.middleware)
				.concat(postApi.middleware)
				.concat(friendApi.middleware)
				.concat(chatApi.middleware)
				.concat(messageApi.middleware),
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
