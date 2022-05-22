import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from '../hooks/useTheme'
import Notifications from '../screens/home/notifications/Notifications'
import AddPostPage from '../screens/home/posts/AddPostPage'
import EditProfile from '../screens/profile/EditProfile'
import { Palette } from '../screens/ui/Palette'
import TabNavigator from './TabNavigator'

export type AppStackProps = {
	Tab: undefined
	Notifications: undefined
	EditProfile: undefined
	AddPostPage: undefined
}

const Stack = createNativeStackNavigator<AppStackProps>()

const StackNavigator = () => {
	const { theme } = useTheme()
	return (
		<Stack.Navigator
			screenOptions={{
				animation: 'fade_from_bottom',
				headerTintColor: Palette[theme].text,
				headerTitleStyle: { fontSize: 24 },
				headerStyle: { backgroundColor: Palette[theme].primary },
			}}
		>
			<Stack.Screen
				name='Tab'
				component={TabNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Notifications'
				component={Notifications}
				options={{
					title: 'Уведомления',
				}}
			/>
			<Stack.Screen
				name='EditProfile'
				component={EditProfile}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='AddPostPage'
				component={AddPostPage}
				options={{
					headerShown: false,
				}}
			/>
		</Stack.Navigator>
	)
}

export default StackNavigator
