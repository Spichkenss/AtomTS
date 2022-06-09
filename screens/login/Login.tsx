import {
	Dimensions,
	Keyboard,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { FC, useState } from 'react'
import {
	LoginRequest,
	UserResponse,
	useSignInMutation,
} from '../../store/services/AuthService'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import { Palette } from '../ui/Palette'
import AnimatedView from '../ui/AnimatedView'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native'
import ThemeToggler from '../ui/ThemeToggler'

const Login: FC = () => {
	const navigation = useNavigation<NavigationProp<ParamListBase>>()
	const [error, setError] = useState<string | null>(null)
	const [signIn, { data }] = useSignInMutation()
	const { theme } = useTheme()

	const [form, setForm] = useState<LoginRequest>({
		email: '',
		password: '',
	})

	const handleLogin = async () => {
		try {
			await signIn(form)
				.unwrap()
				.then(async res => await AsyncStorage.setItem('token', res.token))
		} catch (error: any) {
			setError(error.data.message)
		} finally {
			Keyboard.dismiss()
		}
	}

	return (
		<AnimatedView style={styles(theme).container}>
			{error && (
				<View style={styles(theme).error}>
					<Text style={{ color: Palette[theme].text, fontSize: 18 }}>
						{error}
					</Text>
				</View>
			)}
			<View style={{ position: 'absolute', bottom: 15, right: 15 }}>
				<ThemeToggler />
			</View>
			<TextInput
				onFocus={() => setError(null)}
				placeholder='Логин'
				placeholderTextColor={Palette[theme].placeholder}
				style={styles(theme).input}
				onChangeText={text => setForm({ ...form, email: text })}
			/>
			<TextInput
				onFocus={() => setError(null)}
				placeholder='Пароль'
				placeholderTextColor={Palette[theme].placeholder}
				style={styles(theme).input}
				onChangeText={text => setForm({ ...form, password: text })}
				secureTextEntry={true}
			/>

			<TouchableOpacity onPress={handleLogin} style={styles(theme).button}>
				<Text style={{ color: Palette[theme].buttonText, fontSize: 18 }}>
					Войти
				</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.navigate('Registration')}>
				<Text
					style={{
						color: Palette[theme].secondary,
						fontSize: 16,
					}}
				>
					Нет аккаута? Зарегистрируйтесь
				</Text>
			</TouchableOpacity>
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
		},
		input: {
			width: width * 0.9,
			padding: 10,
			marginTop: 10,
			backgroundColor: Palette[theme].input,
			borderRadius: 10,
			color: Palette[theme].text,
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
		error: {
			position: 'absolute',
			top: StatusBar.currentHeight,
			paddingVertical: 10,
			paddingHorizontal: 15,
			borderWidth: 2,
			borderRadius: 10,
			borderColor: Palette.red,
			backgroundColor: Palette.pink,
		},
	})
