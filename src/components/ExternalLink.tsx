
import React from 'react';
import { Button, ButtonProps } from "@/components/ui/button";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";

interface ExternalLinkProps extends Omit<ButtonProps, 'onClick'> {
  href: string;
  children: React.ReactNode;
}

const ExternalLink = ({ href, children, ...props }: ExternalLinkProps) => {
  return (
    <Button
      variant="outline"
      {...props}
      onClick={() => window.open(href, '_blank', 'noopener,noreferrer')}
    >
      {children}
      <ExternalLinkIcon className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default ExternalLink;
