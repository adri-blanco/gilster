const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
nativeConfig = withNativeWind(config, { input: "./app/global.css" });

nativeConfig.resolver.sourceExts.push("sql");

module.exports = nativeConfig;
