export function freeze(param: string) {
	return function (constructor: Function) {
		console.log(`Freezing the constructor ${param}`)
		Object.freeze(constructor)
		Object.freeze(constructor.prototype)
	}
}

export function logger<TFunction extends Function>(constructor: Function): TFunction {
	const newConstructor: Function = function () {
		console.log(`Creating new instance`)
		console.log(constructor.name)
		this.age = 30
	}
	Object.setPrototypeOf(newConstructor.prototype, constructor.prototype)
	// newConstructor.prototype = Object.create(constructor.prototype)
	newConstructor.prototype.printLibrarian = function (): void {
		console.log(`Librarian name: ${this.name}, Librarian age: ${this.age}`)
	}
	return newConstructor as TFunction
}

export function writable(isWritable: boolean) {
	return function (target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
		console.log(`target -${target}, method name - ${methodName}`, descriptor)
		descriptor.writable = isWritable
		return descriptor
	}
}

export function timeout(ms: number) {
	return function (target: any, methodName: string, descriptor: PropertyDescriptor): void {
		const original = descriptor.value
		descriptor.value = function (...args: unknown[]) {
			if (confirm('Call method ?')) {
				setTimeout(() => {
					original.apply(this, args)
				}, ms);
			}
		}
	}
}