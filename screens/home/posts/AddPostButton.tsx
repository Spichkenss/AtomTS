import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../../../hooks/useTheme'
import { ThemeType } from '../../../store/models/ITheme'
import { Palette } from '../../ui/Palette'
import { Feather } from '@expo/vector-icons'

const AddPostButton = () => {
	const navigation = useNavigation<NavigationProp<ParamListBase>>()
	const { theme } = useTheme()

	return (
		<View style={styles(theme).container}>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => navigation.navigate('AddPostPage')}
				style={styles(theme).button}
			>
				<Feather name='edit-2' size={18} color={Palette[theme].secondary} />
				<Text style={styles(theme).text}>Создать пост</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles(theme).story}>
				<Feather name='instagram' size={28} color={Palette[theme].secondary} />
			</TouchableOpacity>
		</View>
	)
}

export default AddPostButton

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			width: '100%',
			backgroundColor: Palette[theme].primary,
			marginVertical: 5,
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'row',
		},
		button: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'row',
			marginVertical: 8,
			marginHorizontal: 15,
			paddingVertical: 8,
			backgroundColor: Palette.grey,
			borderRadius: 10,
		},
		text: {
			fontSize: 18,
			fontWeight: '700',
			color: Palette[theme].secondary,
			marginLeft: 8,
		},
		story: {
			marginRight: 15,
		},
	})
