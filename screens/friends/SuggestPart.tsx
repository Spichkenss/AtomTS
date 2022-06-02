import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
	StatusType,
	useGetRelationQuery,
	useGetSuggestQuery,
	useLazyGetRelationQuery,
} from '../../store/services/FriendService'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import { IUser } from '../../store/models/IUser'
import { Palette } from '../ui/Palette'
import Separator from '../ui/Separator'
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native'
import AddUserButton from '../ui/AddUserButton'

const SuggestPart = () => {
	const navigation = useNavigation<NavigationProp<ParamListBase>>()
	const { data: suggests } = useGetSuggestQuery()
	const { theme } = useTheme()
	const [randomUser, setRandomUser] = useState<IUser>()

	useEffect(() => {
		suggests?.length &&
			setRandomUser(suggests[Math.floor(Math.random() * suggests?.length)])
	}, [suggests])

	return suggests ? (
		<View style={styles(theme).container}>
			<Separator />
			<View style={styles(theme).head}>
				<Text style={styles(theme).headTitle}>Возможные друзья</Text>
				<TouchableOpacity onPress={() => navigation.navigate('SuggestFull')}>
					<Text style={styles(theme).showAll}>Показать всех</Text>
				</TouchableOpacity>
			</View>
			<View style={styles(theme).user}>
				<Image
					source={require('../../avatar.jpg')}
					style={styles(theme).avatar}
				/>
				<View style={styles(theme).besideAvatar}>
					<Text style={styles(theme).name}>
						{randomUser?.name} {randomUser?.surname}
					</Text>

					<AddUserButton id={randomUser?.id as number} />
				</View>
			</View>
			<Separator />
		</View>
	) : null
}

export default SuggestPart

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			paddingVertical: 10,
			paddingHorizontal: 15,
			backgroundColor: Palette[theme].primary,
		},
		head: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			paddingVertical: 10,
		},
		headTitle: {
			fontSize: 16,
			color: Palette[theme].text,
			fontWeight: '700',
		},
		showAll: {
			fontSize: 16,
			color: Palette[theme].secondary,
			fontWeight: '600',
		},
		user: { flexDirection: 'row', paddingBottom: 10 },
		avatar: {
			width: 90,
			height: 90,
			borderRadius: 90 / 2,
		},
		besideAvatar: {
			alignItems: 'flex-start',
			flexDirection: 'column',
			justifyContent: 'space-evenly',
			paddingHorizontal: 10,
		},
		name: {
			color: Palette[theme].text,
			fontSize: 22,
			fontWeight: '600',
		},
	})
