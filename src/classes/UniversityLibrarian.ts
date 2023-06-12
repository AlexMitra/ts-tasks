import * as Interfaces from '../interfaces'

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
}