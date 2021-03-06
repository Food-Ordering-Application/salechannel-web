import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {SystemApi} from "../../api/SystemApi";
import RestaurantApi from "../../api/RestaurantApi";

export const fetchMetadata = createAsyncThunk(
  `metadata/fetch`,
  async ({longitude, latitude}, thunkAPI) => {
    try {
      const _metadata = await SystemApi.fetchMetadata()
      const _city = await SystemApi.getCity(longitude, latitude)
      const _districts = await SystemApi.fetchDistrict(_city.city?.id)
      const _nearby = await RestaurantApi.filter(1, 25, 5, undefined, '', undefined, 2, {
        latitude,
        longitude
      }, undefined, undefined, _city.city?.id || 5)
      return {..._metadata, ..._nearby, districts: _districts.city.districts, ..._city}
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

const feedbackReason = [
  {
    "content": "Không đeo khẩu trang",
    "rate": 1,
    "display_order": 3,
    "type": 1,
    "id": 124
  },
  {
    "content": "Quá trễ",
    "rate": 1,
    "display_order": 10,
    "type": 1,
    "id": 80
  },
  {
    "content": "Không đồng phục",
    "rate": 1,
    "display_order": 20,
    "type": 1,
    "id": 81
  },
  {
    "content": "Không lịch sự",
    "rate": 1,
    "display_order": 30,
    "type": 1,
    "id": 82
  },
  {
    "content": "Không sạch sẽ",
    "rate": 1,
    "display_order": 40,
    "type": 1,
    "id": 83
  },
  {
    "content": "Phản hồi chậm",
    "rate": 1,
    "display_order": 50,
    "type": 1,
    "id": 84
  },
  {
    "content": "Lười biếng",
    "rate": 1,
    "display_order": 60,
    "type": 1,
    "id": 85
  },
  {
    "content": "Sai món",
    "rate": 1,
    "display_order": 70,
    "type": 1,
    "id": 86
  },
  {
    "content": "Làm phiền",
    "rate": 1,
    "display_order": 80,
    "type": 1,
    "id": 87
  },
  {
    "content": "Đòi đánh giá tốt",
    "rate": 1,
    "display_order": 90,
    "type": 1,
    "id": 88
  },
  {
    "content": "Đòi tip",
    "rate": 1,
    "display_order": 100,
    "type": 1,
    "id": 89
  },
  {
    "content": "Không giữ khoảng cách an toàn (2m)",
    "rate": 1,
    "display_order": 6,
    "type": 1,
    "id": 128
  },
  {
    "content": "Không đeo khẩu trang",
    "rate": 2,
    "display_order": 3,
    "type": 1,
    "id": 123
  },
  {
    "content": "Quá trễ",
    "rate": 2,
    "display_order": 10,
    "type": 1,
    "id": 70
  },
  {
    "content": "Không đồng phục",
    "rate": 2,
    "display_order": 20,
    "type": 1,
    "id": 71
  },
  {
    "content": "Không lịch sự",
    "rate": 2,
    "display_order": 30,
    "type": 1,
    "id": 72
  },
  {
    "content": "Không sạch sẽ",
    "rate": 2,
    "display_order": 40,
    "type": 1,
    "id": 73
  },
  {
    "content": "Phản hồi chậm",
    "rate": 2,
    "display_order": 50,
    "type": 1,
    "id": 74
  },
  {
    "content": "Lười biếng",
    "rate": 2,
    "display_order": 60,
    "type": 1,
    "id": 75
  },
  {
    "content": "Sai món",
    "rate": 2,
    "display_order": 70,
    "type": 1,
    "id": 76
  },
  {
    "content": "Làm phiền",
    "rate": 2,
    "display_order": 80,
    "type": 1,
    "id": 77
  },
  {
    "content": "Đòi đánh giá tốt",
    "rate": 2,
    "display_order": 90,
    "type": 1,
    "id": 78
  },
  {
    "content": "Đòi tip",
    "rate": 2,
    "display_order": 100,
    "type": 1,
    "id": 79
  },
  {
    "content": "Không giữ khoảng cách an toàn (2m)",
    "rate": 2,
    "display_order": 6,
    "type": 1,
    "id": 127
  },
  {
    "content": "Không đeo khẩu trang",
    "rate": 3,
    "display_order": 3,
    "type": 1,
    "id": 122
  },
  {
    "content": "Không giữ khoảng cách an toàn (2m)",
    "rate": 3,
    "display_order": 6,
    "type": 1,
    "id": 126
  },
  {
    "content": "Quá trễ",
    "rate": 3,
    "display_order": 10,
    "type": 1,
    "id": 60
  },
  {
    "content": "Không đồng phục",
    "rate": 3,
    "display_order": 20,
    "type": 1,
    "id": 61
  },
  {
    "content": "Không lịch sự",
    "rate": 3,
    "display_order": 30,
    "type": 1,
    "id": 62
  },
  {
    "content": "Không sạch sẽ",
    "rate": 3,
    "display_order": 40,
    "type": 1,
    "id": 63
  },
  {
    "content": "Phản hồi chậm",
    "rate": 3,
    "display_order": 50,
    "type": 1,
    "id": 64
  },
  {
    "content": "Lười biếng",
    "rate": 3,
    "display_order": 60,
    "type": 1,
    "id": 65
  },
  {
    "content": "Sai món",
    "rate": 3,
    "display_order": 70,
    "type": 1,
    "id": 66
  },
  {
    "content": "Làm phiền",
    "rate": 3,
    "display_order": 80,
    "type": 1,
    "id": 67
  },
  {
    "content": "Đòi đánh giá tốt",
    "rate": 3,
    "display_order": 90,
    "type": 1,
    "id": 68
  },
  {
    "content": "Đòi tip",
    "rate": 3,
    "display_order": 100,
    "type": 1,
    "id": 69
  },
  {
    "content": "Không giữ khoảng cách an toàn (2m)",
    "rate": 3,
    "display_order": 6,
    "type": 1,
    "id": 126
  },
  {
    "content": "Không đeo khẩu trang",
    "rate": 4,
    "display_order": 3,
    "type": 1,
    "id": 121
  },
  {
    "content": "Quá trễ",
    "rate": 4,
    "display_order": 10,
    "type": 1,
    "id": 50
  },
  {
    "content": "Không đồng phục",
    "rate": 4,
    "display_order": 20,
    "type": 1,
    "id": 51
  },
  {
    "content": "Không lịch sự",
    "rate": 4,
    "display_order": 30,
    "type": 1,
    "id": 52
  },
  {
    "content": "Không sạch sẽ",
    "rate": 4,
    "display_order": 40,
    "type": 1,
    "id": 53
  },
  {
    "content": "Phản hồi chậm",
    "rate": 4,
    "display_order": 50,
    "type": 1,
    "id": 54
  },
  {
    "content": "Lười biếng",
    "rate": 4,
    "display_order": 60,
    "type": 1,
    "id": 55
  },
  {
    "content": "Sai món",
    "rate": 4,
    "display_order": 70,
    "type": 1,
    "id": 56
  },
  {
    "content": "Làm phiền",
    "rate": 4,
    "display_order": 80,
    "type": 1,
    "id": 57
  },
  {
    "content": "Đòi đánh giá tốt",
    "rate": 4,
    "display_order": 90,
    "type": 1,
    "id": 58
  },
  {
    "content": "Đòi tip",
    "rate": 4,
    "display_order": 100,
    "type": 1,
    "id": 59
  },
  {
    "content": "Không giữ khoảng cách an toàn (2m)",
    "rate": 4,
    "display_order": 6,
    "type": 1,
    "id": 125
  },
  {
    "content": "Dịch vụ tốt",
    "rate": 5,
    "display_order": 10,
    "type": 1,
    "id": 45
  },
  {
    "content": "Đúng giờ",
    "rate": 5,
    "display_order": 20,
    "type": 1,
    "id": 46
  },
  {
    "content": "Sạch sẽ",
    "rate": 5,
    "display_order": 30,
    "type": 1,
    "id": 47
  },
  {
    "content": "Cẩn thận",
    "rate": 5,
    "display_order": 40,
    "type": 1,
    "id": 48
  },
  {
    "content": "Chăm chỉ",
    "rate": 5,
    "display_order": 50,
    "type": 1,
    "id": 49
  },
  {
    "content": "Đóng gói không cẩn thận",
    "rate": 1,
    "display_order": 10,
    "type": 2,
    "id": 114
  },
  {
    "content": "Không đúng như hình",
    "rate": 1,
    "display_order": 20,
    "type": 2,
    "id": 115
  },
  {
    "content": "Không vệ sinh",
    "rate": 1,
    "display_order": 30,
    "type": 2,
    "id": 116
  },
  {
    "content": "Vẫn nhận dụng cụ ăn uống",
    "rate": 1,
    "display_order": 35,
    "type": 2,
    "id": 129
  },
  {
    "content": "Giá cao hơn tại quán",
    "rate": 1,
    "display_order": 40,
    "type": 2,
    "id": 117
  },
  {
    "content": "Xác nhận chậm",
    "rate": 1,
    "display_order": 50,
    "type": 2,
    "id": 118
  },
  {
    "content": "Sai/thiếu món",
    "rate": 1,
    "display_order": 60,
    "type": 2,
    "id": 119
  },
  {
    "content": "Hết món",
    "rate": 1,
    "display_order": 70,
    "type": 2,
    "id": 120
  },
  {
    "content": "Đóng gói không cẩn thận",
    "rate": 2,
    "display_order": 10,
    "type": 2,
    "id": 107
  },
  {
    "content": "Không đúng như hình",
    "rate": 2,
    "display_order": 20,
    "type": 2,
    "id": 108
  },
  {
    "content": "Không vệ sinh",
    "rate": 2,
    "display_order": 30,
    "type": 2,
    "id": 109
  },
  {
    "content": "Vẫn nhận dụng cụ ăn uống",
    "rate": 2,
    "display_order": 35,
    "type": 2,
    "id": 130
  },
  {
    "content": "Giá cao hơn tại quán",
    "rate": 2,
    "display_order": 40,
    "type": 2,
    "id": 110
  },
  {
    "content": "Xác nhận chậm",
    "rate": 2,
    "display_order": 50,
    "type": 2,
    "id": 111
  },
  {
    "content": "Sai/thiếu món",
    "rate": 2,
    "display_order": 60,
    "type": 2,
    "id": 112
  },
  {
    "content": "Hết món",
    "rate": 2,
    "display_order": 70,
    "type": 2,
    "id": 113
  },
  {
    "content": "Đóng gói không cẩn thận",
    "rate": 3,
    "display_order": 10,
    "type": 2,
    "id": 100
  },
  {
    "content": "Không đúng như hình",
    "rate": 3,
    "display_order": 20,
    "type": 2,
    "id": 101
  },
  {
    "content": "Không vệ sinh",
    "rate": 3,
    "display_order": 30,
    "type": 2,
    "id": 102
  },
  {
    "content": "Vẫn nhận dụng cụ ăn uống",
    "rate": 3,
    "display_order": 35,
    "type": 2,
    "id": 131
  },
  {
    "content": "Giá cao hơn tại quán",
    "rate": 3,
    "display_order": 40,
    "type": 2,
    "id": 103
  },
  {
    "content": "Xác nhận chậm",
    "rate": 3,
    "display_order": 50,
    "type": 2,
    "id": 104
  },
  {
    "content": "Sai/thiếu món",
    "rate": 3,
    "display_order": 60,
    "type": 2,
    "id": 105
  },
  {
    "content": "Hết món",
    "rate": 3,
    "display_order": 70,
    "type": 2,
    "id": 106
  },
  {
    "content": "Đóng gói không cẩn thận",
    "rate": 4,
    "display_order": 10,
    "type": 2,
    "id": 93
  },
  {
    "content": "Không đúng như hình",
    "rate": 4,
    "display_order": 20,
    "type": 2,
    "id": 94
  },
  {
    "content": "Không vệ sinh",
    "rate": 4,
    "display_order": 30,
    "type": 2,
    "id": 95
  },
  {
    "content": "Vẫn nhận dụng cụ ăn uống",
    "rate": 4,
    "display_order": 35,
    "type": 2,
    "id": 132
  },
  {
    "content": "Giá cao hơn tại quán",
    "rate": 4,
    "display_order": 40,
    "type": 2,
    "id": 96
  },
  {
    "content": "Xác nhận chậm",
    "rate": 4,
    "display_order": 50,
    "type": 2,
    "id": 97
  },
  {
    "content": "Sai/thiếu món",
    "rate": 4,
    "display_order": 60,
    "type": 2,
    "id": 98
  },
  {
    "content": "Hết món",
    "rate": 4,
    "display_order": 70,
    "type": 2,
    "id": 99
  },
  {
    "content": "Món ngon",
    "rate": 5,
    "display_order": 10,
    "type": 2,
    "id": 90
  },
  {
    "content": "Gói đẹp",
    "rate": 5,
    "display_order": 20,
    "type": 2,
    "id": 91
  },
  {
    "content": "Giá tốt",
    "rate": 5,
    "display_order": 30,
    "type": 2,
    "id": 92
  }
]

const defaultData = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  data: {}
}

export const metadataSlice = createSlice({
  name: 'metadata',
  initialState: defaultData,
  reducers: {
    clearMetadataState: (state) => {
      state.isFetching = false
      state.isSuccess = false
      state.isError = false
      state.errorMessage = ''
    },
    clearMetadata: (state) => {
      return defaultData
    }
  },
  extraReducers: {
    [fetchMetadata.pending]: (state) => {
      state.isFetching = true
      state.isSuccess = false
      state.isError = false
    },
    [fetchMetadata.rejected]: (state, {payload}) => {
      state.isFetching = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload
    },
    [fetchMetadata.fulfilled]: (state, {payload}) => {
      state.isFetching = false
      state.isSuccess = true
      state.isError = false

      let _categories = {}
      for (let i = 0; i < payload.categories.length; i++) {
        const category = payload.categories[i]
        _categories[category.id] = category.name
      }

      state.data = {
        ...payload,
        _categories,
        feedbackReason,
      }
    },
  }
})

export const {clearMetadataState, clearMetadata} = metadataSlice.actions
export const metadataSelector = (state) => state.metadata