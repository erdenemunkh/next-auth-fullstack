import * as yup from "yup";

export const userSchema = yup.object({
    email: yup
        .string()
        .email("Цахим шуудангийн хаягаа зөв бичнэ үү")
        .required("Цахим шуудангийн хаягаа оруулна уу"),
    password: yup.string().required("Нууц үгээ оруулна уу"),
});