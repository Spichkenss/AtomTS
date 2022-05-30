import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { useGetSuggestQuery } from '../../store/services/FriendService'
import Loader from '../ui/Loader'
import { IUser } from '../../store/models/IUser'
import { useTheme } from '../../hooks/useTheme'
import { Palette } from '../ui/Palette'
import SuggestItem from './SuggestItem'
import Header from './Header'

const SuggestFull = () => {
	const { data, isFetching, refetch } = useGetSuggestQuery()
	const { theme } = useTheme()

	return isFetching ? (
		<Loader />
	) : (
		<FlatList
			refreshing={isFetching}
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
