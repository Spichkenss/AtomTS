import { FlatList, View } from 'react-native'
import { IPost } from '../../../store/models/IPost'
import { useGetAllPostsQuery } from '../../../store/services/PostService'
import Loader from '../../ui/Loader'
import AddPostButton from './AddPostButton'
import PostItem from './PostItem'

const PostList = () => {
	const { data, refetch, isFetching } = useGetAllPostsQuery()

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
			initialNumToRender={5}
			removeClippedSubviews={true}
			ListHeaderComponent={
				<>
					<AddPostButton />
				</>
			}
		/>
	)
}

export default PostList
