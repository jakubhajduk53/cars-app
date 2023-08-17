import { CarsList, SearchBar, Contact } from "../components/";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAmountOfCars } from "../store/slices/carsSlice";
import ReactModal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

function CarsForSalePage() {
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    dispatch(fetchAmountOfCars({ term: "" }));
  }, []);

  return (
    <div className="w-full">
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
          <Contact closeModal={closeModal} />
        </div>
      </ReactModal>
      <SearchBar />
      <CarsList openModal={openModal} />
    </div>
  );
}

export default CarsForSalePage;
