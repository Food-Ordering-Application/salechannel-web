import React, {useState} from "react";
import {Collapse} from "@material-ui/core";
import ProductItemLarge from "./ProductItemLarge";
import CategoryLabel from "./CategoryLabel";


export default function MenuVertical({productList}) {
  const categoryList = Object.keys(productList);
  const initArr = Array(categoryList.length).fill(true);
  const [open, setOpen] = useState(initArr);

  const handleLabelClick = (index) => {
    const newArr = [...open];
    newArr[index] = !open[index];
    setOpen(newArr);
  };
  const handleItemClick = (index) => {
    alert(index);
  };

  return (
    <>
      {
        categoryList.map((category, index1) =>
          <div key={index1} id={`category${index1}`}>
            <CategoryLabel open={open[index1]} onClick={() => handleLabelClick(index1)}>
              {category}
            </CategoryLabel>
            <Collapse in={open[index1]}>
              <>
                {
                  productList[category].map((data, index2) =>
                    <ProductItemLarge key={index2}
                                      onClick={() => handleItemClick(index2)}
                                      {...data}/>
                  )
                }
              </>
            </Collapse>
          </div>
        )
      }
    </>
  );
}