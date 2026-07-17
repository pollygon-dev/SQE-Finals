import config from "../config.js";

export default function EnvBanner({ version }) {
  return (
    <div id="env-banner" style={{ background: config.bannerColor }}>
      <span>{config.displayName} environment</span>
      <span>v{version}</span>
    </div>
  );
}
