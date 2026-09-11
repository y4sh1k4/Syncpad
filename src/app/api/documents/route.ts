import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

function getConvexClient() {
  const deploymentUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!deploymentUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not configured");
  }

  return new ConvexHttpClient(deploymentUrl);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids")?.split(",").filter(Boolean) ?? [];
  const convex = getConvexClient();

  const documents = await Promise.all(
    ids.map((id) =>
      convex.query(api.document.listDocumentsById, {
        documentId: id as Id<"documents">,
      }),
    ),
  );

  return Response.json(
    documents.filter(
      (document): document is NonNullable<typeof document> => document !== null,
    ),
  );
}
