export interface SettingsData {
  default: string;
}

export const constructEmptySettingsData = (): SettingsData => {
  return {
    default: "1696613095502",
  };
};
