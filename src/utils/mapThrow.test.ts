import "jest";
import { mapThrow } from "./mapThrow";

describe("mapThrow", () => {
  it("引数の関数の戻り値をPromiseに包んで返すこと", async () => {
    const mapError = jest.fn();
    await expect(mapThrow(() => 1, mapError)).resolves.toBe(1);
    expect(mapError).not.toBeCalled();
  });

  it("引数の関数がPromiseを返した場合、その値を返すこと", async () => {
    const mapError = jest.fn();
    await expect(mapThrow(() => Promise.resolve(1), mapError)).resolves.toBe(1);
    expect(mapError).not.toBeCalled();
  });

  it("引数の関数がエラーを返した場合、mapErrorの引数でエラーを取得できること", async () => {
    const fn = () => {
      throw new Error("test message");
    };
    const mapError = jest.fn((error: Error) =>
      expect(error.message).toBe("test message")
    );
    await expect(mapThrow(fn, mapError)).rejects.toBeUndefined();
    expect(mapError).toBeCalled();
  });

  it("引数の関数がエラーを返した場合、mapErrorの戻り値をPromiseに包んで返すこと", async () => {
    const fn = () => {
      throw new Error();
    };
    const mapError = () => 100;
    await expect(mapThrow(fn, mapError)).rejects.toBe(100);
  });
});
