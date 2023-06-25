import { ReferenceItem } from './ReferenceItem'

class Encyclopedia extends ReferenceItem {
	constructor(id: number, title: string, year: number, public edition: number) {
		super(id, title, year);
	}

	override printItem(): void {
		// console.log(`${super.title} was published in ${ReferenceItem.department}, Edition: ${this.edition} (${super.year})`)
		super.printItem()
		// INTERESTING: use this instead of super
		console.log(`${this.title} was published in ${ReferenceItem.department}, Edition: ${this.edition} (${this.year})`)
	}

	printCitation(): void {
		console.log(`${this.title} – ${this.year}`)
	}
}

export default Encyclopedia