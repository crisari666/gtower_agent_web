declare module '*.json' {
  const value: {
    description: string;
    seed: string;
    coreColors: {
      primary: string;
      tertiary: string;
      error: string;
    };
    extendedColors: unknown[]
    schemes: {
      light: Record<string, string>;
      'light-medium-contrast': Record<string, string>;
      'light-high-contrast': Record<string, string>;
      dark: Record<string, string>;
      'dark-medium-contrast': Record<string, string>;
      'dark-high-contrast': Record<string, string>;
    };
    palettes: {
      primary: Record<string, string>;
      secondary: Record<string, string>;
      tertiary: Record<string, string>;
      neutral: Record<string, string>;
      'neutral-variant': Record<string, string>;
    };
  }
  export default value
}
