import { ShelfItem, Book, Magazine } from '../interfaces'

class Shelf<T extends ShelfItem> {
	constructor(private items: T[] = []) {
	}

	add(item: T): void {
		this.items.push(item)
	}

	getFirst(): T {
		const [first] = this.items
		return first
	}

	find(title: string): T {
		return this.items.find(i => i.title === title)
	}

	printTitles(): void {
		this.items.map(i => i.title).forEach(console.log)
	}
}

// option 1 - doesn't work
type BookOrMagazine = Book | Magazine
// option 2 - doesn't work
interface SuperBookOrMagazine extends Book, Magazine {

}
type x = Partial<SuperBookOrMagazine>
// option 3 - doesn't work
interface ITitle {
	title: string
}

class Shelf2<T extends ITitle> {
	private items: T[]

	constructor(items: T[] = []) {
		this.items = items
	}

	add(item: T): void {
		this.items.push(item)
	}

	getFirst(): T {
		const [first] = this.items
		return first
	}

	printTitles(): void {
		this.items.map(i => i.title).forEach(console.log)
	}
}

export { Shelf, Shelf2 }