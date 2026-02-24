import React, { JSX } from "react";

export function parseFormattedText(
  text: string,
  options?: {
    emailColor?: string;
    emailHoverClass?: string;
    boldEmailClassName?: string;
    regularEmailClassName?: string;
    boldClassName?: string;
  }
) {
  const {
    emailColor = '#862633',
    emailHoverClass = 'hover:underline',
    boldEmailClassName = 'font-bold',
    regularEmailClassName = 'font-medium',
    boldClassName = 'font-bold'
  } = options || {};

  // Split by both patterns
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match;
  
  // Combined regex to match both bold and email
  const combinedRegex = /(\*\*.*?\*\*)|([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
  
  while ((match = combinedRegex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    
    // Check if it's bold text
    if (match[0].startsWith('**')) {
      const boldText = match[0].replace(/\*\*/g, '');
      
      // Check if bold text contains an email
      const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
      const emailMatch = emailRegex.exec(boldText);
    
      if (emailMatch) {
        // Bold text with email inside
        parts.push(
          <a
            key={match.index}
            href={`mailto:${emailMatch[0]}`}
            className={`${emailHoverClass} ${boldEmailClassName}`}
            style={{ color: emailColor }}
          >
            {boldText}
          </a>
        );
      } else {
        // Just bold text
        parts.push(<strong key={match.index} className={boldClassName}>{boldText}</strong>);
      }
    } else {
      // Just email link (not bold)
      parts.push(
        <a 
          key={match.index}
          href={`mailto:${match[0]}`}
          className={`${emailHoverClass} ${regularEmailClassName}`}
          style={{ color: emailColor }}
        >
          {match[0]}
        </a>
      );
    }
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
}