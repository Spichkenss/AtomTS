export const unknown = require('../../assets/unknown.png')
import { FC, useEffect } from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import { Palette } from './Palette'
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native'
import { staticURL } from '../../config'

interface ICircleAvatar {
	id?: number
	width: number
	height: number
	image: string | undefined
	onPress?: () => void
}

const CircleAvatar: FC<ICircleAvatar> = props => {
	const navigation = useNavigation<NavigationProp<ParamListBase>>()
	const { theme } = useTheme()

	const onPressAction = () => {
		props.onPress ? props.onPress() : navigation.navigate('Profile')
	}

	return (
		<Pressable style={styles(theme, props).circle} onPress={onPressAction}>
			<Image
				source={
					props.image
						? {
								uri: staticURL + props.image,
						  }
						: unknown
				}
				style={styles(theme, props).avatar}
			/>
		</Pressable>
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
