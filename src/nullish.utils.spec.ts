import {
  NIL_VALUES,
  areAllNil,
  areAllNonNil,
  coalescing,
  firstNonNil,
  isAnyNil,
  isAnyNonNil,
  isNil,
  isNotNil,
} from "./barrel";

const NONNIL_VALUES = [
  true,
  false,
  {},
  [],
  NaN,
  0,
  1,
  Infinity,
  -Infinity,
  "",
  " ",
];

const FUNCTION_WITH_SINGLE_PARAMETER_DATA = [
  {
    func: isNil,
    expectList: [
      { params: NIL_VALUES, return: true },
      { params: NONNIL_VALUES, return: false },
    ],
  },
  {
    func: isNotNil,
    expectList: [
      { params: NIL_VALUES, return: false },
      { params: NONNIL_VALUES, return: true },
    ],
  },
];

for (let data of FUNCTION_WITH_SINGLE_PARAMETER_DATA) {
  describe(`Test of '${data.func.name}' function`, () => {
    for (let expectItem of data.expectList) {
      for (let param of expectItem.params) {
        it(`with '${param}', must return '${expectItem.return}'`, () =>
          expect(data.func(param)).toEqual(expectItem.return));
      }
    }
  });
}

const REST_PARAM_MATRIX = [
  NIL_VALUES,
  NONNIL_VALUES,
  [...NIL_VALUES, ...NONNIL_VALUES],
  [],
];

const FUNCTION_WITH_REST_PARAMETER_DATA = [
  { func: isAnyNil, return: [true, false, true, true] },
  { func: isAnyNonNil, return: [false, true, true, false] },
  { func: areAllNil, return: [true, false, false, true] },
  { func: areAllNonNil, return: [false, true, false, false] },
];

for (let data of FUNCTION_WITH_REST_PARAMETER_DATA) {
  describe(`Test of '${data.func.name}' function`, () => {
    for (let x = 0; x < REST_PARAM_MATRIX.length; x++) {
      const params = REST_PARAM_MATRIX[x];

      it(`with '${params}', must return '${data.return[x]}'`, () =>
        expect(data.func(...params)).toEqual(data.return[x]));
    }
  });
}

describe(`Test of '${coalescing.name}' function`, () => {
  const paramRange = [...NIL_VALUES, ...NONNIL_VALUES];

  for (let param1 of paramRange) {
    for (let param2 of paramRange) {
      it(`with '${param1}' and '${param2}', must return '${
        param1 ?? param2
      }'`, () => expect(coalescing(param1, param2)).toEqual(param1 ?? param2));
    }
  }
});

describe(`Test of '${firstNonNil.name}' function`, () => {
  const paramsRange = [
    { params: [null, undefined], return: undefined },
    { params: [undefined, null], return: undefined },
    { params: ["", undefined, null], return: "" },
    { params: [undefined, "", null], return: "" },
    { params: [undefined, null, ""], return: "" },
  ];

  for (let item of paramsRange) {
    it(`with '${item.params}', must return '${item.return}'`, () =>
      expect(firstNonNil(...item.params)).toEqual(item.return));
  }
});
