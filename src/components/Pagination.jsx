import { useContext } from "react";
import ReactPaginate from "react-paginate";
import { PictureContext } from '../service'
import { useLocation } from "react-router-dom";

export const Pagination = ({ getPageCount,searchValue }) => {
    const params = useLocation();
    const currentPath = params.pathname;
    const { setCurrentPage, setSearchCurrentPage, setFavoriteCurrentPage, setWatchCurrentPage } = useContext(PictureContext)
    const getCurrentPage = (e) => {
        if (searchValue !== "") {
            setSearchCurrentPage(e.selected + 1)
        } else if (currentPath === '/favorites') {
            setFavoriteCurrentPage(e.selected + 1)
        } else if (currentPath === '/watch_later') {
            setWatchCurrentPage(e.selected + 1)
        } else {
            setCurrentPage(e.selected + 1)
        }
    }
    return (
        <ReactPaginate
            className="pagin"
            breakLabel="..."
            nextLabel=">>"
            onPageChange={e => getCurrentPage(e)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            pageCount={Math.ceil(getPageCount) || 1}
            previousLabel="<<"
            renderOnZeroPageCount={null}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
        />
    );
}
