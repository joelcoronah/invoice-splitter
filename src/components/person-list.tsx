import { Chip } from "@heroui/chip";
import { Icon } from "@iconify/react";
import React from "react";

import { Person } from "../types/invoice-types";

interface PersonListProps {
  people: Person[];
  onRemove: (id: string) => void;
}

export const PersonList: React.FC<PersonListProps> = ({ people, onRemove }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {people.map((person) => (
        <Chip
          key={person.id}
          color="primary"
          startContent={<Icon className="text-primary" icon="lucide:user" />}
          variant="flat"
          onClose={() => onRemove(person.id)}
        >
          {person.name}
        </Chip>
      ))}
    </div>
  );
};
