import {SvgIcon} from "@material-ui/core";

export default function PayPalIcon(props) {
  return (
    <SvgIcon viewBox="0 0 30 30" {...props}>
      <path
        d="M19.666 10.032A3.497 3.497 0 0 0 16.5 8h-5.577a.998.998 0 0 0-.986.836l-1.833 11A.998.998 0 0 0 9.09 21h2.503c0 .24.067.475.226.657a1 1 0 0 0 .754.343H16.5a.5.5 0 0 0 .496-.438L17.441 18H18c2.897 0 5-1.84 5-4.375 0-1.892-1.471-3.432-3.334-3.593zM19 11.5c0 1.93-1.57 3.5-3.5 3.5h-2.109l.546-4h5.012a2.5 2.5 0 0 1 .051.5zM11.7 20H9.09l1.833-11H16.5c.813 0 1.53.397 1.987 1h-4.55c-.499 0-.924.372-.992.865L11.7 20zm6.3-3h-1a.5.5 0 0 0-.496.438L16.059 21h-3.486l.682-5H15.5c2.481 0 4.5-2.019 4.5-4.5 0-.145-.026-.284-.043-.424 1.168.273 2.043 1.309 2.043 2.549C22 15.944 19.927 17 18 17z"/>
      <path
        d="M28 4H2C.897 4 0 4.897 0 6v18c0 1.103.897 2 2 2h26c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm1 20c0 .551-.449 1-1 1H2c-.551 0-1-.449-1-1V6c0-.551.449-1 1-1h26c.551 0 1 .449 1 1v18z"/>
    </SvgIcon>
  );
}