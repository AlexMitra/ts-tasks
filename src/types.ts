import { Book, Person, Author } from './interfaces'
import { createCustomer } from './functions'

type Library = {
	lib: string,
	books: number,
	avgPagesPerBook: number
}

type BookProperties = keyof Book

type PersonBook = Person & Book

type BookOrUndefined = Book | undefined

type BookRequiredFields = Required<Book>

type UpdatedBook = Partial<Book>

type AuthorWoEmail = Omit<Author, 'email'>

type СreateCustomerFunctionType = typeof createCustomer

type fn = (p1: string, p2: number, p3: boolean) => symbol

export type Param1<T> = T extends (p1: infer R, p2: number, p3: boolean) => symbol ? R : never
export type Param2<T> = T extends (p1: string, p2: infer R, p3: boolean) => symbol ? R : never
export type Param3<T> = T extends (p1: string, p2: number, p3: infer R) => symbol ? R : never

export type P1 = Param1<fn> // string
export type P2 = Param2<fn> // number
export type P3 = Param3<fn> // boolean

// Task 7.05 point 4
// export type RequiredProps<T extends object> = {
// 	[Prop in keyof T as T[Prop] extends { Prop: T[Prop] } ? Prop : never]: T[Prop]
// }

export type RequiredProps<T extends object> = {
	[Prop in keyof T]: {} extends Pick<T, Prop> ? never : T[Prop]
}

export type RequiredPropsUnion<T extends object> = {
	[Prop in keyof T]: {} extends Pick<T, Prop> ? never : Prop
}[keyof T]

export type OptionalProps<T extends object> = {
	[Prop in keyof T]: {} extends Pick<T, Prop> ? T[Prop] : never
}

export type OptionalPropsUnion<T extends object> = {
	[Prop in keyof T]: {} extends Pick<T, Prop> ? Prop : never
}[keyof T]

export type BookRequiredProps = RequiredProps<Book>
export type BookRequiredPropsUnion = RequiredPropsUnion<Book>
export type BookOptionalProps = OptionalProps<Book>
export type BookOptionalPropsUnion = OptionalPropsUnion<Book>

// Task 7.05 points 6, 7
export type RemoveProps<T extends object, TProp extends keyof T> = {
	[Prop in Exclude<keyof T, TProp>]: T[Prop]
}

export type BookRequiredPropsType = RemoveProps<Book, BookOptionalPropsUnion>
export type BookOptionalPropsType = RemoveProps<Book, BookRequiredPropsUnion>

export type Unpromisify<T> = T extends Promise<infer R> ? R : never

export {
	Library as LibraryT,
	BookProperties,
	PersonBook,
	BookOrUndefined,
	BookRequiredFields,
	UpdatedBook,
	AuthorWoEmail,
	СreateCustomerFunctionType
}