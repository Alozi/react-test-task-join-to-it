import { useState } from "react";
import {
  Calendar,
  momentLocalizer,
  Views,
  type View,
  type SlotInfo,
} from "react-big-calendar";
import { type Event } from "../types/event";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./CustomToolbar";
import { calendarFormats } from "../utils/calendarFormats";
import EventModal from "./EventModal";

const localizer = momentLocalizer(moment);

export default function CalendarComponent() {
  const [events, setEvents] = useState<Event[]>([
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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

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

  function handleAddEvent(event: Event) {
    setEvents((prev) =>
      prev.some((e) => e.id === event.id)
        ? prev.map((e) => (e.id === event.id ? event : e))
        : [...prev, event]
    );
  }

  function handleNavigate(date: Date) {
    setCurrentDate(date);
  }

  function handleSelectEvent(event: Event) {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }

  function handleDeleteEvent(id: number) {
    setEvents(events.filter((e) => e.id !== id));
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
        onSelectEvent={handleSelectEvent}
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
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
        onSave={handleAddEvent}
        defaultDate={selectedSlot || undefined}
        position={modalPosition}
        defaultEvent={selectedEvent}
        onDelete={handleDeleteEvent}
      />
    </>
  );
}
