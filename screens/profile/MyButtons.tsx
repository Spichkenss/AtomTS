import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useTheme } from '../../hooks/useTheme'
import { Palette } from '../ui/Palette'
import { ThemeType } from '../../store/models/ITheme'
import { Feather } from '@expo/vector-icons'
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native'

const MyButtons = () => {
	const navigation = useNavigation<NavigationProp<ParamListBase>>()
	const { theme } = useTheme()
	return (
		<View style={styles(theme).container}>
			<TouchableOpacity
				activeOpacity={0.7}
				style={styles(theme).item}
				onPress={() => navigation.navigate('AddPostPage')}
			>
				<FontAwesome
					name='pencil-square-o'
					size={28}
					color={Palette[theme].secondary}
				/>
				<Text style={styles(theme).text}>Запись</Text>
			</TouchableOpacity>
			<TouchableOpacity activeOpacity={0.7} style={styles(theme).item}>
				<Feather name='instagram' size={28} color={Palette[theme].secondary} />
				<Text style={styles(theme).text}>История</Text>
			</TouchableOpacity>
		</View>
	)
}

export default MyButtons

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			backgroundColor: Palette[theme].primary,
			paddingVertical: 10,
			flexDirection: 'row',
			justifyContent: 'space-evenly',
		},
		item: {
			alignItems: 'center',
		},
		text: {
			fontSize: 16,
			color: Palette[theme].secondary,
			fontWeight: '500',
			textAlign: 'center',
		},
	})
