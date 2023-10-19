export interface AdminBackendSettingsData {
  nuke: boolean;
}

export const constructEmptyAdminBackendSettingsData =
  (): AdminBackendSettingsData => {
    return {
      nuke: false,
    };
  };
