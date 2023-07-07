import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { fetchAmountOfYourCars } from "../store";
import { useEffect, useState } from "react";
import YourCarsList from "./YourCarsList";

const getCarsAmount = (state) => state.cars.carsAmount;

const selectCarsAmount = createSelector(
  [getCarsAmount],
  (carsAmount) => carsAmount
);

const checkUser = (state) => state.user.user;

const selectUser = createSelector([checkUser], (user) => user);

function YourCars() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const amount = useSelector(selectCarsAmount);

  const user = useSelector(selectUser);

  const { id: userId } = user || {};

  useEffect(() => {
    if (userId) {
      dispatch(fetchAmountOfYourCars({ userId }));
    }
  }, [user]);

  useEffect(() => {
    if (amount > 0) {
      setIsLoading(false);
    }
  }, [amount]);

  return <div>{!isLoading ? <YourCarsList /> : <p>Loading...</p>}</div>;
}

export default YourCars;
