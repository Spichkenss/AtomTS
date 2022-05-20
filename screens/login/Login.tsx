import {
	Dimensions,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
} from 'react-native'
import { FC, useState } from 'react'
import {
	LoginRequest,
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

const Login: FC = () => {
	const navigation = useNavigation<NavigationProp<ParamListBase>>()

	const [signIn, { data }] = useSignInMutation()
	const { theme } = useTheme()

	const [form, setForm] = useState<LoginRequest>({
		email: '',
		password: '',
	})

	const handleLogin = async () => {
		await signIn(form)
			.unwrap()
			.then(async res => await AsyncStorage.setItem('token', res.token))
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
	})
