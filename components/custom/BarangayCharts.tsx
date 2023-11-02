import { PagesWrapperContext } from "@/app/pages/PagesWrapper";
import { BarangayData, RawBarangayData } from "@/classes/BarangayData";
import { useContext } from "react";
import { Chart } from "react-google-charts";

interface MyPieChartProps {
  selectedBarangayData: RawBarangayData;
  barangayName?: keyof BarangayData;
}

const BarangayCarts: React.FC<MyPieChartProps> = ({
  selectedBarangayData,
  barangayName,
}) => {
  const { barangayData } = useContext(PagesWrapperContext);
  const yearData = barangayData[barangayName ?? "BALAGTAS-BMA"];

  const landAreaData = [
    ["Land Area By Type of Land", "Area"],
    ["Residential", selectedBarangayData["Residential"]],
    ["Agricultural", selectedBarangayData["Agricultural"]],
    ["Commercial", selectedBarangayData["Commercial"]],
    ["Industrial", selectedBarangayData["Industrial"]],
    ["Special", selectedBarangayData["Special"]],
    ["Mineral", selectedBarangayData["Mineral"]],
    ["ED", selectedBarangayData["ED"]],
    ["R4", selectedBarangayData["R4"]],
    ["SX", selectedBarangayData["SX"]],
    ["TZ", selectedBarangayData["TZ"]],
    ["SB", selectedBarangayData["SB"]],
  ];

  const overTheYearsData: any[][] = [
    [
      "YearMonth",
      "Residential",
      "Agricultural",
      "Commercial",
      "Industrial",
      "Special",
      "Mineral",
      "ED",
      "R4",
      "SX",
      "TZ",
      "SB",
    ],
  ];

  const dateTicks: Date[] = [];

  Object.keys(yearData).forEach((yearKey) => {
    dateTicks.push(new Date(parseInt(yearKey), 0, 1));
    const monthData = yearData[yearKey];
    Object.keys(monthData).forEach((monthKey) => {
      const rawData = monthData[monthKey as keyof typeof monthData];
      if (!rawData) return;

      const overTheYearData: any[] = [];
      const yearMonth = new Date(parseInt(yearKey), parseInt(monthKey) - 1, 1);
      overTheYearData.push(yearMonth);
      overTheYearData.push(rawData["Residential"]);
      overTheYearData.push(rawData["Agricultural"]);
      overTheYearData.push(rawData["Commercial"]);
      overTheYearData.push(rawData["Industrial"]);
      overTheYearData.push(rawData["Special"]);
      overTheYearData.push(rawData["Mineral"]);
      overTheYearData.push(rawData["ED"]);
      overTheYearData.push(rawData["R4"]);
      overTheYearData.push(rawData["SX"]);
      overTheYearData.push(rawData["TZ"]);
      overTheYearData.push(rawData["SB"]);

      overTheYearsData.push(overTheYearData);
    });
  });

  const sexData = [
    ["Sex", "Population"],
    ["Male", selectedBarangayData["male_population"]],
    ["Female", selectedBarangayData["female_population"]],
  ];

  return (
    <div className="flex flex-col items-center h-full gap-3">
      <div className="bg-true-white w-full p-2 border border-black my-10">
        <Chart
          key={Math.random()}
          chartType="BarChart"
          width="100%"
          height="45vh"
          data={landAreaData}
          options={{
            title: "Land Area by Type of Land",

            hAxis: {
              title: "Land Area in Square Meters (sqm)",
            },

            vAxis: {
              title: "Type of Land",
            },
          }}
        />
      </div>

      <div className="bg-true-white w-full p-2 border border-black my-10">
        <Chart
          key={Math.random()}
          chartType="LineChart"
          width="100%"
          height="45vh"
          data={overTheYearsData}
          columns={[
            { type: "date", label: "YearMonth" },
            { type: "number", label: "Residential" },
            { type: "number", label: "Agricultural" },
            { type: "number", label: "Commercial" },
            { type: "number", label: "Industrial" },
            { type: "number", label: "Special" },
            { type: "number", label: "Mineral" },
            { type: "number", label: "ED" },
            { type: "number", label: "R4" },
            { type: "number", label: "SX" },
            { type: "number", label: "TZ" },
            { type: "number", label: "SB" },
          ]}
          options={{
            title: "Land Area Over the Years",

            hAxis: {
              title: "Year",
              format: "yyyy",
              ticks: dateTicks,
            },

            vAxis: {
              title: "Land Area in Square Meters (sqm)",
            },
          }}
        />
      </div>

      <div className="bg-true-white w-full p-2 border border-black flex justify-center items-center ">
        <Chart
          key={`${selectedBarangayData["male_population"]}-${selectedBarangayData["female_population"]}`}
          chartType="PieChart"
          data={sexData}
          options={{ title: "Population by Sex" }}
          width={"100%"}
          height={"30vh"}
        />
      </div>
    </div>
  );
};

export default BarangayCarts;
