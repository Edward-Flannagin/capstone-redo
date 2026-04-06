import { createContext } from "react";

export const ReservationContext = createContext({
  date: null,
  time: null,
  guests: null,
  occasion: null,
  table: null,
  contact: null,
});