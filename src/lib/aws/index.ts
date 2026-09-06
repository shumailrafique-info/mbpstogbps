import "server-only";

import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { serverEnv } from "@/env/server";

export const s3 = new S3Client({
  region: serverEnv.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: serverEnv.AWS_BUCKET_ACCESS_KEY,
    secretAccessKey: serverEnv.AWS_SECRET_ACCESS_KEY,
  },
});

export const BUCKET = serverEnv.AWS_BUCKET_NAME;
export const REGION = serverEnv.AWS_BUCKET_REGION;

export function publicS3Url(key: string) {
  return `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;
}

export async function deleteS3Objects(inputs: string[]): Promise<{
  success: boolean;
  deleted: string[];
  failed: string[];
}> {
  const keys = inputs.filter(Boolean).map((input) => {
    try {
      if (input.startsWith("http")) {
        return decodeURIComponent(new URL(input).pathname.slice(1));
      }
      return input;
    } catch {
      return input;
    }
  });

  const uniqueKeys = [...new Set(keys)];

  if (uniqueKeys.length === 0) {
    return { success: true, deleted: [], failed: [] };
  }

  const results = await Promise.allSettled(
    uniqueKeys.map((key) =>
      s3.send(
        new DeleteObjectCommand({
          Bucket: BUCKET,
          Key: key,
        }),
      ),
    ),
  );

  const deleted: string[] = [];
  const failed: string[] = [];

  results.forEach((res, idx) => {
    const key = uniqueKeys[idx];
    if (res.status === "fulfilled") {
      deleted.push(key);
    } else {
      failed.push(key);
      console.warn(`⚠️ Failed to delete [${key}]:`, res.reason);
    }
  });

  return {
    success: failed.length === 0,
    deleted,
    failed,
  };
}
