import { useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import {
	RelationType,
	useGetFriendsQuery,
} from '../../store/services/FriendService'
import Loader from '../ui/Loader'
import { Palette } from '../ui/Palette'
import FriendItem from './FriendItem'
import Requests from './Requests'
import SuggestPart from './SuggestPart'

const Friends = () => {
	const { theme } = useTheme()
	const { data, isFetching, refetch } = useGetFriendsQuery()

	return (
		<FlatList
			refreshing={isFetching}
			onRefresh={refetch}
			style={styles(theme).container}
			data={data?.rows}
			keyExtractor={(item: RelationType) => item.user.id.toString()}
			renderItem={({ item }) => <FriendItem data={item} />}
			ListHeaderComponent={
				<View style={styles(theme).header}>
					<Requests />
					<SuggestPart />
					{data?.count ? (
						<Text style={styles(theme).headerText}>
							Мои друзья
							<Text style={styles(theme).counter}>{data?.count}</Text>
						</Text>
					) : (
						<Text style={styles(theme).headerText}>У вас пока нет друзей</Text>
					)}
				</View>
			}
		/>
	)
}

export default Friends

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: Palette[theme].background,
		},
		header: {
			backgroundColor: Palette[theme].primary,
		},
		headerText: {
			fontSize: 16,
			fontWeight: '700',
			paddingHorizontal: 15,
			paddingBottom: 10,
			color: Palette[theme].text,
		},
		counter: {
			color: Palette[theme].iconInactive,
		},
	})
