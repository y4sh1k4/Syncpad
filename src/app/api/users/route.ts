import { getUsers } from "../../document/[documentId]/user";

export async function GET() {
  try {
    return Response.json(await getUsers());
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch users";

    console.error("Unable to resolve document users:", error);
    return Response.json({ error: message }, { status: 500 });
  }
}
