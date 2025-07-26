import React, { ReactElement, FC } from "react";
import { Identifier } from "../../../types/Identifier";
import LoginPage from "../pages/LoginPage";
import { Text } from "react-native";

type ComponentWithUserId = FC<{ userId: Identifier }>;

interface CheckAuthProps {
  children: ReactElement<any, ComponentWithUserId>;
}

export const CheckAuth: FC<CheckAuthProps> = ({ children }) => {
  return React.cloneElement(children);
};
