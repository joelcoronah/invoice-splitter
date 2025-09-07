import { useState } from "react";

import useGetRateData from "../hooks/use-get-rate-data";
import { useInvoiceSplitter } from "../hooks/use-invoice-splitter";
import { Person, Product, TaxTipData } from "../types";

import { Header } from "./header";
import { PeopleSection } from "./people-section";
import { ProductsSection } from "./product-section";
import { SummarySection } from "./summary-section";
import { TaxTipSection } from "./tax-tip-section";

export function InvoiceSplitter() {
  const { currency, handleCurrencyChange } = useInvoiceSplitter();

  const [people, setPeople] = useState<Person[]>([]);

  const [products, setProducts] = useState<Product[]>([]);
  const [taxTip, setTaxTip] = useState<TaxTipData>({
    tax: { value: 10, type: "percentage" },
    tip: { value: 0, type: "percentage" },
  });

  const subtotal = products.reduce((sum, product) => sum + product.price, 0);
  const taxAmount =
    taxTip.tax.type === "percentage"
      ? (subtotal * taxTip.tax.value) / 100
      : taxTip.tax.value;
  const tipAmount =
    taxTip.tip.type === "percentage"
      ? (subtotal * taxTip.tip.value) / 100
      : taxTip.tip.value;
  const total = subtotal + taxAmount + tipAmount;

  const handleAddPerson = (name: string) => {
    const newPerson: Person = {
      id: Date.now().toString(),
      name,
    };

    setPeople([...people, newPerson]);
  };

  const handleRemovePerson = (id: string) => {
    setPeople(people.filter((p) => p.id !== id));
    // Remove person from all products
    setProducts(
      products.map((product) => ({
        ...product,
        payers: product.payers.filter((payerId) => payerId !== id),
      })),
    );
  };

  const handleAddProduct = (name: string, price: number) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      price,
      payers: [],
    };

    setProducts([...products, newProduct]);
  };

  const handleRemoveProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleUpdateProductPayers = (productId: string, payerIds: string[]) => {
    setProducts(
      products.map((product) =>
        product.id === productId ? { ...product, payers: payerIds } : product,
      ),
    );
  };

  const handleResetAll = () => {
    setPeople([]);
    setProducts([]);
    setTaxTip({
      tax: { value: 0, type: "percentage" },
      tip: { value: 0, type: "percentage" },
    });
  };

  const { rate, loading, error } = useGetRateData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-8">
        <Header
          currency={currency}
          handleCurrencyChange={handleCurrencyChange}
          rate={rate}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <PeopleSection
              people={people}
              onAddPerson={handleAddPerson}
              onRemovePerson={handleRemovePerson}
            />

            <ProductsSection
              currency={currency}
              people={people}
              products={products}
              onAddProduct={handleAddProduct}
              onRemoveProduct={handleRemoveProduct}
              onUpdateProductPayers={handleUpdateProductPayers}
            />

            <TaxTipSection
              currency={currency}
              taxTip={taxTip}
              onTaxTipChange={setTaxTip}
            />
          </div>

          <div className="lg:sticky lg:top-6 h-fit order-last">
            <SummarySection
              currency={currency}
              people={people}
              products={products}
              subtotal={subtotal}
              taxAmount={taxAmount}
              taxTip={taxTip}
              tipAmount={tipAmount}
              total={total}
              onReset={handleResetAll}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
