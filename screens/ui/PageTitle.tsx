import React, { FC, ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import AnimatedView from './AnimatedView'
import BackArrow from './BackArrow'
import { Palette } from './Palette'

interface IPageTitle {
	children?: ReactNode
	title?: string
}

const PageTitle: FC<IPageTitle> = ({ children, title }) => {
	const { theme } = useTheme()

	return (
		<AnimatedView style={styles(theme).container}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<BackArrow />
				<Text style={styles(theme).text}>{title}</Text>
			</View>
			{children}
		</AnimatedView>
	)
}

export default PageTitle

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			backgroundColor: Palette[theme].primary,
			paddingVertical: 10,
			paddingHorizontal: 15,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
		text: {
			fontSize: 28,
			fontWeight: '600',
			color: Palette[theme].text,
			paddingHorizontal: 10,
		},
	})
