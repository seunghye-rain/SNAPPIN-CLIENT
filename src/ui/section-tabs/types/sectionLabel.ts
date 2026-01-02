export type SectionTabsProps<T extends string> = {
  tabs: readonly T[];
  selectedTab: T;
  onChangeTab: (tab: T) => void;
  getLabel: (tab: T) => string;
};
