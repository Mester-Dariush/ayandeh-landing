
// Maps asset names to paths.
// Files get downloaded by that script in scripts/ folder. You know the one.

const getAssetPath = (path: string) => {
  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${baseUrl}${path.replace(/^\//, '')}`;
};

export const Emojis = {
  cool: getAssetPath('assets/emojis/cool.png'),
  funny: getAssetPath('assets/emojis/funny.png'),
  fast: getAssetPath('assets/emojis/fast.png'),
  pretty: getAssetPath('assets/emojis/pretty.png'),
  robot: getAssetPath('assets/emojis/robot.png'),
  party: getAssetPath('assets/emojis/party.png'),
  sparkles: getAssetPath('assets/emojis/sparkles.png'),
  money: getAssetPath('assets/emojis/money.png'),
  starStruck: getAssetPath('assets/emojis/star-struck.png'),
  failed: getAssetPath('assets/emojis/failed.png'),
};

// Stuff that needs to load before the app starts or it looks ugly.
export const CRITICAL_ASSETS = Object.values(Emojis);
