export const formatLine = (odd) => {
  if (!odd) {
    return "NL";
  }
  const oddN = Number(odd);
  if (oddN === 100) {
    return "EVEN";
  } else if (oddN > 0) {
    return `+${oddN.toFixed(1)}`;
  } else {
    return oddN.toFixed(1);
  }
};

export const formatCost = (odd) => {
  if (!odd) {
    return "NL";
  }
  const oddN = Number(odd);
  if (oddN === 100) {
    return "EVEN";
  } else if (oddN > 0) {
    return `+${oddN}`;
  } else {
    return oddN;
  }
};