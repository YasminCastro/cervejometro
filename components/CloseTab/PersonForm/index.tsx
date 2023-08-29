"use client";

import { Label, TextInput } from "flowbite-react";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface IProps {
  index: number;
  inputs: any[];
  setInputs: Dispatch<SetStateAction<any[]>>;
  beer: number;
}

export default function PersonsForm({
  index,
  inputs,
  setInputs,
  beer,
}: IProps) {
  const handleRemoveInput = (index: number) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleNameChange = (index: number, event: any) => {
    const newInputs = [...inputs];
    newInputs[index].name = event.target.value;
    setInputs(newInputs);
  };

  const handleFirstChange = (index: number, event: any) => {
    const newInputs = [...inputs];
    newInputs[index].first = event.target.value;
    setInputs(newInputs);
  };

  const handleLastChange = (index: number, event: any) => {
    const newInputs = [...inputs];
    newInputs[index].last = event.target.value;
    setInputs(newInputs);
  };

  return (
    <div key={index}>
      <Label htmlFor="name" value="Nome" />
      <div className="flex items-center gap-3">
        <TextInput
          id="name"
          required
          type="text"
          className="w-full"
          key={`${index}-name`}
          onChange={(e) => handleNameChange(index, e)}
          value={inputs[index].name}
        />
        <AiOutlineClose
          className="cursor-pointer"
          onClick={() => handleRemoveInput(index)}
          size={24}
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
            min={0}
            value={inputs[index].first}
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
            max={beer}
            value={inputs[index].last}
          />
        </div>
      </div>
    </div>
  );
}
