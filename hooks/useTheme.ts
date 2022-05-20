import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useLayoutEffect, useMemo } from 'react'
import { selectCurrentTheme, setTheme } from '../store/reducers/ThemeSlice'
import { useAppDispatch, useAppSelector } from './redux'

export const useTheme = () => {
	const theme = useAppSelector(selectCurrentTheme)
	const dispatch = useAppDispatch()

	useLayoutEffect(() => {
		const getTheme = async () => {
			const theme = await AsyncStorage.getItem('theme')
			theme === 'light'
				? dispatch(setTheme('light'))
				: dispatch(setTheme('dark'))
		}
		getTheme()
	}, [])

	useEffect(() => {
		const saveTheme = async () => {
			await AsyncStorage.setItem('theme', theme)
		}
		saveTheme()
	}, [theme])

	const toggleTheme = async () => {
		theme === 'light' ? dispatch(setTheme('dark')) : dispatch(setTheme('light'))
	}

	return useMemo(() => ({ theme, toggleTheme }), [theme])
}
