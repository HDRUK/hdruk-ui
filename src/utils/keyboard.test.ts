import { isMacPlatform } from "./keyboard";

const MAC_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36";
const WINDOWS_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

const originalUserAgent = navigator.userAgent;

const stubNavigator = ({
  platform,
  userAgent,
}: {
  platform?: string;
  userAgent?: string;
}) => {
  Object.defineProperty(navigator, "userAgentData", {
    value: platform === undefined ? undefined : { platform },
    configurable: true,
  });
  Object.defineProperty(navigator, "userAgent", {
    value: userAgent ?? originalUserAgent,
    configurable: true,
  });
};

afterEach(() => {
  stubNavigator({});
});

describe("isMacPlatform", () => {
  it("reads userAgentData.platform when the browser supports it", () => {
    stubNavigator({ platform: "macOS" });

    expect(isMacPlatform()).toBe(true);
  });

  it("matches userAgentData.platform case-insensitively", () => {
    stubNavigator({ platform: "MAC" });

    expect(isMacPlatform()).toBe(true);
  });

  it("returns false for a non-mac userAgentData.platform", () => {
    stubNavigator({ platform: "Windows" });

    expect(isMacPlatform()).toBe(false);
  });

  it("prefers userAgentData over a conflicting userAgent", () => {
    stubNavigator({ platform: "Windows", userAgent: MAC_USER_AGENT });

    expect(isMacPlatform()).toBe(false);
  });

  it("falls back to userAgent when userAgentData is absent", () => {
    stubNavigator({ userAgent: MAC_USER_AGENT });

    expect(isMacPlatform()).toBe(true);
  });

  it("falls back to userAgent when userAgentData has no platform", () => {
    stubNavigator({ platform: "", userAgent: MAC_USER_AGENT });

    expect(isMacPlatform()).toBe(true);
  });

  it("returns false for a non-mac userAgent", () => {
    stubNavigator({ userAgent: WINDOWS_USER_AGENT });

    expect(isMacPlatform()).toBe(false);
  });
});
