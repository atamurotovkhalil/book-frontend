import { Link } from "react-router";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="bg-[#35BCB5]">
      <div className="mx-10 flex justify-center gap-5 p-2 items-center">
        <div className="text-gray-600 border-b-2 border-black">
          <Link
          to='/allbooks'
          >All Books</Link>
        </div>
        <div className="text-gray-600 border-b-2 border-black">
          <Link
          to='/createbook'
          >Create Book</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
