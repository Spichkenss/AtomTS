import { StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../hooks/useAuth'

const Profile = () => {
	const { user } = useAuth()

	return (
		<View>
			<Text>{JSON.stringify(user)}</Text>
		</View>
	)
}

export default Profile

const styles = StyleSheet.create({})
