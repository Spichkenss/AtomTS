import React, { FC } from 'react'
import { FlatList } from 'react-native'
import { GetFriends, RelationType } from '../../store/services/FriendService'
import Header from './Header'
import RequestItem from './RequestItem'

const Requests: FC<{
	isFetching: boolean
	requests: GetFriends | undefined
}> = ({ requests }) => {
	return (
		<FlatList
			data={requests?.rows}
			keyExtractor={(item: RelationType) => item.user.id.toString()}
			renderItem={({ item }) => <RequestItem data={item} />}
			ListHeaderComponent={
				requests?.count ? (
					<Header title={'Запросы в друзья'} counter={requests?.count} />
				) : null
			}
		/>
	)
}

export default Requests
