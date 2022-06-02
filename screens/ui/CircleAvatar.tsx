import { FC } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import { Palette } from './Palette'

interface ICircleAvatar {
	width: number
	height: number
	image: string
}

const CircleAvatar: FC<ICircleAvatar> = props => {
	const { theme } = useTheme()

	return (
		<View style={styles(theme, props).circle}>
			<Image
				source={require('../../avatar.jpg')}
				style={styles(theme, props).avatar}
			/>
		</View>
	)
}

export default CircleAvatar

const styles = (theme: ThemeType, props: ICircleAvatar) =>
	StyleSheet.create({
		circle: {
			justifyContent: 'center',
			alignItems: 'center',
			borderWidth: 1.5,
			borderRadius: props.width,
			borderColor: Palette[theme].secondary,
		},
		avatar: {
			width: props.width,
			height: props.height,
			borderRadius: props.width / 2,
			margin: 2,
		},
	})
