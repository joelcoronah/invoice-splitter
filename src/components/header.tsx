import { currencies } from "../data/currencies";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeaderProps {
  currency: string;
  handleCurrencyChange: (value: string) => void;
  rate: any;
}

export function Header({ currency, handleCurrencyChange, rate }: HeaderProps) {
  const mappedCurrencies = currencies.map((curr) => ({
    key: curr.code,
    label: `${curr.symbol} ${curr.code}`,
  }));

  return (
    <div className="text-center space-y-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg mb-4">
        <img
          alt="Invoice Splitter Logo"
          className="w-16 h-16 object-contain"
          src="/logo.png"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Divvy up bills with anyone
          </h1>
          <div className="w-24">
            <Select value={currency} onValueChange={handleCurrencyChange}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {mappedCurrencies.map((curr) => (
                  <SelectItem key={curr.key} value={curr.key}>
                    {curr.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
