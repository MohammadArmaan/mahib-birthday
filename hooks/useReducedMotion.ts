import { useMedia } from "./useMedia";

export const useReducedMotion = () =>
  useMedia("(prefers-reduced-motion: reduce)");
