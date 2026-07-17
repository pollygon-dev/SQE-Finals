// Runtime configuration, injected via public/config.js (replaced with
// configs/config.<environment>.js at deployment time).
const FALLBACK = {
  envName: "unknown",
  displayName: "Unknown",
  bannerColor: "#6b7280",
  features: { reports: false, deleteRecords: false }
};

const config = typeof window !== "undefined" && window.APP_CONFIG ? window.APP_CONFIG : FALLBACK;

export default config;
