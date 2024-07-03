export const NIL_VALUES = Object.freeze([null, undefined]);

export const isNil = <T = any>(object: T) => NIL_VALUES.includes(<any>object);

export const isNotNil = <T = any>(object: T) => !isNil(object);

export const isAnyNil = <T = any>(...args: T[]) =>
  args?.length ? args?.some?.((e) => isNil(e)) : true;

export const isAnyNonNil = <T = any>(...args: T[]) =>
  args?.some?.((e) => isNotNil(e)) ?? false;

export const areAllNil = <T = any>(...args: T[]) =>
  args?.every?.((e) => isNil(e)) ?? true;

export const areAllNonNil = <T = any>(...args: T[]) =>
  args?.length ? args?.every?.((e) => isNotNil(e)) : false;

export const coalescing = <T = any>(a: T, b: T) => a ?? b;

export const firstNonNil = <T = any>(...args: T[]) =>
  (args ?? []).find((e) => isNotNil(e));
