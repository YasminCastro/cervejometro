"use client";

import { Label, TextInput } from "flowbite-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface IProps {
  index: number;
  inputs: any[];
  setInputs: Dispatch<SetStateAction<any[]>>;
}

export default function PersonsForm({ index, inputs, setInputs }: IProps) {
  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

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
          />
        </div>
      </div>
    </div>
  );
}
