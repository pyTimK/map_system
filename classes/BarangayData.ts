export interface BarangayDataSummary {
  POBLACION: BarangaySummary;
  "BALAGTAS-BMA": BarangaySummary;
  "BANCA-BANCA": BarangaySummary;
  CAINGIN: BarangaySummary;
  "CORAL NA BATO": BarangaySummary;
  "CRUZ NA DAAN": BarangaySummary;
  "DAGAT-DAGATAN": BarangaySummary;
  "DILIMAN I": BarangaySummary;
  "DILIMAN II": BarangaySummary;
  CAPIHAN: BarangaySummary;
  LIBIS: BarangaySummary;
  LICO: BarangaySummary;
  MAASIM: BarangaySummary;
  "MABALAS-BALAS": BarangaySummary;
  MAGUINAO: BarangaySummary;
  MARONQUILLO: BarangaySummary;
  PACO: BarangaySummary;
  PANSUMALOC: BarangaySummary;
  PANTUBIG: BarangaySummary;
  "PASONG BANGKAL": BarangaySummary;
  "PASONG CALLOS": BarangaySummary;
  "PASONG INCHIC": BarangaySummary;
  "PINAC-PINACAN": BarangaySummary;
  PULO: BarangaySummary;
  "PULONG BAYABAS": BarangaySummary;
  SALAPUNGAN: BarangaySummary;
  SAMPALOC: BarangaySummary;
  "SAN AGUSTIN": BarangaySummary;
  "SAN ROQUE": BarangaySummary;
  "SAPANG PAHALANG": BarangaySummary;
  TALACSAN: BarangaySummary;
  TAMBUBONG: BarangaySummary;
  TUKOD: BarangaySummary;
  ULINGAO: BarangaySummary;
}

export interface BarangayData {
  POBLACION: YearBarangayData;
  "BALAGTAS-BMA": YearBarangayData;
  "BANCA-BANCA": YearBarangayData;
  CAINGIN: YearBarangayData;
  "CORAL NA BATO": YearBarangayData;
  "CRUZ NA DAAN": YearBarangayData;
  "DAGAT-DAGATAN": YearBarangayData;
  "DILIMAN I": YearBarangayData;
  "DILIMAN II": YearBarangayData;
  CAPIHAN: YearBarangayData;
  LIBIS: YearBarangayData;
  LICO: YearBarangayData;
  MAASIM: YearBarangayData;
  "MABALAS-BALAS": YearBarangayData;
  MAGUINAO: YearBarangayData;
  MARONQUILLO: YearBarangayData;
  PACO: YearBarangayData;
  PANSUMALOC: YearBarangayData;
  PANTUBIG: YearBarangayData;
  "PASONG BANGKAL": YearBarangayData;
  "PASONG CALLOS": YearBarangayData;
  "PASONG INCHIC": YearBarangayData;
  "PINAC-PINACAN": YearBarangayData;
  PULO: YearBarangayData;
  "PULONG BAYABAS": YearBarangayData;
  SALAPUNGAN: YearBarangayData;
  SAMPALOC: YearBarangayData;
  "SAN AGUSTIN": YearBarangayData;
  "SAN ROQUE": YearBarangayData;
  "SAPANG PAHALANG": YearBarangayData;
  TALACSAN: YearBarangayData;
  TAMBUBONG: YearBarangayData;
  TUKOD: YearBarangayData;
  ULINGAO: YearBarangayData;
}

export const constructEmptyBarangayData = (): BarangayData => {
  return {
    POBLACION: {},
    "BALAGTAS-BMA": {},
    "BANCA-BANCA": {},
    CAINGIN: {},
    "CORAL NA BATO": {},
    "CRUZ NA DAAN": {},
    "DAGAT-DAGATAN": {},
    "DILIMAN I": {},
    "DILIMAN II": {},
    CAPIHAN: {},
    LIBIS: {},
    LICO: {},
    MAASIM: {},
    "MABALAS-BALAS": {},
    MAGUINAO: {},
    MARONQUILLO: {},
    PACO: {},
    PANSUMALOC: {},
    PANTUBIG: {},
    "PASONG BANGKAL": {},
    "PASONG CALLOS": {},
    "PASONG INCHIC": {},
    "PINAC-PINACAN": {},
    PULO: {},
    "PULONG BAYABAS": {},
    SALAPUNGAN: {},
    SAMPALOC: {},
    "SAN AGUSTIN": {},
    "SAN ROQUE": {},
    "SAPANG PAHALANG": {},
    TALACSAN: {},
    TAMBUBONG: {},
    TUKOD: {},
    ULINGAO: {},
  };
};

export const constructEmptyBarangayDataSummary = (): BarangayDataSummary => {
  const barangayDataSummary = {} as BarangayDataSummary;

  Object.keys(constructEmptyBarangayData()).forEach((barangay) => {
    barangayDataSummary[barangay as keyof BarangayDataSummary] = {
      totalLandArea: 0,
      rawBarangayData: constructEmptyRawBarangayData(),
    };
  });

  return barangayDataSummary;
};

