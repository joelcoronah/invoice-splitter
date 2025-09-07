import { CreditCard, Receipt, RotateCcw, User } from "lucide-react";

import { Person, Product, TaxTipData } from "../types";

interface SummarySectionProps {
  people: Person[];
  products: Product[];
  taxTip: TaxTipData;
  currency: string;
  subtotal: number;
  taxAmount: number;
  tipAmount: number;
  total: number;
  onReset: () => void;
  rate?: {
    dolar: string;
    euro: string;
    fecha: string;
    timestamp: number;
  };
}

export function SummarySection({
  people,
  products,
  subtotal,
  taxAmount,
  tipAmount,
  total,
  currency,
  rate,
  onReset,
}: SummarySectionProps) {
  const formatAmount = (amount: number) => {
    const formatted = `${amount.toFixed(2)} ${currency}`;

    if ((currency === "USD" || currency === "EUR") && rate) {
      const rateValue =
        currency === "USD"
          ? parseFloat(rate.dolar.replace(",", "."))
          : parseFloat(rate.euro.replace(",", "."));
      const vesAmount = amount * rateValue;

      return (
        <span className="flex flex-col items-end">
          <span>{formatted}</span>
          <span className="text-[10px] text-gray-400">
            Bs{vesAmount.toFixed(2)}
          </span>
        </span>
      );
    }

    return formatted;
  };

  // Calculate individual payments
  const individualPayments = people.map((person) => {
    const personProducts = products.filter((product) =>
      product.payers.includes(person.id),
    );

    const personSubtotal = personProducts.reduce((sum, product) => {
      const sharePerPerson = product.price / product.payers.length;

      return sum + sharePerPerson;
    }, 0);

    const personTaxShare = (personSubtotal / subtotal) * taxAmount;
    const personTipShare = (personSubtotal / subtotal) * tipAmount;
    const personTotal = personSubtotal + personTaxShare + personTipShare;

    return {
      ...person,
      subtotal: personSubtotal,
      taxShare: personTaxShare,
      tipShare: personTipShare,
      total: personTotal,
      items: personProducts,
    };
  });

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg sticky top-6 lg:w-[400px] lg:-mr-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
          <Receipt className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Summary</h2>
      </div>

      <p className="text-sm text-gray-600 mb-6">How much each person pays</p>

      {/* Totals */}
      <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-xl">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">{formatAmount(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax:</span>
          <span className="font-medium">{formatAmount(taxAmount)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tip:</span>
          <span className="font-medium">{formatAmount(tipAmount)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-orange-600">{formatAmount(total)}</span>
          </div>
        </div>
      </div>

      {/* Individual Payments */}
      <div className="space-y-4 mb-6">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Individual Payments
        </h3>

        {individualPayments.map((payment) => (
          <div
            key={payment.id}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" />
                <span className="font-semibold text-gray-900">
                  {payment.name}
                </span>
              </div>
              <span className="text-lg font-bold text-blue-600">
                {payment.total ? formatAmount(payment.total) : formatAmount(0)}
              </span>
            </div>

            <div className="space-y-1 text-xs text-gray-600">
              <div>
                Items:{" "}
                {payment.items.map((item) => item.name).join(", ") || "None"}
              </div>
              <div>
                Subtotal:{" "}
                {payment.subtotal
                  ? formatAmount(payment.subtotal)
                  : formatAmount(0)}
              </div>
              <div>
                Tax share:{" "}
                {payment.taxShare
                  ? formatAmount(payment.taxShare)
                  : formatAmount(0)}
              </div>
              {payment.tipShare > 0 && (
                <div>
                  Tip share:{" "}
                  {payment.tipShare
                    ? formatAmount(payment.tipShare)
                    : formatAmount(0)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        onClick={onReset}
      >
        <RotateCcw className="w-4 h-4" />
        Reset All
      </button>
    </div>
  );
}
