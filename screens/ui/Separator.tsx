import { View } from 'react-native'
import React from 'react'
import { useTheme } from '../../hooks/useTheme'
import { Palette } from './Palette'

const Separator = () => {
	const { theme } = useTheme()
	return (
		<View
			style={{
				height: 1,
				width: '100%',
				backgroundColor: Palette.grey,
				alignSelf: 'center',
			}}
		></View>
	)
}

export default Separator
