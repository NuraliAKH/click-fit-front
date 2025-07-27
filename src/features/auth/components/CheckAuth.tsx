import React, { ReactElement, FC } from "react";
import { Identifier } from "../../../types/Identifier";

type ComponentWithUserId = FC<{ userId: Identifier }>;

interface CheckAuthProps {
  children: ReactElement<any, ComponentWithUserId>;
}

export const CheckAuth: FC<CheckAuthProps> = ({ children }) => {
  return React.cloneElement(children);
};
