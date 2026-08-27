import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { ConvexHttpClient } from "convex/browser";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

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

  const document = await convex.query(api.document.listDocumentsById, {
    documentId: roomId as Id<"documents">,
  });

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
  const session = liveblocks.prepareSession(userId, {
    userInfo: {
      name: user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? "User",
      avatar: user?.imageUrl ?? "",
    },
  });

  session.allow(roomId, ["*:write"]);

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
