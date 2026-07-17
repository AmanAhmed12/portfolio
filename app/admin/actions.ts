"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import type { AdminActionResult } from "@/lib/admin-action";

export async function updateProfile(formData: FormData): Promise<AdminActionResult> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { redirectTo: "/api/auth/signin?callbackUrl=/admin/profile" };
  }

  const id = formData.get("id") as string;
  const data = {
    name: formData.get("name") as string,
    title: formData.get("title") as string,
    company: formData.get("company") as string,
    bio: formData.get("bio") as string,
    gpa: formData.get("gpa") as string,
    gpaDesc: formData.get("gpaDesc") as string,
    cloudTitle: formData.get("cloudTitle") as string,
    cloudDesc: formData.get("cloudDesc") as string,
  };

  try {
    if (id) {
      await prisma.profile.update({ where: { id }, data });
    } else {
      await prisma.profile.create({ data });
    }
    revalidatePath("/");
    revalidatePath("/admin/profile");
    return { redirectTo: "/admin/profile?toast=Profile+updated+successfully&toastType=success" };
  } catch {
    return { redirectTo: "/admin/profile?toast=Failed+to+update+profile&toastType=error" };
  }
}
