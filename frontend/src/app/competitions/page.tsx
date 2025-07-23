"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundGrid from "@/components/BackgroundGrid";
import MouseTrailer from "@/components/MouseTrailer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { sections } from "@/data/sections";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../../firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

// ✅ Types
interface Question {
  questionText: string;
  questionType: "mcq" | "short";
  options?: { text: string }[];
  correctAnswerIndex?: number | null;
  correctAnswerText?: string;
}

interface Quiz {
  id: string;
  name: string;
  questions: Question[];
  status: "inactive" | "active" | "completed";
}

export default function Competition() {
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<{ [qIndex: number]: string | null }>({});
  const { currentUser } = useAuth();
  const [startTime, setStartTime] = useState<number | null>(null);
  const [submittedQuizzes, setSubmittedQuizzes] = useState<string[]>([]);
  const [statusPopup, setStatusPopup] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: "",
  });

  const handleSelect = (qIndex: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  // ✅ Fetch all quizzes
  const fetchQuizzes = async (): Promise<Quiz[]> => {
    const snapshot = await getDocs(collection(db, "quizzes"));
    return snapshot.docs.map((docSnap) => {
      const d = docSnap.data();
      return {
        id: docSnap.id,
        name: d.name ?? "Untitled Quiz",
        questions: d.questions ?? [],
        status: d.status ?? "inactive",
      } as Quiz;
    });
  };

  // ✅ Optimized: Fetch all submissions for the current user in one go
  const fetchUserSubmissions = async (quizList: Quiz[]) => {
    if (!currentUser) return;

    const submittedIds: string[] = [];

    // Instead of N×M, just check each quiz once
    for (const quiz of quizList) {
      const qSnapshot = await getDocs(collection(db, `quizzes/${quiz.id}/responses`));
      const userSubmitted = qSnapshot.docs.some(
        (doc) => doc.data().email === currentUser.email
      );
      if (userSubmitted) submittedIds.push(quiz.id);
    }

    setSubmittedQuizzes(submittedIds);
  };

  // ✅ Fetch quizzes + user submissions
  const initData = async () => {
    setLoading(true);
    try {
      const quizList = await fetchQuizzes();
      setQuizzes(quizList);
      await fetchUserSubmissions(quizList);
    } catch (err) {
      console.error("Error loading quizzes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizClick = (quiz: Quiz) => {
    if (quiz.status === "active") {
      // Only allow if not submitted
      if (!submittedQuizzes.includes(quiz.id)) {
        setSelectedQuiz(quiz);
      }
    } else {
      setStatusPopup({
        visible: true,
        message:
          quiz.status === "inactive"
            ? "Please wait, the quiz will start soon"
            : "This event has been completed",
      });
    }
  };

  const handleSubmitQuiz = async () => {
    if (!selectedQuiz || !currentUser) return;

    const endTime = Date.now();
    const timeTaken = startTime ? (endTime - startTime) / 1000 : 0; 

    let score = 0;
    selectedQuiz.questions.forEach((q, idx) => {
      if (q.questionType === "mcq" && q.correctAnswerIndex != null) {
        const correctText = q.options?.[q.correctAnswerIndex].text;
        if (answers[idx] === correctText) score++;
      } else if (q.questionType === "short" && q.correctAnswerText) {
        if (
          answers[idx]?.trim().toLowerCase() ===
          q.correctAnswerText.trim().toLowerCase()
        ) {
          score++;
        }
      }
    });

    const responseData = {
      name: currentUser.displayName || "Anonymous",
      email: currentUser.email,
      answers,
      score,
      submittedAt: new Date(),
      timeTaken,
    };

    try {
      await addDoc(
        collection(db, `quizzes/${selectedQuiz.id}/responses`),
        responseData
      );

      // ✅ Mark as submitted locally
      setSubmittedQuizzes((prev) => [...prev, selectedQuiz.id]);
      alert(`Quiz submitted! Your score: ${score}/${selectedQuiz.questions.length}`);
      setSelectedQuiz(null);
    } catch (error) {
      console.error("Error saving quiz response:", error);
    }
  };

  // ✅ Single useEffect: load quizzes + submissions on user change
  useEffect(() => {
    if (!currentUser) return;

    initData(); // fetch quizzes & user submissions

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [currentUser]);

  // ✅ Reset answers when quiz changes
  useEffect(() => {
    if (selectedQuiz) {
      setAnswers({});
      setStartTime(Date.now());
    }
  }, [selectedQuiz]);

  return (
    <div className="min-h-screen pt-20 flex flex-col bg-[#0D0D0D] text-gray-300 font-sans overflow-hidden relative">
      <BackgroundGrid />
      <MouseTrailer mousePosition={mousePosition} isHovering={isHovering} />
      <Header sections={sections} isHovering={isHovering} setIsHovering={setIsHovering} />

      <main className="flex-1 px-8 sm:px-20 py-12 flex flex-col relative z-10">
        {/* ✅ Hero Section */}
        <motion.section
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block bg-[#9F70FD]/20 border border-[#9F70FD]/50 rounded-full px-4 py-2 text-sm font-mono text-[#00F5D4] mb-6"
          >
            Challenge Yourself to be the Best
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-mono mb-6 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F70FD] to-[#00F5D4]">
              Competition
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
            Discover upcoming contests, hackathons, and challenges to test your skills.
          </p>

          {loading && <p className="text-center text-gray-400">Loading...</p>}

          {!loading && quizzes.length === 0 && (
            <p className="text-center text-gray-500">
              No quizzes available at the moment.
            </p>
          )}

          {/* ✅ Quiz Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
  {!loading &&
    quizzes.map((quiz, index) => (
      <motion.div
        key={quiz.id}
        className="
          relative p-[1px] rounded-xl 
          bg-gradient-to-r from-[#9F70FD] to-[#00F5D4] 
          hover:from-[#00F5D4] hover:to-[#9F70FD] 
          transition-all duration-500 shadow-lg hover:shadow-[0_0_20px_rgba(159,112,253,0.5)]
          cursor-pointer
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => handleQuizClick(quiz)}
      >
        {/* Inner glass-like background */}
        <div className="
          relative rounded-xl p-6 bg-[#1a1a1a]/90 
          backdrop-blur-md 
          before:absolute before:inset-0 
          before:rounded-xl 
          before:bg-gradient-to-br before:from-white/5 before:to-transparent
        ">
          {/* Animated radial glow in background */}
          <div className="
            absolute -top-10 -left-10 w-40 h-40 rounded-full 
            bg-[#9F70FD]/10 blur-3xl animate-pulse
          "></div>
          <div className="
            absolute -bottom-10 -right-10 w-40 h-40 rounded-full 
            bg-[#00F5D4]/10 blur-3xl animate-pulse
          "></div>

          <h3 className="text-xl font-semibold text-white relative z-10">
            {quiz.name}
          </h3>

          <div className="flex justify-between items-center mt-3 relative z-10">
            <p className="text-sm text-gray-400">
              {quiz.questions.length} question{quiz.questions.length !== 1 ? "s" : ""}
            </p>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                quiz.status === "active"
                  ? "bg-green-900 text-green-300"
                  : quiz.status === "completed"
                  ? "bg-purple-900 text-purple-300"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {quiz.status}
            </span>
          </div>

          <button
            disabled={quiz.status !== "active" || submittedQuizzes.includes(quiz.id)}
            className={`mt-5 w-full py-2 rounded-lg font-bold transition relative z-10 ${
              submittedQuizzes.includes(quiz.id)
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-[#9F70FD] to-[#00F5D4] text-black hover:opacity-90"
            }`}
          >
            {submittedQuizzes.includes(quiz.id)
              ? "Submitted"
              : quiz.status === "active"
              ? "Start Quiz"
              : quiz.status === "inactive"
              ? "Coming Soon"
              : "Completed"}
          </button>
        </div>
      </motion.div>
    ))}
</div>

        </motion.section>
      </main>

      {/* ✅ Quiz Modal */}
      <AnimatePresence>
        {selectedQuiz && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#1a1a1a] rounded-xl p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto relative"
              initial={{ scale: 0.9, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
            >
              {/* Close */}
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
                onClick={() => setSelectedQuiz(null)}
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold text-white mb-4">
                {selectedQuiz.name}
              </h2>

              {selectedQuiz.questions.map((q, idx) => (
                <div
                  key={idx}
                  className="mb-4 p-4 border border-gray-700 rounded-lg bg-[#222]"
                >
                  <p className="font-semibold mb-2">
                    Q{idx + 1}: {q.questionText}
                  </p>

                  {q.questionType === "mcq" && q.options && (
                    <ul className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const selected = answers[idx] === opt.text;
                        return (
                          <li
                            key={optIdx}
                            onClick={() => handleSelect(idx, opt.text)}
                            className={`p-2 rounded cursor-pointer transition ${
                              selected
                                ? "bg-[#9F70FD] text-white"
                                : "bg-[#333] hover:bg-[#444]"
                            }`}
                          >
                            {opt.text}
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {q.questionType === "short" && (
                    <input
                      type="text"
                      className="w-full p-2 rounded bg-[#333] text-white"
                      placeholder="Your answer"
                      value={answers[idx] || ""}
                      onChange={(e) => handleSelect(idx, e.target.value)}
                    />
                  )}
                </div>
              ))}

              <button
                className="mt-6 w-full py-2 rounded-lg bg-gradient-to-r from-[#9F70FD] to-[#00F5D4] text-black font-bold hover:opacity-90 transition"
                onClick={handleSubmitQuiz}
              >
                Submit Quiz
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Popup */}
      <AnimatePresence>
        {statusPopup.visible && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#1a1a1a] rounded-xl p-8 w-full max-w-md text-center"
              initial={{ scale: 0.9, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
            >
              <div className="text-2xl font-bold text-white mb-4">
                {statusPopup.message.includes("start soon")
                  ? "Quiz Not Active"
                  : "Event Completed"}
              </div>
              <p className="mb-6 text-gray-300">{statusPopup.message}</p>
              <button
                className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-[#9F70FD] to-[#00F5D4] text-black font-bold hover:opacity-90 transition"
                onClick={() => setStatusPopup({ visible: false, message: "" })}
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer sections={sections} />
    </div>
  );
}