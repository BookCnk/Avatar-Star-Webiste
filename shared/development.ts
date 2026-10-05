export function developmentFallbackEnabled(
  nodeEnv: string | undefined,
  demoMode: string | undefined
) {
  return nodeEnv !== "production" && demoMode !== "false";
}
