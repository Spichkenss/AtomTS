import { StyleSheet } from 'react-native'
import React, { FC } from 'react'
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useDerivedValue,
	withTiming,
} from 'react-native-reanimated'
import { useTheme } from '../../hooks/useTheme'
import { Palette } from './Palette'

const AnimatedView: FC<any> = ({ style, children }) => {
	const { theme } = useTheme()

	const progress = useDerivedValue(() => {
		return theme === 'light' ? withTiming(0) : withTiming(1)
	}, [theme])

	const rStyle = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			progress.value,
			[0, 1],
			[Palette.light.primary, Palette.dark.primary]
		)

		return { backgroundColor }
	})

	return <Animated.View style={[style, rStyle]}>{children}</Animated.View>
}

export default AnimatedView

const styles = StyleSheet.create({})
