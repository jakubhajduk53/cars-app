import * as Yup from "yup";

export const changeEmailValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const changePasswordValidationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Repeat password is required"),
});

export const changeUserDataValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.string().matches(
    /^\d{7,15}$/,
    "Invalid phone number. Phone number should contain 7 to 15 digits"
  ),
});

export const contactValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  inquiryType: Yup.string().required("Inquiry type is required"),
  comment: Yup.string().required("Comment is required"),
});

const currentYear = new Date().getFullYear();

export const editCarValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Car name is required")
    .matches(/^[\p{L}\d\s-]+$/u, "Incorrect value")
    .min(6, "Name should contain more than 5 characters")
    .max(25, "Name cannot be longer than 24 characters"),
  year_of_production: Yup.number()
    .required("Year of production is required")
    .positive("Year of production must be a positive number")
    .min(1901, "Year must be higher than 1900")
    .max(currentYear, `Year cannot be higher than ${currentYear}`),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .max(100000000, "Price cannot be higher than 100mln $"),
  location: Yup.string()
    .required("Location is required")
    .matches(/^[\p{L}\d\s]+$/u, "Incorrect value")
    .min(4, "Location should contain more than 3 characters")
    .max(30, "Location cannot be longer than 30 characters"),

  image_url: Yup.mixed().required("Image is required"),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const registerValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name cannot be shorter than 2 letters")
    .max(20, "First name cannot be longer than 20 letters")
    .matches(/^[\p{L}\d\s-]+$/u, "Incorrect value"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name cannot be shorter than 2 letters")
    .max(20, "Last name cannot be longer than 20 letters")
    .matches(/^[\p{L}\d\s-]+$/u, "Incorrect value"),
  phoneNumber: Yup.string().matches(
    /^\d{7,15}$/,
    "Invalid phone number. Phone number should contain 7 to 15 digits"
  ),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password should be longer than 5 letters"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Repeat password is required"),
});

export const sellYourCarValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Car name is required")
    .matches(/^[\p{L}\d\s-]+$/u, "Incorrect value")
    .min(6, "Name should contain more than 5 characters")
    .max(25, "Name cannot be longer than 24 characters"),
  year_of_production: Yup.number()
    .required("Year of production is required")
    .positive("Year of production must be a positive number")
    .min(1901, "Year must be higher than 1900")
    .max(currentYear, `Year cannot be higher than ${currentYear}`),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .max(100000000, "Price cannot be higher than 100mln $"),
  location: Yup.string()
    .required("Location is required")
    .matches(/^[\p{L}\d\s-]+$/u, "Incorrect value")
    .min(4, "Location should contain more than 3 characters")
    .max(30, "Location cannot be longer than 30 characters"),

  image_url: Yup.mixed().required("Image is required"),
});
