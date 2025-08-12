"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { db } from "../../../../firebase";
import { Plus, Trash2, X, Edit, BarChart2, Download, Search, Upload, Copy, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  Unsubscribe
} from "firebase/firestore";

// Type Definitions
interface Option {
  text: string;
}

interface ResponseData {
  id: string;
  name: string;
  email: string;
  score: number;
  timeTaken: number;
  submittedAt: string; // For display
  timestamp: number;   // For sorting (milliseconds)
}

interface QuizWithResponses {
  id: string;
  name: string;
  questions: Question[];
  status: "inactive" | "active" | "completed";
  responses?: ResponseData[];
}

interface Question {
  id: number;
  questionText: string;
  questionType: "mcq" | "short";
  options: Option[];
  correctAnswerIndex: number | null;
  correctAnswerText?: string;
}

export default function AdminCompetitionPage() {
  const [quizzes, setQuizzes] = useState<QuizWithResponses[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedLeaderboardQuiz, setSelectedLeaderboardQuiz] = useState<QuizWithResponses | null>(null);
  const [activeTab, setActiveTab] = useState("Leaderboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [importModalOpen, setImportModalOpen] = useState(false);
const [jsonFile, setJsonFile] = useState<File | null>(null);
const [importError, setImportError] = useState("");
const [showSampleFormat, setShowSampleFormat] = useState(false);
  // Form State
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      questionText: "",
      questionType: "mcq",
      options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
      correctAnswerIndex: null,
    },
  ]);
  const [editingQuiz, setEditingQuiz] = useState<QuizWithResponses | null>(null);

// Add this function to your component
const copySampleFormat = () => {
  const sampleFormat = `{
  "name": "Sample Quiz",
  "questions": [
    {
      "questionText": "What is the capital of France?",
      "questionType": "mcq",
      "options": [
        {"text": "London"},
        {"text": "Paris"},
        {"text": "Berlin"},
        {"text": "Madrid"}
      ],
      "correctAnswerIndex": 1
    },
    {
      "questionText": "What is 2 + 2?",
      "questionType": "short",
      "correctAnswerText": "4"
    }
  ]
}`;

  navigator.clipboard.writeText(sampleFormat)
    .then(() => alert("Sample format copied to clipboard!"))
    .catch(() => alert("Failed to copy to clipboard"));
};
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    if (file.type === "application/json" || file.name.endsWith('.json')) {
      setJsonFile(file);
      setImportError("");
    } else {
      setImportError("Please upload a valid JSON file");
    }
  }
};

const handleImportSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!jsonFile) {
    setImportError("Please select a file first");
    return;
  }

  setLoading(true);
  
  try {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const quizData = JSON.parse(content);
        
        // Validate the imported JSON structure
        if (!quizData.name || !quizData.questions || !Array.isArray(quizData.questions)) {
          throw new Error("Invalid quiz format");
        }
        
        // Process each question
        const processedQuestions = quizData.questions.map((q: any, index: number) => {
          return {
            id: index + 1,
            questionText: q.questionText || "",
            questionType: q.questionType || "mcq",
            options: q.options || [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
            correctAnswerIndex: q.correctAnswerIndex ?? null,
            correctAnswerText: q.correctAnswerText || ""
          };
        });

        // Save to Firestore
        await addDoc(collection(db, "quizzes"), {
          name: quizData.name,
          questions: processedQuestions,
          status: "inactive"
        });

        setImportModalOpen(false);
        setJsonFile(null);
      } catch (err) {
        setImportError("Invalid JSON format or quiz structure");
        console.error("Error parsing JSON:", err);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsText(jsonFile);
  } catch (err) {
    setImportError("Error processing file");
    setLoading(false);
    console.error("Import error:", err);
  }
};

