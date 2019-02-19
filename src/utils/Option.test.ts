import "jest";
import { None, none, Option, option, Some, some } from "./Option";

const getSomeValue = <T>(o: Option<T>): T => {
  expect(o).toBeInstanceOf(Some);
  return (o as any).val as T;
};

const assertOptionValue = <T>(result: Option<T>, val: T): void => {
  expect(result).toBeInstanceOf(Some);
  expect(getSomeValue(result)).toBe(val);
};

const assertNone = <T>(o: Option<T>): void => {
  expect(o).toBeInstanceOf(None);
};

describe("option", () => {
  it("null を受け取った場合 None を返すこと", () => {
    assertNone(option(null));
  });

  it("undefined を受け取った場合 None を返すこと", () => {
    assertNone(option(undefined));
  });

  it("null,undefined 以外を受け取った場合 Some を返すこと", () => {
    assertOptionValue(option(0), 0);
  });
});

describe("some", () => {
  it("Some のインスタンスを返すこと", () => {
    expect(some("hoge")).toBeInstanceOf(Some);
  });

  it("null を受け取った場合 Some(null) を返すこと", () => {
    const result = some(null);
    assertOptionValue(result, null);
  });

  it("undefined を受け取った場合 Some(undefined) を返すこと", () => {
    const result = some(undefined);
    assertOptionValue(result, undefined);
  });
});

describe("none", () => {
  it("None のインスタンスであること", () => {
    expect(none).toBeInstanceOf(None);
  });
});

describe("Some", () => {
  it("isDefined が true を返すこと", () => {
    expect(some(1).isDefined()).toBe(true);
  });

  it("isEmpty が false を返すこと", () => {
    expect(some(1).isEmpty()).toBe(false);
  });

  it("nonEmpty が true を返すこと", () => {
    expect(some(1).nonEmpty()).toBe(true);
  });

  it("flatMap で別の値を持つ Some に変換できること", () => {
    const result = some(1).flatMap(v => Some.from("" + v));
    assertOptionValue(result, "1");
  });

  it("flatMap で None に変換できること", () => {
    const result = some(1).flatMap(() => none);
    assertNone(result);
  });

  it("getOrElse で自身の値を返すこと", () => {
    const result = some(1).getOrElse(100);
    expect(result).toBe(1);
  });

  it("map で別の値を持つ Some に変換できること", () => {
    const result = some(1).map(v => v + 100);
    assertOptionValue(result, 101);
  });

  it("match で some の場合の処理のみが呼ばれること", () => {
    const mockSomeCase = jest.fn();
    const mockNoneCase = jest.fn();

    some(1).match({
      some: mockSomeCase,
      none: mockNoneCase
    });

    expect(mockSomeCase).toBeCalledTimes(1);
    expect(mockNoneCase).toBeCalledTimes(0);
  });

  it("orElse で自身を返すこと", () => {
    const result = some(1).orElse(some(2));
    assertOptionValue(result, 1);
  });

  it("toString で文字列を返すこと", () => {
    expect(`${some(1)}`).toBe("Some(1)");
  });
});

describe("None", () => {
  it("isDefined が false を返すこと", () => {
    expect(none.isDefined()).toBe(false);
  });

  it("isEmpty が true を返すこと", () => {
    expect(none.isEmpty()).toBe(true);
  });

  it("nonEmpty が false を返すこと", () => {
    expect(none.nonEmpty()).toBe(false);
  });

  it("flatMap で自身を返すこと", () => {
    assertNone(none.flatMap(() => some(1)));
  });

  it("getOrElse で引数の値を返すこと", () => {
    expect(none.getOrElse(100)).toBe(100);
  });

  it("map で自身を返すこと", () => {
    assertNone(none.map(v => v + 10));
  });

  it("match で none の場合の処理のみが呼ばれること", () => {
    const mockSomeCase = jest.fn();
    const mockNoneCase = jest.fn();

    none.match({
      some: mockSomeCase,
      none: mockNoneCase
    });

    expect(mockSomeCase).toBeCalledTimes(0);
    expect(mockNoneCase).toBeCalledTimes(1);
  });

  it("orElse で引数で受け取った値を返すこと", () => {
    assertOptionValue(none.orElse(some(100)), 100);
  });

  it("toString で文字列を返すこと", () => {
    expect("" + none).toBe("None");
  });
});
