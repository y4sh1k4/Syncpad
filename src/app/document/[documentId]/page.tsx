import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Room } from "../../(home)/Room";
import { Toolbar } from "./toolbar";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface DocumentIdPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;
  const preloadedDocument = await preloadQuery(api.document.listDocumentsById, {
    documentId: documentId as Id<"documents">,
  });

  return (
    <Room id={documentId}>
      <div className="min-h-screen bg-[#F5F5F0]">
        <Navbar preloadedDocument={preloadedDocument} />
        <Toolbar />
        <Editor />
      </div>
    </Room>
  );
};
export default DocumentIdPage;
