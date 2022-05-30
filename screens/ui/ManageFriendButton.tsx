import { TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import React, { FC } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { Palette } from './Palette'
import {
	StatusType,
	useAcceptRequestMutation,
	useDeleteFriendMutation,
} from '../../store/services/FriendService'

import { DefineButtonTypeByRelation } from '../../store/models/RelationStatus'

interface IManageFriendButton {
	status: StatusType
	id: number
}

const ManageFriendButton: FC<IManageFriendButton> = ({ id, status }) => {
	const { theme } = useTheme()
	const [deleteFriend, { isSuccess: deleteSuccess }] = useDeleteFriendMutation()
	const [acceptRequest, { isSuccess: acceptSuccess }] =
		useAcceptRequestMutation()

	const switchRelation = async (relation: StatusType) => {
		switch (relation) {
			case 'friends':
				await deleteFriend(id)
				break
			case 'decides':
				await acceptRequest(id)
				break
			default:
				return relation
		}
	}

	return (
		<TouchableOpacity
			style={{ paddingLeft: 10 }}
			onPress={() => switchRelation(status)}
		>
			<FontAwesome5
				name={DefineButtonTypeByRelation(status)}
				size={22}
				color={Palette[theme].secondary}
			/>
		</TouchableOpacity>
	)
}

export default ManageFriendButton
