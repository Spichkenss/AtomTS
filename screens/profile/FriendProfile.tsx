import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { FC, useLayoutEffect } from 'react'
import { ThemeType } from '../../store/models/ITheme'
import Loader from '../ui/Loader'
import ProfileHeader from './ProfileHeader'
import FriendList from './friends/FriendList'
import FriendButtons from './FriendButtons'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import { useLazyGetUserPostsQuery } from '../../store/services/PostService'
import { IPost } from '../../store/models/IPost'
import PostItem from '../home/posts/PostItem'
import { Palette } from '../ui/Palette'
import { useLazyGetUserQuery } from '../../store/services/UserService'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackProps } from '../../navigation/StackNavigator'

type Props = NativeStackScreenProps<AppStackProps, 'FriendProfile'>

const FriendProfile: FC<Props> = ({ route }) => {
	const [getUser, { data: user, isFetching }] = useLazyGetUserQuery()
	const { theme } = useTheme()
	const [getUserPosts, { data: posts }] = useLazyGetUserPostsQuery()

	useLayoutEffect(() => {
		const getUserAsync = async () => {
			await getUser(route.params.userId).then(({ data: user }) =>
				getUserPosts(user?.id as number)
			)
		}
		if (route.params.userId) {
			getUserAsync()
		}
	}, [user?.id, route.params.userId])

	return isFetching ? (
		<Loader />
	) : (
		<FlatList
			style={styles(theme).container}
			refreshing={isFetching}
			onRefresh={() => getUser(user?.id as number)}
			data={posts}
			keyExtractor={(item: IPost) => item.id.toString()}
			renderItem={({ item }) => <PostItem postData={item} />}
			ItemSeparatorComponent={() => <View style={{ margin: 2.5 }}></View>}
			ListHeaderComponent={
				<ProfileHeader user={user} changeable={false}>
					<FriendButtons userId={user?.id} />
					<FriendList id={route.params.userId as number} />
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

export default FriendProfile

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: Palette[theme].background,
		},
	})
