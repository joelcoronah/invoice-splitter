import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Person {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  payers: string[]; // Person IDs
}

export interface TaxTipItem {
  value: number;
  type: "percentage" | "fixed";
}

export interface TaxTipData {
  tax: TaxTipItem;
  tip: TaxTipItem;
}
