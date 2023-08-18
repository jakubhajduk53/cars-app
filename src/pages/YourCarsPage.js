import { YourCarsList, EditCar } from "../components/";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAmountOfYourCars } from "../store";
import { createSelector } from "@reduxjs/toolkit";
import ReactModal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

const checkUser = (state) => state.user.user;

const selectUser = createSelector([checkUser], (user) => user);

function YourCarsPage() {
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const user = useSelector(selectUser);

  const { id: userId } = user || {};

  useEffect(() => {
    if (userId) {
      dispatch(fetchAmountOfYourCars({ userId }));
    }
  }, [user]);

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
        className="absolute max-h-screen left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-5 z-20 bg-white overflow-y-auto rounded-lg shadow-lg "
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-20 "
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
      <YourCarsList openModal={openModal} closeModal={closeModal} />
    </div>
  );
}

export default YourCarsPage;
