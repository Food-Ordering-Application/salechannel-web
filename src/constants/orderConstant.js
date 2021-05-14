const orderConstant = {
  DRAFT: {
    code: "DRAFT",
    name: "Đơn nháp"
  },
  WAITING_DRIVER: {
    code: "WAITING_DRIVER",
    name: "Đang tìm tài xế"
  },
  CHECKING: {
    code: "CHECKING",
    name: "Đang lấy món"
  },
  DELIVERING: {
    code: "DELIVERING",
    name: "Đang giao"
  },
  DELIVERIED: {
    code: "DELIVERIED",
    name: "Giao thành công"
  },
  CANCELED: {
    code: "CANCELED",
    name: "Đã hủy"
  },
};

export const isDelivering = (status) => status === orderConstant.DELIVERING.code;
export const isCompleted = (status) => status === orderConstant.DELIVERIED.code;
export const isCanceled = (status) => status === orderConstant.CANCELED.code;

export default orderConstant;