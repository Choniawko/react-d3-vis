import { updateItems } from "./utils"

it("updateItems should add new tuple to items", () => {
  const items = [
    [0, 4],
    [1, 3],
    [2, 7],
    [3, 6],
  ]
  const max = 5
  const newItem = 1
  const expected = [
    [0, 4],
    [1, 3],
    [2, 7],
    [3, 6],
    [4, 1],
  ]
  const result = updateItems(items, newItem, max)
  expect(result).toEqual(expected)
})

it("updateItems should set new item at first position and update rest tuples", () => {
  const items = [
    [0, 4],
    [1, 3],
    [2, 7],
    [3, 6],
  ]
  const max = 4
  const newItem = 1
  const expected = [
    [0, 3],
    [1, 7],
    [2, 6],
    [3, 1],
  ]
  const result = updateItems(items, newItem, max)
  expect(result).toEqual(expected)
})
