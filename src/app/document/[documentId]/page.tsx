import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Room } from "../../(home)/Room";
import { Toolbar } from "./toolbar";

interface DocumentIdPageProps {
  params: Promise<{
    documentId: string;
  }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;

  return (
    <Room id={documentId}>
      <div>
        <Navbar />
        <Toolbar />
        <Editor />
      </div>
    </Room>
  );
};
export default DocumentIdPage;
