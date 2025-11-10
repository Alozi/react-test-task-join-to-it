import { useState } from "react";
import {
  Calendar,
  momentLocalizer,
  Views,
  type View,
  type Event as RBCEvent,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./CustomToolbar";
import { calendarFormats } from "../utils/calendarFormats";

const localizer = momentLocalizer(moment);

interface MyEvent extends RBCEvent {
  title: string;
  start: Date;
  end: Date;
}

export default function CalendarComponent() {
  const [view, setView] = useState<View>(Views.MONTH);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  const [events, setEvents] = useState<MyEvent[]>([
    {
      title: "Meeting with John",
      start: new Date(2025, 10, 5, 10, 0),
      end: new Date(2025, 10, 5, 11, 0),
    },
  ]);

  console.log("events");
  console.log(events);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt("Enter new event name (max 30 chars):");
    if (title && title.trim() !== "") {
      setEvents([
        ...events,
        {
          title: title.slice(0, 30),
          start,
          end,
        },
      ]);
    }
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      selectable
      onSelectSlot={handleSelectSlot}
      style={{ height: "100%" }}
      views={["month", "week", "day", "agenda"]}
      view={view}
      onView={(newView) => setView(newView)}
      defaultView={Views.MONTH}
      date={currentDate}
      onNavigate={handleNavigate}
      components={{
        toolbar: CustomToolbar,
      }}
      formats={calendarFormats}
    />
  );
}
