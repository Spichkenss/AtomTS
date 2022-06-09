import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { IMessage } from '../../../store/services/ChatService'

interface Props {
	message: IMessage
}

const MessageItem: FC<Props> = ({ message }) => {
	console.log(message.id)
	return (
		<View style={{ backgroundColor: 'white', padding: 10 }}>
			<Text style={{ color: 'black' }}>{message.body}</Text>
		</View>
	)
}

export default MessageItem

const styles = StyleSheet.create({})
