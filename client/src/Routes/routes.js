import { CalendarOutlined, UserOutlined } from "@ant-design/icons";

import { Calender } from "../features/calender/Calender";
import Doctors from "../features/doctors/Doctors";
import MyAppointments from "../features/myAppointments/MyAppointments";
import RegisterComponent from "../Components/RegisterComponent";
import LoginComponent from "../Components/LoginComponent";

const routes = [
  {
    title: "Doctors",
    icon: UserOutlined,
    path: "/",
    component: Doctors,
    visibleOnMenu: true,
  },
  {
    title: "My Appointments",
    icon: CalendarOutlined,
    path: "/myappointments",
    component: MyAppointments,
    visibleOnMenu: true,
  },
  {
    title: "Book an Appointment",
    icon: CalendarOutlined,
    path: "/book",
    component: Calender,
    visibleOnMenu: false,
  },
  {
    title: "Register",
    icon: UserOutlined,
    path: "/register",
    component: RegisterComponent,
    visibleOnMenu: true,
  },
  {
    title: "Login",
    icon: UserOutlined,
    path: "/login",
    component: LoginComponent,
    visibleOnMenu: true,
  },
];

export default routes;
