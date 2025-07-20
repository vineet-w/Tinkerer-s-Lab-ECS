"use client";
import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { Trash2, Plus } from "lucide-react";

export default function NewsManager() {
  const [news, setNews] = useState<{ id: string; title: string }[]>([]);
  const [newNews, setNewNews] = useState("");

  useEffect(() => {
    const q = query(collection(db, "news"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title as string,
      }));
      setNews(list);
    });
    return () => unsubscribe();
  }, []);

  const addNews = async () => {
    if (!newNews.trim()) return;
    await addDoc(collection(db, "news"), {
      title: newNews.trim(),
      createdAt: serverTimestamp(),
    });
    setNewNews("");
  };

  const deleteNews = async (id: string) => {
    if (confirm("Delete this news item?")) {
      await deleteDoc(doc(db, "news", id));
    }
  };

  return (
    <div className="bg-[#1A1A1A] p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">📰 Manage News</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newNews}
          onChange={(e) => setNewNews(e.target.value)}
          placeholder="Enter news headline..."
          className="flex-1 p-2 bg-[#2a2a2a] text-white rounded border border-gray-600"
        />
        <button
          onClick={addNews}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      {news.length ? (
        <ul className="space-y-2">
          {news.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-[#2a2a2a] p-3 rounded"
            >
              <span className="text-gray-200">{item.title}</span>
              <button
                onClick={() => deleteNews(item.id)}
                className="text-red-400 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No news yet.</p>
      )}
    </div>
  );
}
