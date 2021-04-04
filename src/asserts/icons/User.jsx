import {SvgIcon} from "@material-ui/core";

export default function UserIcon(props) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path fill-rule="evenodd" clip-rule="evenodd"
            d="M16.5 7C16.5 9.20914 14.7091 11 12.5 11C10.2909 11 8.5 9.20914 8.5 7C8.5 4.79086 10.2909 3 12.5 3C14.7091 3 16.5 4.79086 16.5 7ZM14.5 7C14.5 8.10457 13.6046 9 12.5 9C11.3954 9 10.5 8.10457 10.5 7C10.5 5.89543 11.3954 5 12.5 5C13.6046 5 14.5 5.89543 14.5 7Z"/>
      <path
        d="M17.5 15C17.5 14.4477 17.0523 14 16.5 14H8.5C7.94772 14 7.5 14.4477 7.5 15V21H5.5V15C5.5 13.3431 6.84315 12 8.5 12H16.5C18.1569 12 19.5 13.3431 19.5 15V21H17.5V15Z"/>
    </SvgIcon>
  );
}