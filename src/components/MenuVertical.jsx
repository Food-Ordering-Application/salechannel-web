import React, {useState} from "react";
import {Collapse} from "@material-ui/core";
import ProductItemLarge from "./ProductItemLarge";
import CategoryLabel from "./CategoryLabel";
import ProductDetail from "./ProductDetail";

const mockedData = {
  name: `Cơm gà xối mỡ`,
  pricePerUnit: 59000,
  image: `https://hoangviettravel.vn/wp-content/uploads/2020/10/com-ga-xoi-mo-quan12.jpg`,
  options: [
    {
      name: `Cơm chiên`,
      price: 0,
    },
    {
      name: `Cơm trắng`,
      price: 0,
    }
  ]

}

export default function MenuVertical({productList, onAddToCart}) {
  const categoryList = Object.keys(productList);
  const initArr = Array(categoryList.length).fill(true);
  const [expand, setExpand] = useState(initArr);
  const [open, setOpen] = useState(false);

  const handleLabelClick = (index) => {
    const newArr = [...expand];
    newArr[index] = !expand[index];
    setExpand(newArr);
  };
  const handleItemClick = (index) => {
    setOpen(true);
  };

  return (
    <>
      {
        categoryList.map((category, index1) =>
          <div key={index1} id={`category${index1}`}>
            <CategoryLabel open={expand[index1]} onClick={() => handleLabelClick(index1)}>
              {category}
            </CategoryLabel>
            <Collapse in={expand[index1]}>
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
      <ProductDetail open={open} handleClose={() => setOpen(false)} product={mockedData}
                     onSubmit={(data) => onAddToCart(data)}/>
    </>
  );
}