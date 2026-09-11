import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { ConvexHttpClient } from "convex/browser";

function getLiveblocksClient() {
  const secret = process.env.LIVEBLOCKS_SECRET_KEY;

  if (!secret) {
    throw new Error("LIVEBLOCKS_SECRET_KEY is not configured");
  }

  return new Liveblocks({ secret });
}

function getConvexClient() {
  const deploymentUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  if (!deploymentUrl) {
    throw new Error("NEXT_PUBLIC_CONVEX_URL is not configured");
  }

  return new ConvexHttpClient(deploymentUrl);
}

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function POST(req: Request) {
  const { userId, orgId } = await auth();
  const { roomId } = await req.json();
  const { sessionClaims } = await auth();

  if (!roomId) {
    return jsonError("Missing room id", 400);
  }

  const document = await getConvexClient().query(
    api.document.listDocumentsById,
    {
      documentId: roomId as Id<"documents">,
    },
  );

  if (!document) {
    return jsonError("Document not found", 404);
  }

  if (document.organizationId && !userId) {
    return jsonError("Sign in to access this document", 401);
  }
  if (!userId) {
    return jsonError("Sign in to access this document", 401);
  }

  const user = await currentUser();
  const isOwner = document.ownerId === userId;
  const isMember = orgId === document.organizationId;

  console.log("Session Claims:", sessionClaims);
  console.log("is Member:", isMember);
  if (!isOwner && !isMember) {
    return jsonError("You do not have access to this document", 403);
  }
  const session = getLiveblocksClient().prepareSession(userId, {
    userInfo: {
      name: user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? "User",
      avatar: user?.imageUrl ?? "",
    },
  });

  session.allow(roomId, ["*:write"]);

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
