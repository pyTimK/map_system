export interface SettingsData {
  default: string;
}

export const constructEmptySettingsData = (): SettingsData => {
  return {
    default: "1698833483831_2021",
  };
};
