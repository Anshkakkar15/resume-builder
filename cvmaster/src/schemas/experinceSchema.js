import * as yup from "yup";

export const experienceSchema = yup.object().shape({
  // jobTitle: yup.string().required("Field is required"),
  // employer: yup.string().required("Field is required"),
  // city: yup.string().required("Field is required"),
  // country: yup.string().required("Field is required"),
  // startDate: yup.string().required("Field is required"),
  // endDate: yup.string().when("present", {
  //   is: (value) => value === false,
  //   then: () => yup.string().required("Field is required"),
  //   otherwise: () => yup.string().notRequired(),
  // }),
  // responsibilities: yup.string().required("Field is required"),
});
