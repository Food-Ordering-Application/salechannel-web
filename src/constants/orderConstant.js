const orderConstant = {
  DRAFT: {
    code: "DRAFT",
    name: "Đơn nháp",
    description: "Đang xử lí đơn hàng của bạn",
    step: 0,
  },
  ASSIGNING_DRIVER: {
    code: "ASSIGNING_DRIVER",
    name: "Đang tìm tài xế",
    description: "Đang tìm tài xế cho đơn hàng của bạn",
    step: 1,
  },
  ON_GOING: {
    code: "ON_GOING",
    name: "Đang lấy đơn",
    description: "Tài xế đang lấy đơn hàng của bạn",
    step: 2,
  },
  PICKED_UP: {
    code: "PICKED_UP",
    name: "Đã lấy đơn, đang giao",
    description: "Tài xế đã lấy đơn và đang giao đến bạn",
    step: 3,
  },
  COMPLETED: {
    code: "COMPLETED",
    name: "Hoàn tất",
    description: "Đơn hàng đã được giao đến bạn",
    step: 4,
  },
  CANCELLED: {
    code: "CANCELLED",
    name: "Đã hủy",
    description: "Đơn hàng đã bị hủy",
    step: 4,
  },
  EXPIRED: {
    code: "EXPIRED",
    name: "Đã hủy",
    description: "Đơn hàng đã bị hủy",
    step: 4,
  },
};

export default orderConstant;