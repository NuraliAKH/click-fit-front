export class RequestBase {
  [key: string]: any;

  constructor() {
    this.autoBind();
  }

  autoBind() {
    const properties = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    properties.forEach(prop => {
      if (typeof this[prop] === "function") {
        this[prop] = this[prop].bind(this);
      }
    });
  }
}
