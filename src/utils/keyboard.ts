type NavigatorUAData = { platform?: string };

function isMacPlatform() {
  const uaData = (navigator as Navigator & { userAgentData?: NavigatorUAData })
    .userAgentData;

  // Use userAgentData if supported
  if (uaData?.platform) {
    return uaData.platform.toLowerCase().includes("mac");
  }
  // Fallback to userAgent for older browsers
  return /mac/i.test(navigator.userAgent);
}

export { isMacPlatform };
