import React, { FC, forwardRef, useImperativeHandle, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ThemeType } from '../../store/models/ITheme'
import { Palette } from './Palette'
import { useTheme } from '../../hooks/useTheme'
import { CommentRequest } from '../../store/services/PostService'

interface IInput {
	placeholder: string
	onPress: () => void
	setValue: React.Dispatch<React.SetStateAction<string>>
	value: string
}

const MessageInput: FC<IInput> = ({
	placeholder,
	onPress,
	setValue,
	value,
}) => {
	const { theme } = useTheme()

	return (
		<View style={styles(theme).container}>
			<TextInput
				value={value}
				placeholder={placeholder}
				placeholderTextColor={Palette[theme].placeholder}
				onChangeText={(text: string) => setValue(text)}
				style={styles(theme).input}
				selectionColor={Palette[theme].carete}
				multiline={true}
			/>
			<TouchableOpacity onPress={onPress}>
				<Ionicons name='send' size={28} color={Palette[theme].secondary} />
			</TouchableOpacity>
		</View>
	)
}

export default MessageInput

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			paddingVertical: 10,
			paddingHorizontal: 15,
			backgroundColor: Palette[theme].tabbar,
		},
		input: {
			flex: 1,
			color: Palette[theme].text,
			fontSize: 20,
			fontWeight: '400',
		},
	})
