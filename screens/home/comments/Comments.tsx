import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { FC, useState } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { useTheme } from '../../../hooks/useTheme'
import { AppStackProps } from '../../../navigation/StackNavigator'
import { ThemeType } from '../../../store/models/ITheme'
import {
	CommentRequest,
	CommentType,
	useAddCommentMutation,
	useGetCommentsQuery,
} from '../../../store/services/PostApi'
import Loader from '../../ui/Loader'
import MessageInput from '../../ui/MessageInput'

import { Palette } from '../../ui/Palette'
import CommentItem from './CommentItem'
import CommentsPost from './CommentsPost'

type Props = NativeStackScreenProps<AppStackProps, 'Comments'>

const Comments: FC<Props> = ({ route }) => {
	const { id } = route.params
	const { theme } = useTheme()
	const { data, isFetching, refetch } = useGetCommentsQuery(id)
	const [addComment] = useAddCommentMutation()
	const [comment, setComment] = useState<string>('')

	const sendComment = async () => {
		await addComment({
			id,
			body: comment,
		} as CommentRequest)
	}

	return isFetching ? (
		<Loader />
	) : (
		<>
			<FlatList
				style={styles(theme).container}
				refreshing={isFetching}
				onRefresh={refetch}
				data={data?.rows}
				keyExtractor={(item: CommentType) => item.id.toString()}
				renderItem={({ item }) => <CommentItem commentData={item} />}
				ListHeaderComponent={
					<>
						<CommentsPost id={id} />
						<Text
							style={{
								backgroundColor: Palette[theme].primary,
								paddingHorizontal: 15,
								paddingVertical: 5,
								color: Palette[theme].iconInactive,
							}}
						>
							Комментарии {data?.count}
						</Text>
					</>
				}
			/>
			<MessageInput
				value={comment}
				setValue={setComment}
				placeholder={'Комментарий'}
				onPress={sendComment}
			/>
		</>
	)
}

export default Comments

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			backgroundColor: Palette[theme].background,
		},
	})
