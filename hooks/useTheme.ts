import { useEffect, useMemo } from 'react'
import { selectCurrentTheme, setTheme } from './../store/reducers/ThemeSlice'
import { useAppDispatch, useAppSelector } from './redux'

export const useTheme = () => {
	const currentTheme = useAppSelector(selectCurrentTheme)
	const dispatch = useAppDispatch()
	const { theme } = useAppSelector(state => state.themeReducer)

	const toggleTheme = () => {
		currentTheme === 'light'
			? dispatch(setTheme('dark'))
			: dispatch(setTheme('light'))
	}

	return useMemo(() => ({ theme: currentTheme, toggleTheme }), [theme])
}
