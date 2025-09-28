import React from "react";

interface Props {
  cart: any[];
  updateQuantity: (id: number, newQuantity: number) => void;
  userInfo: { name: string; phone: string; address: string; email: string };
  setUserInfo: (info: any) => void;
  getTotalPrice: () => number;
  processOrder: () => void;
  setCurrentPage: (page: string) => void;
}

const CartPage: React.FC<Props> = ({
  cart,
  updateQuantity,
  userInfo,
  setUserInfo,
  getTotalPrice,
  processOrder,
  setCurrentPage,
}) => {
  return (
    <div
      id="cart"
      className="p-10 rounded-xl"
      style={{
        backgroundImage: "url(/images/cart-bg2.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-3xl font-extrabold font-poppins mb-6 text-white drop-shadow-lg">
        🛒 Tu Carrito
      </h2>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="mb-4 text-white font-roboto">Tu carrito está vacío.</p>
          <button
            onClick={() => setCurrentPage("menu")}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform font-roboto"
          >
            Ver Menú 🍽️
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white/80 backdrop-blur-sm shadow rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-poppins font-bold">{item.name}</h3>
                  <p className="font-roboto">S/ {item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 bg-gray-200 rounded hover:bg-gray-300 transition font-roboto"
                  >
                    -
                  </button>
                  <span className="font-roboto">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 bg-green-500 text-white rounded hover:bg-green-600 transition font-roboto"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen */}
          <div className="bg-white/80 backdrop-blur-sm shadow rounded-lg p-6">
            <h3 className="font-poppins font-bold text-xl mb-4">📋 Resumen</h3>
            <p className="mb-2 font-roboto">
              Subtotal: <strong>S/ {getTotalPrice().toFixed(2)}</strong>
            </p>
            <p className="mb-4 font-roboto">Delivery: <strong>S/ 5.00</strong></p>
            <p className="text-lg font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 font-roboto">
              Total: S/ {(getTotalPrice() + 5).toFixed(2)}
            </p>

            {/* Formulario de cliente */}
            <div className="mt-4 space-y-2">
              <input
                type="text"
                placeholder="👤 Nombre completo"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
                className="w-full border p-2 rounded font-roboto"
              />
              <input
                type="tel"
                placeholder="📱 Teléfono"
                value={userInfo.phone}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, phone: e.target.value })
                }
                className="w-full border p-2 rounded font-roboto"
              />
              <input
                type="email"
                placeholder="📧 Email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
                className="w-full border p-2 rounded font-roboto"
              />
              <textarea
                placeholder="🏠 Dirección"
                value={userInfo.address}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, address: e.target.value })
                }
                className="w-full border p-2 rounded font-roboto"
              />
            </div>

            <button
              onClick={processOrder}
              disabled={!userInfo.name || !userInfo.phone || !userInfo.address}
              className="w-full mt-4 bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded shadow-lg hover:scale-105 transition-transform disabled:bg-gray-300 font-roboto"
            >
              🚀 Realizar Pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
