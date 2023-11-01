import { PagesWrapperContext } from "@/app/pages/PagesWrapper";
import {
  BarangayLocationData,
  Barangays,
  MonthBarangayData,
  RawBarangayData,
  YearBarangayData,
  constructEmptyRawBarangayData,
} from "@/classes/BarangayData";
import useModal from "@/hooks/useModal";
import { Colors } from "@/styles/styles";
import GoogleMapReact from "google-map-react";
import { forwardRef, useContext, useEffect, useState } from "react";
import MyModal from "../templates/MyModal";
import MyDropDownPicker from "../templates/MyDropdownPicker";
import MyPieChart from "./MyPieChart";
import useDeviceDimensions from "@/hooks/useDeviceDimensions";
import { twMerge } from "tailwind-merge";

interface MyMapProps {}

const MyMap = forwardRef<HTMLDivElement, MyMapProps>(({}, ref) => {
  //! USE DEVICE
  const { screenWidth } = useDeviceDimensions();

  //! BARANGAY DATA
  const { barangayData } = useContext(PagesWrapperContext);

  //! CENTER
  const [center, setCenter] = useState<GoogleMapReact.Coords>(defaultCenter);

  //! SELECTED BARANGAY
  const [selectedBarangay, setSelectedBarangay] =
    useState<BarangayLocationData | null>(null);

  //! MODAL
  const { isModalOpen, openModal, closeModal } = useModal();
  let modalWidth;
  if (screenWidth < 1200) {
    modalWidth = "80vw";
  } else if (screenWidth < 1600) {
    modalWidth = "60vw";
  } else {
    modalWidth = "45vw";
  }

  //! MARKER CLICK

  const handleMarkerClick = (barangay: BarangayLocationData) => {
    let computedLat;
    let computedLng;

    if (screenWidth < 1600) {
      computedLat = barangay.lat;
      computedLng = barangay.lng - 0.05;
    } else {
      computedLat = barangay.lat;
      computedLng = barangay.lng - 0.08;
    }

    setSelectedBarangay(barangay);
    // console.log(`${barangay.name} clicked: ${barangay.lat}, ${barangay.lng}`);
    if (screenWidth > 1200) {
      setCenter({
        lat: computedLat,
        lng: computedLng,
      });
    }
    openModal();
  };

  //! YEAR AND MONTH
  const yearBarangayData =
    barangayData[selectedBarangay?.name ?? "BALAGTAS-BMA"];

  const [selectedYear, setSelectedYear] = useState<string | undefined>();
  const [selectedMonth, setSelectedMonth] = useState<
    keyof MonthBarangayData | undefined
  >();

  //! Auto Update year on barangay change
  useEffect(() => {
    // Set selected year
    const _yearSelected = yearBarangayData
      ? Object.keys(yearBarangayData)
          .sort((a, b) => parseInt(a) - parseInt(b))
          .reverse()[0]
      : undefined;
    setSelectedYear(_yearSelected);
  }, [selectedBarangay]);

  //! Auto Update month on year change
  useEffect(() => {
    if (selectedYear === undefined) return;

    // Set selected month
    let _monthBarangayData = yearBarangayData[selectedYear!];
    let _monthSelected = _monthBarangayData
      ? (Object.keys(_monthBarangayData).sort(
          (a, b) => parseInt(a) - parseInt(b)
        )[0] as keyof MonthBarangayData)
      : undefined;
    setSelectedMonth(_monthSelected);
  }, [selectedYear]);

  const yearDropdownOptions = Object.keys(yearBarangayData ?? {}).map(
    (year) => ({
      label: year,
      value: year,
    })
  );

  const monthDropdownOptions = Object.keys(
    yearBarangayData?.[selectedYear ?? ""] ?? {}
  ).map((month) => ({
    label: mapNumberStringToMonth(month),
    value: month,
  }));

  let selectedBarangayData = constructEmptyRawBarangayData();
  if (selectedYear !== undefined && selectedMonth !== undefined) {
    const monthBarangayData = yearBarangayData?.[selectedYear!];
    console.log(selectedYear, selectedMonth, monthBarangayData, barangayData);
    selectedBarangayData =
      monthBarangayData[selectedMonth!] ?? constructEmptyRawBarangayData();
  }

  return (
    // Important! Always set the container height explicitly
    <div
      ref={ref}
      style={{
        width: "100%",
        // maxWidth: "700px",
        // border: "1px solid black",
      }}
    >
      <GoogleMapReact
        // key={`${readingData.geo_lat}-${readingData.geo_long}-${readingData.geo_radius}-${readingData.lat}-${readingData.long}`}
        bootstrapURLKeys={{ key: "AIzaSyAzPN7p1Nx8VgwDWN7QmheKnvAI4Bov-X8" }}
        defaultCenter={defaultCenter}
        center={center}
        defaultZoom={13}
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

          // Add on click listener
          // new maps.event.addListener(map, "click", (event: any) => {
          //   // addMarker(event.latLng, map, maps);
          //   console.log(event.latLng.lat(), event.latLng.lng());
          // });

          // Display barangay markers
          Barangays.forEach((barangay) => {
            const marker = new maps.Marker({
              position: { lat: barangay.lat, lng: barangay.lng },
              map,
              title: barangay.name,
              label: barangay.name[0],
            });

            marker.addListener("click", () => handleMarkerClick(barangay));
          });
          // new maps.Marker({
          //   position: { lat: readingData.lat, lng: readingData.long },
          //   map,
          //   title: "Device Location",
          // });
        }}
      ></GoogleMapReact>
      <MyModal
        isOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
        title={selectedBarangay?.name ?? ""}
        height="75vh"
        width={modalWidth}
        className={twMerge(
          "",
          screenWidth < 1200
            ? "-translate-x-1/2 left-1/2"
            : "translate-x-0 left-20"
        )}
        classNameInner="m-0"
        classNameContent="overflow-auto"
        hideLine
      >
        <div className="flex flex-col ">
          <div className="flex justify-center gap-6 mt-5">
            <div className="w-60">
              <MyDropDownPicker
                options={yearDropdownOptions}
                onChange={() => {}}
                setValue={(value) => {
                  setSelectedYear(value);
                  setSelectedMonth(undefined);
                }}
                value={selectedYear}
                placeholder="Select Year"
              />
            </div>
            <div className="w-60">
              <MyDropDownPicker
                options={monthDropdownOptions}
                onChange={() => {}}
                setValue={(value) => {
                  setSelectedMonth(value as keyof MonthBarangayData);
                }}
                value={selectedMonth}
                placeholder="Select Month"
              />
            </div>
          </div>
          <MyPieChart selectedBarangayData={selectedBarangayData} />
        </div>
      </MyModal>
    </div>
  );
});

// Adds a marker to the map.
function addMarker(location: any, map: any, maps: any) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  new maps.Marker({
    position: location,
    map: map,
  });
}

const defaultCenter = {
  lat: 14.9875236,
  lng: 120.9440973,
};

const mapNumberStringToMonth = (month: string) => {
  switch (month) {
    case "1":
      return "January";
    case "2":
      return "February";
    case "3":
      return "March";
    case "4":
      return "April";
    case "5":
      return "May";
    case "6":
      return "June";
    case "7":
      return "July";
    case "8":
      return "August";
    case "9":
      return "September";
    case "10":
      return "October";
    case "11":
      return "November";
    case "12":
      return "December";
    default:
      return "";
  }
};
MyMap.displayName = "MyMap";

export default MyMap;
