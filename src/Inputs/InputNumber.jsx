import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const InputNumber = ({ numberOfCopies, onChange }) => {
  const [copies, setCopies] = useState(numberOfCopies);

  useEffect(() => {
    setCopies(numberOfCopies);
  }, [numberOfCopies]);

  const handleIncrement = () => {
    setCopies((previousValue) => {
      const newCopies = previousValue + 1;
      onChange(newCopies);
      return newCopies;
    });
  };

  const handleDecrement = () => {
    setCopies((previousValue) => {
      const newCopies = Math.max(previousValue - 1, 0);
      onChange(newCopies);
      return newCopies;
    });
  };

  const handleChange = (value) => {
    const numberOfCards = isNaN(value) ? 0 : value;
    setCopies(numberOfCards);
    onChange(numberOfCards);
  };

  return (
    <InputGroup>
      <InputLeftElement>
        <IconButton
          aria-label="Decrement"
          icon={<MinusIcon />}
          onClick={handleDecrement}
        />
      </InputLeftElement>
      <Input
        value={copies}
        textAlign="center"
        onChange={(event) => handleChange(parseInt(event.target.value))}
      />
      <InputRightElement>
        <IconButton
          aria-label="Increment"
          icon={<AddIcon />}
          onClick={handleIncrement}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default InputNumber;
