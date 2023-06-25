import { timeout } from '../decorators'

export abstract class ReferenceItem {
	// title: string
	// year: number
	//
	// constructor(newTitle: string, newYear: number) {
	//     console.log('Creating a new ReferenceItem...')
	//     this.title = newTitle
	//     this.year = newYear
	// }
	#id: number
	_publisher: string
	static department = 'Warszawa'

	constructor(id: number, public title: string, protected year: number) {
		this.#id = id
	}

	get publisher(): string {
		return this._publisher.toUpperCase()
	}

	set publisher(newPublisher: string) {
		this._publisher = newPublisher
	}

	getID(): number {
		return this.#id
	}

	// @timeout(3000)
	printItem(): void {
		console.log(`${this.title} was published in ${this.year} in ${ReferenceItem.department}`)
	}

	abstract printCitation(): void;
}