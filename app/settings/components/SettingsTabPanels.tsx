"use client";

import dynamic from "next/dynamic";

export type SettingsTabPanelsProps = {
  ctx: Record<string, any>;
};

const LazySettingsAccountTab = dynamic(() => import("./tabs/SettingsAccountTab"), { ssr: false });
const LazySettingsBusinessTab = dynamic(() => import("./tabs/SettingsBusinessTab"), { ssr: false });
const LazySettingsLocationsTab = dynamic(() => import("./tabs/SettingsLocationsTab"), { ssr: false });
const LazySettingsClientsTab = dynamic(() => import("./tabs/SettingsClientsTab"), { ssr: false });
const LazySettingsTutorsTab = dynamic(() => import("./tabs/SettingsTutorsTab"), { ssr: false });
const LazySettingsServicesTab = dynamic(() => import("./tabs/SettingsServicesTab"), { ssr: false });
const LazySettingsSubjectsTopicsTab = dynamic(() => import("./tabs/SettingsSubjectsTopicsTab"), { ssr: false });
const LazySettingsArchiveTab = dynamic(() => import("./tabs/SettingsArchiveTab"), { ssr: false });
const LazySettingsScheduleTab = dynamic(() => import("./tabs/SettingsScheduleTab"), { ssr: false });
const LazySettingsPipelineTab = dynamic(() => import("./tabs/SettingsPipelineTab"), { ssr: false });
const LazySettingsConnectionsTab = dynamic(() => import("./tabs/SettingsConnectionsTab"), { ssr: false });
const LazySettingsContentAndMarketingTab = dynamic(() => import("./tabs/SettingsContentAndMarketingTab"), { ssr: false });
const LazySettingsWebsiteTab = dynamic(() => import("./tabs/SettingsWebsiteTab"), { ssr: false });

export default function SettingsTabPanels({ ctx }: SettingsTabPanelsProps) {
  switch (ctx.activeTab) {
    case "ACCOUNT":
      return <LazySettingsAccountTab ctx={ctx} />;
    case "BUSINESS":
      return <LazySettingsBusinessTab ctx={ctx} />;
    case "LOCATIONS":
      return <LazySettingsLocationsTab ctx={ctx} />;
    case "CLIENTS":
      return <LazySettingsClientsTab ctx={ctx} />;
    case "TUTORS":
      return <LazySettingsTutorsTab ctx={ctx} />;
    case "SERVICES":
      return <LazySettingsServicesTab ctx={ctx} />;
    case "SUBJECTS_TOPICS":
      return <LazySettingsSubjectsTopicsTab ctx={ctx} />;
    case "ARCHIVE":
      return <LazySettingsArchiveTab ctx={ctx} />;
    case "SCHEDULE":
      return <LazySettingsScheduleTab ctx={ctx} />;
    case "PIPELINE":
      return <LazySettingsPipelineTab ctx={ctx} />;
    case "CONNECTIONS":
      return <LazySettingsConnectionsTab ctx={ctx} />;
    case "PRODUCTS":
    case "MARKETING":
      return <LazySettingsContentAndMarketingTab ctx={ctx} />;
    case "WEBSITE":
      return <LazySettingsWebsiteTab ctx={ctx} />;
    default:
      return null;
  }
}
