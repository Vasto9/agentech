"use client";

import Script from "next/script";
import { useCookieConsent } from "./CookieBanner";

const GA_ID = "G-V97K0CY0VC";

export default function GoogleAnalytics() {
  const consent = useCookieConsent();

  if (consent !== "all") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
