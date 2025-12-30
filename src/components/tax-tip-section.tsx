import { Calculator, DollarSign, Percent } from "lucide-react";

import { TaxTipData } from "../types";

import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";

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
        <div>
          <label
            aria-label="Tax"
            className="block text-sm font-medium text-gray-700 mb-3"
            htmlFor="tax"
          >
            Tax
          </label>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Input
                startContent={
                  <span className="text-gray-500 text-sm">
                    {taxTip.tax.type === "percentage" ? "%" : currency}
                  </span>
                }
                step="0.01"
                type="number"
                value={taxTip.tax.value.toString()}
                onChange={(e) =>
                  handleTaxChange(parseFloat(e.target.value) || 0)
                }
              />
            </div>
            <ButtonGroup
              options={[
                {
                  value: "percentage",
                  icon: <Percent className="w-4 h-4" />,
                },
                {
                  value: "fixed",
                  icon: <DollarSign className="w-4 h-4" />,
                },
              ]}
              value={taxTip.tax.type}
              onValueChange={(value) =>
                handleTaxTypeChange(value as "percentage" | "fixed")
              }
            />
          </div>
        </div>

        <div>
          <label
            aria-label="Tip"
            className="block text-sm font-medium text-gray-700 mb-3"
            htmlFor="tip"
          >
            Tip
          </label>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Input
                startContent={
                  <span className="text-gray-500 text-sm">
                    {taxTip.tip.type === "percentage" ? "%" : currency}
                  </span>
                }
                step="0.01"
                type="number"
                value={taxTip.tip.value.toString()}
                onChange={(e) =>
                  handleTipChange(parseFloat(e.target.value) || 0)
                }
              />
            </div>
            <ButtonGroup
              options={[
                {
                  value: "percentage",
                  icon: <Percent className="w-4 h-4" />,
                },
                {
                  value: "fixed",
                  icon: <DollarSign className="w-4 h-4" />,
                },
              ]}
              value={taxTip.tip.type}
              onValueChange={(value) =>
                handleTipTypeChange(value as "percentage" | "fixed")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
