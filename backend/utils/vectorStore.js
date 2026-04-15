// import fs from "fs";
// import path from "path";
// import { FaissStore } from "@langchain/community/vectorstores/faiss";
// import { OpenAIEmbeddings } from "@langchain/openai";

import { index } from "../config/pinecone.js";
import { createEmbedding } from "./embeding.js";
import User from "../models/User.js";

// ... existing code ...

// Function to compute cosine similarity
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (normA * normB);
}

export const findSimilarMentors = async (queryText, topK = 5) => {
  const queryEmbedding = await createEmbedding(queryText);

  if (!queryEmbedding || queryEmbedding.length === 0) {
    throw new Error("Invalid query embedding");
  }

  // Fetch all approved mentors with embeddings
  const mentors = await User.find({ role: "mentor", approved: true, embedding: { $exists: true, $ne: [] } }).select("name profession experience skillLevel embedding");

  // Compute similarities
  const similarities = mentors.map(mentor => ({
    mentor,
    similarity: cosineSimilarity(queryEmbedding, mentor.embedding)
  }));

  // Sort by similarity descending
  similarities.sort((a, b) => b.similarity - a.similarity);

  // Return top K
  return similarities.slice(0, topK).map(item => item.mentor);
};

// const VECTOR_DIR = path.resolve("mentor_vectors");

// export const embeddings = new OpenAIEmbeddings({
//   model: "text-embedding-3-small",
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Load or create vector store
// export async function getVectorStore() {
//   try {
//     if (fs.existsSync(VECTOR_DIR)) {
//       // Check if the directory has valid files
//       const files = fs.readdirSync(VECTOR_DIR);
//       if (files.length > 0) {
//         return await FaissStore.load(VECTOR_DIR, embeddings);
//       }
//     }
//   } catch (error) {
//     console.warn("⚠️ Could not load existing vector store, creating new one:", error.message);
//     // If loading fails, delete corrupted directory
//     if (fs.existsSync(VECTOR_DIR)) {
//       fs.rmSync(VECTOR_DIR, { recursive: true, force: true });
//     }
//   }

//   // Create new empty vector store
//   return await FaissStore.fromTexts([], [], embeddings);
// }

// // Save vector store
// export async function saveVectorStore(store) {
//   try {
//     // Check if store has any documents
//     if (!store.docstore || store.docstore._docs.size === 0) {
//       console.log("⚠️ Vector store is empty, skipping save");
//       return;
//     }

//     await store.save(VECTOR_DIR);
//     console.log("✅ Vector store saved successfully");
//   } catch (error) {
//     console.error("❌ Error saving vector store:", error);
//     throw error;
//   }
// }

// // Delete vector store directory
// export async function deleteVectorStore() {
//   try {
//     if (fs.existsSync(VECTOR_DIR)) {
//       fs.rmSync(VECTOR_DIR, { recursive: true, force: true });
//       console.log("✅ Vector store deleted successfully");
//     }
//   } catch (error) {
//     console.error("❌ Error deleting vector store:", error);
//     throw error;
//   }
// }
export const insertInVectorDb = async (mentorText, mentor) => {
  const embedding = await createEmbedding(mentorText);

  if (!embedding || !Array.isArray(embedding) || embedding.length === 0) {
    throw new Error("Invalid embedding generated");
  }

  // Clean the embedding to ensure all values are finite numbers
  const cleanEmbedding = embedding.filter(v => typeof v === 'number' && isFinite(v));

  if (cleanEmbedding.length === 0) {
    throw new Error("No valid embedding values after cleaning");
  }

  console.log("Generated embedding:", cleanEmbedding.slice(0, 5), "...");

  // Save embedding to MongoDB
  mentor.embedding = cleanEmbedding;
  await mentor.save();

  console.log("✅ Saved mentor embedding to MongoDB:", mentor._id.toString());
};