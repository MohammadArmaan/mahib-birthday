import { useMedia } from "./useMedia";

export const useIsMobile = () => useMedia("(max-width: 767px)");
