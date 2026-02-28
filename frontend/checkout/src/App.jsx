import Checkout from "./pages/Checkout";

function App() {
  const sampleOrder = { id: "order_1234567890abcd", amount: 1000 };
  return <Checkout order={sampleOrder} />;
}

export default App;
