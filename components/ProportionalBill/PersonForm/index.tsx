"use client";

import { IProportionalPeople } from "@/interface/proportionalPeople";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { BiDuplicate, BiXCircle } from "react-icons/bi";
import { Button } from "@/components/ui/button";

interface IProps {
  index: number;
  proportionalPeople: IProportionalPeople[];
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
        paid: false,
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
    <div className="rounded bg-slate-100 dark:bg-slate-800 p-2 mt-3">
      <div className="flex items-center justify-between mb-2">
        <Label htmlFor={`name-${index}`}>Nome</Label>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => handleDuplicateInput(index)}
          >
            <BiDuplicate className="h-5 w-5" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => handleRemoveInput(index)}
          >
            <BiXCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Input
          id={`name-${index}`}
          required
          type="text"
          className="w-full"
          onChange={(e) => handleNameChange(index, e)}
          value={proportionalPeople[index].name}
        />
      </div>
      <div className="flex gap-2 mt-3">
        <div className="flex-1">
          <Label htmlFor={`first-${index}`}>Primeira</Label>
          <Input
            id={`first-${index}`}
            required
            type="number"
            min={1}
            onChange={(e) => handleFirstChange(index, e)}
            value={proportionalPeople[index].first}
          />
        </div>
        <div className="flex-1">
          <Label htmlFor={`last-${index}`}>Ultima</Label>
          <Input
            id={`last-${index}`}
            required
            type="number"
            min={1}
            onChange={(e) => handleLastChange(index, e)}
            value={proportionalPeople[index].last}
          />
        </div>
      </div>
    </div>
  );
}

