import Button from "./Button";
import CarsListItem from "./CarsListItem";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars, changePage } from "../store";
import { createSelector } from "@reduxjs/toolkit";

const getCars = (state) => state.cars.carsList;
const selectCars = createSelector([getCars], (carsList) => carsList);

const getPageState = (state) => state.page;
const selectPage = createSelector([getPageState], (page) => page);

function CarsList(props) {
  const dispatch = useDispatch();

  const cars = useSelector(selectCars);

  const {
    currentPage,
    searchTerm,
    firstItemOnPage,
    lastItemOnPage,
    totalPages,
  } = useSelector(selectPage);

  useEffect(() => {
    dispatch(
      fetchCars({
        first: firstItemOnPage,
        last: lastItemOnPage,
        term: searchTerm,
      })
    );
  }, [currentPage, searchTerm]);

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
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 m-8">
        {cars.map((car) => (
          <CarsListItem key={car.id} car={car} openModal={props.openModal} />
        ))}
      </div>
      {totalPages > 0 ? (
        <div className="flex justify-center items-center fixed w-full bottom-0 z-20 py-4 bg-white">
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
    </>
  );
}

export default CarsList;
