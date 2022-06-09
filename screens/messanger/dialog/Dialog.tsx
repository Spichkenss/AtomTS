import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { EffectCallback, FC, useEffect, useRef, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackProps } from '../../../navigation/StackNavigator'
import MessageInput from '../../ui/MessageInput'
import { useAuth } from '../../../hooks/useAuth'
import { ThemeType } from '../../../store/models/ITheme'
import { useTheme } from '../../../hooks/useTheme'
import { Palette } from '../../ui/Palette'
import MessageItem from './MessageItem'
import {
	IMessage,
	useLazyGetHistoryQuery,
} from '../../../store/services/MessageService'
import Loader from '../../ui/Loader'
import { socket } from '../MessangerItem'
import { ChatEvents } from '../../../store/models/ChatEvents'

type Props = NativeStackScreenProps<AppStackProps, 'Dialog'>

const Dialog: FC<Props> = ({ route }) => {
	const { theme } = useTheme()
	const { user } = useAuth()
	const [message, setMessage] = useState<string>('')
	const [getHistory, { isFetching }] = useLazyGetHistoryQuery()
	const [dialog, setDialog] = useState<IMessage[]>([])
	const ref = useRef<FlatList | null>(null)

	useEffect((): any => {
		let gotHistory = false
		if (route.params.dialogName) {
			getHistory(route.params.dialogName).then(res =>
				setDialog(res.data as IMessage[])
			)
		}
		return () => (gotHistory = true)
	}, [route.params.dialogName])

	useEffect((): any => {
		let gotMessage = false
		socket.on(ChatEvents.ReceiveMessage, (data: IMessage) => {
			setDialog((dialog: IMessage[]) => [...dialog, data])
		})
		return () => (gotMessage = true)
	}, [socket])

	const sendMessage = async () => {
		if (message !== '') {
			const messageData: IMessage = {
				dialogName: route.params.dialogName,
				userId: user?.id as number,
				body: message.trimEnd(),
			}

			await socket.emit(ChatEvents.SendMessage, messageData)
			setDialog((dialog: IMessage[]) => [...dialog, messageData])
		}
	}

	return isFetching ? (
		<Loader />
	) : (
		<View style={styles(theme).container}>
			<FlatList
				ref={ref}
				onContentSizeChange={() =>
					ref.current?.scrollToEnd({ animated: false })
				}
				onLayout={() => ref.current?.scrollToEnd({ animated: false })}
				contentContainerStyle={{ padding: 10 }}
				data={dialog}
				keyExtractor={(item: IMessage, index) => index.toString() as string}
				renderItem={({ item }) => <MessageItem message={item} />}
				maxToRenderPerBatch={10}
				initialNumToRender={10}
			/>
			<MessageInput
				onPress={sendMessage}
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
			backgroundColor: Palette[theme].dialogBackground,
		},
	})
