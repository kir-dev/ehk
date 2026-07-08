import { ExternalLink, Globe, Mail } from "lucide-react";
import React from "react";

import { Locale } from "@/i18n-config";

type SocialIconProps = Readonly<{ className?: string }>;

function FacebookIcon({ className }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97H15.83c-1.49 0-1.955.93-1.955 1.885v2.266h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
    </svg>
  );
}

function InstagramIcon({ className }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M7.8 2h8.4A5.806 5.806 0 0 1 22 7.8v8.4a5.806 5.806 0 0 1-5.8 5.8H7.8A5.806 5.806 0 0 1 2 16.2V7.8A5.806 5.806 0 0 1 7.8 2Zm-.2 2A3.604 3.604 0 0 0 4 7.6v8.8A3.604 3.604 0 0 0 7.6 20h8.8a3.604 3.604 0 0 0 3.6-3.6V7.6A3.604 3.604 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5Zm0 2a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.047c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

function YouTubeIcon({ className }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
    </svg>
  );
}

export function TiktokIcon({ className }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z" />
    </svg>
  );
}

export function XSocialIcon({ className }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993Zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182Z" />
    </svg>
  );
}

function ThreadsIcon({ className }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12.04 2C7.02 2 4 5.28 4 11.91 4 18.71 7.27 22 12.49 22c4.42 0 7.36-2.5 7.36-6.04 0-2.29-1.3-4.17-3.6-5.13-.28-3.19-2.06-4.91-5.04-4.91-1.86 0-3.42.76-4.37 2.14l1.78 1.24c.6-.84 1.44-1.25 2.51-1.25 1.55 0 2.47.81 2.77 2.42-.58-.09-1.17-.12-1.78-.09-2.75.16-4.43 1.64-4.34 3.83.08 1.95 1.78 3.23 4.1 3.1 2.3-.13 3.76-1.4 4.26-3.74.9.63 1.37 1.45 1.37 2.41 0 2.19-1.89 3.75-4.94 3.75-3.96 0-6.2-2.64-6.2-7.82 0-5.17 2.04-7.64 5.67-7.64 2.87 0 4.64 1.44 5.34 4.34l2.22-.59C18.62 4.05 16 2 12.04 2Zm.01 13.13c-1.05.06-1.76-.36-1.8-1.08-.04-.82.74-1.35 2.06-1.42.63-.04 1.25.02 1.85.16-.18 1.44-.88 2.27-2.11 2.34Z" />
    </svg>
  );
}

function LinktreeIcon({ className }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="m13.736 5.852 4.004-4.116 2.324 2.392-4.032 4.004h5.708v3.36h-5.736l4.06 4.06-2.324 2.38-5.74-5.824-5.74 5.824-2.324-2.38 4.06-4.06H2.26v-3.36h5.708L3.936 4.128 6.26 1.736l4.004 4.116V0h3.472v5.852ZM10.264 16.8h3.472V24h-3.472v-7.2Z" />
    </svg>
  );
}

export function getSocialIcon(label: string, className = "h-4 w-4") {
  const l = label.toLowerCase();
  if (l.includes("facebook")) return <FacebookIcon className={className} />;
  if (l.includes("instagram")) return <InstagramIcon className={className} />;
  if (l.includes("linkedin")) return <LinkedInIcon className={className} />;
  if (l.includes("youtube")) return <YouTubeIcon className={className} />;
  if (l.includes("tiktok")) return <TiktokIcon className={className} />;
  if (l === "x" || l.includes("twitter")) {
    return <XSocialIcon className={className} />;
  }
  if (l.includes("linktr.ee")) return <LinktreeIcon className={className} />;
  if (l.includes("threads")) return <ThreadsIcon className={className} />;
  if (l.includes("@") || l.includes("email") || l.includes("e-mail")) {
    return <Mail className={className} />;
  }
  if (
    l.includes("weblap") ||
    l.includes("web") ||
    l.includes("honlap") ||
    l.includes("mvk.bme.hu") ||
    l.includes(".hu") ||
    l.includes(".eu") ||
    l.includes(".com") ||
    l.includes(".org")
  ) {
    return <Globe className={className} />;
  }
  return <ExternalLink className={className} />;
}

export function getSocialPriority(label: string) {
  const l = label.toLowerCase();
  if (
    l.includes("weblap") ||
    l.includes("web") ||
    l.includes("honlap") ||
    l.includes("mvk.bme.hu") ||
    l.includes(".hu") ||
    l.includes(".eu") ||
    l.includes(".com") ||
    l.includes(".org")
  ) {
    return 1;
  }
  if (l.includes("facebook")) return 2;
  if (l.includes("instagram")) return 3;
  if (l.includes("linkedin")) return 4;
  if (l.includes("youtube")) return 5;
  if (l === "x" || l.includes("twitter")) return 6;
  if (l.includes("tiktok")) return 7;
  if (l.includes("threads")) return 8;
  if (l.includes("linktr.ee")) return 9;
  if (l.includes("@") || l.includes("email") || l.includes("e-mail")) return 10;
  return 11;
}

export function getSocialName(label: string, lang: Locale = "hu") {
  const l = label.toLowerCase().trim();

  if (l.includes("facebook")) return "Facebook";
  if (l.includes("instagram")) return "Instagram";
  if (l.includes("linkedin")) return "LinkedIn";
  if (l.includes("youtube")) return "YouTube";
  if (l.includes("tiktok")) return "TikTok";
  if (l === "x" || l.includes("twitter")) return "X (Twitter)";
  if (l.includes("linktr.ee")) return "Linktree";
  if (l.includes("threads")) return "Threads";
  if (l.includes("@") || l.includes("email") || l.includes("e-mail")) return "Email";
  if (
    l.includes("weblap") ||
    l.includes("web") ||
    l.includes("honlap") ||
    l.includes("mvk.bme.hu") ||
    l.includes(".hu") ||
    l.includes(".eu") ||
    l.includes(".com") ||
    l.includes(".org")
  ) {
    return lang === "hu" ? "Weblap" : "Website";
  }
  return label;
}
