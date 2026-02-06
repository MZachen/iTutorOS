import { redirect } from "next/navigation";

export default function LegacyOrganizationSettingsRedirect() {
  redirect("/settings");
}

