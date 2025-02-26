import { useEffect, useState } from "react";
import { useBookStore } from "../Stores/book-store";
import { Book } from "../Types/book";
import { server_api } from "../config";
import { Link } from "react-router";
type Props = {};

const AllBook = (props: Props) => {
  const [page, setPage] = useState(1);
  const AllBooks = useBookStore((state) => state.AllBooks);
  const getAllBooks = useBookStore((state) => state.getAllBooks);
  const [search, setSearch] = useState("");

  const searchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searching = () => {
    getAllBooks("keyword", search);
  };
  useEffect(() => {
    getAllBooks("page", page);
  }, [page]);
  console.log(AllBooks);

  return (
    <div className="m-10">
      <div className="shadow-xl gap-3 p-3 m-3">
        <input onChange={searchTerm} className="rounded-md border p-2 mx-2" />
        <button
          onClick={searching}
          className=" rounded-md bg-blue-400 p-2 mx-2"
        >
          Search
        </button>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-1 grid-cols-1">
        {AllBooks?.map((book: Book) => (
          <Link to={`/bookdetail/${book._id}`}>
            <div className="border border-black rounded-xl p-3 m-3">
              <img
                src={
                  book.images?.[0]
                    ? `${server_api.replace(/\/$/, "")}/${book.images?.[0]
                        .split("/")
                        .map(encodeURIComponent)
                        .join("/")}`
                    : "default-placeholder.jpg"
                }
                className="m-1"
              ></img>
              <p>Title: {book?.title}</p>
              <p>Author:{book?.author}</p>
              <p>Description:{book?.description}</p>
              <p>Sold: {book?.sold}</p>
              <p>Quantity: {book?.quantity}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="rounded-md bg-gray-200 hover:bg-gray-400 px-3 py-2 space-x-3"
        >
          Prev
        </button>
        <span>{page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="rounded-md bg-gray-200 hover:bg-gray-400 px-3 py-2 space-x-3"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllBook;
