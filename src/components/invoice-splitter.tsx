import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Checkbox } from "@heroui/checkbox";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Icon } from "@iconify/react";
import React from "react";

import { currencies } from "../data/currencies";
import useGetRateData from "../hooks/use-get-rate-data";
import { useInvoiceSplitter } from "../hooks/use-invoice-splitter";

import { PersonList } from "./person-list";
import { ProductList } from "./product-list";
import { ResultSummary } from "./result-summary";

export const InvoiceSplitter: React.FC = () => {
  const {
    people,
    products,
    currency,
    taxRate,
    tipAmount,
    tipType,
    isTaxPercentage,
    personName,
    productName,
    productPrice,
    handleAddPerson,
    handleRemovePerson,
    handleAddProduct,
    handleRemoveProduct,
    handleProductSelection,
    handleCurrencyChange,
    handleTaxRateChange,
    handleTipAmountChange,
    handleTipTypeChange,
    handleTaxTypeChange,
    handlePersonNameChange,
    handleProductNameChange,
    handleProductPriceChange,
    calculateTotal,
    calculateSubtotal,
    calculateTax,
    calculateTip,
    getPersonTotal,
    resetAll,
  } = useInvoiceSplitter();

  const { rate, loading, error } = useGetRateData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="mb-4">
        <CardHeader className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Invoice Splitter</h1>
            <Select
              aria-label="Select currency"
              className="w-24"
              selectedKeys={[currency]}
              size="sm"
              onChange={handleCurrencyChange}
            >
              {currencies.map((curr) => (
                <SelectItem
                  key={curr.code} // value={curr.code}
                >
                  {curr.symbol} {curr.code}
                </SelectItem>
              ))}
            </Select>
          </div>
          <p className="text-small text-default-500">
            Split bills easily among friends
          </p>
          <p className="text-small text-default-500 ">{rate.datetime.date}</p>
          <p className="text-small text-default-500 ">
            $1 USD = {rate.monitors.usd.price} Bs.
          </p>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="space-y-6">
            {/* People Section */}
            <div className="space-y-3">
              <h2 className="text-medium font-medium">People</h2>
              <div className="flex gap-2">
                <Input
                  className="flex-1"
                  placeholder="Name"
                  startContent={
                    <Icon className="text-default-400" icon="lucide:user" />
                  }
                  value={personName}
                  onValueChange={handlePersonNameChange}
                />
                <Button
                  isIconOnly
                  color="primary"
                  isDisabled={!personName.trim()}
                  onPress={handleAddPerson}
                >
                  <Icon icon="lucide:plus" />
                </Button>
              </div>

              {people.length > 0 && (
                <PersonList people={people} onRemove={handleRemovePerson} />
              )}
            </div>

            {/* Products Section */}
            <div className="space-y-3">
              <h2 className="text-medium font-medium">Products</h2>
              <div className="flex gap-2">
                <Input
                  className="flex-1"
                  placeholder="Item name"
                  startContent={
                    <Icon
                      className="text-default-400"
                      icon="lucide:shopping-bag"
                    />
                  }
                  value={productName}
                  onValueChange={handleProductNameChange}
                />
                <Input
                  className="w-24"
                  placeholder="Price"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">
                        {currencies.find((c) => c.code === currency)?.symbol}
                      </span>
                    </div>
                  }
                  type="number"
                  value={productPrice}
                  onValueChange={handleProductPriceChange}
                />
                <Button
                  isIconOnly
                  color="primary"
                  isDisabled={!productName.trim() || !productPrice.trim()}
                  onPress={handleAddProduct}
                >
                  <Icon icon="lucide:plus" />
                </Button>
              </div>

              {products.length > 0 && (
                <ProductList
                  currency={currency}
                  currencySymbol={
                    currencies.find((c) => c.code === currency)?.symbol || "$"
                  }
                  people={people}
                  products={products}
                  onRemove={handleRemoveProduct}
                  onSelectionChange={handleProductSelection}
                />
              )}
            </div>

            {/* Tax & Tip Section */}
            <div className="space-y-3">
              <h2 className="text-medium font-medium">Tax & Tip</h2>
              <div className="flex gap-2 items-center">
                <Input
                  className="flex-1"
                  label="Tax"
                  placeholder={isTaxPercentage ? "%" : "Amount"}
                  startContent={
                    isTaxPercentage ? (
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">%</span>
                      </div>
                    ) : (
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">
                          {currencies.find((c) => c.code === currency)?.symbol}
                        </span>
                      </div>
                    )
                  }
                  type="number"
                  value={taxRate}
                  onValueChange={handleTaxRateChange}
                />
                <Checkbox
                  isSelected={isTaxPercentage}
                  size="sm"
                  onValueChange={handleTaxTypeChange}
                >
                  As %
                </Checkbox>
              </div>

              <div className="flex gap-2 items-end">
                <Input
                  className="flex-1"
                  label="Tip"
                  placeholder={tipType === "percentage" ? "%" : "Amount"}
                  startContent={
                    tipType === "percentage" ? (
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">%</span>
                      </div>
                    ) : (
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">
                          {currencies.find((c) => c.code === currency)?.symbol}
                        </span>
                      </div>
                    )
                  }
                  type="number"
                  value={tipAmount}
                  onValueChange={handleTipAmountChange}
                />
                <Select
                  aria-label="Tip type"
                  className="w-32"
                  selectedKeys={[tipType]}
                  size="sm"
                  onChange={handleTipTypeChange}
                >
                  <SelectItem key="percentage">Percentage</SelectItem>
                  <SelectItem key="fixed">Fixed</SelectItem>
                </Select>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Results Section */}
      {people.length > 0 && products.length > 0 && (
        <ResultSummary
          currency={currency}
          currencySymbol={
            currencies.find((c) => c.code === currency)?.symbol || "$"
          }
          getPersonTotal={getPersonTotal}
          people={people}
          products={products}
          subtotal={calculateSubtotal()}
          tax={calculateTax()}
          tip={calculateTip()}
          total={calculateTotal()}
        />
      )}

      {/* Reset Button */}
      {(people.length > 0 || products.length > 0) && (
        <div className="mt-4 flex justify-center">
          <Button
            color="danger"
            startContent={<Icon icon="lucide:refresh-cw" />}
            variant="flat"
            onPress={resetAll}
          >
            Reset All
          </Button>
        </div>
      )}
    </div>
  );
};
