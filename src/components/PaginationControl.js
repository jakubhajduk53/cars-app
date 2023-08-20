import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../store";
import { createSelector } from "@reduxjs/toolkit";

const getPageState = (state) => state.page;
const selectPage = createSelector([getPageState], (page) => page);

function PaginationControl() {
  const dispatch = useDispatch();

  const { currentPage, totalPages } = useSelector(selectPage);

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
    <div className="flex justify-center items-center fixed w-full left-0 bottom-0 z-20 bg-white py-4 ">
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
  );
}

export default PaginationControl;
