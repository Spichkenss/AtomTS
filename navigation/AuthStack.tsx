import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/login/Login'
import Registration from '../screens/registration/Registration'

export type RootStackParamList = {
	Login: undefined
	Registration: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const AuthStack = () => {
	return (
		<Stack.Navigator screenOptions={{ animation: 'fade_from_bottom' }}>
			<Stack.Screen
				name='Login'
				component={Login}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Registration'
				component={Registration}
				options={{ title: 'Регистрация' }}
			/>
		</Stack.Navigator>
	)
}

export default AuthStack
