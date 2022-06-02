import { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../../hooks/useTheme'
import { ThemeType } from '../../../store/models/ITheme'
import { RelationType } from '../../../store/services/FriendService'
import { Palette } from '../../ui/Palette'

interface Props {
	data: RelationType
}

const FriendItem: FC<Props> = ({ data }) => {
	const { theme } = useTheme()
	return (
		<View style={styles(theme).item}>
			<Image
				source={require('../../../avatar.jpg')}
				style={styles(theme).avatar}
			/>
			<Text style={styles(theme).text}>{data.user.name}</Text>
			<Text style={styles(theme).text}>{data.user.surname}</Text>
		</View>
	)
}

export default FriendItem

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		item: { flexDirection: 'column', alignItems: 'center' },
		avatar: { width: 60, height: 60, borderRadius: 60 / 2 },
		text: { fontSize: 14, fontWeight: '500', color: Palette[theme].text },
	})
