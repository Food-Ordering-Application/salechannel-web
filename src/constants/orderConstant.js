const orderConstant = {
  DRAFT: {
    code: "DRAFT",
    name: "Đơn nháp",
    step: 0,
  },
  ORDERED:{
    code: "ORDERED",
    name: "Đang chờ nhà hàng duyệt đơn",
    step: 1,
  },
  WAITING_DRIVER: {
    code: "WAITING_DRIVER",
    name: "Đang tìm tài xế",
    step: 2,
  },
  CHECKING: {
    code: "CHECKING",
    name: "Đang lấy món",
    step: 3,
  },
  DELIVERING: {
    code: "DELIVERING",
    name: "Đang giao",
    step: 4,
  },
  DELIVERIED: {
    code: "DELIVERIED",
    name: "Giao thành công",
    step: 5,
  },
  CANCELED: {
    code: "CANCELED",
    name: "Đã hủy",
    step: -1,
  },
};

export const isDelivering = (status) => status === orderConstant.DELIVERING.code;
export const isCompleted = (status) => status === orderConstant.DELIVERIED.code;
export const isCanceled = (status) => status === orderConstant.CANCELED.code;

export default orderConstant;