const MathHelper = {
  CalcTriangular: (input: number) => (input * (input + 1)) / 2,
  CalcTriangularReverse: (input: number) =>
    Math.ceil((Math.sqrt(8 * input + 1) - 1) / 2),
};

export default MathHelper;
