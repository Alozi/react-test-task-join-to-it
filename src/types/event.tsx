import { type Event as RBCEvent } from "react-big-calendar";

export interface Event extends RBCEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  color: string;
}
