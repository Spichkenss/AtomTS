import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/home/Home'
import Dialogs from '../screens/dialogs/Dialogs'
import Friends from '../screens/friends/Friends'
import Profile from '../screens/profile/Profile'

export type RootStackParamList = {
	Home: undefined
	Dialogs: undefined
	Friends: undefined
	Profile: undefined
}

const Tabbar = createBottomTabNavigator<RootStackParamList>()

const TabNavigator = () => {
	return (
		<Tabbar.Navigator>
			<Tabbar.Screen name='Home' component={Home} />
			<Tabbar.Screen name='Dialogs' component={Dialogs} />
			<Tabbar.Screen name='Friends' component={Friends} />
			<Tabbar.Screen name='Profile' component={Profile} />
		</Tabbar.Navigator>
	)
}

export default TabNavigator
