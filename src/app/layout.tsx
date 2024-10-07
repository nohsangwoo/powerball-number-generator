import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from 'next/script'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Powerball Number Generator | Lucky Lottery Picker",
  description: "Generate winning Powerball numbers with our free online tool. Increase your chances of hitting the jackpot with our random number generator.",
  keywords: [
    "Powerball number generator, lottery number picker, random number generator, Powerball strategy, lucky numbers, lottery tips, win Powerball, Powerball predictions, lottery number generator, Powerball odds, how to win Powerball, Powerball quick pick, lottery number analysis, Powerball number patterns, best Powerball numbers"
  ].join(", "),
  openGraph: {
    title: "Powerball Number Generator - Boost Your Chances of Winning",
    description: "Use our free Powerball number generator to create potential winning combinations. Improve your lottery strategy with our advanced random number picker.",
    images: [
      {
        url: "https://powerball.ludgi.ai/logo.webp", // 실제 로고 URL로 변경해주세요
        width: 1200,
        height: 630,
        alt: "powerball number generator",
      },
    ],
    locale: "ko_KR",
  },
  twitter: {
    title: "Powerball Number Generator - Your Path to the Jackpot",
    description: "Generate lucky Powerball numbers instantly. Our free tool helps you pick potential winning combinations for the next big draw.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: {
  //   google: "추후_추가할_구글_인증_코드",
  //   yandex: "추후_추가할_얀덱스_인증_코드",
  // },
  // ... 기존의 alternates 설정 ...
};

const pubId = "ca-pub-5823741955283998"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content={pubId} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Funding Choices 스크립트 */}
        <Script
          id="google-funding-choices"
          strategy="afterInteractive"
          src={`https://fundingchoicesmessages.google.com/i/${pubId}?ers=1`}
        />
        {/* Google FC Present 스크립트 */}
        <Script
          id="google-fc-present"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();`
          }}
        />
      </body>
    </html>
  );
}
