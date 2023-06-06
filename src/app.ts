/* eslint-disable no-redeclare */
showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

// Task 2.1
const enum Category {JavaScript, CSS, HTML, TypeScript, Angular};
interface Book {
    id: number,
    title: string,
    author: string,
    available: boolean,
    category: Category,
    pages?: number,
    markDamaged?: DamageLogger
};

const getAllBooks = (): readonly Book[] => {
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

const logFirstAvailable = (books: readonly Book[] = getAllBooks()): void => {
    console.log('\n* Logging First available ...')
    console.log(books.length)
    console.log(books.map(b => b.title).find(Boolean))
}

logFirstAvailable()

const getBookTitlesByCategory = (category: Category = Category.JavaScript): string[] => {
    return getAllBooks().filter(b => b.category === category).map(b => b.title)
}

const logBookTitles = (titles: string[]): void => {
    console.log('\n* logging books ...')
    titles.forEach(t => console.log(t))
}

logBookTitles(getBookTitlesByCategory());

const getBookAuthorByIndex = (index: number): [title: string, author: string] | [] => {
    const {title, author} = getAllBooks()
      .find((b: Book, i) => i === index) ?? {}
    return title ? [title, author] : []
}

console.log(getBookAuthorByIndex(3))

type library = {
    lib: string,
    books: number,
    avgPagesPerBook: number
}

const libraries: readonly library[] = [
    { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
    { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
    { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
] as const;

const calcTotalPages = (libraries: readonly library[] = []): bigint => {
    return libraries
      .map(l => l.books * l.avgPagesPerBook)
      .map(total => BigInt(total))
      .reduce((acc, total) => {
        return acc + total
    }, 0n)
}

console.log(`total pages: ${calcTotalPages(libraries)}`)

// Task 3.1
// INTERESTING: below is a function type
let idGenerator: (name: string, id: number) => string
function createCustomerID(name: string, id: number): string {
    return `${name}@${id}`
}

const myID:string = createCustomerID('Ann', 10)
console.log(myID)

idGenerator = (name: string, id: number) => `${name}-#-${id}`
console.log(idGenerator('Francis', 888))
idGenerator = createCustomerID
console.log(idGenerator('Francis', 888))

// Task 3.2
const createCustomer = (name: string, age?: number, city?: string): void => {
    console.log(`Customer name: ${name}`)
    if(age) {
        console.log(`Customer age: ${age}`)
    }
    if(city) {
        console.log(`Customer city: ${city}`)
    }
}

createCustomer('Francis')
createCustomer('Francis', 22)
createCustomer('Francis3', 23, 'Minsk')

const getBookByID = (id: Book['id']): Book | undefined => {
    return getAllBooks().find(b => b.id === id)
}

console.log(getBookByID(1))

const сheckoutBooks = (customer: string, ...bookIDs: number[]): string[] => {
    console.log('\n* Checking out books ...')
    console.log(customer)
    return getAllBooks()
      .filter(b => bookIDs.includes(b.id))
      .filter(b => b.available)
      .map(b => b.title)
}

const myBooks: string[] = сheckoutBooks('Francis', 1,2,3,5)

console.log(myBooks)

// Task 3.3
function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(id: number, available: boolean): string[];
function getTitles(...bookProperty: unknown[]): string[] {
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

const bookTitles: string[] = getTitles(false)
console.log(bookTitles)

// Task 4.01
const printBook = (book: Book): void => {
    console.log('\n* Printing book ...')
    console.log(`${book.title} by ${book.author}`)
}

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
interface DamageLogger {
    (reason: string): void
}

let logDamage: DamageLogger

const absolutelyDamaged = (why: string): void => {
    console.log(`OMG, damaged by ${why}`)
}

logDamage = absolutelyDamaged
logDamage('cat')

// Task 4.03
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
type BookProperties = keyof Book

const getProperty = (book: Book, propName: BookProperties | 'isbn'): any => {
    const field = book[propName]
    return field instanceof Function ? field.name : field
}

console.log(getProperty(myBook, 'title'))
console.log(getProperty(myBook, 'markDamaged'))
console.log(getProperty(myBook, 'isbn'))

// Task 5.01
class ReferenceItem {
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

    printItem(): void {
        console.log(`${this.title} was published in ${this.year} in ${ReferenceItem.department}`)
    }
}

const ref = new ReferenceItem(1, 'TS Course', 2023)
ref.publisher = 'Orelly'
console.log(ref.printItem())
console.log(ref.publisher)
console.log(ref)
console.log(ref.getID())

// Task 5.02
class Encyclopedia extends ReferenceItem {
    constructor(id: number, title: string, year: number, public edition: number) {
        super(id, title, year);
    }

    override printItem(): void {
        // console.log(`${super.title} was published in ${ReferenceItem.department}, Edition: ${this.edition} (${super.year})`)
        // INTERESTING: use this instead of super
        console.log(`${this.title} was published in ${ReferenceItem.department}, Edition: ${this.edition} (${this.year})`)
    }
}

const refBook: Encyclopedia = new Encyclopedia(2, 'Programming TS', 2022, 2)
console.log(refBook.printItem())