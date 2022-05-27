import { ActivityIndicator, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { Palette } from './Palette'

const Loader = () => {
	const { theme } = useTheme()
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: Palette[theme].background,
			}}
		>
			<ActivityIndicator size='large' color={Palette[theme].secondary} />
		</View>
	)
}

export default Loader
