import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Card, CardMedia, Divider, Grid, IconButton, Typography} from "@material-ui/core";
import {currencyFormatter} from "../untils/formatter";
import {AddCircle, RemoveCircleOutline} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    container: {
      padding: theme.spacing(0.5, 0),
      '&:first-child': {
        paddingTop: theme.spacing(1),
      },
    },
    root: {
      display: 'flex',
      height: '82px',
      maxWidth: "100%",
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    content: {
      flex: '1 0 auto',
      padding: theme.spacing(2, 0, 2, 2),
    },
    cover: {
      width: '82px',
      height: `82px`,
      borderRadius: '4px',
    },
    name: {
      fontSize: '11px',
      lineHeight: '16px',
    },
    info: {
      width: "215px",
      fontSize: '9px',
      lineHeight: '16px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: theme.palette.onSurface.disabled,
    },
    divider: {
      margin: theme.spacing(0.5, 0),
    },
    button: {
      padding: theme.spacing(0.5),
    }
  })
);

export default function ProductItemLarge({image, name, description, price, onClick, onPlus, onMinus, quantity}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Card elevation={0} className={classes.root}>
        <Grid container wrap="nowrap">
          <Grid item onClick={onClick}>
            <CardMedia
              className={classes.cover}
              image={image}
              title={name}
            />
          </Grid>
          <Grid item xs>
            <div className={classes.details}>
              <div className={classes.content}>
                <div onClick={onClick}>
                  <Typography variant="h5">
                    <Box className={classes.name}>{name}</Box>
                  </Typography>
                  <Typography variant="h6">
                    <Box className={classes.info}>{description}</Box>
                  </Typography>
                </div>
                <Divider variant='fullWidth' className={classes.divider}/>
                <Grid container alignItems="center">
                  <Grid item xs onClick={onClick}>
                    <Typography variant="h6">
                      <Box className={classes.name}>{currencyFormatter(price)}</Box>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item hidden={quantity <= 0}>
                        <IconButton className={classes.button} onClick={onMinus}>
                          <Box component={RemoveCircleOutline} fontSize={18} color="onSurface.disabled"/>
                        </IconButton>
                      </Grid>
                      <Grid item hidden={quantity <= 0}>
                        <Typography variant="h4">
                          <Box fontSize={11}>{quantity}</Box>
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton className={classes.button} onClick={quantity > 0 ? onPlus : onClick}>
                          <Box component={AddCircle} fontSize={18} color="primary.main"/>
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}