import { useSyncExternalStore } from "react";

function getDate() {
  return new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
}

const subscribe = () => () => {};

export function useBanglaDate() {
  return useSyncExternalStore(subscribe, getDate, () => "");
}