
export const mapRange = (x, in_min, in_max, out_min, out_max) => {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export const mapRatioToRange = (x, out_min, out_max) => {
  const in_min = 0;
  const in_max = 1;
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

