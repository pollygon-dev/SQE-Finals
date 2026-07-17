// Runtime configuration for the STAGING environment.
// Deployed as dist/config.js by the CD job when target = staging.
window.APP_CONFIG = {
  envName: "staging",
  displayName: "Staging",
  bannerColor: "#d97706",
  features: {
    reports: true,
    deleteRecords: true
  }
};
