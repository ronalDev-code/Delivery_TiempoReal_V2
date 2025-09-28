import React from "react";

interface Props {
  orderHistory: any[];
}

const OrdersPage: React.FC<Props> = ({ orderHistory }) => {
  return (
    <div id="orders" className="p-10">
      <h2 className="text-3xl font-extrabold font-poppins mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        📦 Mis Pedidos
      </h2>

      {orderHistory.length === 0 ? (
        <p className="text-gray-700 font-roboto">No tienes pedidos aún.</p>
      ) : (
        <div className="space-y-4">
          {orderHistory.map((order) => (
            <div
              key={order.id}
              className="shadow-lg rounded-xl p-4"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #fbcfe8 0%, #c4b5fd 100%)",
              }}
            >
              <h3 className="font-poppins font-bold text-lg mb-1">
                Pedido #{order.id}
              </h3>
              <p className="text-gray-700 mb-1 font-roboto">
                Fecha:{" "}
                {order.createdAt?.toDate
                  ? order.createdAt.toDate().toLocaleString()
                  : "Fecha no disponible"}
              </p>

              <p className="font-medium text-green-600 mb-2 font-roboto">
                ✅ {order.status}
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1 text-gray-800 font-roboto">
                {order.items.map((item: any) => (
                  <li key={item.id}>
                    {item.name} x{item.quantity} – S/{" "}
                    {(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="font-bold mt-4 text-lg bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500 font-roboto">
                Total: S/ {(order.total + 5).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
