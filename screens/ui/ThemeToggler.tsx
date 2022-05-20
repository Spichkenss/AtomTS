import { TouchableOpacity } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { Feather } from '@expo/vector-icons'
import { Palette } from './Palette'

const ThemeToggler = () => {
	const { theme, toggleTheme } = useTheme()

	return (
		<TouchableOpacity onPress={toggleTheme}>
			{theme === 'dark' ? (
				<Feather name='moon' size={24} color={Palette[theme].iconActive} />
			) : (
				<Feather name='sun' size={24} color={Palette[theme].iconActive} />
			)}
		</TouchableOpacity>
	)
}

export default ThemeToggler
