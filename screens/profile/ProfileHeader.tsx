import { StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import CircleAvatar from '../ui/CircleAvatar'
import { Palette } from '../ui/Palette'
import React, { FC, useState } from 'react'

interface Props {
	children?: React.ReactNode
}

const ProfileHeader: FC<Props> = ({ children }) => {
	const { user } = useAuth()
	const { theme } = useTheme()
	const [isStatusFull, setIsStatusFull] = useState<boolean>(false)

	return (
		<View style={styles(theme).container}>
			<View style={styles(theme).header}>
				<CircleAvatar height={90} width={90} image={'../../avatar.jpg'} />
				<View
					style={{
						flexDirection: 'column',
						padding: 10,
					}}
				>
					<Text style={styles(theme).name}>
						{user?.name} {user?.surname}
					</Text>
					{user?.status && (
						<Text
							style={styles(theme).status}
							numberOfLines={isStatusFull ? 5 : 1}
							onPress={() => setIsStatusFull(!isStatusFull)}
						>
							{user?.status}
						</Text>
					)}
					<Text style={styles(theme).lastSeen}>Онлайн</Text>
				</View>
			</View>
			{children}
		</View>
	)
}

export default ProfileHeader

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
			flexWrap: 'wrap',
			fontSize: 24,
			fontWeight: '500',
			color: Palette[theme].text,
		},
		status: {
			width: '50%',
			color: Palette[theme].text,
			fontSize: 15,
			fontWeight: '400',
		},
		lastSeen: {
			color: Palette[theme].iconInactive,
			fontSize: 15,
			fontWeight: '500',
		},
	})
