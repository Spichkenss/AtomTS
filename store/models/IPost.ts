import { IUser } from './IUser'
export interface IPost {
	id: number
	authorId: number
	description: string
	media: string
	timestamp: string
	likes_counter: number
	comments_counter: number
	user: IUser
}
