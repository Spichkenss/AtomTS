import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useGetUserPostsQuery } from '../../store/services/PostService'
import { useAuth } from '../../hooks/useAuth'
import { IPost } from '../../store/models/IPost'
import PostItem from '../home/posts/PostItem'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import { Palette } from '../ui/Palette'
import ProfileHeader from './ProfileHeader'
import MyButtons from './MyButtons'
import FriendList from './friends/FriendList'
import Loader from '../ui/Loader'

const Profile = () => {
	const { user } = useAuth()
	const { theme } = useTheme()
	const {
		data: posts,
		isLoading,
		refetch,
	} = useGetUserPostsQuery(user?.id as number)

	return isLoading ? (
		<Loader />
	) : (
		<FlatList
			style={styles(theme).container}
			refreshing={isLoading}
			onRefresh={refetch}
			data={posts}
			keyExtractor={(item: IPost) => item.id.toString()}
			renderItem={({ item }) => <PostItem postData={item} />}
			ItemSeparatorComponent={() => <View style={{ margin: 2.5 }}></View>}
			ListHeaderComponent={
				<ProfileHeader>
					<MyButtons />
					<FriendList />
					{posts?.length != 0 && (
						<View
							style={{
								backgroundColor: Palette[theme].primary,
								paddingHorizontal: 15,
								paddingVertical: 5,
							}}
						>
							<Text
								style={{
									paddingVertical: 5,
									alignSelf: 'flex-start',
									fontSize: 16,
									borderBottomColor: Palette[theme].secondary,
									borderBottomWidth: 2,
									color: Palette[theme].text,
								}}
							>
								Все записи
							</Text>
						</View>
					)}
				</ProfileHeader>
			}
		/>
	)
}

export default Profile

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: Palette[theme].background,
		},
	})
