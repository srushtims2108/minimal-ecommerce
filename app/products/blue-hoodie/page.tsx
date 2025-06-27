'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const images = [
  'https://honesttogod.in/cdn/shop/files/hoodie_flatlays_2_2048x2048.jpg?v=1738082053',
  'https://honesttogod.in/cdn/shop/files/HSP03020_63b0f87c-3272-412d-88f8-0740244af820.jpg?v=1738082053&width=1506',
  'https://honesttogod.in/cdn/shop/files/blue_hoodie_back.jpg?v=1738082053&width=1506',
];

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [size, setSize] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const router = useRouter();

  // 🔁 Check if product+size already in cart
  useEffect(() => {
    if (!size || size === 'Select Size') return;

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const found = cart.find(
      (item: any) => item.id === 'blue-hoodie' && item.size === size
    );

    setAddedToCart(!!found);
  }, [size]);

  const handleAddToCart = () => {
    if (!size || size === 'Select Size') {
      alert('Please select a size!');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const exists = cart.some(
      (item: any) => item.id === 'blue-hoodie' && item.size === size
    );

    if (exists) {
      alert('This product with selected size is already in your cart.');
      setAddedToCart(true);
      return;
    }

    const newItem = {
      id: 'blue-hoodie',
      title: 'Blue Urban Hoodie',
      image: selectedImage,
      price: 1499,
      originalPrice: 2499,
      discount: 40,
      quantity: 1,
      size,
    };

    cart.push(newItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    setAddedToCart(true);
  };

  const handleViewCart = () => {
    router.push('/cart');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* LEFT IMAGE */}
      <div className="md:w-1/2 w-full p-6 flex flex-col items-center justify-center">
        <div className="relative w-full h-[400px] md:h-[500px] border rounded-lg overflow-hidden shadow-md">
          <Image src={selectedImage} alt="Blue Hoodie" fill className="object-contain" />
        </div>
        <div className="flex gap-3 mt-4 flex-wrap justify-center">
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative w-20 h-20 border rounded cursor-pointer ${
                selectedImage === img ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedImage(img)}
            >
              <Image src={img} alt={`thumb-${i}`} fill className="object-cover rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT DETAILS */}
      <div className="md:w-1/2 w-full p-6 md:p-12 flex flex-col justify-center space-y-5">
        <h1 className="text-3xl font-bold text-gray-900">Blue Urban Hoodie</h1>
        <p className="text-xl font-semibold text-green-700">₹1,499.00</p>

        <div>
          <label htmlFor="size" className="block font-medium mb-1 text-gray-800">Size</label>
          <select
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full border p-2 rounded bg-white shadow-sm"
          >
            <option>Select Size</option>
            <option value="S">S (36-38)</option>
            <option value="M">M (38-40)</option>
            <option value="L">L (40-42)</option>
            <option value="XL">XL (42-44)</option>
          </select>
        </div>

        <button
          onClick={addedToCart ? handleViewCart : handleAddToCart}
          className={`w-full py-3 rounded-md font-medium transition shadow-md ${
            addedToCart ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {addedToCart ? 'View Cart' : 'Add to Cart'}
        </button>

        <div className="text-gray-700 text-sm leading-relaxed">
          <p><strong>Description:</strong> A premium urban hoodie crafted from organic cotton. Lightweight, warm, and perfect for layering during cool weather.</p>
          <p><strong>Material:</strong> 100% Cotton blend with brushed interior</p>
          <p><strong>Fit:</strong> Relaxed fit — true to size</p>
        </div>

        <div className="border-t pt-4 mt-4 text-sm text-gray-700">
          <h3 className="font-medium text-lg mb-2">Reviews:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>“Super comfy and stylish!” – ⭐⭐⭐⭐⭐</li>
            <li>“Delivered fast, fits perfectly.” – ⭐⭐⭐⭐</li>
            <li>“Great fabric and stitching.” – ⭐⭐⭐⭐</li>
            <li>“My favorite hoodie now!” – ⭐⭐⭐⭐⭐</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
