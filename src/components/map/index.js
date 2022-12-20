import {
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import { kolorIcon } from "../../pages/web2/land/kolorIcon";

export const Map = ({ land, height }) => {
  const { center, points } = land.points;

  return (
    <MapContainer
      center={center}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "100%" }}
    >
      <Polygon pathOptions={{ color: "green" }} positions={points}>
        {" "}
        <Tooltip sticky>
          {land.size} {land.unit} total
        </Tooltip>
      </Polygon>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={kolorIcon} position={center}>
        <Popup>
          {land.name} <br /> {land.city} <br /> {land.country}
        </Popup>
      </Marker>
    </MapContainer>
  );
};
