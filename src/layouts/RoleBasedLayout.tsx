import React from "react";
import UserLayout from "./UserLayout";
import GymOwnerLayout from "./GymOwnerLayout";
import { useUserProfile } from "../features/user/profile/hooks/useUserProfile";

export const RoleBasedLayout = () => {
  const { data } = useUserProfile();
  switch (data?.data.role) {
    case "USER":
      return <UserLayout />;
    case "GYM_OWNER":
      return <GymOwnerLayout />;
    case "ADMIN":
      return <GymOwnerLayout />;
    default:
      return <UserLayout />; // fallback
  }
};
