import { StyleSheet, Text, TouchableHighlight } from 'react-native'
import React from 'react'
import ThemeToggler from '../ui/ThemeToggler'
import PageTitle from '../ui/PageTitle'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import { Palette } from '../ui/Palette'
import AnimatedView from '../ui/AnimatedView'
import { Ionicons } from '@expo/vector-icons'
import { useAppDispatch } from '../../hooks/redux'
import { logout } from '../../store/reducers/UserSlice'

const EditProfile = () => {
	const { theme } = useTheme()
	const dispatch = useAppDispatch()
	return (
		<AnimatedView style={styles(theme).container}>
			<PageTitle title={'Настройки'}>
				<ThemeToggler />
			</PageTitle>

			<TouchableHighlight
				underlayColor={Palette.grey}
				onPress={() => dispatch(logout())}
				style={styles(theme).logout}
			>
				<>
					<Ionicons name='exit-outline' size={24} color={Palette.red} />
					<Text
						style={{ fontSize: 22, color: Palette.red, paddingHorizontal: 10 }}
					>
						Выход
					</Text>
				</>
			</TouchableHighlight>
		</AnimatedView>
	)
}

export default EditProfile

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: Palette[theme].background,
		},
		logout: {
			flexDirection: 'row',
			alignItems: 'center',
			padding: 15,
		},
	})
