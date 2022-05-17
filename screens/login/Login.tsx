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
		email: '',
		password: '',
	})

	const handleLogin = async () => {
		await signIn(form).unwrap()
	}

	return (
		<AnimatedView style={styles(theme).container}>
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
				secureTextEntry={true}
			/>

			<Pressable onPress={handleLogin} style={styles(theme).button}>
				<Text style={{ color: Palette[theme].buttonText, fontSize: 18 }}>
					Войти
				</Text>
			</Pressable>

			<Pressable onPress={() => navigation.navigate('Registration')}>
				<Text
					style={{
						color: Palette[theme].secondary,
						fontSize: 16,
					}}
				>
					Регистрация
				</Text>
			</Pressable>
		</AnimatedView>
	)
}

export default Login

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
