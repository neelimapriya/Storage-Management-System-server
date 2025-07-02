import mongoose from "mongoose";

export const getDatabaseStorageStats = async () => {
  if (mongoose.connection.readyState !== 1) {
    throw new Error("Database not connected yet");
  }

  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("Database connection is undefined");
  }

  const collections = await db.listCollections().toArray();

  let totalBytes = 0;
  const stats: {
    name: string;
    sizeMB: number;
    sizeBytes: number;
    count: number;
  }[] = [];

  for (const coll of collections) {
    const collection = db.collection(coll.name);
    const collStats = await (collection as any).stats();

    const size = collStats.size || 0;

    stats.push({
      name: coll.name,
      sizeBytes: size,
      sizeMB: parseFloat((size / (1024 * 1024)).toFixed(2)),
      count: collStats.count || 0,
    });

    totalBytes += size;
  }

  return {
    totalSizeMB: parseFloat((totalBytes / (1024 * 1024)).toFixed(2)),
    totalSizeGB: parseFloat((totalBytes / 1024 ** 3).toFixed(3)),
    collections: stats,
  };
};
