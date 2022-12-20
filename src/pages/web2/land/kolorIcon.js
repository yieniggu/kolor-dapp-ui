import L from "leaflet";

const kolorIcon = new L.Icon({
  iconUrl: require("../../../assets/logo/logo_icon.png"),
  iconRetinaUrl: require("../../../assets/logo/logo_icon.png"),
  iconAnchor: null,
  popupAnchor: [-3, -20],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(40, 40),
  className: "leaflet-div-icon",
});

export { kolorIcon };
