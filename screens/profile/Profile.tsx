import { StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import CircleAvatar from '../ui/CircleAvatar'
import { Palette } from '../ui/Palette'
import { FC } from 'react'

const Profile: FC<any> = ({ navigation }) => {
	const { user } = useAuth()
	const { theme } = useTheme()

	return (
		<View style={styles(theme).container}>
			<View style={styles(theme).header}>
				<CircleAvatar height={90} width={90} image={'../../avatar.jpg'} />
				<View style={{ flexDirection: 'column', flex: 1, padding: 10 }}>
					<Text style={styles(theme).name}>
						{user?.name} {user?.surname}
					</Text>
					<Text style={styles(theme).status}>онлайн</Text>

					<Text style={styles(theme).status} numberOfLines={1}>
						{user?.status}
					</Text>
				</View>
			</View>
		</View>
	)
}

export default Profile

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: Palette[theme].background,
		},
		header: {
			flexDirection: 'row',
			paddingVertical: 10,
			paddingHorizontal: 15,
			backgroundColor: Palette[theme].primary,
		},
		name: {
			flex: 1,
			flexWrap: 'wrap',
			fontSize: 24,
			fontWeight: '500',
			color: Palette[theme].text,
		},
		status: {
			flex: 1,
			flexWrap: 'wrap',
			color: Palette[theme].text,
		},
	})
