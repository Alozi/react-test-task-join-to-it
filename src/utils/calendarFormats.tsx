import { type Formats } from "react-big-calendar";
import moment from "moment";

export const calendarFormats: Partial<Formats> = {
  dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) => {
    return `${moment(start).format("MMM D")} - ${moment(end).format("MMM D")}`;
  },
};
