import { Category } from './enums'
interface ITitle {
	title: string
}

interface Book extends ITitle{
	id: number,
	// title: string,
	author: string,
	available: boolean,
	category: Category,
	pages?: number,
	markDamaged?: DamageLogger
};

interface DamageLogger {
	(reason: string): void
}

interface Person {
	name: string,
	email: string
}

interface Author extends Person {
	numBooksPublished: number
}

interface Librarian extends Person {
	department: string,
	assistCustomer: (custName: string, bookTitle: string) => void
}

interface TOptions {
	duration?: number,
	speed?: number,
}

interface Magazine extends ITitle{
	// title: string,
	publisher: string
}

interface ShelfItem {
	title: string
}

export { Book, DamageLogger as Logger, TOptions, Person, Author, Librarian, Magazine, ShelfItem }