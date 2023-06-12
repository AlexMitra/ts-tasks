import { Book } from '../interfaces'

export class Reader {
	name: string
	books: Book[]

	constructor(name: string, books: Book[]) {
		this.name = name
		this.books = books
	}

	take(book: Book): void {
		this.books.push(book)
	}
}