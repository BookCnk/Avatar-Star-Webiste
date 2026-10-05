import { ok } from "@/server/api-response";

export const dynamic = "force-static";

export function GET() {
  return ok({ status: "ok" });
}
