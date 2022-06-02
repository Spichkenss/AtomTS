import {
	NavigationProp,
	ParamListBase,
	useFocusEffect,
	useNavigation,
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC, useEffect } from 'react'
import { FlatList } from 'react-native'
import { RootStackParamList } from '../../navigation/TabNavigator'
import {
	GetFriends,
	RelationType,
	useGetRequestsQuery,
} from '../../store/services/FriendService'
import Header from './Header'
import RequestItem from './RequestItem'

const Requests: FC<{
	isFetching: boolean
	requests: GetFriends | undefined
}> = ({ isFetching, requests }) => {
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
