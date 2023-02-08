interface Item {
  icon: string; // TODO: url?
  key: string;
  name: string;
}

export const ItemList = (
  key: string | null,
  setKey: Function,
  items: Array<Item>
) => {};

export const ItemSelector = (
  key: string | null,
  setKey: Function,
  items: Array<Item>
) => {};
