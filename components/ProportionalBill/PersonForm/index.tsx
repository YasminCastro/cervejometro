"use client";

import { IProportionalPeople } from "@/interface/proportionalPeople";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Dispatch, SetStateAction } from "react";
import { BiDuplicate, BiXCircle, BiChevronDown } from "react-icons/bi";
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
        stopped: false,
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

  const handleStoppedChange = (index: number, checked: boolean) => {
    const newInputs = [...proportionalPeople];
    newInputs[index].stopped = checked;
    setProportionalPeople(newInputs);
  };

  const isPaid = proportionalPeople[index].paid || false;
  const isDisabled = isPaid;

  return (
    <Collapsible
      defaultOpen={!isPaid}
      className="rounded-lg border border-border bg-card p-4 mt-3 shadow-sm"
    >
      <div className="flex items-center justify-between w-full">
        <CollapsibleTrigger asChild className="flex-1 cursor-pointer">
          <div className="flex items-center gap-2">
            <BiChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 data-[state=closed]:-rotate-90" />
            <Label
              htmlFor={`name-${index}`}
              className={
                isPaid ? "font-semibold cursor-pointer" : "cursor-pointer"
              }
            >
              {proportionalPeople[index].name || "Sem nome"}
            </Label>
            {isPaid && (
              <span className="text-xs text-muted-foreground">(Pago)</span>
            )}
          </div>
        </CollapsibleTrigger>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleDuplicateInput(index);
            }}
          >
            <BiDuplicate className="h-5 w-5" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveInput(index);
            }}
          >
            <BiXCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <CollapsibleContent>
        <div className="mt-3 space-y-4">
          <div className="space-y-3">
            <Label htmlFor={`name-${index}`}>Nome</Label>
            <Input
              id={`name-${index}`}
              required
              type="text"
              className="w-full"
              onChange={(e) => handleNameChange(index, e)}
              value={proportionalPeople[index].name}
              disabled={isDisabled}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1 space-y-3">
              <Label htmlFor={`first-${index}`}>Primeira</Label>
              <Input
                id={`first-${index}`}
                required
                type="number"
                min={1}
                onChange={(e) => handleFirstChange(index, e)}
                value={proportionalPeople[index].first}
                disabled={isDisabled}
              />
            </div>
            <div className="flex-1 space-y-3">
              <Label htmlFor={`last-${index}`}>Última</Label>
              <Input
                id={`last-${index}`}
                required
                type="number"
                min={1}
                onChange={(e) => handleLastChange(index, e)}
                value={proportionalPeople[index].last}
                disabled={isDisabled || proportionalPeople[index].stopped}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id={`stopped-${index}`}
              checked={proportionalPeople[index].stopped || false}
              onCheckedChange={(checked) =>
                handleStoppedChange(index, checked as boolean)
              }
              disabled={isDisabled}
            />
            <Label
              htmlFor={`stopped-${index}`}
              className={`cursor-pointer text-sm ${
                isDisabled ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Parou de beber
            </Label>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
