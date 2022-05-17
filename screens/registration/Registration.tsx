import {
	Dimensions,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'
import React, { FC, useState } from 'react'
import {
	RegistrationRequest,
	useSignUpMutation,
} from '../../store/services/AuthService'
import { Palette } from '../ui/Palette'
import { ThemeType } from '../../store/models/ITheme'
import { useTheme } from '../../hooks/useTheme'
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import { RootStackParamList } from '../../navigation/AuthStack'

type Props = NativeStackScreenProps<RootStackParamList, 'Registration'>

const Registration: FC<Props> = ({ navigation }) => {
	const [signUp, { data }] = useSignUpMutation()
	const { theme } = useTheme()

	const [form, setForm] = useState<RegistrationRequest>({
		email: '',
		password: '',
		username: '',
	})

	const handleRegistration = async () => {
		await signUp(form).unwrap()
	}

	return (
		<View style={styles(theme).container}>
			<TextInput
				placeholder='Логин'
				placeholderTextColor={Palette[theme].placeholder}
				style={styles(theme).input}
				onChangeText={text => setForm({ ...form, email: text })}
			/>
			<TextInput
				placeholder='Пароль'
				placeholderTextColor={Palette[theme].placeholder}
				style={styles(theme).input}
				onChangeText={text => setForm({ ...form, password: text })}
			/>
			<TextInput
				placeholder='Имя пользователя'
				placeholderTextColor={Palette[theme].placeholder}
				style={styles(theme).input}
				onChangeText={text => setForm({ ...form, username: text })}
			/>
			<Pressable onPress={handleRegistration} style={styles(theme).button}>
				<Text style={{ color: Palette[theme].buttonText, fontSize: 18 }}>
					Отправить
				</Text>
			</Pressable>
			<Pressable onPress={() => navigation.navigate('Login')}>
				<Text
					style={{
						color: Palette[theme].secondary,
						fontSize: 16,
					}}
				>
					Авторизация
				</Text>
			</Pressable>
		</View>
	)
}

export default Registration

const { width } = Dimensions.get('window')

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: Palette[theme].background,
		},
		input: {
			width: width * 0.9,
			padding: 10,
			marginTop: 10,
			backgroundColor: Palette[theme].input,
			borderRadius: 10,
		},
		button: {
			padding: 15,
			margin: 20,
			backgroundColor: Palette[theme].button,
			borderRadius: 10,
			width: width * 0.4,
			alignItems: 'center',
			justifyContent: 'center',
		},
	})
