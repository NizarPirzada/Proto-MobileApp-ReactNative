export default {
  getPosition(value:number, min:number, max:number) {
    return ((value - min) / (max - min)) * 100;
  },
  getValue(pos:number, min:number, max:number) {
    const decimal = pos / 100;
    return pos === 0
      ? min
      : pos === 100
      ? max
      : Math.round((max - min) * decimal + min);
  },
};
