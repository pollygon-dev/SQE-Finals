// Runtime configuration for the PRODUCTION environment.
// Deployed as dist/config.js by the CD job when target = production.
window.APP_CONFIG = {
  envName: "production",
  displayName: "Production",
  bannerColor: "#dc2626",
  features: {
    reports: true,
    deleteRecords: false
  }
};
