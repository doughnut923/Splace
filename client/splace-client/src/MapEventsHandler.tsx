import { useMapEvents } from "react-leaflet";

export default function MapEventsHandler({ handleMapClick }) {
  useMapEvents({
    click: (e) => handleMapClick(e),
  });
  return null;
};
