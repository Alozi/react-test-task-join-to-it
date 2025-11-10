import CalendarComponent from "./ components/Calendar";
import "./styles/fonts.css";

function App() {
  return (
    <div
      style={{
        height: "calc(100vh - 40px)",
        width: "calc(100vw - 40px)",
        padding: "20px",
      }}
    >
      <CalendarComponent />
    </div>
  );
}

export default App;
