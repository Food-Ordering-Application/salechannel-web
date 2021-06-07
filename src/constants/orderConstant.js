const orderConstant = {
  DRAFT: {
    code: "DRAFT",
    name: "Đơn nháp",
    step: 0,
  },
  ORDERED: {
    code: "ORDERED",
    name: "Đang chờ nhà hàng duyệt đơn",
    step: 1,
  },
  CONFIRMED: {
    code: "CONFIRMED",
    name: "Đang chuẩn bị",
    step: 2,
  },
  COMPLETED: {
    code: "COMPLETED",
    name: "Hoàn tất",
    step: 3,
  },
  CANCELED: {
    code: "CANCELED",
    name: "Đã hủy",
    step: -1,
  },
};

export default orderConstant;