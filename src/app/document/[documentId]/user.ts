import { auth, clerkClient } from "@clerk/nextjs/server";

export interface User {
  id: string;
  name: string;
  avatar: string;
}
export const getUsers = async () => {
  const { orgId, isAuthenticated } = await auth();
  if (!isAuthenticated) {
    return [];
  }
  const users: User[] = [];
  // Personal documents do not have organization members to resolve.
  if (!orgId) {
    return users;
  }
  const client = await clerkClient();
  const organization = await client.organizations.getOrganizationMembershipList(
    { organizationId: orgId },
  );
  organization.data.forEach((membership) => {
    if (membership.publicUserData) {
      users.push({
        id: membership.publicUserData.userId,
        name:
          membership.publicUserData.firstName +
          " " +
          (membership.publicUserData.lastName || ""),
        avatar: membership.publicUserData.imageUrl,
      });
    }
  });
  return users;
};
