import CalendarComponent from "./ components/Calendar";
import "./styles/fonts.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import "./index.css";

function App() {
  return (
    <div className="calendarWrapper">
      <CalendarComponent />
    </div>
  );
}

export default App;
