import { SiteFrame } from "@/components/site-frame";

/** Mise en page commune de tout le site public : vitrine et e-commerce partagent le même cadre. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteFrame>{children}</SiteFrame>;
}
