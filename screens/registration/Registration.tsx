import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import {
	RegistrationRequest,
	useSignUpMutation,
} from '../../store/services/AuthService'
import { useTheme } from '@react-navigation/native'

const Registration = () => {
	const [signUp, { data }] = useSignUpMutation()

	const [form, setForm] = useState<RegistrationRequest>({
		email: 'test12@mail.ru',
		password: '12345',
		username: 'chlenosos',
	})

	const handleRegistration = async () => {
		await signUp(form).unwrap()
	}

	return (
		<View style={styles.container}>
			<Pressable onPress={handleRegistration}>
				<Text>Submit</Text>
			</Pressable>
		</View>
	)
}

export default Registration

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
