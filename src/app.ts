import { Category } from './enums'
import { LibraryT, PersonBook } from './types'
import { Book, Logger, Person, Author, Librarian } from './interfaces'
import { ReferenceItem, UL, Encyclopedia as RefBook } from './classes'
import type { Library } from './classes'
import {
    showHello,
    logFirstAvailable,
    getBookTitlesByCategory,
    logBookTitles,
    getBookAuthorByIndex,
    calcTotalPages,
    createCustomerID,
    createCustomer,
    getBookByID,
    сheckoutBooks,
    getTitles,
    printBook,
    absolutelyDamaged,
    getProperty,
    setDefaultConfig,
    assertRefBookInstance,
    printRefBook
} from './functions'

/* eslint-disable no-redeclare */
showHello('greeting', 'TypeScript');

// Task 2.1
logFirstAvailable()

logBookTitles(getBookTitlesByCategory());

console.log(getBookAuthorByIndex(3))

const libraries: readonly LibraryT[] = [
    { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
    { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
    { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
] as const;

console.log(`total pages: ${calcTotalPages(libraries)}`)

// Task 3.1
// INTERESTING: below is a function type
let idGenerator: (name: string, id: number) => string

const myID:string = createCustomerID('Ann', 10)
console.log(myID)

idGenerator = (name: string, id: number) => `${name}-#-${id}`
console.log(idGenerator('Francis', 888))
idGenerator = createCustomerID
console.log(idGenerator('Francis', 888))

// Task 3.2
createCustomer('Francis')
createCustomer('Francis', 22)
createCustomer('Francis3', 23, 'Minsk')

console.log(getBookByID(1))

const myBooks: string[] = сheckoutBooks('Francis', 1,2,3,5)

console.log(myBooks)

// Task 3.3
const bookTitles: string[] = getTitles(false)
console.log(bookTitles)

// Task 4.01
const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    pages: 200,
    markDamaged(reason) {
        console.log(`Damaged: ${reason}`)
    }
}

printBook(myBook)
myBook.markDamaged('missing back cover')

// Task 4.02
let logDamage: Logger

logDamage = absolutelyDamaged
logDamage('cat')

// Task 4.03
let favoriteAuthor: Author = {
    name: 'Akunin',
    numBooksPublished: 75,
    email: "idontknow@gmail.com"
}

let favoriteLibrarian: Librarian = {
    department: "Warsaw",
    assistCustomer: function (custName: string, bookTitle: string): void {
        console.log(`Customer ${custName} got the following book: ${bookTitle}`)
    },
    name: "Jakub",
    email: "idontknow@gmail.com"
}

favoriteLibrarian.assistCustomer('Alex', 'Сабакі Эўропы')

// Task 4.04
const offer: any = {
    book: {
        title: 'Essential TypeScript',
    },
};

console.log(offer?.magazine)
console.log(offer?.magazine?.getTitle())
// console.log(offer?.book?.getTitle()) // error because offer.book is not undefined
console.log(offer?.book?.authors?.[0])
console.log(offer?.book?.authors?.[0]?.name)

// Task 4.05
console.log(getProperty(myBook, 'title'))
console.log(getProperty(myBook, 'markDamaged'))
console.log(getProperty(myBook, 'isbn'))

// Task 5.01
// const ref = new ReferenceItem(1, 'TS Course', 2023)
// ref.publisher = 'Orelly'
// console.log(ref.printItem())
// console.log(ref.publisher)
// console.log(ref)
// console.log(ref.getID())

// Task 5.02
const refBook: RefBook = new RefBook(2, 'Programming TS', 2022, 2)
console.log(refBook.printItem())

// Task 5.03
const refBook2: ReferenceItem = new RefBook(3, 'Tackling TypeScript', 2023, 2)
refBook2.printCitation()

// Task 5.04
const favoriteLibrarian2: Librarian = new UL.UniversityLibrarian('Alex');
favoriteLibrarian2.assistCustomer('Tanya', 'Tackling TypeScript')

// Task 5.05
const myNextBook: PersonBook = {
    name: 'Alex',
    email: 'example@gmail.com',
    id: 1,
    title: 'Tackling TypeScript',
    author: 'Dr. Axel Rauschmayer',
    available: true,
    category: Category.TypeScript,
    pages: 200,
}
console.log(myNextBook)

console.log(setDefaultConfig({ duration: 500}))
console.log(setDefaultConfig({ speed: 60}))
console.log(setDefaultConfig({ }))
// console.log(setDefaultConfig()) compilation error

// Task 6.03
assertRefBookInstance(refBook)
assertRefBookInstance(refBook2)
// assertRefBookInstance(myNextBook) // error
printRefBook(refBook)
printRefBook(refBook2)
// printRefBook(myNextBook) // error
// printRefBook(favoriteLibrarian2) // error

// Task 6.05
const positive: boolean = true
if(positive) {
    const { Reader } = await import('./classes')
    const reader = new Reader.Reader('Francis', [])
    reader.take(myNextBook)
    console.log(reader)
}

// Task 6.06
// let warsawLib: Library
// warsawLib = new Library(1, 'University Of Warsaw Library', 'Dobra 53-50, 00-316 Warsaw') // error
const warsawLib: Library = {
    name: 'University Of Warsaw Library',
    address: 'Dobra 53-50, 00-316 Warsaw'
}
console.log(warsawLib)