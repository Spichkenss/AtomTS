import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import CircleAvatar from '../ui/CircleAvatar'
import { Palette } from '../ui/Palette'
import React, { FC, useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import {
	useGetAvatarQuery,
	useSetAvatarMutation,
} from '../../store/services/UserService'
import { IUser } from '../../store/models/IUser'

declare global {
	interface FormDataValue {
		uri: string
		type: string
		name: string
	}

	interface FormData {
		append(name: string, value: FormDataValue, fileName?: string): void
		set(name: string, value: FormDataValue, fileName?: string): void
	}
}

interface Props {
	children?: React.ReactNode
	user: IUser | null | undefined
	changeable: boolean
}

const ProfileHeader: FC<Props> = ({ children, user, changeable }) => {
	const { theme } = useTheme()
	const [isStatusFull, setIsStatusFull] = useState<boolean>(false)
	const [setAvatar] = useSetAvatarMutation()
	const { data: avatar } = useGetAvatarQuery(user?.id as number)

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		})

		if (!result.cancelled) {
			const formData = new FormData()
			formData.append('avatar', {
				uri: result.uri,
				type: 'image/png',
				name: `${user?.username}-avatar.png`,
			})

			await setAvatar(formData)
		}
	}

	return (
		<View style={styles(theme).container}>
			<View style={styles(theme).header}>
				<CircleAvatar
					id={user?.id as number}
					height={90}
					width={90}
					image={avatar}
					onPress={() => {
						changeable && pickImage()
					}}
				/>
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
