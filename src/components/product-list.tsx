import { Card, CardBody } from '@heroui/card';
import { Checkbox } from '@heroui/checkbox';
import { Chip } from '@heroui/chip';
import React from 'react';

import { Person, Product } from '../types/invoice-types';

interface ProductListProps {
  products: Product[];
  people: Person[];
  currency: string;
  currencySymbol: string;
  onRemove: (id: string) => void;
  onSelectionChange: (
    productId: string,
    personId: string,
    isSelected: boolean
  ) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  people,
  currency,
  currencySymbol,
  onRemove,
  onSelectionChange,
}) => {
  return (
    <div className='space-y-2'>
      {products.map((product) => (
        <Card
          key={product.id}
          className='border border-default-200'
          shadow='sm'
        >
          <CardBody className='p-3'>
            <div className='flex justify-between items-start mb-2'>
              <div className='flex-1'>
                <p className='font-medium'>{product.name}</p>
                <p className='text-default-500 text-small'>
                  {currencySymbol}
                  {parseFloat(product.price).toFixed(2)} {currency}
                </p>
              </div>
              <Chip
                color='danger'
                size='sm'
                variant='flat'
                onClose={() => onRemove(product.id)}
              >
                Remove
              </Chip>
            </div>

            {people.length > 0 && (
              <div className='mt-2'>
                <p className='text-small text-default-500 mb-1'>
                  Who&apos;s paying?
                </p>
                <div className='flex flex-wrap gap-2'>
                  {people.map((person) => (
                    <Checkbox
                      key={`${product.id}-${person.id}`}
                      isSelected={product.selectedBy.includes(person.id)}
                      size='sm'
                      onValueChange={(isSelected) =>
                        onSelectionChange(product.id, person.id, isSelected)
                      }
                    >
                      {person.name}
                    </Checkbox>
                  ))}
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
