import * as yup from "yup";

export const introudctionSchema = yup.object().shape({
  firstName: yup.string().required("Field is required"),
  lastName: yup.string().required("Field is required"),
  jobTitle: yup.string().required("Field is required"),
  email: yup.string().email().required("Field is required"),
  phone: yup.string().required("Field is required"),
  address: yup.string().required("Field is required"),
});
