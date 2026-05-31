import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Toolbar } from "./toolbar";

// interface DocumentIdPageProps {
//   params: Promise<{
//     documentId: string;
//   }>;
// }
const DocumentIdPage = async () => {
  // const { documentId } = await params;
  return (
    <div>
      <Navbar />
      <Toolbar />
      <Editor />
    </div>
  );
};
export default DocumentIdPage;
