import { IUser } from './IUser'
export interface IPost {
	id: number
	authorId: number
	description: string
	media: string
	likes_counter: number
	comments_counter: number
	createdAt: Date
	user: IUser
}
