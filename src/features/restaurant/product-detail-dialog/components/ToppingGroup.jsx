import React, {useEffect, useState} from "react";
import ToppingItem from "./ToppingItem";
import {Box, Grid, Typography} from "@material-ui/core";

export default function ToppingGroup({toppingGroup, onChange}) {
  const {name, toppingItems: toppings} = toppingGroup;
  const [selected, setSelected] = useState(Array(toppings.length).fill(false));

  useEffect(() => {
    setSelected(Array(toppings.length).fill(false));
  }, [toppings]);

  const handleClick = (index) => {

    //Multiple Selection
    // const newArr = [...selected];

    //One Selection
    const newArr = Array(toppings.length).fill(false);
    newArr[index] = !selected[index];
    setSelected(newArr);

    const selectedToppings = [];
    for (let i = 0; i < toppings.length; i++) {
      if (newArr[i])
        selectedToppings.push(toppings[i]);
    }
    onChange(selectedToppings);
  };

  return (
    <Box>
      <Box px={2} py={1} bgcolor="primary.l0">
        <Grid container wrap="nowrap" justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">
              <Box fontSize={14} lineHeight="normal" color="onSurface.mediumEmphasis">{name}</Box>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              <Box fontSize={9} lineHeight="normal" color="error.main">Chọn 1</Box>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box>
        {toppings.map((data, index) => <ToppingItem key={data.id}
                                                    name={data.description}
                                                    price={data.price}
                                                    selected={selected[index]}
                                                    onClick={() => handleClick(index)}/>
        )}
      </Box>
    </Box>
  );
}