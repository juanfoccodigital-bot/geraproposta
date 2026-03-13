import { NextRequest } from "next/server";

export function verifyAdminSecret(request: NextRequest): boolean {
  const secret = request.headers.get("x-admin-secret");
  return !!secret && secret === process.env.ADMIN_SECRET?.trim();
}
