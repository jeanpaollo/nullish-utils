export const NIL_VALUES = Object.freeze([null, undefined]);

export type Nillable<T> = T | null | undefined;

export const isNull = <T = any>(object?: Nillable<T>): object is null =>
  object === NIL_VALUES[0];

export const isUndefined = <T = any>(
  object?: Nillable<T>
): object is undefined => object === NIL_VALUES[1];

export const isNil = <T = any>(
  object?: Nillable<T>
): object is undefined | null => NIL_VALUES.includes(<any>object);

export const isNotNil = <T = any>(object?: Nillable<T>): object is T =>
  !isNil(object);

export const isAnyNil = (...args: any[]) =>
  args?.length ? args?.some?.((e) => isNil(e)) : true;

export const isAnyNonNil = (...args: any[]) =>
  args?.some?.((e) => isNotNil(e)) ?? false;

export const areAllNil = (...args: any[]) =>
  args?.every?.((e) => isNil(e)) ?? true;

export const areAllNonNil = (...args: any[]) =>
  args?.length ? args?.every?.((e) => isNotNil(e)) : false;

export const coalescing = (...args: any[]) =>
  (args ?? []).find((e) => isNotNil(e)) ??
  (args.length ? args[args.length - 1] : NIL_VALUES[0]);

export const firstNonNil = (...args: any[]) =>
  (args ?? []).find((e) => isNotNil(e));
