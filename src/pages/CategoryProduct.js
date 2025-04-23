import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { fetchUserAddToCart } = useContext(Context);
  const { CategoryName } = useParams();

  const handleAddToCart = async (e, id) => {
    e.preventDefault(); 
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const getCategoryWise = async () => {
    try {
      const res = await fetch(`${SummaryApi.getcategorylist.url}${CategoryName}`, {
        method: SummaryApi.getcategorylist.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await res.json();
      setLoading(false);
      setData(result.data || []);
    } catch (err) {
      console.error('Error fetching category data:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoryWise();
  }, [CategoryName]);

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h1 className="text-2xl font-semibold py-4">{CategoryName}</h1>

      <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="w-full bg-white rounded-sm shadow animate-pulse"
              >
                <div className="bg-slate-200 h-48"></div>
                <div className="p-4 grid gap-3">
                  <div className="h-4 bg-slate-200 rounded-full w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded-full w-1/2"></div>
                  <div className="flex gap-3">
                    <div className="h-4 bg-slate-200 rounded-full w-full"></div>
                    <div className="h-4 bg-slate-200 rounded-full w-full"></div>
                  </div>
                  <div className="h-8 bg-slate-200 rounded-full w-full"></div>
                </div>
              </div>
            ))
          : data.map((product) => (
              <Link
                key={product?._id}
                to={`/product/${product?._id}`}
                className="w-full bg-white rounded-sm shadow hover:shadow-md transition-all"
              >
                <div className="bg-slate-200 h-48 p-4 flex justify-center items-center">
                  <img
                    src={product?.productImage?.[0] || '/placeholder.png'}
                    alt={product?.productName}
                    className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">{product?.category}</p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className="bg-red-600 text-sm hover:bg-red-700 text-white px-2 py-0.5 rounded-full"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryProduct;
