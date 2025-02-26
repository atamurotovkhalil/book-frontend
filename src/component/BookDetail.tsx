import { Link, useParams } from "react-router";
import { useBookStore } from "../Stores/book-store";
import React, { useEffect, useState } from "react";
import { server_api } from "../config";
type Props = {};

const BookDetail = (props: Props) => {
  const [edit, setEdit] = useState(false);
  const getCurrentBook = useBookStore((state) => state.getCurrentBook);
  const getAllBooks = useBookStore((state) => state.getAllBooks);
  const CurrentBook = useBookStore((state: any) => state.CurrentBook);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    sold: "",
    quantity: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (CurrentBook) {
      setFormData({
        title: CurrentBook.title || "",
        author: CurrentBook.author || "",
        description: CurrentBook.description || "",
        price: CurrentBook.price || "",
        sold: CurrentBook.sold || "",
        quantity: CurrentBook.quantity || "",
      });
    }
  }, [CurrentBook]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Failed to create ${response.statusText}`);
      }
      if (id) {
        getCurrentBook(id);
      }
    } catch (error) {
      console.log(error);
    }
    setFormData({
      title: "",
      author: "",
      description: "",
      price: "",
      sold: "",
      quantity: "",
    });
  };

  const deleteBook = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/books/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Not Found ${response.statusText}`);
      }
      getAllBooks("page", 1);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      getCurrentBook(id);
    }
  }, [id, getCurrentBook]);
  return (
    <div>
      <div>
        <div className="m-10">
          <div className="">
            <div className="border border-black w-[50%] mx-auto rounded-xl p-3 m-3">
              <img
                src={
                  CurrentBook.images?.[0]
                    ? `${server_api.replace(
                        /\/$/,
                        ""
                      )}/${CurrentBook.images?.[0]
                        .split("/")
                        .map(encodeURIComponent)
                        .join("/")}`
                    : "default-placeholder.jpg"
                }
              />
              <p className="text-lg m-1 font-bold">
                Title: {CurrentBook.title}
              </p>
              <p className="text-lg m-1 font-bold">
                Author: {CurrentBook.author}
              </p>
              <p className="text-lg m-1 font-bold">
                Description: {CurrentBook.description}
              </p>
              <p className="text-lg m-1 font-bold">Sold: {CurrentBook.sold}</p>
              <p className="text-lg m-1 font-bold">
                Quantity {CurrentBook.quantity}
              </p>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setEdit(true)}
                  className="bg-green-500 hover:bg-green-600  px-3 py-1 m-1 rounded-md"
                >
                  Edit
                </button>
                <Link to="/allbooks">
                  <button
                    onClick={() => deleteBook(CurrentBook._id)}
                    className="bg-red-500  hover:bg-red-600 px-3 py-1 m-1 rounded-md"
                  >
                    Delete
                  </button>
                </Link>
              </div>
            </div>
            {edit && (
              <div className="border w-[50%] mx-auto p-3 rounded-md">
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      name="title"
                      type="text"
                      placeholder="Title Of the book"
                      value={formData.title}
                      onChange={handleChange}
                      className="m-2 flex justify-center mx-auto p-2 border rounded-md w-[90%]"
                    />
                  </div>
                  <div>
                    <input
                      name="author"
                      type="text"
                      placeholder="Author Of the book"
                      value={formData.author}
                      onChange={handleChange}
                      className="m-2 flex justify-center mx-auto p-2 border rounded-md w-[90%]"
                    />
                  </div>
                  <div>
                    <input
                      name="description"
                      type="text"
                      placeholder="Description Of the book"
                      value={formData.description}
                      onChange={handleChange}
                      className="m-2 flex justify-center mx-auto p-2 border rounded-md w-[90%]"
                    />
                  </div>
                  <div>
                    <input
                      name="price"
                      type="number"
                      placeholder="Price Of the book"
                      value={formData.price}
                      onChange={handleChange}
                      className="m-2 flex justify-center mx-auto p-2 border rounded-md w-[90%]"
                    />
                  </div>
                  <div>
                    <input
                      name="sold"
                      type="number"
                      placeholder="Sold number"
                      value={formData.sold}
                      onChange={handleChange}
                      className="m-2 flex justify-center mx-auto p-2 border rounded-md w-[90%]"
                    />
                  </div>
                  <div>
                    <input
                      name="quantity"
                      type="number"
                      placeholder="Quantity Of the book"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="m-2 flex justify-center mx-auto p-2 border rounded-md w-[90%]"
                    />
                  </div>
                  <button className="m-1 flex items-center justify-center p-2 bg-green-500 hover:bg-green-600 rounded-md w-[90%] mx-auto text-center">
                    Submit
                  </button>
                </form>
                <button
                  onClick={() => setEdit(false)}
                  className="m-1 flex items-center justify-center p-2 bg-gray-500 hover:bg-gray-600 rounded-md w-[90%] mx-auto text-center"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
