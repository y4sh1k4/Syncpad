"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

type User = {
  id: string;
  name: string;
  avatar: string;
};

type RoomProps = {
  children: ReactNode;
  id: string;
};

export function Room({ children, id }: RoomProps) {
  const [authError, setAuthError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const authEndpoint = useCallback(async () => {
    const response = await fetch("/api/liveblocks-auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId: id }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
        typeof data?.error === "string"
          ? data.error
          : "Unable to authenticate with Liveblocks";

      setAuthError(message);
      throw new Error(message);
    }

    setAuthError(null);
    return data;
  }, [id]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        return;
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (error) {
      console.warn("Collaborator lookup unavailable:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      authEndpoint={authEndpoint}
      resolveUsers={async ({ userIds }) => {
        return userIds.map((userId) => {
          const user = users.find((user) => user.id === userId);
          return user || { name: "Anonymous", avatar: "" };
        });
      }}
      resolveMentionSuggestions={async ({ text }) => {
        const search = text.trim().toLowerCase();

        return users
          .filter((user) =>
            search ? user.name.toLowerCase().includes(search) : true,
          )
          .map((user) => user.id);
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const response = await fetch(
          `/api/documents?ids=${roomIds.map((roomId) => encodeURIComponent(roomId)).join(",")}`,
        );

        if (!response.ok) {
          return roomIds.map(() => undefined);
        }

        const documents: Array<{ _id: string; title: string }> =
          await response.json();

        return roomIds.map((roomId) => {
          const document = documents.find((item) => item._id === roomId);

          return document
            ? {
                name: document.title,
                url: `/document/${roomId}`,
              }
            : undefined;
        });
      }}
    >
      <RoomProvider
        id={id}
        initialStorage={{ leftMargin: 56, rightMargin: 56 }}
      >
        {authError ? (
          <div className="border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {authError}
          </div>
        ) : null}
        <ClientSideSuspense
          fallback={
            <div className="flex min-h-screen items-center justify-center bg-[#f8fafd] text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <div className="size-4 animate-spin rounded-full border-2 border-gray-200 border-t-blue-500" />
                Loading document…
              </div>
            </div>
          }
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