export interface BarangaySummary {
  totalLandArea: number;
  rawBarangayData: RawBarangayData;
}

export const Barangays: BarangayLocationData[] = [
  { name: "POBLACION", lat: 14.957582, lng: 120.964746 },
  { name: "BALAGTAS-BMA", lat: 14.968905, lng: 120.966704 },
  { name: "BANCA-BANCA", lat: 15.023803, lng: 120.920138 },
  { name: "CAINGIN", lat: 14.984403, lng: 120.944711 },
  { name: "CORAL NA BATO", lat: 14.9883467, lng: 120.9527132 },
  { name: "CRUZ NA DAAN", lat: 15.028453, lng: 120.934721 },
  { name: "DAGAT-DAGATAN", lat: 15.033062, lng: 120.919159 },
  { name: "DILIMAN I", lat: 15.02266, lng: 120.951898 },
  { name: "DILIMAN II", lat: 15.032514, lng: 120.955278 },
  { name: "CAPIHAN", lat: 14.994701, lng: 120.932039 },
  { name: "LIBIS", lat: 14.958131, lng: 120.970534 },
  { name: "LICO", lat: 14.960897, lng: 120.954638 },
  { name: "MAASIM", lat: 15.03575, lng: 120.936962 },
  { name: "MABALAS-BALAS", lat: 15.026463, lng: 120.942103 },
  { name: "MAGUINAO", lat: 15.019075, lng: 120.938981 },
  { name: "MARONQUILLO", lat: 14.976566, lng: 120.999972 },
  { name: "PACO", lat: 15.000635, lng: 120.908328 },
  { name: "PANSUMALOC", lat: 15.017699, lng: 120.899016 },
  { name: "PANTUBIG", lat: 14.967816, lng: 120.951533 },
  { name: "PASONG BANGKAL", lat: 15.002732, lng: 121.0111 },
  { name: "PASONG CALLOS", lat: 14.99639, lng: 120.988591 },
  { name: "PASONG INCHIC", lat: 15.008049, lng: 120.964837 },
  { name: "PINAC-PINACAN", lat: 14.992131, lng: 120.916471 },
  { name: "PULO", lat: 14.977026, lng: 121.020444 },
  { name: "PULONG BAYABAS", lat: 15.01669, lng: 120.908178 },
  { name: "SALAPUNGAN", lat: 15.019655, lng: 120.962509 },
  { name: "SAMPALOC", lat: 14.979477, lng: 120.92411 },
  { name: "SAN AGUSTIN", lat: 15.028639, lng: 120.927377 },
  { name: "SAN ROQUE", lat: 15.010505, lng: 120.931921 },
  { name: "SAPANG PAHALANG", lat: 14.994877, lng: 121.036785 },
  { name: "TALACSAN", lat: 14.96694, lng: 120.982641 },
  { name: "TAMBUBONG", lat: 14.970694, lng: 120.926983 },
  { name: "TUKOD", lat: 14.994259, lng: 121.053696 },
  { name: "ULINGAO", lat: 14.978291, lng: 120.91417 },
];

export interface BarangayLocationData {
  name: keyof BarangayData;
  lat: number;
  lng: number;
}

export interface YearBarangayData {
  [key: string]: MonthBarangayData;
}

export interface MonthBarangayData {
  "1"?: RawBarangayData;
  "2"?: RawBarangayData;
  "3"?: RawBarangayData;
  "4"?: RawBarangayData;
  "5"?: RawBarangayData;
  "6"?: RawBarangayData;
  "7"?: RawBarangayData;
  "8"?: RawBarangayData;
  "9"?: RawBarangayData;
  "10"?: RawBarangayData;
  "11"?: RawBarangayData;
  "12"?: RawBarangayData;
}

export interface RawBarangayData {
  Residential: number;
  Agricultural: number;
  Commercial: number;
  Industrial: number;
  Special: number;
  Mineral: number;
  ED: number;
  R4: number;
  SX: number;
  TZ: number;
  SB: number;
  male_population: number;
  female_population: number;
}

export const constructEmptyRawBarangayData = (): RawBarangayData => {
  return {
    Residential: 0,
    Agricultural: 0,
    Commercial: 0,
    Industrial: 0,
    Special: 0,
    Mineral: 0,
    ED: 0,
    R4: 0,
    SX: 0,
    TZ: 0,
    SB: 0,
    male_population: 0,
    female_population: 0,
  };
};

export interface ImportBarangayData {
  Residential?: string;
  Agricultural?: string;
  Commercial?: string;
  Industrial?: string;
  Special?: string;
  Mineral?: string;
  ED?: string;
  R4?: string;
  SX?: string;
  TZ?: string;
  SB?: string;
  male_population?: string;
  female_population?: string;
  Year?: string;
  Month?: keyof MonthBarangayData;
  Barangay?: keyof BarangayData;
}
