function isMacPlatform() {
  // Use userAgentData if supported
  if ((navigator as any).userAgentData?.platform) {
    return (navigator as any).userAgentData.platform
      .toLowerCase()
      .includes("mac");
  }
  // Fallback to userAgent for older browsers
  return /mac/i.test(navigator.userAgent);
}

export { isMacPlatform };
