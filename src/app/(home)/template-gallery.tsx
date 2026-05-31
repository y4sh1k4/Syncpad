"use client";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export const TemplateGallery = () => {
  const isCreating = false;
  const templates = [
    {
      id: 1,
      name: "Blank Document",
      thumbnail: "/blank-document.svg",
    },
    {
      id: 2,
      name: "Project Proposal",
      thumbnail: "/project-proposal.svg",
    },
    {
      id: 3,
      name: "Software Proposal",
      thumbnail: "/software-proposal.svg",
    },
    {
      id: 4,
      name: "Resume",
      thumbnail: "/resume.svg",
    },
    {
      id: 5,
      name: "Cover Letter",
      thumbnail: "/cover-letter.svg",
    },
    {
      id: 6,
      name: "Letter",
      thumbnail: "/letter.svg",
    },
    {
      id: 7,
      name: "Business Letter",
      thumbnail: "/business-letter.svg",
    },
  ];
  return (
    <div className="bg-neutral-200 flex items-center justify-center">
      <div className="flex flex-col h-[20rem] gap-4 p-4 max-w-screen-xl justify-center">
        <div className="font-medium">Start a new document</div>
        <Carousel className="w-full">
          <CarouselContent>
            {templates.map((template) => (
              <div
                key={template.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/8 rounded-md pl-4"
              >
                <div
                  className={cn(
                    "aspect-[3/4] flex flex-col items-center gap-y-2",
                    isCreating && "pointer-events-none opacity-50",
                  )}
                >
                  <button
                    onClick={() => {}}
                    disabled={isCreating}
                    style={{
                      backgroundImage: `url(${template.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    className="h-[200px] w-[150px] relative rounded-md border border-transparent hover:border-blue-500"
                  ></button>
                  <p className="text-sm text-neutral-600 font-medium">
                    {template.name}
                  </p>
                </div>
              </div>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
