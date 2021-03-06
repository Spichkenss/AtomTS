import {
	Dimensions,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { FC, useState } from 'react'
import {
	RegistrationRequest,
	useSignUpMutation,
} from '../../store/services/AuthService'
import { Palette } from '../ui/Palette'
import { ThemeType } from '../../store/models/ITheme'
import { useTheme } from '../../hooks/useTheme'
import AnimatedView from '../ui/AnimatedView'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native'
import ThemeToggler from '../ui/ThemeToggler'

const Registration: FC = () => {
	const navigation = useNavigation<NavigationProp<ParamListBase>>()

	const [signUp] = useSignUpMutation()
	const { theme } = useTheme()

	const [form, setForm] = useState<RegistrationRequest>({
		email: '',
		password: '',
		username: '',
		name: '',
		surname: '',
	})

	const handleRegistration = async () => {
		await signUp(form)
			.unwrap()
			.then(async res => await AsyncStorage.setItem('token', res.token))
	}

	return (
		<AnimatedView style={styles(theme).container}>
			<View style={{ position: 'absolute', bottom: 15, right: 15 }}>
				<ThemeToggler />
			</View>
			<TextInput
				placeholder='Почта'
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
			<TextInput
				placeholder='Имя'
				placeholderTextColor={Palette[theme].placeholder}
				style={styles(theme).input}
				onChangeText={text => setForm({ ...form, name: text })}
			/>
			<TextInput
				placeholder='Фамилия'
				placeholderTextColor={Palette[theme].placeholder}
				style={styles(theme).input}
				onChangeText={text => setForm({ ...form, surname: text })}
			/>
			<TextInput
				placeholder='Имя пользователя'
				placeholderTextColor={Palette[theme].placeholder}
				style={styles(theme).input}
				onChangeText={text => setForm({ ...form, username: text })}
			/>
			<TouchableOpacity
				onPress={handleRegistration}
				style={styles(theme).button}
			>
				<Text style={{ color: Palette[theme].buttonText, fontSize: 18 }}>
					Отправить
				</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('Login')}>
				<Text
					style={{
						color: Palette[theme].secondary,
						fontSize: 16,
					}}
				>
					Уже есть аккаунт? Войдите
				</Text>
			</TouchableOpacity>
		</AnimatedView>
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
