import { StatusType } from './../services/FriendService'

export const DefineButtonTypeByRelation = (relation: StatusType) => {
	switch (relation) {
		case 'friends':
			return 'user-check'
		case 'requests':
			return 'user-clock'
		case 'decides':
			return 'user-plus'
	}
}
