import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { ThemeType } from '../../../store/models/ITheme'
import { useTheme } from '../../../hooks/useTheme'
import { IMessage } from '../../../store/services/MessageService'
import { useAuth } from '../../../hooks/useAuth'
import { Palette } from '../../ui/Palette'
import moment from 'moment'

interface Props {
	message: IMessage
}

const borders = (state: boolean) => {
	if (state) {
		return { borderTopEndRadius: 0 }
	}
	return { borderTopStartRadius: 0 }
}

const MessageItem: FC<Props> = ({ message }) => {
	const { user } = useAuth()
	const { theme } = useTheme()

	return (
		<View
			style={[
				styles(theme, message.userId, user?.id as number).box,
				borders(message.userId === user?.id),
			]}
		>
			<Text style={styles(theme).text}>{message.body}</Text>
			<Text style={styles(theme).timestamp}>
				{moment(message.sentAt).add(-30, 'seconds').format('HH:mm')}
			</Text>
		</View>
	)
}

export default MessageItem

const styles = (theme: ThemeType, senderId?: number, userId?: number) =>
	StyleSheet.create({
		box: {
			marginBottom: 10,
			paddingVertical: 7,
			paddingHorizontal: 10,
			borderRadius: 10,
			maxWidth: Dimensions.get('screen').width * 0.7,
			backgroundColor:
				senderId === userId
					? Palette[theme].myMessage
					: Palette[theme].friendMessage,
			alignSelf: senderId === userId ? 'flex-end' : 'flex-start',
		},
		text: {
			fontSize: 18,
			color: Palette[theme].text,
		},
		timestamp: {
			alignSelf: 'flex-end',
			color: Palette[theme].iconInactive,
		},
	})
