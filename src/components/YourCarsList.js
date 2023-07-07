import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePage, fetchYourCars } from "../store";
import Button from "./Button";
import CarsListItem from "./CarsListItem";
import { createSelector } from "@reduxjs/toolkit";

const getCars = (state) => state.cars.carsList;

const selectCars = createSelector([getCars], (carsList) => carsList);

const getLoading = (state) => state.cars.loading;

const selectLoading = createSelector([getLoading], (loading) => loading);

const getPageState = (state) => state.page;

const selectPage = createSelector([getPageState], (page) => page);

const checkUser = (state) => state.user.user;

const selectUser = createSelector([checkUser], (user) => user);

function CarsList() {
  const dispatch = useDispatch();

  const cars = useSelector(selectCars);

  const user = useSelector(selectUser);

  const loading = useSelector(selectLoading);

  const { id: userId } = user || {};

  const { currentPage, firstItemOnPage, lastItemOnPage, totalPages } =
    useSelector(selectPage);

  useEffect(() => {
    dispatch(
      fetchYourCars({
        first: firstItemOnPage,
        last: lastItemOnPage,
        userId: userId,
      })
    );
  }, [currentPage, cars]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(changePage(currentPage + 1));
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      dispatch(changePage(currentPage - 1));
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 m-8">
        {cars.length > 0 ? (
          cars.map((car) => (
            <CarsListItem key={car.id} car={car} yourCar={true} />
          ))
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <p>We are sorry! You don't have cars in your account</p>
        )}
      </div>
      {totalPages > 0 ? (
        <div className="bottom-bar fixed left-0 bg-neutral-100 bottom-0 w-full bg-white flex justify-center items-center py-4 ">
          <Button
            value="<"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          />
          <p className="mx-2 text-center">
            Page {currentPage} of {totalPages}
          </p>
          <Button
            value=">"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          />
        </div>
      ) : null}
    </div>
  );
}

export default CarsList;
