import type { ToolbarProps, View } from "react-big-calendar";
import styles from "./CustomToolbar.module.css";
import { type Event } from "../../types/event";

export default function CustomToolbar(props: ToolbarProps<Event, object>) {
  const { label, onNavigate, onView, view } = props;

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
          <button
            className={view === "month" ? styles.active : ""}
            onClick={() => setView("month")}
          >
            Month
          </button>
          <button
            className={view === "week" ? styles.active : ""}
            onClick={() => setView("week")}
          >
            Week
          </button>
          <button
            className={view === "day" ? styles.active : ""}
            onClick={() => setView("day")}
          >
            Day
          </button>
          <button
            className={view === "agenda" ? styles.active : ""}
            onClick={() => setView("agenda")}
          >
            Agenda
          </button>
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
