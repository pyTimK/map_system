import { PagesWrapperContext } from "@/app/pages/PagesWrapper";
import { Colors } from "@/styles/styles";
import GoogleMapReact from "google-map-react";
import { useContext } from "react";

const MyMap: React.FC = () => {
  // // Coordinates of your two markers
  // const centerCoordinates = {
  //   lat: readingData.geo_lat,
  //   lng: readingData.geo_long,
  // };

  // const deviceCoordinates = {
  //   lat: readingData.lat,
  //   lng: readingData.long,
  // };

  return (
    // Important! Always set the container height explicitly
    <div
      style={{
        height: "100vh",
        width: "100%",
        // maxWidth: "700px",
        border: "1px solid black",
      }}
    >
      <GoogleMapReact
        // key={`${readingData.geo_lat}-${readingData.geo_long}-${readingData.geo_radius}-${readingData.lat}-${readingData.long}`}
        bootstrapURLKeys={{ key: "AIzaSyAzPN7p1Nx8VgwDWN7QmheKnvAI4Bov-X8" }}
        defaultCenter={{ lat: 14.651489, lng: 121.049309 }}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          // const bounds = new maps.LatLngBounds();
          // bounds.extend(centerCoordinates);
          // bounds.extend(deviceCoordinates);
          // map.fitBounds(bounds);
          // new maps.Circle({
          //   strokeColor: Colors.darker_primary,
          //   strokeOpacity: 0.8,
          //   strokeWeight: 2,
          //   fillColor: Colors.light_primary,
          //   fillOpacity: 0.3,
          //   map,
          //   center: { lat: readingData.geo_lat, lng: readingData.geo_long },
          //   radius: readingData.geo_radius,
          // });
          // new maps.Marker({
          //   position: { lat: readingData.geo_lat, lng: readingData.geo_long },
          //   map,
          //   title: "Center Fence",
          //   icon: {
          //     url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          //   },
          // });
          // new maps.Marker({
          //   position: { lat: readingData.lat, lng: readingData.long },
          //   map,
          //   title: "Device Location",
          // });
        }}
      ></GoogleMapReact>
    </div>
  );
};

export default MyMap;
