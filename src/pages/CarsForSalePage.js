import CarsList from "../components/CarsList";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAmountOfCars } from "../store/slices/carsSlice";
import ReactModal from "react-modal";
import Contact from "../components/Contact";
import { AiOutlineClose } from "react-icons/ai";

function CarsForSalePage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAmountOfCars({ term: "" }));
  }, []);

  const amount = useSelector(({ cars: { carsAmount } }) => {
    return carsAmount;
  });

  return (
    <div className="w-full">
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal flex items-center justify-center"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
        ariaHideApp={false}
      >
        <div className="modal-content flex bg-white rounded-lg shadow-lg w-80 relative">
          <AiOutlineClose
            className="modal-close text-red-500 cursor-pointer absolute top-2 right-2"
            onClick={closeModal}
          />
          <Contact closeModal={closeModal} />
        </div>
      </ReactModal>

      <SearchBar />
      {amount > -1 ? <CarsList openModal={openModal} /> : <p>Loading...</p>}
    </div>
  );
}

export default CarsForSalePage;
