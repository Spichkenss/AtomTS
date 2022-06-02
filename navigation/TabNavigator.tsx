import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/home/Home'
import Dialogs from '../screens/dialogs/Dialogs'
import Friends from '../screens/friends/Friends'
import Profile from '../screens/profile/Profile'
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { Palette } from '../screens/ui/Palette'
import { useTheme } from '../hooks/useTheme'
import CircleAvatar from '../screens/ui/CircleAvatar'
import NotificationBell from '../screens/ui/NotificationBell'
import ProfileEditor from '../screens/ui/ProfileEditor'
import { useGetRequestsQuery } from '../store/services/FriendService'

export type RootStackParamList = {
	Home: undefined
	Dialogs: undefined
	Friends: undefined
	Profile: undefined
}

const Tabbar = createBottomTabNavigator<RootStackParamList>()

const TabNavigator = () => {
	const { theme } = useTheme()
	const { data: requests } = useGetRequestsQuery()
	return (
		<Tabbar.Navigator
			initialRouteName='Home'
			screenOptions={{
				unmountOnBlur: true,
				headerStyle: {
					backgroundColor: Palette[theme].primary,
					elevation: 0,
				},
				headerRightContainerStyle: {
					paddingRight: 15,
				},
				headerTintColor: Palette[theme].text,
				headerTitleStyle: { fontSize: 28 },
				tabBarStyle: {
					backgroundColor: Palette[theme].tabbar,
					paddingBottom: 4,
					borderTopWidth: 0,
				},
				tabBarActiveTintColor: Palette[theme].iconActive,
				tabBarInactiveTintColor: Palette[theme].iconInactive,
			}}
		>
			<Tabbar.Screen
				name='Home'
				component={Home}
				options={{
					title: 'Главная',
					headerRight: () => {
						return <NotificationBell />
					},
					tabBarIcon: ({ focused }) => (
						<AntDesign
							name='home'
							size={24}
							color={
								focused
									? Palette[theme].iconActive
									: Palette[theme].iconInactive
							}
						/>
					),
				}}
			/>
			<Tabbar.Screen
				name='Dialogs'
				component={Dialogs}
				options={{
					title: 'Диалоги',
					tabBarIcon: ({ focused }) => (
						<Feather
							name='message-circle'
							size={24}
							color={
								focused
									? Palette[theme].iconActive
									: Palette[theme].iconInactive
							}
						/>
					),
				}}
			/>
			<Tabbar.Screen
				name='Friends'
				component={Friends}
				options={{
					tabBarBadge: requests?.count ? requests?.count : undefined,
					tabBarBadgeStyle: { textAlignVertical: 'center' },
					title: 'Друзья',
					tabBarIcon: ({ focused }) => (
						<Feather
							name='users'
							size={24}
							color={
								focused
									? Palette[theme].iconActive
									: Palette[theme].iconInactive
							}
						/>
					),
				}}
			/>
			<Tabbar.Screen
				name='Profile'
				component={Profile}
				options={{
					title: 'Профиль',
					headerRight: () => {
						return <ProfileEditor />
					},
					tabBarIcon: () => (
						<CircleAvatar height={21} width={21} image={'../avatar.jpg'} />
					),
				}}
			/>
		</Tabbar.Navigator>
	)
}

export default TabNavigator
