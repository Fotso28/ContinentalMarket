import { SiteFrame } from "@/components/site-frame";
import NotFoundContent from "./(site)/not-found";

/** 404 des URL inconnues : elles gardent le cadre du site, comme le reste des pages. */
export default function RootNotFound() {
  return (
    <SiteFrame>
      <NotFoundContent />
    </SiteFrame>
  );
}
