import { auth } from "@/auth";
// import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// import path from "path";
// import { writeFile } from "fs/promises";
// import { randomUUID } from "crypto";
// import fs from "fs";

// export async function POST(req: Request) {
//   const session = await auth();

//   if (!session?.user?.email) {
//     return new NextResponse("Unauthorized", { status: 401 });
//   }

//   const formData = await req.formData();
//   const name = formData.get("name") as string;
//   const file = formData.get("image") as File | null;

//   let imageUrl: string | undefined;

//   if (file) {
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const uploadsDir = path.join(process.cwd(), "public", "uploads");

//     // Ensure uploads directory exists
//     if (!fs.existsSync(uploadsDir)) {
//       fs.mkdirSync(uploadsDir, { recursive: true });
//     }

//     const ext = file.name.split(".").pop();
//     const fileName = `${randomUUID()}.${ext}`;
//     const filePath = path.join(uploadsDir, fileName);

//     await writeFile(filePath, buffer);

//     imageUrl = `/uploads/${fileName}`; // relative path to access from browser
//   }

//   await prisma.user.update({
//     where: { email: session.user.email },
//     data: {
//       name,
//       ...(imageUrl && { image: imageUrl }),
//     },
//   });

//   return NextResponse.json({ message: "Profile updated", url: imageUrl });
// }

import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const file = formData.get("image") as File | null;
    let imageUrl: string | undefined;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "auto", folder: "throttletribe" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });
      console.log("Upload successful");
      imageUrl = (result as any).secure_url;
    }
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    return NextResponse.json({ message: "Profile updated", url: imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
