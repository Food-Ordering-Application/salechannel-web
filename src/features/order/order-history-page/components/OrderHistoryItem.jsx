import React from "react";
import {Box, Button, Divider, Grid, Paper, Typography} from "@material-ui/core";
import {
  AssignmentIndTwoTone,
  Autorenew,
  CancelTwoTone,
  CheckCircleTwoTone,
  ChevronRight,
  DescriptionTwoTone,
  MotorcycleTwoTone
} from "@material-ui/icons";
import {currencyFormatter, dateFormatter} from "../../../../untils/formatter";
import Ribbon from "../../../common/Ribbon";
import {makeStyles} from "@material-ui/core/styles";
import orderConstant from "../../../../constants/orderConstant";
import {paymentConstant} from "../../../../constants/paymentConstant";

const useStyles = makeStyles((theme) => {

  return ({
    root: {
      borderRadius: theme.spacing(1.5),
      marginBottom: theme.spacing(2),
    },
    statusIcon: ({status}) => ({
      fontSize: theme.spacing(2.5),
      color: theme.palette.status[status],
    }),
    statusText: ({status}) => ({
      fontSize: theme.spacing(2),
      color: theme.palette.status[status.trim()],
    }),
  });
});

const mapStatusIcon = (status) => {
  switch (status) {
    case orderConstant.DRAFT.code:
      return DescriptionTwoTone;
    case orderConstant.COMPLETED.code:
      return CheckCircleTwoTone;
    case orderConstant.ASSIGNING_DRIVER.code:
      return AssignmentIndTwoTone;
    case orderConstant.ON_GOING.code:
      return MotorcycleTwoTone;
    case orderConstant.PICKED_UP.code:
      return MotorcycleTwoTone;
    case orderConstant.CANCELLED.code:
      return CancelTwoTone;
  }
  return Autorenew;
};

export default function OrderHistoryItem({
                                           status,
                                           name,
                                           itemCount,
                                           date,
                                           cost,
                                           paymentMethod: paymentType,
                                           onClick,
                                           draftText = "Đơn nháp",
                                           draftIcon = DescriptionTwoTone,
                                           allowReview,
                                           onReviewClick,
                                         }) {
  const classes = useStyles({status: status.trim()});

  return (
    <Paper variant="outlined" className={classes.root}>
      <Box>
        <Ribbon onClick={onClick}>
          <Box p={1.5}>
            <Box>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Box className={classes.statusIcon}
                       component={status === "DRAFT" ? draftIcon : mapStatusIcon(status.trim())}/>
                </Grid>
                <Grid item>
                  <Typography variant="h4">
                    <Box
                      className={classes.statusText}>{status === "DRAFT" ? draftText : orderConstant[status].name}</Box>
                    {/*<Box className={classes.statusText}>{status}</Box>*/}
                  </Typography>
                </Grid>
                <Grid item xs/>
                <Grid item>
                  <Typography variant="h5">
                    <Box fontSize={12} color="onSurface.mediumEmphasis">{dateFormatter(new Date(date))}</Box>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box my={2}>
              <Grid container>
                <Grid item xs>
                  <Typography variant="h4">
                    <Box fontSize={16} color="onSurface.highEmphasis">{name}</Box>
                  </Typography>
                </Grid>
                <Grid item>
                  <Box fontSize={16} component={ChevronRight}/>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Typography variant="h5">
                <Box
                  fontSize={12}
                  color="onSurface.mediumEmphasis"
                  component={"span"}
                >
                  <>{currencyFormatter(cost)}</>
                  <>{paymentType ? ` (${paymentConstant[paymentType]?.name})` : ``}</>
                  {/*<>{` ● ${itemCount} món`}</>*/}
                </Box>
              </Typography>
            </Box>
          </Box>
        </Ribbon>
        {allowReview && (<>
          <Divider variant={"fullWidth"}/>
          <Box>
            <Button variant={"text"} fullWidth onClick={onReviewClick}>
              <Box color="primary.main">Đánh giá</Box>
            </Button>
          </Box>
        </>)}
        {/*<Divider variant="fullWidth" hidden={isDelivering(status)}/>*/}
        {/*<Box>*/}
        {/*  <Grid container>*/}
        {/*    <Grid item xs hidden={!isCompleted(status)}>*/}
        {/*      <Button variant="text" fullWidth>*/}
        {/*        <Box color="onSurface.disabled">Đánh giá</Box>*/}
        {/*      </Button>*/}
        {/*    </Grid>*/}
        {/*    <Grid item>*/}
        {/*      <Divider orientation="vertical"/>*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs hidden={isDelivering(status)}>*/}
        {/*      <Button variant="text" color="primary" fullWidth>Đặt lại</Button>*/}
        {/*    </Grid>*/}
        {/*  </Grid>*/}
        {/*</Box>*/}
      </Box>
    </Paper>
  );
}