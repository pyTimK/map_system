import { PagesWrapperContext } from "./PagesWrapper";
import { useContext, useEffect, useState } from "react";
import {
  BarangayData,
  BarangayDataSummary,
  MonthBarangayData,
  YearBarangayData,
  constructEmptyBarangayDataSummary,
  constructEmptyRawBarangayData,
} from "@/classes/BarangayData";
import { Chart } from "react-google-charts";
interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = ({}) => {
  const { barangayData } = useContext(PagesWrapperContext);

  const [barangayDataSummary, setBarangayDataSummary] = useState(
    constructEmptyBarangayDataSummary()
  );

  const [overallRawData, setOverallRawData] = useState(
    constructEmptyRawBarangayData()
  );

  const [totalLandArea, setTotalLandArea] = useState(0);

  const landAreaDataOption = [
    ["Land Area By Type of Land", "Area", { role: "style" }],
    ["Residential", overallRawData["Residential"], "red"],
    ["Agricultural", overallRawData["Agricultural"], "green"],
    ["Commercial", overallRawData["Commercial"], "blue"],
    ["Industrial", overallRawData["Industrial"], "yellow"],
    ["Special", overallRawData["Special"], "orange"],
    ["Mineral", overallRawData["Mineral"], "purple"],
    ["ED", overallRawData["ED"], "pink"],
    ["R4", overallRawData["R4"], "brown"],
    ["SX", overallRawData["SX"], "gray"],
    ["TZ", overallRawData["TZ"], "cyan"],
    ["SB", overallRawData["SB"], "magenta"],
  ];

  useEffect(() => {
    const barangayDataSummary = constructEmptyBarangayDataSummary();
    const overallRawData = constructEmptyRawBarangayData();
    let _totalLandArea = 0;

    Object.keys(barangayData).map((barangay) => {
      const yearBarangayData = barangayData[barangay as keyof BarangayData];

      const _barangayDataSummary = getYearBarangayDataSummary(yearBarangayData);

      barangayDataSummary[barangay as keyof BarangayDataSummary] =
        _barangayDataSummary;

      const rawData = _barangayDataSummary.rawBarangayData;

      overallRawData.Residential += rawData.Residential;
      overallRawData.Agricultural += rawData.Agricultural;
      overallRawData.Commercial += rawData.Commercial;
      overallRawData.Industrial += rawData.Industrial;
      overallRawData.Special += rawData.Special;
      overallRawData.Mineral += rawData.Mineral;
      overallRawData.ED += rawData.ED;
      overallRawData.R4 += rawData.R4;
      overallRawData.SX += rawData.SX;
      overallRawData.TZ += rawData.TZ;
      overallRawData.SB += rawData.SB;
      overallRawData.male_population += rawData.male_population;
      overallRawData.female_population += rawData.female_population;

      _totalLandArea += _barangayDataSummary.totalLandArea;
    });

    setBarangayDataSummary(barangayDataSummary);
    setOverallRawData(overallRawData);
    setTotalLandArea(_totalLandArea);
  }, [barangayData]);

  const info =
    "San Rafael is a picturesque municipality in Bulacan, Philippines, located about 50 kilometers north of Manila. It's known as the 'Rice Granary of Bulacan' due to its fertile plains, primarily used for rice cultivation. The Angat River flows through the area, offering scenic spots for recreation. San Rafael also features a growing economy, with a mix of agriculture, commerce, and industry, and it plays a role in the region's education and cultural life. This municipality combines natural beauty with historical significance, making it an attractive destination for tourists and a thriving community for its residents.";
  return (
    <div className="bg-dark-bg pt-10">
      {/* OVERALL SUMMARY */}
      <div
        className="flex gap-4 justify-between w-7/12 m-auto mb-10"
        style={{ minWidth: "1200px" }}
      >
        <div className="flex flex-col shadow-md w-80 bg-light-bg  rounded-md pt-3 pb-6 px-4 hover:bg-slate-100 border-b-4 border-blue">
          <p className="text-gray-400 font-semibold mb-4">TOTAL LAND AREA</p>
          <p className="text-4xl font-bold">
            {totalLandArea.toLocaleString()}{" "}
            <span className="text-gray-400 font-semibold text-2xl">sqm</span>
          </p>
        </div>
        <div className="flex flex-col shadow-md w-80 bg-light-bg  rounded-md pt-3 pb-6 px-4 hover:bg-slate-100 border-b-4 border-red">
          <p className="text-gray-400 font-semibold mb-4">
            TOTAL MALE POPULATION
          </p>
          <p className="text-4xl font-bold">
            {overallRawData.male_population.toLocaleString()}{" "}
          </p>
        </div>
        <div className="flex flex-col shadow-md w-80 bg-light-bg  rounded-md pt-3 pb-6 px-4 hover:bg-slate-100 border-b-4 border-green">
          <p className="text-gray-400 font-semibold mb-4">
            TOTAL FEMALE POPULATION
          </p>
          <p className="text-4xl font-bold">
            {overallRawData.female_population.toLocaleString()}{" "}
          </p>
        </div>
      </div>

      {/* WIKI */}
      <div
        className="flex justify-between shadow-md  w-7/12 m-auto px-10 py-6 rounded-xl bg-light-bg mb-10"
        style={{ minWidth: "1200px" }}
      >
        <p className="text-xl text-justify w-8/12">{info}</p>
        <img
          className="border border-black"
          src="/images/wiki_map.png"
          alt="wiki map"
        />
      </div>

      {/* SUMMARY RAW BARANGAY */}
      <div
        className="flex justify-between shadow-md  w-7/12 m-auto px-10 py-6 rounded-xl bg-light-bg mb-10"
        style={{ minWidth: "1200px" }}
      >
        <Chart
          key={Math.random()}
          chartType="ColumnChart"
          width="100%"
          height="45vh"
          data={landAreaDataOption}
          options={{
            title: "Land Area by Type of Land",

            hAxis: {
              title: "Land Area in Square Meters (sqm)",
            },
          }}
        />
      </div>

      <div
        className="flex flex-row justify-between w-7/12 m-auto"
        style={{ minWidth: "1200px" }}
      >
        {/* SUMMARY RAW BARANGAY */}
        <div
          className="flex justify-between shadow-md w-5/12 m-0 px-2 py-6 rounded-xl bg-light-bg mb-10 border-b-8 border-yellow-300"
          style={{ width: "48%" }}
        >
          <Chart
            key={Math.random()}
            chartType="LineChart"
            width="100%"
            height="45vh"
            data={landAreaDataOption}
            options={{
              title: "Land Area by Type of Land",

              hAxis: {
                title: "Land Area in Square Meters (sqm)",
              },
            }}
          />
        </div>

        {/* SUMMARY RAW BARANGAY */}
        <div
          className="flex justify-between shadow-md m-0 px-2 py-6 rounded-xl bg-light-bg mb-10 border-b-8 border-purple-600"
          style={{ width: "48%" }}
        >
          <Chart
            key={Math.random()}
            chartType="PieChart"
            width="100%"
            height="45vh"
            data={landAreaDataOption}
            options={{
              title: "Land Area by Type of Land",

              hAxis: {
                title: "Land Area in Square Meters (sqm)",
              },
            }}
          />
        </div>
      </div>
      <hr />
      <div className="flex justify-center mt-8 mb-4">
        <p className="text-5xl text-darkest_primary">
          Barangays of San Rafael, Bulacan
        </p>
      </div>
      <div className=" w-fitm-auto flex flex-wrap justify-center items-center">
        {Object.keys(barangayData).map((barangay) => {
          const { totalLandArea, rawBarangayData } =
            barangayDataSummary[barangay as keyof BarangayDataSummary];
          const { male_population, female_population } = rawBarangayData;
          return (
            <div
              key={`${barangay}`}
              className="flex flex-col my-6 mx-12 shadow-md w-80 bg-light-bg  rounded-md py-6 px-4 hover:bg-slate-100"
            >
              <p className="font-semibold text-xl mb-1">{barangay}</p>
              <hr />
              <p className="mt-2">
                Total Land Area: {totalLandArea.toLocaleString()}{" "}
                <span className={`text-sm`}>sqm</span>
              </p>
              <p>Male Population: {male_population}</p>
              <p>Female Population: {female_population}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function getYearBarangayDataSummary(yearBarangayData: YearBarangayData) {
  let totalLandArea = 0;
  let outputRawBarangayData = constructEmptyRawBarangayData();

  const yearSelected = yearBarangayData
    ? Object.keys(yearBarangayData)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .reverse()[0]
    : undefined;

  if (!yearSelected)
    return {
      totalLandArea,
      rawBarangayData: outputRawBarangayData,
    };

  let monthBarangayData = yearBarangayData[yearSelected];
  let monthSelected = monthBarangayData
    ? (Object.keys(monthBarangayData)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .reverse()[0] as keyof MonthBarangayData)
    : undefined;

  if (!monthSelected)
    return {
      totalLandArea,
      rawBarangayData: outputRawBarangayData,
    };

  const rawBarangayData = monthBarangayData[monthSelected]!;

  totalLandArea =
    rawBarangayData.Residential +
    rawBarangayData.Agricultural +
    rawBarangayData.Commercial +
    rawBarangayData.Industrial +
    rawBarangayData.Special +
    rawBarangayData.Mineral +
    rawBarangayData.ED +
    rawBarangayData.R4 +
    rawBarangayData.SX +
    rawBarangayData.TZ +
    rawBarangayData.SB;

  return {
    totalLandArea,
    rawBarangayData,
  };
}

export default DashboardPage;
