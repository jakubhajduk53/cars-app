import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { fetchAmountOfYourCars } from "../store";
import { useEffect, useState } from "react";
import YourCarsList from "../components/YourCarsList";
import ReactModal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import EditCar from "../components/EditCar";

const getCarsAmount = (state) => state.cars.carsAmount;

const selectCarsAmount = createSelector(
  [getCarsAmount],
  (carsAmount) => carsAmount
);

const checkUser = (state) => state.user.user;

const selectUser = createSelector([checkUser], (user) => user);

function YourCarsPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const amount = useSelector(selectCarsAmount);

  const user = useSelector(selectUser);

  const { id: userId } = user || {};

  useEffect(() => {
    if (userId) {
      dispatch(fetchAmountOfYourCars({ userId }));
    }
  }, [user]);

  useEffect(() => {
    if (amount >= 0) {
      setIsLoading(false);
    }
  }, [amount]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="z-20 shadow-lg bg-white p-5 max-h-screen overflow-y-auto rounded-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        overlayClassName="z-20 fixed inset-0 bg-black bg-opacity-50"
        ariaHideApp={false}
      >
        <div className="flex relative py-12">
          <AiOutlineClose
            className="text-red-500 text-xl cursor-pointer absolute top-2 right-2"
            onClick={closeModal}
          />
          <EditCar closeModal={closeModal} />
        </div>
      </ReactModal>
      {!isLoading ? (
        <YourCarsList openModal={openModal} closeModal={closeModal} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default YourCarsPage;
