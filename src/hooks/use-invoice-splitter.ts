import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Person, Product } from '../types/invoice-types';

export const useInvoiceSplitter = () => {
  const [people, setPeople] = React.useState<Person[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [currency, setCurrency] = React.useState<string>('USD');
  const [taxRate, setTaxRate] = React.useState<string>('');
  const [tipAmount, setTipAmount] = React.useState<string>('');
  const [tipType, setTipType] = React.useState<'percentage' | 'fixed'>(
    'percentage'
  );
  const [isTaxPercentage, setIsTaxPercentage] = React.useState<boolean>(true);

  // Form state
  const [personName, setPersonName] = React.useState<string>('');
  const [productName, setProductName] = React.useState<string>('');
  const [productPrice, setProductPrice] = React.useState<string>('');

  // Add a person
  const handleAddPerson = () => {
    if (personName.trim()) {
      setPeople([...people, { id: uuidv4(), name: personName.trim() }]);
      setPersonName('');
    }
  };

  // Remove a person
  const handleRemovePerson = (id: string) => {
    setPeople(people.filter((person) => person.id !== id));

    // Remove this person from product selections
    setProducts(
      products.map((product) => ({
        ...product,
        selectedBy: product.selectedBy.filter((personId) => personId !== id),
      }))
    );
  };

  // Add a product
  const handleAddProduct = () => {
    if (productName.trim() && productPrice.trim()) {
      setProducts([
        ...products,
        {
          id: uuidv4(),
          name: productName.trim(),
          price: productPrice.trim(),
          selectedBy: [],
        },
      ]);
      setProductName('');
      setProductPrice('');
    }
  };

  // Remove a product
  const handleRemoveProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Handle product selection by a person
  const handleProductSelection = (
    productId: string,
    personId: string,
    isSelected: boolean
  ) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            selectedBy: isSelected
              ? [...product.selectedBy, personId]
              : product.selectedBy.filter((id) => id !== personId),
          };
        }

        return product;
      })
    );
  };

  // Handle currency change
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };

  // Handle tax rate change
  const handleTaxRateChange = (value: string) => {
    setTaxRate(value);
  };

  // Handle tip amount change
  const handleTipAmountChange = (value: string) => {
    setTipAmount(value);
  };

  // Handle tip type change
  const handleTipTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTipType(e.target.value as 'percentage' | 'fixed');
  };

  // Handle tax type change
  const handleTaxTypeChange = (isPercentage: boolean) => {
    setIsTaxPercentage(isPercentage);
  };

  // Handle person name change
  const handlePersonNameChange = (value: string) => {
    setPersonName(value);
  };

  // Handle product name change
  const handleProductNameChange = (value: string) => {
    setProductName(value);
  };

  // Handle product price change
  const handleProductPriceChange = (value: string) => {
    setProductPrice(value);
  };

  // Calculate subtotal
  const calculateSubtotal = (): number => {
    return products.reduce(
      (sum, product) => sum + parseFloat(product.price || '0'),
      0
    );
  };

  // Calculate tax
  const calculateTax = (): number => {
    const subtotal = calculateSubtotal();

    if (!taxRate) return 0;

    if (isTaxPercentage) {
      return subtotal * (parseFloat(taxRate) / 100);
    } else {
      return parseFloat(taxRate);
    }
  };

  // Calculate tip
  const calculateTip = (): number => {
    const subtotal = calculateSubtotal();

    if (!tipAmount) return 0;

    if (tipType === 'percentage') {
      return subtotal * (parseFloat(tipAmount) / 100);
    } else {
      return parseFloat(tipAmount);
    }
  };

  // Calculate total
  const calculateTotal = (): number => {
    return calculateSubtotal() + calculateTax() + calculateTip();
  };

  // Calculate how much each person pays
  const getPersonTotal = (personId: string): number => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax();
    const tip = calculateTip();

    // Calculate base amount for this person
    let personBaseAmount = 0;

    products.forEach((product) => {
      if (product.selectedBy.includes(personId)) {
        const pricePerPerson =
          parseFloat(product.price) / product.selectedBy.length;

        personBaseAmount += pricePerPerson;
      }
    });

    // Calculate proportion of tax and tip
    let personTaxAndTip = 0;

    if (subtotal > 0) {
      const personProportion = personBaseAmount / subtotal;

      personTaxAndTip = (tax + tip) * personProportion;
    }

    return personBaseAmount + personTaxAndTip;
  };

  // Reset all data
  const resetAll = () => {
    setPeople([]);
    setProducts([]);
    setTaxRate('');
    setTipAmount('');
    setTipType('percentage');
    setIsTaxPercentage(true);
    setPersonName('');
    setProductName('');
    setProductPrice('');
  };

  return {
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
  };
};
