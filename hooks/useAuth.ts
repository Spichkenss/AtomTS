import { selectCurrentUser } from './../store/reducers/UserSlice'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'

export const useAuth = () => {
	const user = useSelector(selectCurrentUser)

	return useMemo(() => ({ user }), [user])
}