const exportQuizAsJson = (quiz: QuizWithResponses) => {
  const exportData = {
    name: quiz.name,
    questions: quiz.questions.map(q => ({
      questionText: q.questionText,
      questionType: q.questionType,
      options: q.options,
      correctAnswerIndex: q.correctAnswerIndex,
      correctAnswerText: q.correctAnswerText
    }))
  };

  const dataStr = JSON.stringify(exportData, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileName = `${quiz.name.replace(/\s+/g, '_')}_quiz.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileName);
  linkElement.click();
};
  // Status colors mapping
  const statusColors = {
    inactive: "bg-gray-500",
    active: "bg-green-500",
    completed: "bg-purple-500"
  };

  // Fetch quizzes with real-time updates
  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;

    const setupListener = async () => {
      const q = query(collection(db, "quizzes"));
      unsubscribe = onSnapshot(q, async (snapshot) => {
        const quizzesWithResponses: QuizWithResponses[] = [];

        for (const quizDoc of snapshot.docs) {
          const d = quizDoc.data();
          const quizData: QuizWithResponses = {
            id: quizDoc.id,
            name: d.name ?? "",
            questions: d.questions ?? [],
            status: d.status ?? "inactive",
            responses: [],
          };
const responsesCollection = collection(db, `quizzes/${quizDoc.id}/responses`);
const responsesSnap = await getDocs(responsesCollection);
let responses: ResponseData[] = responsesSnap.docs.map((res) => {
  const r = res.data();
  const submittedAt = r.submittedAt?.toDate ? r.submittedAt.toDate() : null;
  
  return {
    id: res.id,
    name: r.name || "Anonymous",
    email: r.email || "",
    score: r.score || 0,
    timeTaken: r.timeTaken || 0,
    submittedAt: submittedAt ? submittedAt.toLocaleString() : "Unknown",
    timestamp: submittedAt ? submittedAt.getTime() : 0
  };
});
// Client-side sorting
responses.sort((a, b) => {
  // Score (descending)
  if (b.score !== a.score) return b.score - a.score;
  
  // // Time taken (ascending)
  // if (a.timeTaken !== b.timeTaken) 
  return a.timeTaken - b.timeTaken;
  
  // // Submission time (ascending)
  // return a.timestamp - b.timestamp;
});     

          quizData.responses = responses;
          quizzesWithResponses.push(quizData);
        }

        setQuizzes(quizzesWithResponses);
        setLoading(false);
      });
    };

    setupListener();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Handler functions
  const handleStatusChange = async (quizId: string, newStatus: "inactive" | "active" | "completed") => {
    setLoading(true);
    const quizDoc = doc(db, "quizzes", quizId);
    await updateDoc(quizDoc, { status: newStatus });
    setQuizzes(prev => prev.map(q => q.id === quizId ? {...q, status: newStatus} : q));
    setLoading(false);
  };

  const openLeaderboardModal = (quiz: QuizWithResponses) => {
    setSelectedLeaderboardQuiz(quiz);
    setActiveTab("Leaderboard");
  };

  const resetForm = () => {
    setQuizName("");
    setQuestions([
      {
        id: 1,
        questionText: "",
        questionType: "mcq",
        options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
        correctAnswerIndex: null,
      },
    ]);
    setEditingQuiz(null);
  };

  const isFormValid = (): boolean => {
    if (!quizName) return false;
    for (const q of questions) {
      if (!q.questionText.trim()) return false;
      if (q.questionType === "mcq") {
        if (q.options.some((o) => !o.text.trim())) return false;
        if (q.correctAnswerIndex === null) return false;
      } else if (q.questionType === "short") {
        if (!q.correctAnswerText?.trim()) return false;
      }
    }
    return true;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please fill all required fields properly.");
      return;
    }

    setLoading(true);
    const quizData = {
      name: quizName,
      questions,
      status: editingQuiz?.status || "inactive",
    };

    if (editingQuiz) {
      await updateDoc(doc(db, "quizzes", editingQuiz.id), quizData);
    } else {
      await addDoc(collection(db, "quizzes"), quizData);
    }

    setIsModalOpen(false);
    resetForm();
    setLoading(false);
  };

  const handleEdit = (quiz: QuizWithResponses) => {
    setEditingQuiz(quiz);
    setQuizName(quiz.name);
    setQuestions(quiz.questions);
    setIsModalOpen(true);
  };

  const handleDelete = async (quizId: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await deleteDoc(doc(db, "quizzes", quizId));
    }
  };

  // Analytics functions
  const calcAverageScore = (responses: ResponseData[] = []) => {
    if (!responses.length) return 0;
    const total = responses.reduce((sum, r) => sum + r.score, 0);
    return (total / responses.length).toFixed(2);
  };

  const calcAverageTime = (responses: ResponseData[] = []) => {
    if (!responses.length) return 0;
    const total = responses.reduce((sum, r) => sum + r.timeTaken, 0);
    return (total / responses.length).toFixed(2);
  };

  const exportCSV = () => {
    if (!selectedLeaderboardQuiz?.responses?.length) return;
    const csvContent = [
      "Name,Email,Score,Time Taken,Submitted At",
      ...(selectedLeaderboardQuiz.responses.map(r => 
        `"${r.name}","${r.email}",${r.score},${r.timeTaken},"${r.submittedAt}"`
      ))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedLeaderboardQuiz.name.replace(/\s+/g, "_")}_leaderboard.csv`;
    link.click();
  };

  const exportPDF = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(`${selectedLeaderboardQuiz?.name} Leaderboard`, 14, 20);
    doc.setFontSize(12);
    
    let y = 40;
    selectedLeaderboardQuiz?.responses?.forEach((res, idx) => {
      doc.text(
        `${idx + 1}. ${res.name} - Score: ${res.score}/${selectedLeaderboardQuiz.questions.length} (${res.timeTaken.toFixed(2)}s)`,
        14,
        y
      );
      y += 10;
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });
    
    doc.save(`${selectedLeaderboardQuiz?.name.replace(/\s+/g, "_")}_leaderboard.pdf`);
  };

  // Filtered responses
  const filteredResponses = selectedLeaderboardQuiz?.responses?.filter(res => 
    res.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    res.email.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Question handlers
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        questionText: "",
        questionType: "mcq",
        options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
        correctAnswerIndex: null,
      },
    ]);
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleQuestionChange = (id: number, field: keyof Question, value: any) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === id) {
        const updated = { ...q, [field]: value };
        if (field === "questionType") {
          if (value === "short") {
            updated.options = [];
            updated.correctAnswerIndex = null;
            updated.correctAnswerText = "";
          } else if (value === "mcq") {
            updated.options = [{ text: "" }, { text: "" }, { text: "" }, { text: "" }];
            updated.correctAnswerIndex = null;
          }
        }
        return updated;
      }
      return q;
    }));
  };

  const handleOptionChange = (qId: number, idx: number, value: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        const newOptions = q.options.map((opt, i) => i === idx ? { text: value } : opt);
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <AdminSidebar />
      
      <div className="flex-1 ml-0 md:ml-64">
        <AdminHeader />
        
        <main className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Competition Dashboard</h1>
              <p className="text-gray-400">Manage all your events and view analytics</p>
            </div>
            <button
              onClick={() => { resetForm(); setIsModalOpen(true); }}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all hover:shadow-lg mt-4 md:mt-0"
            >
              <Plus size={20} /> Create New Quiz
            </button>
            <button
                onClick={() => setImportModalOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-all hover:shadow-lg ml-4"
              >
                <Download size={20} /> Import Quiz (JSON)
              </button>
          </div>

          {/* Quiz Cards Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map(quiz => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-colors"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-bold text-white truncate">{quiz.name}</h2>
                      <span className={`px-2 py-1 text-xs rounded-full ${statusColors[quiz.status]}`}>
                        {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BarChart2 size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-300">
                          {quiz.responses?.length || 0} responses
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(quiz)}
                          className="p-2 bg-gray-700 hover:bg-yellow-600 rounded-lg text-white transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(quiz.id)}
                          className="p-2 bg-gray-700 hover:bg-red-600 rounded-lg text-white transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-4">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-1">
                        {["inactive", "active", "completed"].map(status => (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(quiz.id, status as any)}
                            className={`px-2 py-1 text-xs rounded-md transition-colors ${
                              quiz.status === status
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                            }`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </div>

                      {quiz.responses && quiz.responses.length > 0 && (
                        <button
                          onClick={() => openLeaderboardModal(quiz)}
                          className="text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-3 py-1 rounded-md transition-all"
                        >
                          View Results
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && quizzes.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Plus size={40} className="text-gray-500" />
              </div>
              <h3 className="text-xl font-medium text-white">No quizzes yet</h3>
              <p className="text-gray-400 mt-2">Create your first quiz to get started</p>
              <button
                onClick={() => { resetForm(); setIsModalOpen(true); }}
                className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-all"
              >
                Create Quiz
              </button>
            </div>
          )}
        </main>
      </div>
{/* Import Quiz Modal */}
{/* Import Quiz Modal */}
<AnimatePresence>
  {importModalOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col border border-gray-700"
      >
        <div className="p-5 border-b border-gray-700 flex justify-between items-center bg-gray-900">
          <h2 className="text-2xl font-bold text-white">Import Quiz from JSON</h2>
          <button
            onClick={() => {
              setImportModalOpen(false);
              setJsonFile(null);
              setImportError("");
              setShowSampleFormat(false);
            }}
            className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {showSampleFormat ? (
          <div className="p-6 flex-1 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Sample JSON Format</h3>
              <button
                onClick={copySampleFormat}
                className="flex items-center gap-1 text-sm bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded transition-colors"
              >
                <Copy size={16} /> Copy Sample
              </button>
            </div>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-300 border border-gray-700">
              {`{
  "name": "Sample Quiz",
  "questions": [
    {
      "questionText": "What is the capital of France?",
      "questionType": "mcq",
      "options": [
        {"text": "London"},
        {"text": "Paris"},
        {"text": "Berlin"},
        {"text": "Madrid"}
      ],
      "correctAnswerIndex": 1
    },
    {
      "questionText": "What is 2 + 2?",
      "questionType": "short",
      "correctAnswerText": "4"
    }
  ]
}`}
            </pre>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowSampleFormat(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Back to Import
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleImportSubmit} className="p-6 space-y-6 flex-1 flex flex-col">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Upload JSON File
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-900 hover:bg-gray-800 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      JSON format only
                    </p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".json,application/json"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {jsonFile && (
                <div className="mt-2 text-sm text-white flex items-center">
                  <span className="truncate">{jsonFile.name}</span>
                  <span className="ml-2 text-gray-400">({(jsonFile.size / 1024).toFixed(2)} KB)</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowSampleFormat(true)}
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 w-fit"
            >
              <HelpCircle size={16} /> View sample JSON format
            </button>

            {importError && (
              <div className="p-3 bg-red-900/50 text-red-300 rounded-lg text-sm">
                {importError}
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-auto">
              <button
                type="button"
                onClick={() => {
                  setImportModalOpen(false);
                  setJsonFile(null);
                  setImportError("");
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!jsonFile || loading}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Importing..." : "Import Quiz"}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
      {/* Leaderboard Modal */}
      <AnimatePresence>
        {selectedLeaderboardQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-700"
            >
              <div className="p-5 border-b border-gray-700 flex justify-between items-center bg-gray-900">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedLeaderboardQuiz.name}</h2>
                  <p className="text-gray-400">
                    {selectedLeaderboardQuiz.responses?.length || 0} participants
                  </p>
                </div>
                <button
                  onClick={() => setSelectedLeaderboardQuiz(null)}
                  className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex border-b border-gray-700">
                {["Leaderboard", "Analytics", "Responses"].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-medium text-sm transition-colors ${
                      activeTab === tab
                        ? "text-white border-b-2 border-indigo-500"
                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="overflow-y-auto flex-1 p-6">
                {activeTab === "Leaderboard" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white">Top Performers</h3>
                      <div className="flex space-x-3">
                        <button
                          onClick={exportCSV}
                          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
                        >
                          <Download size={16} />
                          <span>CSV</span>
                        </button>
                        <button
                          onClick={exportPDF}
                          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                        >
                          <Download size={16} />
                          <span>PDF</span>
                        </button>
                        
                      </div>
                    </div>

                    {selectedLeaderboardQuiz.responses?.length ? (
                      <div className="overflow-x-auto rounded-lg border border-gray-700">
                        <table className="w-full">
                          <thead className="bg-gray-900">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rank</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Score</th>
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Time</th>
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Submitted</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {selectedLeaderboardQuiz.responses.map((res, idx) => (
                              <motion.tr
                                key={res.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                                className={`${idx === 0 ? "bg-gradient-to-r from-yellow-900/30 to-yellow-800/10" : ""}`}
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className={`flex items-center ${idx < 3 ? "font-bold" : ""}`}>
                                    {idx === 0 && <span className="text-yellow-400 mr-2">🥇</span>}
                                    {idx === 1 && <span className="text-gray-300 mr-2">🥈</span>}
                                    {idx === 2 && <span className="text-amber-600 mr-2">🥉</span>}
                                    {idx + 1}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-white">
                                  {res.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                  {res.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center font-bold">
                                  {res.score}/{selectedLeaderboardQuiz.questions.length}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-300">
                                  {res.timeTaken.toFixed(2)}s
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400">
                                  {res.submittedAt}
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-400">
                        No responses recorded yet
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "Analytics" && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Total Participants</h4>
                        <p className="text-3xl font-bold text-white">
                          {selectedLeaderboardQuiz.responses?.length || 0}
                        </p>
                      </div>
                      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Average Score</h4>
                        <p className="text-3xl font-bold text-white">
                          {calcAverageScore(selectedLeaderboardQuiz.responses)}/{selectedLeaderboardQuiz.questions.length}
                        </p>
                      </div>
                      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Average Time</h4>
                        <p className="text-3xl font-bold text-white">
                          {calcAverageTime(selectedLeaderboardQuiz.responses)}s
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                      <h4 className="text-sm font-medium text-gray-400 mb-4">Score Distribution</h4>
                      <div className="h-64">
                        {/* Placeholder for chart - you would integrate a charting library here */}
                        <div className="flex items-end h-48 space-x-1">
                          {[10, 30, 50, 70, 90, 60, 40, 20, 10, 5].map((height, idx) => (
                            <div 
                              key={idx}
                              className="flex-1 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-sm"
                              style={{ height: `${height}%` }}
                            ></div>
                          ))}
                        </div>
                        <div className="mt-4 flex justify-between text-xs text-gray-400">
                          <span>0%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Responses" && (
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search by name or email..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    {filteredResponses.length ? (
                      <div className="overflow-x-auto rounded-lg border border-gray-700">
                        <table className="w-full">
                          <thead className="bg-gray-900">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Score</th>
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Time</th>
                              <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Submitted</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-700">
                            {filteredResponses.map(res => (
                              <tr key={res.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-white">
                                  {res.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                                  {res.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                  {res.score}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-300">
                                  {res.timeTaken.toFixed(2)}s
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-gray-400">
                                  {res.submittedAt}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-400">
                        {searchQuery ? "No matching results found" : "No responses recorded yet"}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-700"
            >
              <div className="p-5 border-b border-gray-700 flex justify-between items-center bg-gray-900">
                <h2 className="text-2xl font-bold text-white">
                  {editingQuiz ? "Edit Quiz" : "Create New Quiz"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="overflow-y-auto flex-1 p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Quiz Name</label>
                    <input
                      type="text"
                      placeholder="Enter quiz name"
                      value={quizName}
                      onChange={(e) => setQuizName(e.target.value)}
                      required
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white">Questions</h3>
                    </div>

                    {questions.map((q, qIndex) => (
                      <motion.div
                        key={q.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-gray-900 p-4 rounded-lg border border-gray-700 space-y-4"
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-white">Question {qIndex + 1}</h4>
                          <button
                            type="button"
                            onClick={() => removeQuestion(q.id)}
                            className="text-red-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Question Text</label>
                          <textarea
                            placeholder="Enter your question..."
                            value={q.questionText}
                            onChange={(e) => handleQuestionChange(q.id, "questionText", e.target.value)}
                            required
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            rows={3}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Question Type</label>
                          <select
                            value={q.questionType}
                            onChange={(e) => handleQuestionChange(q.id, "questionType", e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                            <option value="mcq">Multiple Choice (MCQ)</option>
                            <option value="short">Short Answer</option>
                          </select>
                        </div>

                        {q.questionType === "mcq" ? (
                          <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-300">Options</label>
                            {q.options.map((opt, oIndex) => (
                              <div key={oIndex} className="flex items-center space-x-3">
                                <input
                                  type="radio"
                                  name={`correct-answer-${q.id}`}
                                  checked={q.correctAnswerIndex === oIndex}
                                  onChange={() => handleQuestionChange(q.id, "correctAnswerIndex", oIndex)}
                                  required
                                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700"
                                />
                                <input
                                  type="text"
                                  placeholder={`Option ${oIndex + 1}`}
                                  value={opt.text}
                                  onChange={(e) => handleOptionChange(q.id, oIndex, e.target.value)}
                                  required
                                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Correct Answer</label>
                            <input
                              type="text"
                              placeholder="Enter the correct answer"
                              value={q.correctAnswerText || ""}
                              onChange={(e) => handleQuestionChange(q.id, "correctAnswerText", e.target.value)}
                              required
                              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </div>
                        )}
                      </motion.div>
                    ))}

                    <button
                      type="button"
                      onClick={addQuestion}
                      className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-700 hover:bg-gray-900 text-gray-400 font-medium py-3 rounded-lg transition-colors"
                    >
                      <Plus size={18} /> Add Another Question
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : editingQuiz ? (
                      "Update Quiz"
                    ) : (
                      "Create Quiz"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}