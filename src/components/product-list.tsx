import { X } from "lucide-react";
import React from "react";

import { Person, Product } from "../types/invoice-types";

import { Card, CardBody } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductListProps {
  products: Product[];
  people: Person[];
  currency: string;
  currencySymbol: string;
  onRemove: (id: string) => void;
  onSelectionChange: (
    productId: string,
    personId: string,
    isSelected: boolean,
  ) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  people,
  currency,
  currencySymbol,
  onRemove,
  onSelectionChange,
}) => {
  return (
    <div className="space-y-2">
      {products.map((product) => (
        <Card key={product.id} className="border border-border">
          <CardBody className="p-3">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <p className="font-medium">{product.name}</p>
                <p className="text-muted-foreground text-sm">
                  {currencySymbol}
                  {parseFloat(product.price).toFixed(2)} {currency}
                </p>
              </div>
              <button
                className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium hover:bg-red-200 transition-colors"
                onClick={() => onRemove(product.id)}
              >
                <X className="w-3 h-3" />
                Remove
              </button>
            </div>

            {people.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground mb-1">
                  Who&apos;s paying?
                </p>
                <div className="flex flex-wrap gap-2">
                  {people.map((person) => (
                    <label
                      key={`${product.id}-${person.id}`}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={product.selectedBy.includes(person.id)}
                        onChange={(e) =>
                          onSelectionChange(
                            product.id,
                            person.id,
                            e.target.checked,
                          )
                        }
                      />
                      <span className="text-sm">{person.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
