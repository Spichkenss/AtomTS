import { StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../../hooks/useTheme'
import { Palette } from './Palette'
import { FC } from 'react'

interface ICheck {
	onPress: () => void
	disabled: boolean
}

const Checkmark: FC<ICheck> = ({ onPress, disabled }) => {
	const { theme } = useTheme()

	return (
		<TouchableOpacity onPress={onPress} disabled={disabled}>
			<Ionicons
				name='checkmark-sharp'
				size={24}
				color={disabled ? Palette[theme].iconInactive : Palette[theme].text}
			/>
		</TouchableOpacity>
	)
}

export default Checkmark

const styles = StyleSheet.create({})
