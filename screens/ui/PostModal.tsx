import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import ReactNativeModal from 'react-native-modal'
import { Feather } from '@expo/vector-icons'
import { useTheme } from '../../hooks/useTheme'
import { Palette } from './Palette'
import { ThemeType } from '../../store/models/ITheme'
import { useDeletePostMutation } from '../../store/services/PostApi'
import { IPost } from '../../store/models/IPost'
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native'
import Dots from './Dots'

interface IPostModal {
	postData: IPost
}

const PostModal: FC<IPostModal> = ({ postData }) => {
	const { theme } = useTheme()
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

	const [deletePost] = useDeletePostMutation()
	const navigation = useNavigation<NavigationProp<ParamListBase>>()

	const handleDelete = async () => {
		await deletePost(postData.id)
	}

	return (
		<>
			<Dots onPress={() => setIsModalVisible(true)} />
			<ReactNativeModal
				isVisible={isModalVisible}
				deviceHeight={Dimensions.get('screen').height}
				deviceWidth={Dimensions.get('screen').width}
				onBackdropPress={() => setIsModalVisible(false)}
				useNativeDriver={true}
				useNativeDriverForBackdrop={true}
				hideModalContentWhileAnimating={true}
				style={{ justifyContent: 'flex-end' }}
			>
				<View
					style={{
						backgroundColor: Palette[theme].tabbar,
						width: '100%',
						borderRadius: 20,
						padding: 20,
					}}
				>
					<TouchableOpacity
						activeOpacity={0.6}
						style={[styles(theme).button, { paddingBottom: 25 }]}
						onPress={() =>
							navigation.navigate('AddPostPage', {
								description: postData.description,
								id: postData.id,
							})
						}
					>
						<Feather name='edit-2' size={24} color={Palette[theme].secondary} />
						<Text style={styles(theme).text}>Редактировать</Text>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.6}
						style={styles(theme).button}
						onPress={handleDelete}
					>
						<Feather name='trash-2' size={24} color={Palette.red} />
						<Text style={[styles(theme).text, { color: Palette.red }]}>
							Удалить
						</Text>
					</TouchableOpacity>
				</View>
			</ReactNativeModal>
		</>
	)
}

export default PostModal

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		button: {
			flexDirection: 'row',
		},
		text: {
			fontSize: 18,
			fontWeight: '700',
			color: Palette[theme].secondary,
			paddingLeft: 10,
		},
	})
