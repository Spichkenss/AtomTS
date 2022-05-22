import { StyleSheet, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import { Palette } from '../ui/Palette'
import PostList from './posts/PostList'

const Home = () => {
	const { theme } = useTheme()

	return (
		<View style={styles(theme).container}>
			<PostList />
		</View>
	)
}

export default Home

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: Palette[theme].background,
		},
	})
