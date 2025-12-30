import { Icon } from "@iconify/react";
import { X } from "lucide-react";
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
        <div
          key={person.id}
          className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
        >
          <Icon className="text-blue-600" icon="lucide:user" />
          <span>{person.name}</span>
          <button
            className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
            onClick={() => onRemove(person.id)}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
};
