import CarsListItem from "./CarsListItem";
import PaginationControl from "./PaginationControl";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchYourCars } from "../store";
import { createSelector } from "@reduxjs/toolkit";

const getCars = (state) => state.cars.carsList;
const selectCars = createSelector([getCars], (carsList) => carsList);

const getIsLoaded = (state) => state.cars.isLoaded;
const selectIsLoaded = createSelector([getIsLoaded], (isLoaded) => isLoaded);

const getPageState = (state) => state.page;
const selectPage = createSelector([getPageState], (page) => page);

const checkUser = (state) => state.user.user;
const selectUser = createSelector([checkUser], (user) => user);

function YourCarsList(props) {
  const dispatch = useDispatch();

  const cars = useSelector(selectCars);

  const user = useSelector(selectUser);

  const isLoaded = useSelector(selectIsLoaded);

  const { id: userId } = user || {};

  const { currentPage, firstItemOnPage, lastItemOnPage, totalPages } =
    useSelector(selectPage);

  useEffect(() => {
    if (userId)
      dispatch(
        fetchYourCars({
          first: firstItemOnPage,
          last: lastItemOnPage,
          userId: userId,
        })
      );
  }, [currentPage, userId, props.closeModal]);

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 m-8">
        {cars.length > 0 ? (
          cars.map((car) => (
            <CarsListItem
              key={car.id}
              car={car}
              yourCar={true}
              openModal={props.openModal}
            />
          ))
        ) : isLoaded && cars.length === 0 ? (
          <p>We are sorry! You don't have cars in your account</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {totalPages > 0 ? <PaginationControl /> : null}
    </div>
  );
}

export default YourCarsList;
