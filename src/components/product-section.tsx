import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Plus, ShoppingCart, Trash2 } from "lucide-react";
import React, { useState } from "react";

import { Person, Product } from "../types";

interface ProductsSectionProps {
  products: Product[];
  people: Person[];
  currency: string;
  onAddProduct: (name: string, price: number) => void;
  onRemoveProduct: (id: string) => void;
  onUpdateProductPayers: (productId: string, payerIds: string[]) => void;
}

export function ProductsSection({
  products,
  people,
  currency,
  onAddProduct,
  onRemoveProduct,
  onUpdateProductPayers,
}: ProductsSectionProps) {
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProductName.trim() && newProductPrice) {
      onAddProduct(newProductName.trim(), parseFloat(newProductPrice));
      setNewProductName("");
      setNewProductPrice("");
    }
  };

  const handlePayerToggle = (productId: string, payerId: string) => {
    const product = products.find((p) => p.id === productId);

    if (!product) return;

    const newPayers = product.payers.includes(payerId)
      ? product.payers.filter((id) => id !== payerId)
      : [...product.payers, payerId];

    onUpdateProductPayers(productId, newPayers);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
          <ShoppingCart className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Products</h2>
      </div>

      <form className="mb-6" onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <Input
            placeholder="Item name"
            type="text"
            value={newProductName}
            variant="bordered"
            onChange={(e) => setNewProductName(e.target.value)}
          />
          <div className="relative">
            <Input
              placeholder="Price"
              step="0.01"
              type="number"
              value={newProductPrice}
              variant="bordered"
              onChange={(e) => setNewProductPrice(e.target.value)}
            />
          </div>
          <Button
            className=" bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
            disabled={!newProductName.trim() || !newProductPrice}
            type="submit"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-900">
                  {product.name}
                </span>
                <span className="text-lg font-bold text-emerald-600">
                  {product.price.toFixed(2)} {currency}
                </span>
              </div>
              <button
                className="w-8 h-8 bg-red-100 hover:bg-red-500 text-red-600 hover:text-white rounded-lg transition-all duration-200 flex items-center justify-center group"
                onClick={() => onRemoveProduct(product.id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                {"Who's paying?"}
              </p>
              <div className="flex flex-wrap gap-2">
                {people.map((person) => (
                  <label
                    key={person.id}
                    aria-label={`Select ${person.name} as payer`}
                    className="inline-flex items-center cursor-pointer"
                  >
                    <input
                      checked={product.payers.includes(person.id)}
                      className="sr-only"
                      type="checkbox"
                      onChange={() => handlePayerToggle(product.id, person.id)}
                    />
                    <div
                      className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                        product.payers.includes(person.id)
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-sm font-medium">{person.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
