import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme'
import { ThemeType } from '../../store/models/ITheme'
import { IDialog, useGetDialogsQuery } from '../../store/services/ChatService'
import { Palette } from '../ui/Palette'
import MessangerItem from './MessangerItem'

const Messanger = () => {
	const { theme } = useTheme()
	const { data: dialogs } = useGetDialogsQuery()

	return (
		<View style={styles(theme).container}>
			<FlatList
				data={dialogs}
				keyExtractor={(item: IDialog) => item.dialogName.toString()}
				renderItem={({ item }) => <MessangerItem dialog={item} />}
			/>
		</View>
	)
}

export default Messanger

const styles = (theme: ThemeType) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: Palette[theme].background,
		},
	})
