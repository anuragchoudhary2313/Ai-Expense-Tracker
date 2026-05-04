type FlagMap = {
  dashboardV2: boolean
  indianFeatures: boolean
}

const flags: FlagMap = {
  dashboardV2: process.env.NEXT_PUBLIC_FEATURE_DASHBOARD_V2 !== "false",
  indianFeatures: process.env.NEXT_PUBLIC_FEATURE_INDIAN_FEATURES !== "false",
}

export function isFeatureEnabled(flag: keyof FlagMap): boolean {
  return flags[flag]
}
