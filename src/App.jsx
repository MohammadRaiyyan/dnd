import "./App.css";
import VerticalDnD from "./components/VerticalDnD";
const customItems = Array.from({ length: 10 }, (v, k) => ({
  id: `id-${k}`,
  content: `Custom Item ${k}`,
}));

function CustomItemRenderer({ item }) {
  return (
    <div
      style={{
        color: "#545454",
        background: "white",
        borderRadius: "6px",
        padding: "10px",
        marginBottom: "8px",
        width: "250px",
        minHeight: "100px",
        boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      }}
    >
      {item.content}
    </div>
  );
}
function App() {
  return (
    <div className="app">
      <VerticalDnD
        initialItems={customItems}
        itemRenderer={CustomItemRenderer}
      />
    </div>
  );
}

export default App;
