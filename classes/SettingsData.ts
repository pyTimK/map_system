export interface SettingsData {
  default: string;
}

export const constructEmptySettingsData = (): SettingsData => {
  return {
    default: "1698836084172_2019-2023",
  };
};
