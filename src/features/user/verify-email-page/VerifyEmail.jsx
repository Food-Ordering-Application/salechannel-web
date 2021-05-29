import React, {useEffect} from "react";
import TopNavigationBar from "../../common/TopNavigationBar";
import SplashScreen from "../../common/SplashScreen";
import {useDispatch, useSelector} from "react-redux";
import {clearUserState, userSelector, verifyEmail} from "../UserSlice";
import {useHistory, useParams} from "react-router-dom";
import {showError, showSuccess} from "../../common/Snackbar/SnackbarSlice";

export default function VerifyEmail() {
  const {token} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const {isFetching, isError, errorMessage, isEmailVerified} = useSelector(userSelector);

  useEffect(() => {
    dispatch(verifyEmail({token}));
  }, [token]);

  useEffect(() => {
    if (isEmailVerified) {
      dispatch(clearUserState());
      dispatch(showSuccess(`Xác thực email thành công`));
      history.replace(`/account/edit`);
    }
    if (isError) {
      dispatch(showError(errorMessage));
      dispatch(clearUserState());
      history.replace(`/account/edit`);
    }
  }, [isError, isEmailVerified]);

  return (
    <>
      <TopNavigationBar label="Đang xác thực email" isPending={isFetching}/>
      <SplashScreen style={2}/>
    </>
  );
}