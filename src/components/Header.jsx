
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { cart } = useCart();
  return (
    <header>
      <div className="container mx-auto px-8 md:px-12 py-8 md:py-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold hidden md:flex">
            ЛОГО
          </Link>
          <Link
            to="/"
            className="relative after:absolute after:bg-black after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300"
          >
            <h1 className="text-2xl">КАТАЛОГ</h1>
          </Link>
          <Link to="/cart" className="flex items-center justify-center">
            {cart.length > 0 && (
              <span className=" bg-red-500 text-white rounded-full px-2 text-xs ">
                {cart.length}
              </span>
            )}
            <IoCartOutline className="size-10" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
