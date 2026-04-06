export function timesReducer(state, action) {
  switch (action.type) {
    case "UPDATE_TIMES": {
      const date = action.date;

      // Convert Date → YYYY-MM-DD string if needed
      const formattedDate = date instanceof Date
        ? date.toISOString().split("T")[0]
        : date;

      return getAvailableTimes(formattedDate);
    }

    default:
      return state;
  }
}

export function getAvailableTimes(dateString) {
  // Your real logic goes here
  return ["17:00", "18:00", "19:00", "20:00", "21:00"];
}
