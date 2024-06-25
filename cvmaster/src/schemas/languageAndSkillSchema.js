import * as yup from "yup";

export const languageAndSkillSchema = yup.object().shape({
  // languages: yup.array().of(
  //   yup.object().shape({
  //     language: yup.string().required("This field is required"),
  //   }),
  // ),
});
