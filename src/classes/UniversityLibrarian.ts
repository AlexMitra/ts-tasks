import * as Interfaces from '../interfaces'
import { freeze, logger, writable } from '../decorators'

// @freeze('like a pro')
// @ts-ignore
@logger
export class UniversityLibrarian implements Interfaces.Librarian {

	constructor(name: string) {
		this.name = name;
	}

	assistCustomer(custName: string, bookTitle: string): void {
		console.log(`${this.name} is assisting ${custName} with the book ${bookTitle}`)
	}

	department: string;
	email: string;
	name: string;

	@writable(true)
	assistFaculty(): void {
		console.log('Assisting faculty')
	}

	@writable(false)
	teachCommunity(): void {
		console.log('Teaching community')
	}
}