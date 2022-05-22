import { StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'
import { useTheme } from '../../hooks/useTheme'
import { Palette } from './Palette'

type StatusType = 'user-clock' | 'user-check' | 'user-plus'

enum ActionType {
	SetFriends = 'SetFriends',
	SetRequest = 'SetRequest',
	SetUnfriends = 'SetUnfriends',
}

interface IState {
	status: StatusType
}

interface IAction {
	type: ActionType
	payload: {
		status: StatusType
	}
}

const initialState: IState = { status: 'user-plus' }

const reducer: React.Reducer<IState, IAction> = (state, action) => {
	switch (action.type) {
		case ActionType.SetFriends:
			return { status: action.payload.status }
		case ActionType.SetRequest:
			return { status: action.payload.status }
		case ActionType.SetUnfriends:
			return { status: action.payload.status }
		default:
			throw new Error()
	}
}

const ManageFriendButton = () => {
	const [state, dispatch] = React.useReducer<React.Reducer<IState, IAction>>(
		reducer,
		initialState
	)

	const { theme } = useTheme()

	const acceptFriend = () => {}

	return (
		<TouchableOpacity
			onPress={() =>
				dispatch({
					type: ActionType.SetRequest,
					payload: { status: 'user-clock' },
				})
			}
		>
			<FontAwesome5
				name={state.status}
				size={22}
				color={Palette[theme].secondary}
			/>
		</TouchableOpacity>
	)
}

export default ManageFriendButton

const styles = StyleSheet.create({})
