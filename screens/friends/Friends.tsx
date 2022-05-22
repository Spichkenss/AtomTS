import { StyleSheet, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import ManageFriendButton from '../ui/ManageFriendButton'
import { Palette } from '../ui/Palette'

const Friends = () => {
	const { theme } = useTheme()
	return (
		<View style={styles(theme).container}>
			<ManageFriendButton />
		</View>
	)
}

export default Friends

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: Palette[theme].background,
		},
	})
