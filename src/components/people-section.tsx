import { Plus, Users, X } from "lucide-react";
import React, { useState } from "react";

import { Person } from "../types";

interface PeopleSectionProps {
  people: Person[];
  onAddPerson: (name: string) => void;
  onRemovePerson: (id: string) => void;
}

export function PeopleSection({
  people,
  onAddPerson,
  onRemovePerson,
}: PeopleSectionProps) {
  const [newPersonName, setNewPersonName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPersonName.trim()) {
      onAddPerson(newPersonName.trim());
      setNewPersonName("");
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <Users className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">People</h2>
      </div>

      <form className="mb-6" onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <input
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
            placeholder="Name"
            type="text"
            value={newPersonName}
            onChange={(e) => setNewPersonName(e.target.value)}
          />
          <button
            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
            disabled={!newPersonName.trim()}
            type="submit"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </form>

      {people.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {people.map((person) => (
            <div
              key={person.id}
              className="inline-flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded-lg transition-colors group"
            >
              <span className="font-medium">{person.name}</span>
              <button
                className="w-4 h-4 bg-blue-500 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                onClick={() => onRemovePerson(person.id)}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
