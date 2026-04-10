import { 
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  Link as LinkIcon,
  MessageCircle
} from "lucide-react";
import React from "react";

export function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

export function XSocialIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}>
      <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/>
    </svg>
  );
}

export function getSocialIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes('facebook')) return <Facebook className="h-4 w-4" />;
  if (l.includes('instagram')) return <Instagram className="h-4 w-4" />;
  if (l.includes('linkedin')) return <Linkedin className="h-4 w-4" />;
  if (l.includes('youtube')) return <Youtube className="h-4 w-4" />;
  if (l.includes('tiktok')) return <TiktokIcon className="h-4 w-4" />;
  if (l === 'x' || l.includes('twitter')) return <XSocialIcon className="h-4 w-4" />;
  if (l.includes('linktr.ee')) return <LinkIcon className="h-4 w-4" />;
  if (l.includes('threads')) return <MessageCircle className="h-4 w-4" />;
  if (l.includes('weblap') || l.includes('web') || l.includes('honlap') || l.includes('mvk.bme.hu') || l.includes('.hu') || l.includes('.eu') || l.includes('.com') || l.includes('.org')) return <Globe className="h-4 w-4" />;
  return <ExternalLink className="h-4 w-4" />;
}

export function getSocialPriority(label: string) {
  const l = label.toLowerCase();
  if (l.includes('weblap') || l.includes('web') || l.includes('honlap') || l.includes('mvk.bme.hu') || l.includes('.hu') || l.includes('.eu') || l.includes('.com') || l.includes('.org')) return 1;
  if (l.includes('facebook')) return 2;
  if (l.includes('instagram')) return 3;
  if (l.includes('linkedin')) return 4;
  if (l.includes('youtube')) return 5;
  if (l === 'x' || l.includes('twitter')) return 6;
  if (l.includes('tiktok')) return 7;
  if (l.includes('threads')) return 8;
  if (l.includes('linktr.ee')) return 9;
  return 10;
}

export function getSocialName(label: string) {
  const l = label.toLowerCase();
  if (l.includes('facebook')) return 'Facebook';
  if (l.includes('instagram')) return 'Instagram';
  if (l.includes('linkedin')) return 'LinkedIn';
  if (l.includes('youtube')) return 'YouTube';
  if (l.includes('tiktok')) return 'TikTok';
  if (l === 'x' || l.includes('twitter')) return 'X (Twitter)';
  if (l.includes('linktr.ee')) return 'Linktree';
  if (l.includes('threads')) return 'Threads';
  if (l.includes('weblap') || l.includes('web') || l.includes('honlap') || l.includes('mvk.bme.hu') || l.includes('.hu') || l.includes('.eu') || l.includes('.com') || l.includes('.org')) return 'Weblap';
  return label;
}
