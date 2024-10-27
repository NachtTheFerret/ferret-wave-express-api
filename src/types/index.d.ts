export type Callback<Params extends unknown[], Return> = (...params: Params) => Return;
export type Awaitable<T> = T | Promise<T>;
