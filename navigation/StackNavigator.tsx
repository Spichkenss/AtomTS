import { NavigatorScreenParams, RouteProp } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from '../hooks/useTheme'
import SuggestFull from '../screens/friends/SuggestFull'
import Comments from '../screens/home/comments/Comments'
import Notifications from '../screens/home/notifications/Notifications'
import AddPostPage from '../screens/home/posts/AddPostPage'
import EditProfile from '../screens/profile/EditProfile'
import { Palette } from '../screens/ui/Palette'
import { IPost } from '../store/models/IPost'
import TabNavigator, { RootStackParamList } from './TabNavigator'

export type AppStackProps = {
	Tab: NavigatorScreenParams<RootStackParamList>
	Notifications: undefined
	EditProfile: undefined
	AddPostPage: { description: string; id: number } | undefined
	Comments: { id: number }
	SuggestFull: undefined
}

const Stack = createNativeStackNavigator<AppStackProps>()

const StackNavigator = () => {
	const { theme } = useTheme()
	return (
		<Stack.Navigator
			initialRouteName='Tab'
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
			<Stack.Screen
				name='Comments'
				component={Comments}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name='SuggestFull'
				component={SuggestFull}
				options={{
					title: 'Рекомендации',
				}}
			/>
		</Stack.Navigator>
	)
}

export default StackNavigator
