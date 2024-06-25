import * as yup from "yup";

export const educationSchema = yup.object().shape({
    instituteName: yup.string().required("Field is required"),
    degree: yup.string().required("Field is required"),
    instituteLocation: yup.string().required("Field is required"),
    graduationMonth: yup.string().required("Field is required"),
    graduationYear: yup.string().required("Field is required"),
});
