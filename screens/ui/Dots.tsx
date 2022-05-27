import { StyleSheet, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { Palette } from './Palette'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import { FC } from 'react'

interface IDots {
	onPress: () => void
}

const Dots: FC<IDots> = ({ onPress }) => {
	const { theme } = useTheme()

	return (
		<TouchableOpacity onPress={onPress}>
			<Entypo
				name='dots-three-vertical'
				size={18}
				color={Palette[theme].iconInactive}
			/>
		</TouchableOpacity>
	)
}

export default Dots

const styles = (theme: ThemeType) => StyleSheet.create({})
