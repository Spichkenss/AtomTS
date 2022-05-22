import { FC, ReactNode } from 'react'
import { StatusBar, StyleSheet, Text } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import AnimatedView from './AnimatedView'
import { Palette } from './Palette'

interface IPageTitle {
	children?: ReactNode
	title?: string
}

const PageTitle: FC<IPageTitle> = ({ children, title }) => {
	const { theme } = useTheme()

	return (
		<AnimatedView style={styles(theme).container}>
			<Text style={styles(theme).text}>{title}</Text>
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
		},
	})
