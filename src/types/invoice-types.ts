export interface Person {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  selectedBy: string[]; // Array of person IDs who are paying for this product
}
