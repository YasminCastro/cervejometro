"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useLocalStorageValues } from "@/lib/localStorageValues";
import { useState, useEffect } from "react";

export default function AddBeers() {
  const { beer, setBeer } = useLocalStorageValues();
  const [inputValue, setInputValue] = useState(beer.toString());

  // Sincroniza o input quando beer muda externamente (botões)
  useEffect(() => {
    setInputValue(beer.toString());
  }, [beer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Atualiza o valor apenas se for um número válido
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setBeer(numValue);
    }
  };

  const handleInputBlur = () => {
    // Garante que o valor seja válido ao sair do campo
    const numValue = parseInt(inputValue);
    if (isNaN(numValue) || numValue < 0) {
      setInputValue(beer.toString());
    } else {
      setBeer(numValue);
      setInputValue(numValue.toString());
    }
  };

  const preserveScrollAndUpdate = (newValue: number) => {
    // Preserva a posição do scroll antes de fazer a mudança
    const scrollPosition = window.scrollY;
    const scrollX = window.scrollX;

    setBeer(newValue);
    setInputValue(newValue.toString());

    // Restaura a posição do scroll após a atualização
    requestAnimationFrame(() => {
      window.scrollTo(scrollX, scrollPosition);
    });
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={() => {
          const newValue = Math.max(0, beer - 1);
          preserveScrollAndUpdate(newValue);
        }}
        size="icon"
        type="button"
      >
        <FaMinus />
      </Button>

      <Input
        type="number"
        min={0}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className="font-bold text-center w-16 h-14 border-2 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />

      <Button
        onClick={() => {
          const newValue = beer + 1;
          preserveScrollAndUpdate(newValue);
        }}
        size="icon"
        type="button"
      >
        <FaPlus />
      </Button>
    </div>
  );
}
