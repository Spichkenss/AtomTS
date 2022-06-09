import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { Palette } from '../screens/ui/Palette'
import { useTheme } from '../hooks/useTheme'
import CircleAvatar from '../screens/ui/CircleAvatar'
import NotificationBell from '../screens/ui/NotificationBell'
import ProfileEditor from '../screens/ui/ProfileEditor'
import { useGetRequestsQuery } from '../store/services/FriendService'
import { useAuth } from '../hooks/useAuth'

import Home from '../screens/home/Home'
import Profile from '../screens/profile/Profile'
import Friends from '../screens/friends/Friends'
import Messanger from '../screens/messanger/Messanger'

export type RootStackParamList = {
	Home: undefined
	Messanger: undefined
	Friends: undefined
	Profile: undefined
}

const Tabbar = createBottomTabNavigator<RootStackParamList>()

const TabNavigator = () => {
	const { theme } = useTheme()
	const { data: requests } = useGetRequestsQuery()
	const { user } = useAuth()
	return (
		<Tabbar.Navigator
			initialRouteName='Home'
			screenOptions={{
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
					unmountOnBlur: true,
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
				name='Messanger'
				component={Messanger}
				options={{
					unmountOnBlur: true,
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
					unmountOnBlur: true,
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
				options={({ route }) => ({
					headerTitle: user?.username,
					title: 'Профиль',
					headerRight: () => {
						return <ProfileEditor />
					},
					tabBarIcon: () => (
						<CircleAvatar
							height={21}
							width={21}
							image={user?.avatar}
							id={user?.id as number}
						/>
					),
				})}
			/>
		</Tabbar.Navigator>
	)
}

export default TabNavigator
