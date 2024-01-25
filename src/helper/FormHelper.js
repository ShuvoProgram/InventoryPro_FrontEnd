import { toast } from "react-hot-toast";
let EmailRegex = /\S+@\S+\.\S+/;
let MobileRegex = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;

class FormHelper {
  IsEmpty(value) {
    return value.length === 0;
  }

  IsMobile(value) {
    return MobileRegex.test(value);
  }

  IsEmail(value) {
    return !EmailRegex.test(value);
  }

  ErrorToast(msg) {
    toast.error(msg, { position: "bottom-center" });
  }

  SuccessToast(msg) {
    toast.success(msg, { position: "bottom-center" });
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}

export const {
  IsEmpty,
  IsMobile,
  IsEmail,
  ErrorToast,
  getBase64,
  SuccessToast,
} = new FormHelper();
