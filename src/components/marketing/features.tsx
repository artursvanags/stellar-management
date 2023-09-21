'use client';
import { ToolStackIcons } from '@/config/icons';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Features() {
  const ToolStack = [
    {
      icon: <ToolStackIcons.Nextjs />,
      tool: 'NextJS',
    },
    {
      icon: <ToolStackIcons.Tailwind />,
      tool: 'TailwindCSS',
    },
    {
      icon: <ToolStackIcons.Typescript />,
      tool: 'TypeScript',
    },
    {
      icon: <ToolStackIcons.Javascript />,
      tool: 'JavaScript',
    },
    {
      icon: <ToolStackIcons.Wordpress />,
      tool: 'WordPress',
    },
    {
      icon: <ToolStackIcons.Graphql />,
      tool: 'GraphQL',
    },
  ];

  return (
    <section
      id="toolstack"
      className="border-t py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      <div className="container">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Toolstack
        </h2>
        <div className="mx-auto flex gap-4 py-8 sm:grid-cols-3">
          <TooltipProvider>
            {ToolStack.map((i, index) => (
              <Tooltip key={index}>
                <TooltipTrigger>{i.icon}</TooltipTrigger>
                <TooltipContent>{i.tool}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
}
