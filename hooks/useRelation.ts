import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentRelation } from '../store/reducers/RelationSlice'

export const useRelation = () => {
	const relation = useSelector(selectCurrentRelation)

	return useMemo(() => ({ relation }), [relation])
}
