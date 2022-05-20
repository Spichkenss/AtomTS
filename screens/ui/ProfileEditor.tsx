import { Feather } from '@expo/vector-icons'
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { Palette } from './Palette'

const ProfileEditor = () => {
	const { theme } = useTheme()
	const navigation = useNavigation<NavigationProp<ParamListBase>>()
	return (
		<TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
			<Feather name='settings' size={24} color={Palette[theme].iconActive} />
		</TouchableOpacity>
	)
}

export default ProfileEditor
