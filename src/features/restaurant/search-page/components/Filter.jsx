import {useDispatch, useSelector} from "react-redux";
import {metadataSelector} from "../../../home/MetadataSlice";
import {useHistory} from "react-router-dom";
import Ribbon from "../../../common/Ribbon";
import {Box, Button, Collapse, Divider, FormControl, Grid, MenuItem, Select, Typography} from "@material-ui/core";
import FilterTitle from "./FilterTitle";
import React, {useState} from "react";
import {
  addFilter,
  changeSort,
  clearAllFilter,
  restaurantsListSelector,
  setCategoryIds
} from "../../RestaurantsListSlice";

export default function RestaurantFilter({onSubmit}) {

  const history = useHistory()
  const dispatch = useDispatch()

  const {isSuccess: mOK, data: metadata} = useSelector(metadataSelector)
  const {categoryIds, filterIds, sortId} = useSelector(restaurantsListSelector)

  const [open, setOpen] = useState(false)

  if (!mOK) {
    history.replace(`/`)
    return null
  }


  return (
    <>
      <Ribbon onClick={() => setOpen(!open)}>
        <Box mx={2} pb={1}>
          <Grid container alignItems="center" justify="flex-end" spacing={1}>
            {categoryIds.length !== 0 && (
              categoryIds.map((categoryId) => (
                <Grid item>
                  <FilterTitle>{metadata._categories[categoryId]}</FilterTitle>
                </Grid>
              ))
            )}
            <Grid item xs>
            </Grid>
            <Grid item>
              <Typography variant="h4">
                <Box fontSize={14} color="primary.main">{open ? `Đóng` : `Nâng cao`}</Box>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Ribbon>
      <Collapse in={open}>
        <Divider variant="fullWidth" light/>
        <Box m={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Typography variant="h4">
                <Box fontSize={14}>Lọc theo</Box>
              </Typography>
            </Grid>
            <Grid item xs>
              <FormControl fullWidth>
                <Select value={filterIds}
                        onChange={(event) => {
                          dispatch(addFilter({id: event.target.value}))
                        }}
                >
                  {metadata.restaurantFilterType.map(({id, name}) => (
                    <MenuItem key={id}
                              value={id}
                              children={name}/>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Box m={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Typography variant="h4">
                <Box fontSize={14}>Sắp xếp</Box>
              </Typography>
            </Grid>
            <Grid item xs>
              <FormControl fullWidth>
                <Select value={sortId}
                        onChange={(event) => {
                          dispatch(changeSort({id: event.target.value}))
                        }}
                        placeholder={"Sắp xếp theo"}
                >
                  {metadata.restaurantSortType.map(({id, name}) => (
                    <MenuItem key={id}
                              value={id}
                              children={name}/>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Box m={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Typography variant="h4">
                <Box fontSize={14}>Danh mục</Box>
              </Typography>
            </Grid>
            <Grid item xs>
              <FormControl fullWidth>
                <Select value={categoryIds}
                        multiple
                        onChange={(event) => {
                          dispatch(setCategoryIds(event.target.value))
                        }}
                >
                  {metadata.categories.map(({id, name}) => (
                    <MenuItem key={id}
                              value={id}
                              children={name}/>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Box p={2}>
          <Grid container spacing={2} justify={"center"} alignItems={"center"} alignContent={"center"}>
            <Grid item xs>
              <Button variant={"outlined"} color={"primary"} fullWidth onClick={() => {
                dispatch(clearAllFilter())
              }}>
                <Box>
                  Hủy bộ lọc
                </Box>
              </Button>
            </Grid>
            <Grid item xs>
              <Button variant={"contained"} color={'primary'} onClick={() => {
                onSubmit()
                setOpen(false)
              }} fullWidth>
                Áp dụng
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </>
  )
}