import { NavigationContainer } from '@react-navigation/native'
import { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'
import { Palette } from '../screens/ui/Palette'
import { useCheckAuthMutation } from '../store/services/AuthService'
import AuthStack from './AuthStack'
import { navigationRef } from './RootNavigation'
import StackNavigator from './StackNavigator'

const Navigator = () => {
	const { theme } = useTheme()
	const { user } = useAuth()
	const [checkAuth, { isLoading }] = useCheckAuthMutation()

	useEffect(() => {
		const check = async () => {
			await checkAuth()
		}
		check()
	}, [])

	return (
		<NavigationContainer ref={navigationRef}>
			{user ? <StackNavigator /> : <AuthStack />}
			<StatusBar
				backgroundColor={Palette[theme].primary}
				barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
			/>
		</NavigationContainer>
	)
}

export default Navigator
