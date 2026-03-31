import { AnnouncementBar } from "@/components/announcement-bar";
import { MusicPlayer } from "@/components/music-player";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white pb-0 text-black">
      <AnnouncementBar />
      <SiteHeader />
      {children}
      <SiteFooter />
      <MusicPlayer />
    </div>
  );
}
