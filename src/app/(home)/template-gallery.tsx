"use client";

import { ArrowRight, FilePlus2 } from "lucide-react";
import Image from "next/image";
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const templates = [
  {
    id: "proposal",
    name: "Project proposal",
    description: "Outline a plan and next steps",
    thumbnail: "/project-proposal.svg",
  },
  {
    id: "resume",
    name: "Resume",
    description: "Present your experience clearly",
    thumbnail: "/resume.svg",
  },
  {
    id: "letter",
    name: "Letter",
    description: "Write a considered note",
    thumbnail: "/letter.svg",
  },
  {
    id: "software-proposal",
    name: "Software proposal",
    description: "Frame a technical engagement",
    thumbnail: "/software-proposal.svg",
  },
  {
    id: "cover-letter",
    name: "Cover letter",
    description: "Introduce your application",
    thumbnail: "/cover-letter.svg",
  },
  {
    id: "business-letter",
    name: "Business letter",
    description: "Write formal correspondence",
    thumbnail: "/business-letter.svg",
  },
];

export const TemplateGallery = () => {
  const [creatingTemplate, setCreatingTemplate] = useState<string | null>(null);
  const [creationError, setCreationError] = useState<string | null>(null);
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  const create = useMutation(api.document.createDocument);
  const router = useRouter();
  const visibleTemplates = showAllTemplates ? templates : templates.slice(0, 3);

  const handleDocumentCreation = async (
    templateName: string,
    templateId: string,
  ) => {
    setCreatingTemplate(templateId);
    setCreationError(null);
    try {
      const documentId = await create({
        title: templateName,
        initialContent: "",
      });
      router.push(`/document/${documentId}`);
    } catch {
      setCreationError(
        "We couldn’t create a document from that template. Please try again.",
      );
    } finally {
      setCreatingTemplate(null);
    }
  };

  return (
    <section
      className="mt-12 border-t border-[#deded9] pt-8"
      aria-labelledby="templates-heading"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2
          id="templates-heading"
          className="text-[22px] font-semibold tracking-[-0.025em] text-[#252525] sm:text-[24px]"
        >
          Start with a template
        </h2>
        <button
          type="button"
          onClick={() => setShowAllTemplates((value) => !value)}
          className="inline-flex items-center gap-1 text-sm font-medium text-[#2764b9] outline-none transition-colors hover:text-[#1f559e] focus-visible:ring-2 focus-visible:ring-[#3971c6]"
          aria-expanded={showAllTemplates}
        >
          {showAllTemplates ? "Show less" : "Browse all templates"}
          <ArrowRight
            size={15}
            aria-hidden="true"
            className={showAllTemplates ? "rotate-90" : ""}
          />
        </button>
      </div>
      <p className="mt-2 text-[15px] leading-6 text-[#62625e]">
        Use a structured starting point, then make it your own.
      </p>

      {creationError ? (
        <p role="alert" className="mt-4 text-sm text-[#b42318]">
          {creationError}
        </p>
      ) : null}

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:max-w-3xl">
        {visibleTemplates.map((template) => (
          <button
            key={template.id}
            type="button"
            disabled={creatingTemplate !== null}
            onClick={() => handleDocumentCreation(template.name, template.id)}
            className="group min-w-0 text-left outline-none disabled:pointer-events-none disabled:opacity-60"
          >
            <span className="relative block aspect-[1.4/1] overflow-hidden rounded-md border border-[#deded9] bg-[#fffefc] transition-[border-color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:border-[#aabed9] group-focus-visible:ring-2 group-focus-visible:ring-[#3971c6] group-focus-visible:ring-offset-2">
              <Image
                src={template.thumbnail}
                alt=""
                fill
                sizes="(min-width: 640px) 180px, 42vw"
                className="object-cover object-top"
              />
            </span>
            <span className="mt-2 block truncate text-sm font-medium text-[#383835]">
              {creatingTemplate === template.id ? "Creating…" : template.name}
            </span>
            <span className="mt-1 block min-h-10 text-[13px] leading-5 text-[#7b7b76]">
              {template.description}
            </span>
          </button>
        ))}
        {!showAllTemplates ? (
          <button
            type="button"
            onClick={() => setShowAllTemplates(true)}
            className="group min-w-0 text-left outline-none"
          >
            <span className="flex aspect-[1.4/1] items-center justify-center rounded-md border border-dashed border-[#cfcfca] bg-[#fffefc] text-[#60605c] transition-colors group-hover:border-[#7d9dca] group-hover:bg-[#f5f8fc] group-hover:text-[#2764b9] group-focus-visible:ring-2 group-focus-visible:ring-[#3971c6] group-focus-visible:ring-offset-2">
              <FilePlus2 size={20} strokeWidth={1.5} />
            </span>
            <span className="mt-2 block text-sm font-medium text-[#383835]">
              Browse templates
            </span>
            <span className="mt-1 block min-h-10 text-[13px] leading-5 text-[#7b7b76]">
              Find the right starting point
            </span>
          </button>
        ) : null}
      </div>
    </section>
  );
};
