import React, {useState} from "react";
import {Collapse} from "@material-ui/core";
import ProductItemLarge from "./ProductItemLarge";
import CategoryLabel from "./CategoryLabel";
import ProductDetail from "../features/restaurant/product-detail-dialog/ProductDetail";
import {MenuApi} from "../api/MenuApi";
import {useDispatch} from "react-redux";
import {showError} from "../features/common/Snackbar/SnackbarSlice";

// const mockedData = {
//   name: `Cơm gà xối mỡ`,
//   pricePerUnit: 59000,
//   image: `https://hoangviettravel.vn/wp-content/uploads/2020/10/com-ga-xoi-mo-quan12.jpg`,
//   options: [
//     {
//       name: `Cơm chiên`,
//       price: 0,
//     },
//     {
//       name: `Cơm trắng`,
//       price: 0,
//     }
//   ]
//
// }

export default function MenuVertical({productList, onAddToCart}) {
  const initArr = Array(productList.length).fill(true);
  const [expand, setExpand] = useState(initArr);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  const handleLabelClick = (index) => {
    const newArr = [...expand];
    newArr[index] = !expand[index];
    setExpand(newArr);
  };
  const handleItemClick = (index1, index2) => {
    const item = productList[index1].menuItems[index2];
    MenuApi.fetchTopping(item.id)
      .then((data) => {
        setSelected({...item, ...data});
        setOpen(true);
      })
      .catch((error) => {
        dispatch(showError(error.message));
      })
  };

  return (
    <>
      {
        productList.map((category, index1) =>
          <div key={index1} id={`category${index1}`}>
            <CategoryLabel open={expand[index1]} onClick={() => handleLabelClick(index1)}>
              {category.name}
            </CategoryLabel>
            <Collapse in={expand[index1]}>
              <>
                {
                  category.menuItems.map((data, index2) => (
                      <ProductItemLarge key={index2}
                                        onClick={() => handleItemClick(index1, index2)}
                                        name={data.name}
                                        description={data.description}
                                        price={data.price}
                                        image={data.imageUrl}/>
                    )
                  )
                }
              </>
            </Collapse>
          </div>
        )
      }
      {selected && <ProductDetail open={open} handleClose={() => setOpen(false)} product={selected}
                                  onSubmit={(data) => onAddToCart(data)}/>}
    </>
  );
}