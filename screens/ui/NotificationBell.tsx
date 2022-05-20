import { Octicons } from '@expo/vector-icons'
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { Palette } from './Palette'

const NotificationBell = () => {
	const navigation = useNavigation<NavigationProp<ParamListBase>>()
	const { theme } = useTheme()
	return (
		<TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
			<Octicons name='bell' size={24} color={Palette[theme].iconActive} />
		</TouchableOpacity>
	)
}

export default NotificationBell
