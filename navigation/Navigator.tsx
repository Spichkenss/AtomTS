import { NavigationContainer } from '@react-navigation/native'
import { useAuth } from '../hooks/useAuth'
import AuthStack from './AuthStack'
import TabNavigator from './TabNavigator'

const Navigator = () => {
	const { user } = useAuth()

	return (
		<NavigationContainer>
			{user ? <TabNavigator /> : <AuthStack />}
		</NavigationContainer>
	)
}

export default Navigator
