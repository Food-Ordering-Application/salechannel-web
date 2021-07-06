export const paymentStatus = {
  PENDING_USER_ACTION: {
    code: "PENDING_USER_ACTION",
    name: "Chờ xác nhận",
  },
  REFUNDED: {
    code: "REFUNDED",
    name: "Đã hoàn trả",
  },
  PENDING_REFUNDED: {
    code: "PENDING_REFUNDED",
    name: "Chờ hoàn tiền",
  },
  PROCESSING: {
    code: "PROCESSING",
    name: "Đang xử lý",
  },
  SUCCESS: {
    code: "SUCCESS",
    name: "Thành công",
  },
  FAILURE: {
    code: "FAILURE",
    name: "Thất bại",
  },
  CANCELLED: {
    code: "CANCELLED",
    name: "Đã hủy",
  }
}