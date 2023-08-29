"use client";

import { Button, Label, Modal, Spinner, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";
import useLocalStorage from "use-local-storage";

interface IProps {}

export default function FormModal({}: IProps) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [beerPrice, setBeerPrice] = useLocalStorage("beerPrice", 0);
  const [people, setPeople] = useLocalStorage("people", 1);
  const [loading, setLoading] = useState(true);

  const props = { openModal, setOpenModal };

  useEffect(() => {
    setLoading(false);
  }, [people, beerPrice]);

  return (
    <>
      <Button
        onClick={() => props.setOpenModal("form-elements")}
        color="warning"
      >
        Configurações
      </Button>
      <Modal
        show={props.openModal === "form-elements"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          {loading ? (
            <Spinner aria-label="Warning spinner example" color="warning" />
          ) : (
            <div className="space-y-6">
              <div>
                <Label htmlFor="price" value="Valor da cerveja" />
                <TextInput
                  icon={FaDollarSign}
                  id="price"
                  required
                  type="number"
                  step="0.10"
                  onChange={(event) =>
                    setBeerPrice(parseFloat(event.target.value))
                  }
                  defaultValue={beerPrice}
                />
              </div>

              <div>
                <Label htmlFor="price" value="Qtd. de pessoas" />
                <TextInput
                  icon={BsPeopleFill}
                  id="people"
                  required
                  type="number"
                  onChange={(event) => setPeople(parseInt(event.target.value))}
                  defaultValue={people}
                />
              </div>

              <Button
                color="warning"
                onClick={() => {
                  props.setOpenModal(undefined);
                }}
              >
                Salvar
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
