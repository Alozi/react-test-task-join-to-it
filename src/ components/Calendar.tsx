import { useCallback, useState } from "react";
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

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useCalendarEvents } from "../hooks/useCalendarEvents";

const DragAndDropCalendar = withDragAndDrop<Event, object>(Calendar);
const localizer = momentLocalizer(moment);

export default function CalendarComponent() {
  const { events, handleAddEvent, handleDeleteEvent, moveEvent } =
    useCalendarEvents();

  const [view, setView] = useState<View>(Views.MONTH);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // const [modalPosition, setModalPosition] = useState<{
  //   x: number | undefined;
  //   y: number | undefined;
  // }>({
  //   x: 0,
  //   y: 0,
  // });

  const eventPropGetter = useCallback(
    (event: Event) => ({
      style: {
        backgroundColor: event.color || "#3B86FF",
        borderRadius: "4px",
        color: "#fff",
        border: "none",
        display: "block",
      },
    }),
    []
  );

  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    setSelectedSlot(slotInfo.start);
    // setModalPosition({ x: slotInfo.box?.clientX, y: slotInfo.box?.clientY });
    setIsModalOpen(true);
  }, []);

  const handleSelectEvent = useCallback((event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }, []);

  const handleNavigate = useCallback((date: Date) => setCurrentDate(date), []);

  const onViewChange = useCallback((newView: View) => setView(newView), []);

  return (
    <>
      <DragAndDropCalendar
        localizer={localizer}
        events={events}
        onEventDrop={moveEvent}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: "100%" }}
        views={["month", "week", "day", "agenda"]}
        view={view}
        onView={onViewChange}
        defaultView={Views.MONTH}
        date={currentDate}
        onNavigate={handleNavigate}
        components={{
          toolbar: CustomToolbar,
        }}
        formats={calendarFormats}
        eventPropGetter={eventPropGetter}
      />
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
        onSave={handleAddEvent}
        defaultDate={selectedSlot || undefined}
        // position={modalPosition}
        defaultEvent={selectedEvent}
        onDelete={handleDeleteEvent}
      />
    </>
  );
}
