"use client";

import { Label, TextInput } from "flowbite-react";
import { Dispatch, SetStateAction } from "react";

import { BiDuplicate, BiXCircle } from "react-icons/bi";

interface IProps {
  index: number;
  proportionalPeople: any[];
  setProportionalPeople: Dispatch<SetStateAction<any[]>>;
}

export default function PersonsForm({
  index,
  proportionalPeople,
  setProportionalPeople,
}: IProps) {
  const handleRemoveInput = (index: number) => {
    const newInputs = [...proportionalPeople];
    newInputs.splice(index, 1);
    setProportionalPeople(newInputs);
  };

  const handleDuplicateInput = (index: number) => {
    setProportionalPeople([
      ...proportionalPeople,
      {
        name: `${proportionalPeople[index].name} copia`,
        first: proportionalPeople[index].first,
        last: proportionalPeople[index].last,
      },
    ]);
  };

  const handleNameChange = (index: number, event: any) => {
    const newInputs = [...proportionalPeople];
    newInputs[index].name = event.target.value;
    setProportionalPeople(newInputs);
  };

  const handleFirstChange = (index: number, event: any) => {
    const newInputs = [...proportionalPeople];
    newInputs[index].first = parseInt(event.target.value);
    setProportionalPeople(newInputs);
  };

  const handleLastChange = (index: number, event: any) => {
    const newInputs = [...proportionalPeople];
    newInputs[index].last = parseInt(event.target.value);
    setProportionalPeople(newInputs);
  };

  return (
    <div className="rounded bg-slate-100 p-2 mt-3">
      <div className="flex items-center justify-between mb-2">
        <Label htmlFor="name" value="Nome" />
        <div className="flex gap-3">
          <BiDuplicate
            className="cursor-pointer"
            onClick={() => handleDuplicateInput(index)}
            size={24}
          />

          <BiXCircle
            className="cursor-pointer"
            onClick={() => handleRemoveInput(index)}
            size={24}
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <TextInput
          id="name"
          required
          type="text"
          className="w-full"
          key={`${index}-name`}
          onChange={(e) => handleNameChange(index, e)}
          value={proportionalPeople[index].name}
        />
      </div>
      <div className="flex gap-2 mt-3">
        <div>
          <Label htmlFor="first" value="Primeira" />
          <TextInput
            id="first"
            required
            type="number"
            key={`${index}-first`}
            onChange={(e) => handleFirstChange(index, e)}
            value={proportionalPeople[index].first}
            min={1}
          />
        </div>
        <div>
          <Label htmlFor="last" value="Ultima" />
          <TextInput
            id="last"
            required
            type="number"
            key={`${index}-last`}
            onChange={(e) => handleLastChange(index, e)}
            min={1}
            value={proportionalPeople[index].last}
          />
        </div>
      </div>
    </div>
  );
}
