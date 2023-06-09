import { Category } from './enums'
import {
    LibraryT,
    PersonBook,
    BookRequiredFields,
    UpdatedBook,
    AuthorWoEmail,
    СreateCustomerFunctionType,
    BookRequiredProps,
    RemoveProps,
    Unpromisify
} from './types'
import { Book, Logger, Person, Author, Librarian, Magazine } from './interfaces'
import { ReferenceItem, UL, Encyclopedia as RefBook, Shelf, Shelf2 } from './classes'
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
    printRefBook,
    purge,
    getObjectProperty,
    getBooksByCategory,
    logCategorySearch,
    getBooksByCategoryPromise,
    logSearchResults
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

// Task 7.01
const inventory = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
];

// console.log(purge(inventory))
// console.log(purge([1,2,3,4]))
// console.log(purge([1]))
//
// const purgeNumbers = purge<number>
// console.log(purgeNumbers([7, 7, 8, 8]))
// console.log(purgeNumbers(['7', '7', '8', '8'])) // compilation error

// Task 7.02
const bookShelf = new Shelf(inventory)
console.log(bookShelf.getFirst())

const magazines = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
];

const magazineShelf = new Shelf(magazines)
console.log(magazineShelf.getFirst())
magazineShelf.printTitles()
console.log(magazineShelf.find('Five Points'))

console.log('\nShelf2 TEST below \n')
console.log('===========================================')
const testBook: Book = { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software }
const testMagazine: Magazine = { title: 'Programming Language Monthly', publisher: 'Code Mags' }
const testBookAndMagazine = [testBook, testMagazine];
const bookShelf2 = new Shelf2(inventory)
const magazineShelf2 = new Shelf2(magazines)
const testShelf2 = new Shelf2(testBookAndMagazine)
console.log(bookShelf2)
console.log(magazineShelf2)
console.log(testShelf2)
console.log(testShelf2.printTitles())
console.log('===========================================')

// Task 7.03
console.log(getObjectProperty(myBook, 'title'))
console.log(getObjectProperty(myBook, 'markDamaged'))

// Task 7.04
const bookRequiredFields: BookRequiredFields = {
    id: 0,
    title: 'title',
    author: 'author',
    available: true,
    category: Category.Software,
    pages: 777,
    markDamaged(reason: string): void {
        console.log(`Damaged due to ${reason}`)
    }
}
console.log(bookRequiredFields)

const updatedBook: UpdatedBook = {
    id: 1,
    title: 'Partial Book'
}
console.log(updatedBook)

const justAuthor: AuthorWoEmail = {
    name: 'Francis',
    numBooksPublished: 1
}
console.log(justAuthor)

// 7.04 point 7
const params: Parameters<СreateCustomerFunctionType> = ['Francis', 30, 'Warsaw']
createCustomer(...params)

// Task 7.05
const bookRequiredTest: BookRequiredProps = {
    id: 1,
    title: 'title',
    author: 'author',
    available: true,
    category: Category.CSS,
    // pages: 100, // Type 'number' is not assignable to type 'never'.
}

const bookWithoutIdAndTitle: RemoveProps<Book, "id" | "title"> = {
    author: 'author',
    available: true,
    category: Category.CSS,
    pages: 100,
    markDamaged(reason: string): void {

    }
}

const bookWithoutAuthor: RemoveProps<Book, "author"> = {
    id: 1,
    title: 'book withour author',
    available: true,
    category: Category.CSS,
    pages: 100,
    markDamaged(reason: string): void {

    }
}

// Task 8.01
const freezeTest: Librarian = new UL.UniversityLibrarian('decorator freeze test')
// UL.UniversityLibrarian['age'] = 29 // error: Cannot add property age, object is not extensible
const librarianProto = Object.getPrototypeOf(freezeTest)
// librarianProto['newFunc'] = () => console.log('extend prototype function')
// librarianProto.newFunc()

// Task 8.02
const loggerTest = new UL.UniversityLibrarian('decorator logger test')
console.log(loggerTest['age'])
loggerTest.name = 'Anna';
// loggerTest['printLibrarian']()
// (loggerTest as any).printLibrarian()
// (loggerTest as UL.UniversityLibrarian & { printLibrarian: () => void }).printLibrarian()

// Task 8.03
const writableTest = new UL.UniversityLibrarian('writable decorator test')
writableTest.assistFaculty()
writableTest.teachCommunity()

writableTest.assistFaculty = function () {
    console.log('Changed assist function')
}
// writableTest.teachCommunity = function () { // error: can't rewrite it
//     console.log('Changed teach function')
// }
writableTest.assistFaculty()
writableTest.teachCommunity()

// Task 8.04
const timeoutTest: RefBook = new RefBook(2, 'Programming TS', 2022, 2)
timeoutTest.printItem()

// Tasks 8.05, 8.06
const logParameterAndMethodTest: Librarian = new UL.UniversityLibrarian('Alex');
favoriteLibrarian2.assistCustomer('Tanya', 'Tackling TypeScript')
console.log(logParameterAndMethodTest)

// Task 8.07
const positiveTest: RefBook = new RefBook(2, 'Programming TS', 2022, 2)
positiveTest.copies = 2
positiveTest.copies = 5
// positiveTest.copies = 5.5 // error
// positiveTest.copies = 0 // error
console.log(positiveTest)

// Task 9.01
// getBooksByCategory(Category.JavaScript, logCategorySearch)
// getBooksByCategory(Category.Software, logCategorySearch)

// Task 9.02
getBooksByCategoryPromise(Category.JavaScript).then(data => {
    console.log(data)
    return Promise.resolve(data.length)
}).then(console.log)
  .catch(console.log)
getBooksByCategoryPromise(Category.Software).then(console.log).catch(console.log)

type retyrnTypePromise = ReturnType<typeof getBooksByCategoryPromise>
type returnType = Unpromisify<retyrnTypePromise>

// Task 9.03
logSearchResults(Category.JavaScript).then(console.log).catch(console.log)
logSearchResults(Category.TypeScript).then(console.log).catch(console.log)