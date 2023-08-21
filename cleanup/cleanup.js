// Import the "deleted" collection model

import { Delete } from "../model/deletedFolder.js";

export const cleanup = async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Calculate the date 30 days ago
  await Delete.deleteMany({ deletedAt: { $lt: thirtyDaysAgo } });
};

setInterval(cleanup, 2 * 60 * 1000); 