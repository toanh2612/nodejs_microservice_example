export default {
  createError: {
    code: 1,
    messages: {
      vi: 'Lỗi tạo dữ liệu.',
      en: 'Create error.'
    }
  },
  readError: {
    code: 2,
    messages: {
      vi: 'Lỗi lấy dữ liệu.',
      en: 'Read error.'
    }
  },
  updateError: {
    code: 3,
    messages: {
      vi: 'Lỗi cập nhật dữ liệu.',
      en: 'Update error.'
    }
  },
  deleteError: {
    code: 4,
    messages: {
      vi: 'Lỗi xóa dữ liệu.',
      en: 'Delete error.'
    }
  },
  curdSuccessServerError: {
    code: 5,
    messages: {
      vi: 'Thành công. Nhưng xảy ra lỗi phía máy chủ.',
      en: 'Successful. But something error on server.'
    }
  },
  crudNotExisted: {
    code: 6,
    messages: {
      vi: 'Dữ liệu không tồn tại.',
      en: 'Data is not existed.'
    }
  },
  crudExisted: {
    code: 7,
    messages: {
      vi: 'Dữ liệu đã tồn tại.',
      en: 'Data is existed.'
    }
  },
  paramsError: {
    code: 8,
    messages: {
      vi: '(params) gửi lên không đúng.',
      en: '(params) is invalid.'
    }
  },
  bodyError: {
    code: 9,
    messages: {
      vi: '(body) gửi lên không đúng.',
      en: '(body) is invalid.'
    }
  },
  authorizationError: {
    code: 10,
    messages: {
      vi: 'Lỗi ủy quyền.',
      en: 'Authorization error.'
    }
  },
  authenticationError: {
    code: 11,
    messages: {
      vi: 'Lỗi xác thực.',
      en: 'authentication error.'
    }
  },
  sqlQueryError: {
    code: 12,
    messages: {
      vi: 'Lỗi truy vấn sql.',
      en: 'SQL query error.'
    }
  },
  loginError: {
    code: 13,
    messages: {
      vi: 'Lỗi đăng nhập.',
      en: 'Login error.'
    }
  },
  tokenExpired: {
    code: 14,
    messages: {
      vi: 'Mã token hết hạn.',
      en: 'Token expired.'
    }
  },
  connectToServerError: {
    code: 15,
    messages: {
      vi: 'Lỗi kết nối đến máy chủ.',
      en: 'Connect to server error.'
    }
  },
  notFound: {
    code: 16,
    messages: {
      vi: 'Không tìm thấy yêu cầu.',
      en: 'Not found.'
    }
  },
  validateError: {
    code: 17
  }
};