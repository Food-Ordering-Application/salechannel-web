import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Radio,
  RadioGroup,
  Slide,
  Typography
} from "@material-ui/core";
import {HighlightOff} from "@material-ui/icons";
import theme from "../../../asserts/Theme";
import StyledFormControlLabel from "../../../components/StyledFormControlLabel";
import QuantityButtonGroup from "../../../components/QuantityButtonGroup";

const useStyles = makeStyles(theme => ({
    root: {},
    contentRoot: {
      padding: 0,
      "&:first-child": {
        padding: 0,
      }
    },
    dialog: {
      width: `100%`,
      borderRadius: theme.spacing(2, 2, 0, 0),
      margin: 0,
      alignSelf: `flex-end`,
    },
    image: {
      maxHeight: theme.spacing(34),
      width: `100%`,
      objectFit: `cover`,
    },
    exit: {
      position: `absolute`,
      top: 0,
      left: 0,
      color: theme.palette.surface.light,
    },
  })
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} timeout={{enter: 450, exit: 650}}/>;
});

export default function ProductDetail({open, handleClose, product, onSubmit}) {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleAddToCart = () => {
    onSubmit({
      name: product.name,
      quantity: quantity,
      price: product.pricePerUnit,
      option: product.options.filter((option) => option.name === value)[0],
    });
    handleClose();
  };

  const RadioButtonLabel = ({name, price}) => (
    <Box width={1} display="flex" alignItems="center">
      <Box flexGrow={1}>
        <Typography variant="h6">
          <Box fontSize={11}>{name}</Box>
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6">
          <Box fontSize={14} color="onSurface.disabled">{price}đ</Box>
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      classes={{paper: classes.dialog}}
    >
      <DialogContent className={classes.contentRoot}>
        <IconButton className={classes.exit} onClick={handleClose}>
          <HighlightOff/>
        </IconButton>
        <img className={classes.image}
             alt={product.name}
             src={product.imageUrl}/>
        <Box id="container" p={2}>
          <Box id="Label" pb={2} display="flex" alignItems="center">
            <Box flexGrow={1}>
              <Typography variant="h4">
                <Box fontSize={16}>{product.name}</Box>
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">
                <Box fontSize={14} color="onSurface.disabled">{product.price.toLocaleString()}đ</Box>
              </Typography>
            </Box>
          </Box>
          <Box id="Guideline" py={0.5} mx={-2} px={2} bgcolor="primary.l0">
            <Box>
              <Typography variant="h4">
                <Box fontSize={14} lineHeight="24px" color="onSurface.mediumEmphasis">Chọn cơm</Box>
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">
                <Box fontSize={9} lineHeight="24px" color="error.main">Chỉ 1 lựa chọn</Box>
              </Typography>
            </Box>
          </Box>
          <Box id="Options">
            <RadioGroup value={value} onChange={handleChange}>{
              product.toppingGroups[0].toppingItems.map(({description, price}, index) => (
                <>
                  <StyledFormControlLabel key={index}
                                          value={description}
                                          control={<Radio color="primary"/>}
                                          label={<RadioButtonLabel name={description} price={price}/>}/>
                  <Box mx={-2}>
                    <Divider variant="fullWidth"/>
                  </Box>
                </>
              ))
            }</RadioGroup>
          </Box>
          <Box id="QuantityController">
            <Box width={1} my={5} display="flex" justifyContent="center">
              <QuantityButtonGroup onChange={(value) => setQuantity(value)}/>
            </Box>
          </Box>
          <Box id="Button">
            <Button color="primary" variant="contained" fullWidth style={{borderRadius: theme.spacing(1)}}
                    onClick={handleAddToCart}>
              <Box display="flex" alignItems="center" width={1} py={1}>
                <Box>
                  <Typography variant="h4">
                    <Box fontSize={theme.spacing(1.5)} color={theme.palette.surface.light}>
                      {quantity}{quantity > 1 ? ` Items` : ` Item`}
                    </Box>
                  </Typography>
                </Box>
                <Box flexGrow={1} textAlign="center">
                  <Typography variant="h3">
                    <Box fontSize={theme.spacing(2)} color={theme.palette.surface.light}>
                      ADD
                    </Box>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h3">
                    <Box fontSize={theme.spacing(1.5)} color={theme.palette.surface.light}>
                      {(quantity * product.pricePerUnit).toLocaleString()}đ
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}