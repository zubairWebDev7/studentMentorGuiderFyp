import fs from "fs";
import path from "path";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { OpenAIEmbeddings } from "@langchain/openai";

const VECTOR_DIR = path.resolve("mentor_vectors");

export const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
  apiKey: process.env.OPENAI_API_KEY,
});

// Load or create vector store
export async function getVectorStore() {
  try {
    if (fs.existsSync(VECTOR_DIR)) {
      // Check if the directory has valid files
      const files = fs.readdirSync(VECTOR_DIR);
      if (files.length > 0) {
        return await FaissStore.load(VECTOR_DIR, embeddings);
      }
    }
  } catch (error) {
    console.warn("⚠️ Could not load existing vector store, creating new one:", error.message);
    // If loading fails, delete corrupted directory
    if (fs.existsSync(VECTOR_DIR)) {
      fs.rmSync(VECTOR_DIR, { recursive: true, force: true });
    }
  }
  
  // Create new empty vector store
  return await FaissStore.fromTexts([], [], embeddings);
}

// Save vector store
export async function saveVectorStore(store) {
  try {
    // Check if store has any documents
    if (!store.docstore || store.docstore._docs.size === 0) {
      console.log("⚠️ Vector store is empty, skipping save");
      return;
    }
    
    await store.save(VECTOR_DIR);
    console.log("✅ Vector store saved successfully");
  } catch (error) {
    console.error("❌ Error saving vector store:", error);
    throw error;
  }
}

// Delete vector store directory
export async function deleteVectorStore() {
  try {
    if (fs.existsSync(VECTOR_DIR)) {
      fs.rmSync(VECTOR_DIR, { recursive: true, force: true });
      console.log("✅ Vector store deleted successfully");
    }
  } catch (error) {
    console.error("❌ Error deleting vector store:", error);
    throw error;
  }
}