import { useContext } from "react";
import { AppContext } from "./AppProviders";

export default function useAppContext() {
  return useContext(AppContext);
}
