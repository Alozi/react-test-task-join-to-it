import { useState, useCallback } from "react";
import { type EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import { type Event } from "../types/event";

export function useCalendarEvents() {
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

  function handleAddEvent(event: Event) {
    setEvents((prev) =>
      prev.some((e) => e.id === event.id)
        ? prev.map((e) => (e.id === event.id ? event : e))
        : [...prev, event]
    );
  }

  function handleDeleteEvent(id: number) {
    setEvents(events.filter((e) => e.id !== id));
  }

  const moveEvent = useCallback(
    ({ event, start, end }: EventInteractionArgs<Event>) => {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === event.id
            ? {
                ...e,
                start: start instanceof Date ? start : new Date(start),
                end: end instanceof Date ? end : new Date(end),
              }
            : e
        )
      );
    },
    [setEvents]
  );

  //   const resizeEvent = useCallback(
  //     ({ event, start, end }: EventInteractionArgs<Event>) => {
  //       setEvents((prev) =>
  //         prev.map((e) =>
  //           e.id === event.id
  //             ? {
  //                 ...e,
  //                 start: start instanceof Date ? start : new Date(start),
  //                 end: end instanceof Date ? end : new Date(end),
  //               }
  //             : e
  //         )
  //       );
  //     },
  //     [setEvents]
  //   );

  return { events, handleAddEvent, handleDeleteEvent, moveEvent };
}
