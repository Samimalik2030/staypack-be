import { SchemaFactory } from '@nestjs/mongoose';
import { Type } from '@nestjs/common';

export class MongoFactory {
  /**
   * Creates a Mongoose schema for a given class.
   * This method dynamically adds getters and methods from the class to the schema.
   *
   * @param c The class for which to create the schema.
   * @returns The created schema.
   */
  static createSchema<T>(c: Type<T>) {
    // Create a basic schema for the class using the SchemaFactory.
    const schema = SchemaFactory.createForClass(c);

    // Find all getters in the class prototype.
    const getters = Object.getOwnPropertyNames(c.prototype).filter((prop) => {
      const descriptor = Object.getOwnPropertyDescriptor(c.prototype, prop);
      return descriptor && descriptor.get; 
    });


    getters.forEach((getter) => {
        const descriptor = Object.getOwnPropertyDescriptor(c.prototype, getter);
        if (!descriptor || typeof descriptor.get !== 'function') {
          console.warn(`Getter ${getter} not found on prototype`);
          return;
        }
      
        const originalGetter = descriptor.get;
        schema.virtual(getter).get(function () {
          return originalGetter.call(this);
        });
      });
      
    // Find all methods in the class prototype that are not static or special (like constructor).
    const methods = Object.getOwnPropertyNames(c.prototype).filter((prop) => {
      const descriptor = Object.getOwnPropertyDescriptor(c.prototype, prop);
      return (
        descriptor &&
        typeof descriptor.value === 'function' &&
        prop !== 'constructor' &&
        prop !== 'createForClass' &&
        !c[prop] // Ensure it's not a static method.
      );
    });

    // Add each method as an instance method to the schema.
    methods.forEach((method) => {
      schema.method(method, function (...args: unknown[]) {
        return c.prototype[method].apply(this, args); // Call the original method on the schema instance.
      });
    });

    // Find all static methods in the class.
    Object.getOwnPropertyNames(c).forEach((staticMethod) => {
      if (
        typeof c[staticMethod] === 'function' &&
        staticMethod !== 'createForClass' // Exclude the static method we're currently in.
      ) {
        // Add the static method to the schema's statics.
        schema.statics[staticMethod] = c[staticMethod];
      }
    });

    return schema; // Return the fully configured schema.
  }
}
