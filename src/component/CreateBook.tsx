import { useState } from "react";
import { useBookStore } from "../Stores/book-store";
type Props = {};

const CreateBook = (props: Props) => {
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    sold: "",
    quantity: "",
  });

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //console.log(formData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("author", formData.author);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("sold", formData.sold);
    formDataToSend.append("quantity", formData.quantity);
    for (let i = 0; i < images.length; i++) {
      formDataToSend.append("images", images[i]);
    }

    for (const [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }
    try {
      const response = await fetch("http://localhost:3000/api/books", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error(`Failed to create ${response.statusText}`);
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

  //console.log(images)
  return (
    <div className="bg-gray-100">
      <div className="p-10">
        <div className="border rounded-xl w-[50%] mx-auto">
          <div className="p-5 ">
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
              <div>
                <input
                  type="file"
                  placeholder="Image Of the book"
                  name="images"
                  multiple
                  onChange={handleImage}
                  className="m-2 flex justify-center mx-auto p-2 border rounded-md w-[90%]"
                />
              </div>
              <button
                type="submit"
                className=" flex items-center justify-center p-2 bg-green-500 hover:bg-green-600 rounded-md w-[90%] mx-auto text-center"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
