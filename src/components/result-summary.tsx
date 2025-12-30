import React from "react";

import { Person, Product } from "../types/invoice-types";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ResultSummaryProps {
  people: Person[];
  products: Product[];
  currency: string;
  currencySymbol: string;
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  rate?: {
    dolar: string;
    euro: string;
    fecha: string;
    timestamp: number;
  };
  getPersonTotal: (personId: string) => number;
}

export const ResultSummary: React.FC<ResultSummaryProps> = ({
  people,
  products,
  currency,
  currencySymbol,
  subtotal,
  tax,
  tip,
  total,
  rate,
  getPersonTotal,
}) => {
  const formatCurrency = (amount: number) => {
    const formatted = `${currencySymbol}${amount.toFixed(2)}`;

    if ((currency === "USD" || currency === "EUR") && rate) {
      const rateValue =
        currency === "USD"
          ? parseFloat(rate.dolar.replace(",", "."))
          : parseFloat(rate.euro.replace(",", "."));
      const vesAmount = amount * rateValue;

      return (
        <span className="flex flex-col items-end">
          {formatted}
          <span className="text-xs text-muted-foreground">
            Bs{vesAmount.toFixed(2)}
          </span>
        </span>
      );
    }

    return formatted;
  };

  return (
    <Card>
      <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
        <h2 className="text-lg font-medium">Summary</h2>
        <p className="text-sm text-muted-foreground">How much each person pays</p>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {/* Invoice Summary */}
          <div>
            <div className="flex justify-between text-sm py-1">
              <span>Subtotal:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span>Tax:</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span>Tip:</span>
              <span>{formatCurrency(tip)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium py-1">
              <span>Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <Separator />

          {/* Per Person Breakdown */}
          <div className="space-y-2">
            <h3 className="text-base font-medium">Individual Payments</h3>
            {people.map((person) => {
              const personTotal = getPersonTotal(person.id);
              const personProducts = products.filter((p) =>
                p.selectedBy.includes(person.id),
              );

              return (
                <div
                  key={person.id}
                  className="border border-border rounded-md p-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{person.name}</span>
                    <span className="font-medium text-primary">
                      {formatCurrency(personTotal)}
                    </span>
                  </div>

                  {personProducts.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground mb-1">Items:</p>
                      <div className="text-sm space-y-1">
                        {personProducts.map((product) => {
                          const sharedWith = product.selectedBy.length;
                          const itemCost =
                            parseFloat(product.price) / sharedWith;

                          return (
                            <div
                              key={product.id}
                              className="flex justify-between"
                            >
                              <span className="text-foreground">
                                {product.name}
                                {sharedWith > 1 && ` (÷${sharedWith})`}
                              </span>
                              <span>{formatCurrency(itemCost)}</span>
                            </div>
                          );
                        })}

                        {/* Tax and tip allocation */}
                        {(tax > 0 || tip > 0) && (
                          <>
                            <Separator className="my-1" />
                            {tax > 0 && (
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Tax share:</span>
                                <span>
                                  {formatCurrency(
                                    (tax *
                                      (getPersonTotal(person.id) -
                                        (tax + tip) *
                                          (getPersonTotal(person.id) /
                                            total))) /
                                      subtotal,
                                  )}
                                </span>
                              </div>
                            )}
                            {tip > 0 && (
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Tip share:</span>
                                <span>
                                  {formatCurrency(
                                    (tip *
                                      (getPersonTotal(person.id) -
                                        (tax + tip) *
                                          (getPersonTotal(person.id) /
                                            total))) /
                                      subtotal,
                                  )}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
