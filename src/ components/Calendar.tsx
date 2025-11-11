import { useState } from "react";
import {
  Calendar,
  momentLocalizer,
  Views,
  type View,
  type Event as RBCEvent,
  type SlotInfo,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./CustomToolbar";
import { calendarFormats } from "../utils/calendarFormats";
import EventModal from "./EventModal";

const localizer = momentLocalizer(moment);

interface MyEvent extends RBCEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  color: string;
}

export default function CalendarComponent() {
  const [events, setEvents] = useState<MyEvent[]>([
    {
      id: Date.now(),
      title: "Meeting with John",
      start: new Date(2025, 10, 10, 10, 0),
      end: new Date(2025, 10, 10, 11, 0),
      color: "#3B86FF",
    },
  ]);

  console.log("events");
  console.log(events);

  const [view, setView] = useState<View>(Views.MONTH);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);

  const [modalPosition, setModalPosition] = useState<{
    x: number | undefined;
    y: number | undefined;
  }>({
    x: 0,
    y: 0,
  });

  function handleSelectSlot(slotInfo: SlotInfo) {
    setSelectedSlot(slotInfo.start);
    setModalPosition({ x: slotInfo.box?.clientX, y: slotInfo.box?.clientY });
    setIsModalOpen(true);
  }

  function handleAddEvent(newEvent: MyEvent) {
    setEvents((prev) => [...prev, newEvent]);
  }

  function handleNavigate(date: Date) {
    setCurrentDate(date);
  }

  return (
    <>
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
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color || "#3B86FF",
            borderRadius: "4px",
            color: "#fff",
            border: "none",
            display: "block",
          },
        })}
      />
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddEvent}
        defaultDate={selectedSlot || undefined}
        position={modalPosition}
      />
    </>
  );
}
