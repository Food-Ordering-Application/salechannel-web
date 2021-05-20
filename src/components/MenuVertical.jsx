import React, {useState} from "react";
import {Collapse} from "@material-ui/core";
import ProductItemLarge from "./ProductItemLarge";
import CategoryLabel from "./CategoryLabel";
import ProductDetail from "../features/restaurant/product-detail-dialog/ProductDetail";
import {MenuApi} from "../api/MenuApi";
import {useDispatch, useSelector} from "react-redux";
import {showError} from "../features/common/Snackbar/SnackbarSlice";
import {decreaseQuantity, increaseQuantity, orderSelector} from "../features/order/OrderSlice";

export default function MenuVertical({productList, onAddToCart, orderItems}) {
  const initArr = Array(productList.length).fill(true);
  const [expand, setExpand] = useState(initArr);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const {data: orderData} = useSelector(orderSelector);
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
  const handleIncreaseQuantity = (orderItemId) => {
    dispatch(increaseQuantity({orderId: orderData.id, orderItemId: orderItemId}));
  };
  const handleDecreaseQuantity = (orderItemId) => {
    dispatch(decreaseQuantity({orderId: orderData.id, orderItemId: orderItemId}));
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
                  category.menuItems.map((data, index2) => {
                      const selectedItem = orderItems.filter(item => item.menuItemId === data.id)[0];
                      return (
                        <ProductItemLarge key={index2}
                                          onClick={() => handleItemClick(index1, index2)}
                                          name={data.name}
                                          description={data.description}
                                          price={data.price}
                                          image={data.imageUrl}
                                          onPlus={() => handleIncreaseQuantity(selectedItem.id)}
                                          onMinus={() => handleDecreaseQuantity(selectedItem.id)}
                                          quantity={(selectedItem && selectedItem.quantity) || 0}
                        />
                      )
                    }
                  )
                }
              </>
            </Collapse>
          </div>
        )
      }
      {selected && <ProductDetail open={open} handleClose={() => setOpen(false)} product={selected}
                                  onSubmit={(data) => onAddToCart(data)}
      />}
    </>
  );
}