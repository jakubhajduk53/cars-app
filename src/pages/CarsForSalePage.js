import CarsList from "../components/CarsList";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAmountOfCars } from "../store/slices/carsSlice";
import ReactModal from "react-modal";
import Contact from "../components/Contact";
import { AiOutlineClose } from "react-icons/ai";
import { createSelector } from "@reduxjs/toolkit";

const getCarsAmount = (state) => state.cars.carsAmount;

const selectCarsAmount = createSelector(
  [getCarsAmount],
  (carsAmount) => carsAmount
);

function CarsForSalePage() {
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const amount = useSelector(selectCarsAmount);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    dispatch(fetchAmountOfCars({ term: "" }));
  }, []);

  useEffect(() => {
    if (amount >= 0) {
      setIsLoading(false);
    }
  }, [amount]);

  return (
    <div className="w-full">
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="shadow-lg bg-white rounded-lg w-[30rem] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        ariaHideApp={false}
      >
        <div className="flex relative py-12">
          <AiOutlineClose
            className="text-red-500 text-xl cursor-pointer absolute top-2 right-2"
            onClick={closeModal}
          />
          <Contact closeModal={closeModal} />
        </div>
      </ReactModal>

      <SearchBar />
      {!isLoading ? <CarsList openModal={openModal} /> : <p>Loading...</p>}
    </div>
  );
}

export default CarsForSalePage;
