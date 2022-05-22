import { IUser } from './IUser'
export interface IPost {
	id: number
	authorId: number
	description: string
	media: string
	timestamp: string
	likes: number
	comments: number
	user: IUser
}
