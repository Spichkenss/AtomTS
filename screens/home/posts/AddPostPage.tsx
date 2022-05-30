import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../../../hooks/useTheme'
import { ThemeType } from '../../../store/models/ITheme'
import { Palette } from '../../ui/Palette'
import { Octicons } from '@expo/vector-icons'
import { FC, useCallback, useState } from 'react'
import {
	CreatePostRequest,
	EditPostRequest,
	useCreatePostMutation,
	useEditPostMutation,
} from '../../../store/services/PostService'
import PageTitle from '../../ui/PageTitle'
import Checkmark from '../../ui/Checkmark'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackProps } from '../../../navigation/StackNavigator'

type Props = NativeStackScreenProps<AppStackProps, 'AddPostPage'>

const AddPostPage: FC<Props> = ({ route, navigation }) => {
	const { theme } = useTheme()
	const [createPost] = useCreatePostMutation()
	const [editPost] = useEditPostMutation()

	const [postBody, setPostBody] = useState<CreatePostRequest | EditPostRequest>(
		{
			description: '',
		}
	)

	const handleTyping = (text: string) => {
		setPostBody({ ...postBody, description: text })
	}

	const handleCreate = useCallback(async () => {
		route?.params
			? await editPost({ ...postBody, route })
			: await createPost(postBody)
		navigation.goBack()
	}, [postBody])

	return (
		<View style={styles(theme).container}>
			<PageTitle title={route?.params ? 'Редактировать пост' : 'Создать пост'}>
				<Checkmark
					onPress={handleCreate}
					disabled={postBody?.description === '' ? true : false}
				/>
			</PageTitle>
			<TextInput
				defaultValue={route?.params?.description}
				onChangeText={handleTyping}
				placeholder={'Что нового?'}
				placeholderTextColor={Palette[theme].placeholder}
				style={styles(theme).input}
				multiline={true}
				autoFocus={true}
				selectionColor={Palette[theme].carete}
			/>
			<View style={styles(theme).tabbar}>
				<TouchableOpacity>
					<Octicons
						name='image'
						size={24}
						color={Palette[theme].iconInactive}
					/>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default AddPostPage

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
		},
		input: {
			flex: 1,
			textAlignVertical: 'top',
			backgroundColor: Palette[theme].primary,
			padding: 10,
			fontSize: 32,
			fontWeight: '300',
			color: Palette[theme].text,
		},
		tabbar: {
			padding: 20,
			backgroundColor: Palette[theme].primary,
		},
	})
