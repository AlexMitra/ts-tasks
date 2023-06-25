import * as Interfaces from '../interfaces'
import { freeze, logger, writable, logParameter, logMethod, format } from '../decorators'

// @freeze('like a pro')
// @ts-ignore
// @logger
export class UniversityLibrarian implements Interfaces.Librarian {
	department: string;
	email: string;
	@format() name: string

	constructor(name: string) {
		this.name = name;
	}

	@logMethod
	assistCustomer(@logParameter custName: string, @logParameter bookTitle: string): void {
		console.log(`${this.name} is assisting ${custName} with the book ${bookTitle}`)
	}

	@writable(true)
	assistFaculty(): void {
		console.log('Assisting faculty')
	}

	@writable(false)
	teachCommunity(): void {
		console.log('Teaching community')
	}
}