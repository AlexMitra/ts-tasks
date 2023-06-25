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

export function logParameter(target: any, methodName: string, index: number): void {
	const key = `${methodName}_decor_params_indexes`
	const proto = typeof target === 'function' ? target.prototype : target
	proto[key] ??= []
	proto[key].push(index)
}

export function logMethod(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
	const original = descriptor.value
	descriptor.value = function (...args: unknown[]) {
		const key = `${methodName}_decor_params_indexes`
		const proto = typeof target === 'function' ? target.prototype : target
		const indexes = proto[key] || []
		if (Array.isArray(indexes)) {
			indexes.forEach(index => {
				console.log(`Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${args[index]}`)
			})
		}
		original.apply(this, args)
	}
	return descriptor
}

function makeProperty<T>(
	prototype: any,
	propertyName: string,
	getTransformer?: (value: any) => T,
	setTransformer?: (value: any) => T
) {
	const values = new Map<any, T>();

	Object.defineProperty(prototype, propertyName, {
		set(firstValue: any) {
			Object.defineProperty(this, propertyName, {
				get() {
					if (getTransformer) {
						return getTransformer(values.get(this));
					} else {
						values.get(this);
					}
				},
				set(value: any) {
					if (setTransformer) {
						values.set(this, setTransformer(value));
					} else {
						values.set(this, value);
					}
				},
				enumerable: true
			});
			this[propertyName] = firstValue;
		},
		enumerable: true,
		configurable: true
	});
}

export function format(prefix: string = 'Mr./Mrs.') {
	return function (target: any, propertyName: string) {
		const proto = typeof target === 'function' ? target.prototype : target
		makeProperty(proto, propertyName, value => `${prefix} ${value}`, value => value);
	}
}

export function positiveInteger(target: any, зкўзукенТфьу: string, descriptor: PropertyDescriptor) {
	const originalSet = descriptor.set

	descriptor.set = function (value: number) {
		if(value < 1 || !Number.isInteger(value)) {
			throw new Error('Value must be integer and more than 1')
		}
		originalSet?.call(this, value)
	}
}