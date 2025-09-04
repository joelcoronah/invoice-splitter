import { Select, SelectItem } from "@heroui/select";
import { Receipt } from "lucide-react";

import { currencies } from "../data/currencies";

interface HeaderProps {
  currency: string;
  handleCurrencyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  rate: any;
}

export function Header({ currency, handleCurrencyChange, rate }: HeaderProps) {
  const mappedCurrencies = currencies.map((curr) => ({
    key: curr.code,
    label: `${curr.symbol} ${curr.code}`,
  }));

  return (
    <div className="text-center space-y-4">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-4">
        <Receipt className="w-8 h-8 text-white" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">Invoice Splitter</h1>
          {/* <div className="relative">
            <select
              className="appearance-none bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:bg-blue-100"
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value)}
            >
              {currencies.map((curr) => (
                <option key={curr} value={curr}>
                  Bs {curr}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600 pointer-events-none" />
          </div> */}
          <Select
            aria-label="Select currency"
            className="w-24"
            color="primary"
            selectedKeys={[currency]}
            variant="flat"
            onChange={handleCurrencyChange}
          >
            {mappedCurrencies.map((curr) => (
              <SelectItem key={curr.key}>{curr.label}</SelectItem>
            ))}
          </Select>
        </div>
        <p className="text-gray-600">Split bills easily among friends</p>
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        {currency === "USD" && (
          <p className="text-sm text-black-500 font-bold">
            1 {currency} = {rate.dolar} VES
          </p>
        )}
        {currency === "EUR" && (
          <p className="text-sm text-black-500 font-bold">
            1 {currency} = {rate.euro} VES
          </p>
        )}
      </div>
    </div>
  );
}
