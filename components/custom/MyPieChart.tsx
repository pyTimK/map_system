import { RawBarangayData } from "@/classes/BarangayData";
import { Chart } from "react-google-charts";

interface MyPieChartProps {
  selectedBarangayData: RawBarangayData;
}

const MyPieChart: React.FC<MyPieChartProps> = ({ selectedBarangayData }) => {
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
              title: "Land Area in Hectares (Ha)",
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

export default MyPieChart;
