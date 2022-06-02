import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
	RelationType,
	useGetFriendsQuery,
} from '../../../store/services/FriendService'
import { useAuth } from '../../../hooks/useAuth'
import FriendItem from './FriendItem'
import { useTheme } from '../../../hooks/useTheme'
import { ThemeType } from '../../../store/models/ITheme'
import { Palette } from '../../ui/Palette'
import Separator from '../../ui/Separator'

const FriendList = () => {
	const { user } = useAuth()
	const { data: friends } = useGetFriendsQuery(user?.id as number)
	const { theme } = useTheme()

	return (
		<View style={styles(theme).container}>
			<Text
				style={{ paddingBottom: 10, fontSize: 16, color: Palette[theme].text }}
			>
				Мои друзья {friends?.count}
			</Text>
			<FlatList
				horizontal={true}
				data={friends?.rows}
				keyExtractor={(item: RelationType) => item.user.id.toString()}
				renderItem={({ item }) => <FriendItem data={item} />}
				ItemSeparatorComponent={() => <View style={{ marginRight: 10 }}></View>}
			/>
		</View>
	)
}

export default FriendList

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			paddingLeft: 15,
			paddingVertical: 10,
			marginVertical: 15,
			backgroundColor: Palette[theme].primary,
		},
	})
