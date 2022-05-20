import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../../../hooks/useTheme'
import { ThemeType } from '../../../store/models/ITheme'
import { Palette } from '../../ui/Palette'
import { Octicons } from '@expo/vector-icons'

const AddPostPage = () => {
	const { theme } = useTheme()
	return (
		<View style={styles(theme).container}>
			<TextInput
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
