import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { Palette } from '../ui/Palette'

interface IHeader {
	title: string
	counter?: number
}

const Header: FC<IHeader> = ({ title, counter }) => {
	const { theme } = useTheme()
	return (
		<View
			style={{
				paddingHorizontal: 15,
				flexDirection: 'row',
			}}
		>
			<Text
				style={{ fontWeight: '700', fontSize: 16, color: Palette[theme].text }}
			>
				{title}
			</Text>
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: Palette.red,
					borderRadius: 18 / 2,
					width: 18,
					marginLeft: 5,
				}}
			>
				<Text
					style={{
						color: 'white',
					}}
				>
					{counter}
				</Text>
			</View>
		</View>
	)
}

export default Header
