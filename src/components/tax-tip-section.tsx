import { Calculator, DollarSign, Percent } from "lucide-react";

import { TaxTipData } from "../types";

interface TaxTipSectionProps {
  taxTip: TaxTipData;
  onTaxTipChange: (taxTip: TaxTipData) => void;
  currency: string;
}

export function TaxTipSection({
  taxTip,
  onTaxTipChange,
  currency,
}: TaxTipSectionProps) {
  const handleTaxChange = (value: number) => {
    onTaxTipChange({
      ...taxTip,
      tax: { ...taxTip.tax, value },
    });
  };

  const handleTaxTypeChange = (type: "percentage" | "fixed") => {
    onTaxTipChange({
      ...taxTip,
      tax: { ...taxTip.tax, type },
    });
  };

  const handleTipChange = (value: number) => {
    onTaxTipChange({
      ...taxTip,
      tip: { ...taxTip.tip, value },
    });
  };

  const handleTipTypeChange = (type: "percentage" | "fixed") => {
    onTaxTipChange({
      ...taxTip,
      tip: { ...taxTip.tip, type },
    });
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
          <Calculator className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Tax & Tip</h2>
      </div>

      <div className="space-y-6">
        {/* Tax */}
        <div>
          <label
            aria-label="Tax"
            className="block text-sm font-medium text-gray-700 mb-3"
            htmlFor="tax"
          >
            Tax
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                {taxTip.tax.type === "percentage" ? "%" : currency}
              </span>
              <input
                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                step="0.01"
                type="number"
                value={taxTip.tax.value}
                onChange={(e) =>
                  handleTaxChange(parseFloat(e.target.value) || 0)
                }
              />
            </div>
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  taxTip.tax.type === "percentage"
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-gray-600 hover:text-purple-600"
                }`}
                type="button"
                onClick={() => handleTaxTypeChange("percentage")}
              >
                <Percent className="w-4 h-4" />
              </button>
              <button
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  taxTip.tax.type === "fixed"
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-gray-600 hover:text-purple-600"
                }`}
                type="button"
                onClick={() => handleTaxTypeChange("fixed")}
              >
                <DollarSign className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tip */}
        <div>
          <label
            aria-label="Tip"
            className="block text-sm font-medium text-gray-700 mb-3"
            htmlFor="tip"
          >
            Tip
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                {taxTip.tip.type === "percentage" ? "%" : currency}
              </span>
              <input
                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                step="0.01"
                type="number"
                value={taxTip.tip.value}
                onChange={(e) =>
                  handleTipChange(parseFloat(e.target.value) || 0)
                }
              />
            </div>
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  taxTip.tip.type === "percentage"
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-gray-600 hover:text-purple-600"
                }`}
                type="button"
                onClick={() => handleTipTypeChange("percentage")}
              >
                <Percent className="w-4 h-4" />
              </button>
              <button
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  taxTip.tip.type === "fixed"
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-gray-600 hover:text-purple-600"
                }`}
                type="button"
                onClick={() => handleTipTypeChange("fixed")}
              >
                <DollarSign className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
