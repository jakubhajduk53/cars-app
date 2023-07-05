import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { fetchYourCars, fetchAmountOfYourCars } from "../store";
import { useEffect } from "react";
import { changePage } from "../store";

const getCars = (state) => state.cars.carsList;

const selectCars = createSelector([getCars], (carsList) => carsList);

const getPageState = (state) => state.page;

const selectPage = createSelector([getPageState], (page) => page);

const getCarsAmount = (state) => state.cars.carsAmount;

const selectCarsAmount = createSelector(
  [getCarsAmount],
  (carsAmount) => carsAmount
);

const checkUser = (state) => state.user.user;

const selectUser = createSelector([checkUser], (user) => user);

function YourCars() {
  const dispatch = useDispatch();

  const amount = useSelector(selectCarsAmount);

  const cars = useSelector(selectCars);

  const user = useSelector(selectUser);

  const { id: userId } = user || {};

  const { currentPage, firstItemOnPage, lastItemOnPage, totalPages } =
    useSelector(selectPage);

  useEffect(() => {
    if (userId) {
      dispatch(fetchAmountOfYourCars({ userId }));
      dispatch(
        fetchYourCars({
          first: firstItemOnPage,
          last: lastItemOnPage,
          userId: userId,
        })
      );
    }
  }, [user]);

  return (
    <div>
      {cars.length > 0 ? (
        <div>
          {cars.map((car) => {
            return <div key={car.id}>{car.name}</div>;
          })}
        </div>
      ) : null}
    </div>
  );
}

export default YourCars;
