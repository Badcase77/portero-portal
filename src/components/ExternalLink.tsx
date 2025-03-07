
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";

interface ExternalLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const ExternalLink = ({ href, className, children }: ExternalLinkProps) => {
  return (
    <Button
      variant="outline"
      className={className}
      onClick={() => window.open(href, '_blank', 'noopener,noreferrer')}
    >
      {children}
      <ExternalLinkIcon className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default ExternalLink;
