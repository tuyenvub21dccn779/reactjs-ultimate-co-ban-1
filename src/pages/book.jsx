import { useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import { fetchAllBookAPI } from "../services/api.service";
import CreateBookControl from "../components/book/create.book.control";

const BookPage = () => {
    const [dataBooks, setDataBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    //empty array => run once
    // not empty => next value !== prev value
    useEffect(() => {
        loadBook();
    },[current, pageSize]); //[] + condition

    const loadBook = async () => {
        const res = await fetchAllBookAPI(current, pageSize);
        if(res.data) {
            setDataBooks(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
        
    }


    return (
        <div style={{ padding: "20px" }}>
            
            <BookTable 
                dataBooks={dataBooks} 
                loadBook={loadBook} 
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
            />
        </div>
    )
}

export default BookPage;