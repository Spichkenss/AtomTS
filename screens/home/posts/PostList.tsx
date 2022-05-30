import { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { useTheme } from '../../../hooks/useTheme'
import { IPost } from '../../../store/models/IPost'
import { useGetAllPostsQuery } from '../../../store/services/PostService'
import Loader from '../../ui/Loader'
import AddPostButton from './AddPostButton'
import PostItem from './PostItem'

const PostList = () => {
	const { theme } = useTheme()
	const { data, refetch, isFetching } = useGetAllPostsQuery(undefined, {
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
		refetchOnReconnect: true,
	})

	useEffect(() => {
		const getUpdates = async () => {
			await refetch()
		}
		getUpdates()
	}, [])

	return isFetching ? (
		<Loader />
	) : (
		<FlatList
			refreshing={isFetching}
			onRefresh={refetch}
			data={data}
			renderItem={({ item }) => <PostItem postData={item} />}
			keyExtractor={(item: IPost) => item?.id.toString()}
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
