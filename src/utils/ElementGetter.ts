export class ElementGetter {
  static get = (selector: string): HTMLElement => {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) throw new Error(`There is${selector} missing`);
    return element;
  };
}
