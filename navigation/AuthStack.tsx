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
		<Stack.Navigator
			screenOptions={{ animation: 'fade_from_bottom', headerShown: false }}
		>
			<Stack.Screen name='Login' component={Login} />
			<Stack.Screen name='Registration' component={Registration} />
		</Stack.Navigator>
	)
}

export default AuthStack
