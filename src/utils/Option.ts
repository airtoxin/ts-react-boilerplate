export type Option<A> = Some<A> | None<A>;

interface IOption<A> {
  isDefined(): this is IOption<A>;
  isEmpty(): this is IOption<A>;
  nonEmpty(): this is IOption<A>;
  map<B>(f: (val: A) => B): IOption<B>;
  flatMap<B>(f: (val: A) => Option<B>): Option<B>;
  forEach(f: (val: A) => void): void;
  getOrElse(fallback: A): A;
  getOrNull(): A | null;
  getOrUndefined(): A | undefined;
  orElse(_oFallback: Option<A>): Option<A>;
  match<B>(matcher: { some: (val: A) => B; none: () => B }): B;
  toString(): string;
}

export class Some<A> implements IOption<A> {
  constructor(private val: A) {}

  static from<A>(val: A): Some<A> {
    return new Some(val);
  }

  isDefined(): this is Some<A> {
    return true;
  }

  isEmpty(): this is None<A> {
    return false;
  }

  nonEmpty(): this is Some<A> {
    return true;
  }

  map<B>(f: (val: A) => B): Option<B> {
    return Some.from(f(this.val));
  }

  flatMap<B>(f: (val: A) => Option<B>): Option<B> {
    return f(this.val);
  }

  forEach(f: (val: A) => void): void {
    f(this.val);
  }

  get(): A {
    return this.val;
  }

  getOrElse(_fallback: A): A {
    return this.val;
  }

  getOrNull(): A | null {
    return this.val;
  }

  getOrUndefined(): A | undefined {
    return this.val;
  }

  orElse(_oFallback: Option<A>): Option<A> {
    return this;
  }

  match<B>(matcher: { some: (val: A) => B; none: () => B }): B {
    return matcher.some(this.val);
  }

  toString(): string {
    return `Some(${this.val})`;
  }
}

export class None<A> implements IOption<A> {
  isDefined(): this is Some<A> {
    return false;
  }

  isEmpty(): this is None<A> {
    return true;
  }

  nonEmpty(): this is Some<A> {
    return false;
  }

  map<B>(_f: (val: A) => B): Option<B> {
    return new None<B>();
  }

  flatMap<B>(_f: (val: A) => Option<B>): Option<B> {
    return new None<B>();
  }

  forEach(_f: (val: A) => void): void {
    // nothing
  }

  getOrElse(fallback: A): A {
    return fallback;
  }

  getOrNull(): null {
    return null;
  }

  getOrUndefined(): undefined {
    return undefined;
  }

  orElse<B>(oFallback: Option<B>): Option<B> {
    return oFallback;
  }

  match<B>(matcher: { some: (val: A) => B; none: () => B }): B {
    return matcher.none();
  }

  toString(): string {
    return "None";
  }
}

export const some = <A>(val: A): Some<A> => Some.from(val);

export const none = new None<any>();

export const option = <A>(maybeVal: A | null | undefined): Option<A> =>
  maybeVal == null ? none : some(maybeVal);
