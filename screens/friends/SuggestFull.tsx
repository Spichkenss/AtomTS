import { FlatList, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useGetSuggestQuery } from '../../store/services/FriendService'
import Loader from '../ui/Loader'
import { IUser } from '../../store/models/IUser'
import { useTheme } from '../../hooks/useTheme'
import { Palette } from '../ui/Palette'
import SuggestItem from './SuggestItem'

import { useFocusEffect } from '@react-navigation/native'

const SuggestFull = () => {
	const { data, isFetching, refetch, isLoading } = useGetSuggestQuery()
	const { theme } = useTheme()

	return isFetching ? (
		<Loader />
	) : (
		<FlatList
			refreshing={isLoading}
			onRefresh={refetch}
			style={{ flex: 1, backgroundColor: Palette[theme].background }}
			data={data}
			keyExtractor={(item: IUser) => item.id.toString()}
			renderItem={({ item }) => <SuggestItem data={item} />}
		/>
	)
}

export default SuggestFull

const styles = StyleSheet.create({})
