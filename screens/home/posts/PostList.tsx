import { useState } from 'react'
import { FlatList, View, ActivityIndicator } from 'react-native'
import { useTheme } from '../../../hooks/useTheme'
import { IPost } from '../../../store/models/IPost'
import { useGetAllPostsQuery } from '../../../store/services/PostApi'
import { Palette } from '../../ui/Palette'
import AddPostButton from './AddPostButton'
import PostItem from './PostItem'

const PostList = () => {
	const { theme } = useTheme()
	const { data, refetch, isFetching } = useGetAllPostsQuery()

	const [isRefresh, setIsRefresh] = useState<boolean>(false)

	const onRefresh = () => {
		setIsRefresh(true)
		refetch()
		setIsRefresh(false)
	}

	return isFetching ? (
		<ActivityIndicator
			size='large'
			color={Palette[theme].secondary}
			style={{ alignSelf: 'center', paddingTop: 50 }}
		/>
	) : (
		<FlatList
			refreshing={isRefresh}
			onRefresh={onRefresh}
			data={data}
			renderItem={({ item }) => <PostItem postData={item} />}
			keyExtractor={(item: IPost) => item.id.toString()}
			ItemSeparatorComponent={() => <View style={{ margin: 2.5 }}></View>}
			ListHeaderComponent={
				<>
					<AddPostButton />
				</>
			}
		/>
	)
}

export default PostList
