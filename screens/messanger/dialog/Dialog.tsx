import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackProps } from '../../../navigation/StackNavigator'
import MessageInput from '../../ui/MessageInput'
import { useAuth } from '../../../hooks/useAuth'
import { ThemeType } from '../../../store/models/ITheme'
import { useTheme } from '../../../hooks/useTheme'
import { Palette } from '../../ui/Palette'
import MessageItem from './MessageItem'
import {
	IDialog,
	IMessage,
	useLazyGetHistoryQuery,
} from '../../../store/services/ChatService'
import { IUser } from '../../../store/models/IUser'

type Props = NativeStackScreenProps<AppStackProps, 'Dialog'>

const Dialog: FC<Props> = ({ route }) => {
	const { theme } = useTheme()
	const { user } = useAuth()
	const [message, setMessage] = useState<string>('')

	useEffect(() => {
		console.log('dialog', route.params.dialogId)		
		// getHistory(dialog ? dialog?.id : route?.params?.dialogId)
	}, [route.params.dialogId])

	const [getHistory, { data: history }] = useLazyGetHistoryQuery()

	return (
		<View style={styles(theme).container}>
			<FlatList
				data={history}
				keyExtractor={(item: IMessage) => item.id.toString()}
				renderItem={({ item }) => <MessageItem message={item} />}
			/>
			<MessageInput
				onPress={() => console.log(123)}
				value={message}
				setValue={setMessage}
				placeholder={'Сообщение'}
				unfocusOnSubmit={false}
			/>
		</View>
	)
}

export default Dialog

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: Palette[theme].background,
		},
	})
