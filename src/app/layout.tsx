import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ChildProfileProvider } from "@/context/ChildProfileContext";
import { ChildReportCardModal } from "@/components/ChildReportCardModal";
import { ProfileManagerModal } from "@/components/ProfileManagerModal";
import { EditProfileModal } from "@/components/EditProfileModal";
import { WelcomeSetupModal } from "@/components/WelcomeSetupModal";
import { DeviceLoginModal } from "@/components/DeviceLoginModal";
import { KidMascot } from "@/components/KidMascot";

export const metadata: Metadata = {
  title: "Kids English & Hindi Academy | Visual Bilingual Learning",
  description:
    "Fun, visual, and interactive early childhood language learning platform for Hindi & English with student progress tracking and voice speech practice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FFFDF7] text-stone-900 selection:bg-amber-200">
        <LanguageProvider>
          <ChildProfileProvider>
            {children}
            {/* Global Kid Modals & Mascot */}
            <WelcomeSetupModal />
            <EditProfileModal />
            <DeviceLoginModal />
            <ChildReportCardModal />
            <ProfileManagerModal />
            <KidMascot />
          </ChildProfileProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
