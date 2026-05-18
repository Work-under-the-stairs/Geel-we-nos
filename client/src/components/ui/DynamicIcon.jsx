import React from 'react';
import * as LucideIcons from 'lucide-react';

export const DynamicIcon = ({ name, className = "w-5 h-5" }) => {
  const IconComponent = LucideIcons[name];
  if (!IconComponent) return <LucideIcons.Newspaper className={className} />;
  return <IconComponent className={className} />;
};