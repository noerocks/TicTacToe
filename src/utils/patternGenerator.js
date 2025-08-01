export const generatePatterns = () => {
  const horizontalPatterns = [];
  let pattern = [];
  for (let i = 0; i < 9; i++) {
    if (pattern.length < 3) {
      pattern.push(i);
      continue;
    }
    horizontalPatterns.push(pattern);
    pattern = [i];
  }
  horizontalPatterns.push(pattern);
  const verticalPatterns = horizontalPatterns.reduce(
    (cols, row) => {
      cols[0].push(row[0]);
      cols[1].push(row[1]);
      cols[2].push(row[2]);
      return cols;
    },
    [[], [], []]
  );
  const diagonalPatterns = horizontalPatterns.reduce(
    (lines, row, index) => {
      switch (index) {
        case 0: {
          lines[0].push(row.at(-1));
          lines[1].push(row.at(0));
          break;
        }
        case 2: {
          lines[1].push(row.at(-1));
          lines[0].push(row.at(0));
          break;
        }
        default: {
          lines[1].push(row[1]);
          lines[0].push(row[1]);
        }
      }
      return lines;
    },
    [[], []]
  );
  return [...horizontalPatterns, ...verticalPatterns, ...diagonalPatterns];
};
