import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { FC, useState } from 'react'
import {
	LoginRequest,
	useSignInMutation,
} from '../../store/services/AuthService'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/AuthStack'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import { Palette } from '../ui/Palette'
import AnimatedView from '../ui/AnimatedView'

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>

const Login: FC<Props> = ({ navigation }) => {
	const [signIn, { data }] = useSignInMutation()
	const { theme, toggleTheme } = useTheme()

	const [form, setForm] = useState<LoginRequest>({
		email: 'test@mail.ru',
		password: '12345',
	})

	const handleLogin = async () => {
		await signIn(form).unwrap()
	}

	const changeTheme = () => {
		toggleTheme()
	}

	return (
		<AnimatedView style={styles(theme).container}>
			<TextInput placeholder='Логин' />
			<Pressable onPress={handleLogin}>
				<Text
					style={{
						padding: 20,
						backgroundColor: Palette[theme].button,
						color: Palette[theme].buttonText,
					}}
				>
					Login
				</Text>
			</Pressable>

			<Pressable onPress={() => navigation.navigate('Registration')}>
				<Text
					style={{
						padding: 20,
						backgroundColor: Palette[theme].button,
						color: Palette[theme].buttonText,
					}}
				>
					Registration
				</Text>
			</Pressable>

			<Pressable onPress={changeTheme}>
				<Text
					style={{
						padding: 20,
						backgroundColor: Palette[theme].button,
						color: Palette[theme].buttonText,
					}}
				>
					Theme
				</Text>
			</Pressable>
		</AnimatedView>
	)
}

export default Login

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
	})
