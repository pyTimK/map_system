import {
  BarangayData,
  ImportBarangayData,
  RawBarangayData,
  constructEmptyBarangayData,
} from "@/classes/BarangayData";
import FirebaseHelper from "@/classes/FirebaseHelper";
import myFetch from "@/myfunctions/myFetch";
import { Importer, ImporterField } from "react-csv-importer";
import "react-csv-importer/dist/index.css";

interface MyImporterProps {}

async function mlApiAndSaveToFirebase(barangayData: BarangayData) {
  const data = await myFetch(
    "https://san-rafael-map-ml.fly.dev",
    "",
    "",
    "POST",
    barangayData
  );
  if (data) {
    FirebaseHelper.addBarangayData(data);
  }
}

const MyImporter: React.FC<MyImporterProps> = ({}) => {
  return (
    <Importer
      dataHandler={async (rows, { startIndex }) => {
        // required, may be called several times
        // receives a list of parsed objects based on defined fields and user column mapping;
        // (if this callback returns a promise, the widget will wait for it before parsing more data)

        const barangayData = constructEmptyBarangayData();

        for (const row of rows) {
          const rawData = row as unknown as ImportBarangayData;

          if (!rawData.Barangay || !rawData.Year || !rawData.Month) continue;

          if (!barangayData[rawData.Barangay][rawData.Year]) {
            barangayData[rawData.Barangay][rawData.Year] = {};
          }

          barangayData[rawData.Barangay][rawData.Year][rawData.Month] = {
            Residential: parseInt(rawData.Residential ?? "0"),
            Agricultural: parseInt(rawData.Agricultural ?? "0"),
            Commercial: parseInt(rawData.Commercial ?? "0"),
            Industrial: parseInt(rawData.Industrial ?? "0"),
            Special: parseInt(rawData.Special ?? "0"),
            Mineral: parseInt(rawData.Mineral ?? "0"),
            ED: parseInt(rawData.ED ?? "0"),
            R4: parseInt(rawData.R4 ?? "0"),
            SX: parseInt(rawData.SX ?? "0"),
            TZ: parseInt(rawData.TZ ?? "0"),
            SB: parseInt(rawData.SB ?? "0"),
            male_population: parseInt(rawData.male_population ?? "0"),
            female_population: parseInt(rawData.female_population ?? "0"),
          };
        }

        mlApiAndSaveToFirebase(barangayData);
      }}
      defaultNoHeader={false} // optional, keeps "data has headers" checkbox off by default
      restartable={true} // optional, lets user choose to upload another file when import is complete
      onStart={({ file, preview, fields, columnFields }) => {
        // optional, invoked when user has mapped columns and started import
        // prepMyAppForIncomingData();
      }}
      // onComplete={({ file, preview, fields, columnFields }) => {
      //   // optional, invoked right after import is done (but user did not dismiss/reset the widget yet)
      //   // showMyAppToastNotification();
      // }}
      // onClose={({ file, preview, fields, columnFields }) => {
      //   // optional, if this is specified the user will see a "Finish" button after import is done,
      //   // which will call this when clicked
      //   // goToMyAppNextPage();
      // }}

      // CSV options passed directly to PapaParse if specified:
      // delimiter={...}
      // newline={...}
      // quoteChar={...}
      // escapeChar={...}
      // comments={...}
      // skipEmptyLines={...}
      // delimitersToGuess={...}
      // chunkSize={...} // defaults to 10000
      // encoding={...} // defaults to utf-8, see FileReader API
    >
      <ImporterField name="Year" label="Year" />
      <ImporterField name="Month" label="Month" />
      <ImporterField name="Barangay" label="Barangay" />
      <ImporterField name="Residential" label="Residential" />
      <ImporterField name="Agricultural" label="Agricultural" />
      <ImporterField name="Commercial" label="Commercial" />
      <ImporterField name="Industrial" label="Industrial" />
      <ImporterField name="Special" label="Special" />
      <ImporterField name="Mineral" label="Mineral" />
      <ImporterField name="ED" label="ED" />
      <ImporterField name="R4" label="R4" />
      <ImporterField name="SX" label="SX" />
      <ImporterField name="TZ" label="TZ" />
      <ImporterField name="SB" label="SB" />
      <ImporterField name="male_population" label="male_population" />
      <ImporterField name="female_population" label="female_population" />
    </Importer>
  );
};

export default MyImporter;
