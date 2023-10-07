export interface AdminData {
  csvs: string[];
}

export const constructEmptyAdminData = (): AdminData => {
  return {
    csvs: [],
  };
};
