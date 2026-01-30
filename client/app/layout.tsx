import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "../components/providers/auth-provider";
import GlobalScrollProvider from "../components/GlobalScrollProvider";
import ChatPopup from "../components/ChatPopup";
import ChatWidget from "../components/ChatWidget";
import ToastProvider from "../components/ui/ToastProvider";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jcss.in";

export const metadata: Metadata = {
  title: {
    default: "JCSS - Professional Services & Advisory",
    template: "%s | JCSS",
  },
  description:
    "Expert audit, assurance, tax, legal, corporate advisory, and enterprise support services to help your business thrive.",
  metadataBase: new URL(appUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JCSS - Professional Services & Advisory",
    description:
      "Expert audit, assurance, tax, legal, corporate advisory, and enterprise support services to help your business thrive.",
    url: appUrl,
    siteName: "JCSS",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JCSS Professional Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JCSS - Professional Services & Advisory",
    description:
      "Expert audit, assurance, tax, legal, corporate advisory, and enterprise support services to help your business thrive.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/icons/Day.png", media: "(prefers-color-scheme: light)" },
      { url: "/icons/Night.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="favicon-theme-switcher"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function setFavicon() {
                  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
                  favicon.rel = 'icon';
                  favicon.href = isDark ? '/icons/Night.png' : '/icons/Day.png';
                  if (!document.querySelector('link[rel="icon"]')) {
                    document.head.appendChild(favicon);
                  }
                }
                
                // Set initial favicon
                setFavicon();
                
                // Listen for theme changes
                if (window.matchMedia) {
                  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setFavicon);
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${barlow.variable} antialiased`}>
        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="lazyOnload"
        />
        <AuthProvider>
          <GlobalScrollProvider>
            <ToastProvider />
            {children}
            <ChatWidget />
            <ChatPopup />
          </GlobalScrollProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
