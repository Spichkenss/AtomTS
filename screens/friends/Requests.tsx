import { FlatList } from 'react-native'
import {
	RelationType,
	useGetRequestsQuery,
} from '../../store/services/FriendService'
import Header from './Header'
import RequestItem from './RequestItem'

const Requests = () => {
	const { data, refetch, isFetching } = useGetRequestsQuery()

	return (
		<FlatList
			refreshing={isFetching}
			onRefresh={refetch}
			data={data?.rows}
			keyExtractor={(item: RelationType) => item.user.id.toString()}
			renderItem={({ item }) => <RequestItem data={item} />}
			ListHeaderComponent={
				data?.count ? (
					<Header title={'Запросы в друзья'} counter={data?.count} />
				) : null
			}
		/>
	)
}

export default Requests
