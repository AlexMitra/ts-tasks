import { Book, TOptions } from './interfaces'
import { Category } from './enums'
import { BookOrUndefined, BookProperties, LibraryT } from './types'
import { Encyclopedia as RefBook } from './classes'

export function showHello(divName: string, name: string) {
	const elt = document.getElementById(divName);
	elt.innerText = `Hello from ${name}`;
}

// Task 2.1
export const getAllBooks = (): readonly Book[] => {
	const books: readonly Book[] = [
		{id: 1, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: Category.JavaScript},
		{id: 2, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: Category.JavaScript},
		{id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS},
		{
			id: 4,
			title: 'Mastering JavaScript Object-Oriented Programming',
			author: 'Andrea Chiarelli',
			available: true,
			category: Category.JavaScript
		},
	] as const;
	return books;
};

export const logFirstAvailable = (books: readonly Book[] = getAllBooks()): void => {
	console.log('\n* Logging First available ...')
	console.log(books.length)
	console.log(books.map(b => b.title).find(Boolean))
}

export const getBookTitlesByCategory = (category: Category = Category.JavaScript): string[] => {
	return getAllBooks().filter(b => b.category === category).map(b => b.title)
}

export const logBookTitles = (titles: string[]): void => {
	console.log('\n* logging books ...')
	titles.forEach(t => console.log(t))
}

export const getBookAuthorByIndex = (index: number): [title: string, author: string] | [] => {
	const {title, author} = getAllBooks()
		.find((b: Book, i) => i === index) ?? {}
	return title ? [title, author] : []
}

export const calcTotalPages = (libraries: readonly LibraryT[] = []): bigint => {
	return libraries
		.map(l => l.books * l.avgPagesPerBook)
		.map(total => BigInt(total))
		.reduce((acc, total) => {
			return acc + total
		}, 0n)
}

// Task 3.1
export function createCustomerID(name: string, id: number): string {
	return `${name}@${id}`
}

// Task 3.2
export const createCustomer = (name: string, age?: number, city?: string): void => {
	console.log(`Customer name: ${name}`)
	if(age) {
		console.log(`Customer age: ${age}`)
	}
	if(city) {
		console.log(`Customer city: ${city}`)
	}
}

export const getBookByID = (id: Book['id']): BookOrUndefined => {
	return getAllBooks().find(b => b.id === id)
}

export const сheckoutBooks = (customer: string, ...bookIDs: number[]): string[] => {
	console.log('\n* Checking out books ...')
	console.log(customer)
	return getAllBooks()
		.filter(b => bookIDs.includes(b.id))
		.filter(b => b.available)
		.map(b => b.title)
}

// Task 3.3
export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...bookProperty: unknown[]): string[] {
	console.log('\n* Getting book titles ...')
	if (bookProperty?.length === 2) {
		const [id, available] = bookProperty
		return getAllBooks().filter(b => b.id === id && b.available === available).map(b => b.title)
	}
	const [first] = bookProperty
	if(typeof first === 'string') {
		return getAllBooks().filter(b => b.author === first).map(b => b.title)
	}
	if(typeof first === 'boolean') {
		return getAllBooks().filter(b => b.available === first).map(b => b.title)
	}
	return []
}

// Task 4.01
export const printBook = (book: Book): void => {
	console.log('\n* Printing book ...')
	console.log(`${book.title} by ${book.author}`)
}

// Task 4.02
export const absolutelyDamaged = (why: string): void => {
	console.log(`OMG, damaged by ${why}`)
}

// Task 4.05
export const getProperty = (book: Book, propName: BookProperties | 'isbn'): any => {
	const field = book[propName]
	return field instanceof Function ? field.name : field
}

// Task 5.05
export const setDefaultConfig = (options: TOptions): TOptions => {
	const defaulDuration: number = 100
	const defaultSpeed: number = 220
	options.duration ??= defaulDuration
	options.speed ??= defaultSpeed
	return options
}

// Task 6.03
export function assertRefBookInstance(condition: any): asserts condition is RefBook {
	if (!(condition instanceof RefBook)) {
		throw new Error('It is not an instance of RefBook')
	}
}

export function printRefBook(data: any): void {
	assertRefBookInstance(data)
	data.printItem()
}

export function purge<T>(inventory: T[] = []):T[] {
	return inventory.length > 2 ? [...inventory].slice(2) : []
}

export function getObjectProperty<TObject extends object, TKey extends keyof TObject>(obj: TObject, propName: TKey):TObject[TKey] | string {
	const field = obj[propName]
	return field instanceof Function ? field.name : field
}

// Task 7.05 point 8 HW
type updateSourceT = (flag: boolean) => string | number

type trueT = true
type falseT = false
type returnT = ReturnType<updateSourceT>
type updateT = (flag: trueT | falseT) => returnT

export function update(flag: boolean):string | number {
	return flag ? 'hello' : 123
}

const updateTest: updateT = update

export function updateNum(flag: number):string | number {
	return flag > 0 ? 'hello' : 123
}
export function updateReturnBool(flag: boolean):string | boolean {
	return flag ? 'hello' : false
}

// const updateTest2: updateT = updateNum // error
// const updateTest3: updateT = updateReturnBool // error