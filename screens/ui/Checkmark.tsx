import { StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../hooks/useTheme'
import { Palette } from './Palette'

const Checkmark = () => {
	const { theme } = useTheme()
	return (
		<TouchableOpacity>
			<Ionicons name='checkmark-sharp' size={24} color={Palette[theme].text} />
		</TouchableOpacity>
	)
}

export default Checkmark

const styles = StyleSheet.create({})
