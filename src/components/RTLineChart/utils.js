export const updateItems = (items, newItem, max) =>
  items.length < max
    ? [...items, [items.length, newItem]]
    : items.reduce(
        (acc, curr, i, arr) =>
          i < max - 1
            ? [...acc.slice(0, i), [curr[0], arr[i + 1][1]], ...acc.slice(i)]
            : [...acc.slice(0, i), [curr[0], newItem]],
        items,
      )
