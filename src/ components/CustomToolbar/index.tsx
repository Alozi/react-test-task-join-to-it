import type { ToolbarProps, View } from "react-big-calendar";
import styles from "./CustomToolbar.module.css";
import { type Event } from "../../types/event";

export default function CustomToolbar(props: ToolbarProps<Event, object>) {
  const { label, onNavigate, onView } = props;

  const goToBack = () => onNavigate("PREV");
  const goToNext = () => onNavigate("NEXT");
  const goToToday = () => onNavigate("TODAY");

  const setView = (view: View) => {
    onView(view);
  };

  return (
    <header className={styles.toolbar}>
      <div className={styles.toolbarTop}>
        <h1>Calendar View</h1>
        <nav>
          <button onClick={() => setView("month")}>Month</button>
          <button onClick={() => setView("week")}>Week</button>
          <button onClick={() => setView("day")}>Day</button>
          <button onClick={() => setView("agenda")}>Agenda</button>
        </nav>
      </div>

      <div className={styles.toolbarBottom}>
        <nav>
          <button onClick={goToToday}>Today</button>
          <button onClick={goToBack}>Back</button>
          <button onClick={goToNext}>Next</button>
        </nav>

        <h2>{label}</h2>
      </div>
    </header>
  );
}
