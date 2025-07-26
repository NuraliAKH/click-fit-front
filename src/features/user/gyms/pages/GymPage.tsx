import React from "react";
import GymListComponent from "../components/GymListComponent";
import { useGyms } from "../hooks";

const GymsPage = () => {
  const { data: gyms, isLoading } = useGyms();
  return <GymListComponent gyms={gyms} isLoading={isLoading} />;
};

export default GymsPage;
