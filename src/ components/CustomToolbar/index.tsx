import type { ToolbarProps, View } from "react-big-calendar";
import styles from "./CustomToolbar.module.css";

export default function CustomToolbar(toolbar: ToolbarProps) {
  const goToBack = () => toolbar.onNavigate("PREV");
  const goToNext = () => toolbar.onNavigate("NEXT");
  const goToToday = () => toolbar.onNavigate("TODAY");

  const setView = (view: View) => {
    toolbar.onView(view);
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

        <h2>{toolbar.label}</h2>
      </div>
    </header>
  );
}
