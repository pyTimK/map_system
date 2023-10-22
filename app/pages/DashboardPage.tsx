import { jsoFont } from "@/styles/fonts";
import { PagesWrapperContext } from "./PagesWrapper";
import { useContext } from "react";
import {
  BarangayData,
  MonthBarangayData,
  YearBarangayData,
} from "@/classes/BarangayData";

interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = ({}) => {
  const { barangayData } = useContext(PagesWrapperContext);
  return (
    <div className="bg-dark-bg pt-10">
      <div
        className="flex justify-between shadow-md  w-7/12 m-auto px-10 py-6 rounded-xl bg-light-bg mb-10"
        style={{ minWidth: "1200px" }}
      >
        <p className="text-xl text-justify w-8/12">
          San Rafael is a picturesque municipality in Bulacan, Philippines,
          located about 50 kilometers north of Manila. It's known as the "Rice
          Granary of Bulacan" due to its fertile plains, primarily used for rice
          cultivation. The Angat River flows through the area, offering scenic
          spots for recreation. San Rafael also features a growing economy, with
          a mix of agriculture, commerce, and industry, and it plays a role in
          the region's education and cultural life. This municipality combines
          natural beauty with historical significance, making it an attractive
          destination for tourists and a thriving community for its residents.
        </p>
        <img
          className="border border-black"
          src="/images/wiki_map.png"
          alt="wiki map"
        />
      </div>
      <hr />
      <div className="flex justify-center mt-8 mb-4">
        <p className="text-5xl text-darkest_primary">
          Barangays of San Rafael, Bulacan
        </p>
      </div>
      <div className=" w-fitm-auto flex flex-wrap justify-center items-center">
        {Object.keys(barangayData).map((barangay) => {
          const yearBarangayData = barangayData[barangay as keyof BarangayData];

          const { totalLandArea, malePopulation, femalePopulation } =
            getYearBarangayDataSummary(yearBarangayData);

          return (
            <div
              key={`${barangay}`}
              className="flex flex-col my-6 mx-12 shadow-md w-80 bg-light-bg  rounded-md py-6 px-4 hover:bg-slate-100"
            >
              <p className="font-semibold text-xl mb-1">{barangay}</p>
              <hr />
              <p className="mt-2">
                Total Land Area: {totalLandArea}{" "}
                <span className={`text-sm`}>ha</span>
              </p>
              <p>Male Population: {malePopulation}</p>
              <p>Female Population: {femalePopulation}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function getYearBarangayDataSummary(yearBarangayData: YearBarangayData) {
  let totalLandArea = 0;
  let malePopulation = 0;
  let femalePopulation = 0;

  const yearSelected = yearBarangayData
    ? Object.keys(yearBarangayData)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .reverse()[0]
    : undefined;

  if (!yearSelected)
    return {
      totalLandArea,
      malePopulation,
      femalePopulation,
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
      malePopulation,
      femalePopulation,
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

  malePopulation = rawBarangayData.male_population;
  femalePopulation = rawBarangayData.female_population;

  return {
    totalLandArea,
    malePopulation,
    femalePopulation,
  };
}

export default DashboardPage;
