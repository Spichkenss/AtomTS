import { StyleSheet, View } from 'react-native'
import { Palette } from '../../ui/Palette'
import { ThemeType } from '../../../store/models/ITheme'
import { useTheme } from '../../../hooks/useTheme'

const Notifications = () => {
	const { theme } = useTheme()

	return <View style={[styles(theme).container]}></View>
}

export default Notifications

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: Palette[theme].background,
		},
	})
