import { NavigationContainer } from '@react-navigation/native'
import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useCheckAuthMutation } from '../store/services/AuthService'
import AuthStack from './AuthStack'
import { navigationRef } from './RootNavigation'
import StackNavigator from './StackNavigator'

const Navigator = () => {
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
		</NavigationContainer>
	)
}

export default Navigator
