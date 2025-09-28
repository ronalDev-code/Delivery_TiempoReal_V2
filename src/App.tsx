import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import WhatsAppButton from "./components/WhatsAppButton";
import WhatsAppChat from "./components/WhatsAppChat";

import { db } from "./firebase";
import { app } from "./firebase"; 
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";

import { getMessaging, getToken } from "firebase/messaging";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [cart, setCart] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [showWhatsAppChat, setShowWhatsAppChat] = useState(false);

  // 📦 Carrito
  const addToCart = (product: any) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getTotalItems = () => cart.reduce((t, i) => t + i.quantity, 0);

  // 🔥 Guardar pedido en Firestore
  const processOrder = async () => {
    if (cart.length === 0) return;

    const newOrder = {
      items: [...cart],
      total: getTotalPrice(),
      userInfo: { ...userInfo },
      status: "Confirmado",
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "orders"), newOrder);
      setCart([]); 
      setUserInfo({ name: "", phone: "", address: "", email: "" });
      alert("¡Pedido realizado con éxito! Te contactaremos pronto.");
      setCurrentPage("orders");
    } catch (error) {
      console.error(error);
      alert("Error al enviar el pedido.");
    }
  };

  // 🔄 Escuchar pedidos en tiempo real y registrar token FCM
  useEffect(() => {
    // Escuchar pedidos
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrderHistory(orders);
    });

    // Pedir permiso y obtener token FCM
    const requestNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const messaging = getMessaging(app);
          const fcmToken = await getToken(messaging, {
            vapidKey:
              "BBKOAkMFRFTC_bijF9TSLBCEl3lKqhHiSzvcazLtX9gSHFf-BOyFaXwvNo51hH2VaUmUWPCsXorgPQYKMoH3Ugg",
          });
          console.log("FCM Token:", fcmToken);

          if (fcmToken) {
            // Guardar token como ID para evitar duplicados
            const tokenRef = doc(db, "tokens", fcmToken);
            await setDoc(tokenRef, {
              token: fcmToken,           // Guardamos token como campo
              createdAt: serverTimestamp() // Marca de tiempo
            });
            console.log("Token guardado o actualizado ✅");
          }
        } else {
          console.log("Permiso de notificaciones denegado ❌");
        }
      } catch (err) {
        console.error("Error solicitando permiso de notificaciones:", err);
      }
    };

    requestNotificationPermission();

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        getTotalItems={getTotalItems}
      />

      <main className="flex-1">
        {currentPage === "home" && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === "menu" && (
          <MenuPage
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            addToCart={addToCart}
          />
        )}
        {currentPage === "cart" && (
          <CartPage
            cart={cart}
            updateQuantity={updateQuantity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            getTotalPrice={getTotalPrice}
            processOrder={processOrder}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === "orders" && <OrdersPage orderHistory={orderHistory} />}
      </main>

      <Footer />

      <WhatsAppButton
        toggleChat={() => setShowWhatsAppChat(!showWhatsAppChat)}
      />
      <WhatsAppChat
        show={showWhatsAppChat}
        toggle={() => setShowWhatsAppChat(false)}
      />
    </div>
  );
};

export default App;
