import React, { useState } from 'react';
import { 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  Award, 
  BookOpen, 
  CheckSquare,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DEFAULT_INTERVIEW_TOPICS, DEFAULT_INTERVIEW_QUESTIONS } from '../../data/demoData';
import { evaluateInterviewAnswerWithAI } from '../../services/geminiService';
import { InterviewQuestion } from '../../types';

export const InterviewPrepView: React.FC = () => {
  const { 
    currentRole, 
    completedQuestionIds, 
    toggleQuestionCompleted, 
    checklistItems, 
    toggleChecklistItem, 
    showNotification 
  } = useApp();

  const questionsList: InterviewQuestion[] = DEFAULT_INTERVIEW_QUESTIONS[currentRole.id] || DEFAULT_INTERVIEW_QUESTIONS['ml-engineer'] || [];
  const topicsList = DEFAULT_INTERVIEW_TOPICS[currentRole.id] || DEFAULT_INTERVIEW_TOPICS['ml-engineer'] || [];

  const [activeTopic, setActiveTopic] = useState<string>('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(questionsList[0]?.id || null);

  // Mock Evaluator State
  const [selectedQuestionForTest, setSelectedQuestionForTest] = useState<InterviewQuestion>(questionsList[0] || {
    id: 'q-default',
    category: 'Technical',
    topic: 'Machine Learning',
    question: 'Explain the difference between L1 and L2 regularization.',
    difficulty: 'Medium',
    keyConcepts: ['L1', 'L2'],
    modelAnswer: 'L1 adds absolute weights; L2 adds squared weights.',
    commonPitfalls: 'Confusing sparsity with shrinking.'
  });
  const [userPracticeAnswer, setUserPracticeAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState<any>(null);

  const filteredQuestions = questionsList.filter(q => {
    if (activeTopic !== 'all' && q.topic !== activeTopic) return false;
    return true;
  });

  const handleEvaluateAnswer = async () => {
    if (!userPracticeAnswer.trim()) return;
    setIsEvaluating(true);
    showNotification('AI evaluating technical rigor and delivery...', 'info');

    try {
      const result = await evaluateInterviewAnswerWithAI(selectedQuestionForTest.question, userPracticeAnswer);
      setEvalResult(result);
      showNotification(`Evaluated! Readiness Score: ${result.score}/100`);
    } catch (e) {
      showNotification('Failed to evaluate answer', 'warning');
    } finally {
      setIsEvaluating(false);
    }
  };

  const completedQuestionsCount = questionsList.filter(q => completedQuestionIds.includes(q.id)).length;
  const completedChecklistCount = checklistItems.filter(i => i.completed).length;

  return (
    <div className="p-4 sm:p-8 flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Technical Interview Preparation
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Mock AI Evaluator
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Master the core theoretical concepts, coding patterns, and system design questions asked for <span className="text-indigo-400 font-semibold">{currentRole.title}</span>.
          </p>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#141414] border border-[#222] p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Questions Mastered</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">
              {completedQuestionsCount} / {questionsList.length}
            </h3>
            <p className="text-[10px] text-indigo-400">Technical & architectural drills</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#141414] border border-[#222] p-4 rounded-xl flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">Interview Readiness Checklist</p>
            <h3 className="text-2xl font-bold text-white mt-0.5">
              {completedChecklistCount} / {checklistItems.length}
            </h3>
            <p className="text-[10px] text-emerald-400">Strategic interview prep steps</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <CheckSquare className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Grid: Left Column Questions (7 cols), Right Column Mock Evaluator (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Left 7 Cols: Question Library */}
        <div className="lg:col-span-7 space-y-4">
          {/* Topic Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTopic('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase text-[10px] transition-colors shrink-0 ${
                activeTopic === 'all' ? 'bg-indigo-600 text-white' : 'bg-[#181818] text-gray-400 hover:text-white'
              }`}
            >
              All Topics ({questionsList.length})
            </button>
            {topicsList.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.title)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold text-[10px] transition-colors shrink-0 ${
                  activeTopic === topic.title ? 'bg-indigo-600 text-white' : 'bg-[#181818] text-gray-400 hover:text-white'
                }`}
              >
                {topic.title.slice(0, 20)}
              </button>
            ))}
          </div>

          {/* Question List */}
          <div className="space-y-3">
            {filteredQuestions.map((q) => {
              const isExpanded = expandedQuestionId === q.id;
              const isCompleted = completedQuestionIds.includes(q.id);

              return (
                <div
                  key={q.id}
                  className={`bg-[#141414] border rounded-2xl transition-all overflow-hidden ${
                    isExpanded ? 'border-indigo-500/50 shadow-md' : 'border-[#222] hover:border-[#333]'
                  }`}
                >
                  <div className="p-4 flex items-start justify-between gap-3">
                    <button
                      onClick={() => toggleQuestionCompleted(q.id)}
                      className="mt-0.5 text-gray-500 hover:text-emerald-400 transition-colors shrink-0"
                      title="Mark question mastered"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-500" />
                      )}
                    </button>

                    <div 
                      onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                      className="flex-1 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          q.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
                          q.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                        }`}>
                          {q.difficulty}
                        </span>
                        <span className="text-[10px] text-gray-400">{q.topic}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white leading-snug">
                        {q.question}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setSelectedQuestionForTest(q);
                          setUserPracticeAnswer('');
                          setEvalResult(null);
                        }}
                        className="px-2 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded text-[10px] font-semibold transition-colors"
                        title="Practice this question in AI Mock Tester"
                      >
                        Practice
                      </button>
                      <button
                        onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                        className="p-1 text-gray-500 hover:text-white"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-[#1f1f1f] bg-[#0f0f0f] space-y-3">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Model Answer / Explanation:</p>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans">
                          {q.modelAnswer}
                        </p>
                      </div>

                      {q.keyConcepts && (
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Key High-Score Concepts:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {q.keyConcepts.map((pt, i) => (
                              <span key={i} className="text-[10px] bg-[#1a1a1a] text-gray-300 px-2 py-0.5 rounded border border-[#2a2a2a]">
                                {pt}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 5 Cols: AI Mock Evaluator & Checklist */}
        <div className="lg:col-span-5 space-y-6">
          {/* AI Mock Evaluator */}
          <div className="bg-[#141414] border border-[#222] p-5 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                AI Mock Interview Tester
              </h4>
            </div>

            <div className="p-3 bg-[#181818] rounded-xl border border-[#262626]">
              <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Active Question:</p>
              <p className="text-xs font-bold text-white leading-snug">
                {selectedQuestionForTest.question}
              </p>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Your Spoken or Written Answer:
              </label>
              <textarea
                rows={4}
                placeholder="Type your technical response here (e.g. L1 produces sparsity because the derivative of absolute value is constant ±1...)"
                value={userPracticeAnswer}
                onChange={(e) => setUserPracticeAnswer(e.target.value)}
                className="w-full bg-[#181818] border border-[#2a2a2a] focus:border-indigo-500 rounded-xl p-3 text-xs text-white placeholder-gray-600 focus:outline-none leading-relaxed"
              />
            </div>

            <button
              onClick={handleEvaluateAnswer}
              disabled={isEvaluating || !userPracticeAnswer.trim()}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-900/30"
            >
              {isEvaluating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>AI Analyzing Technical Rigor...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Evaluate Answer with AI</span>
                </>
              )}
            </button>

            {/* Evaluation Results */}
            {evalResult && (
              <div className="p-4 bg-[#181818] border border-indigo-500/30 rounded-xl space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    evalResult.verdict === 'Strong' ? 'bg-emerald-500/20 text-emerald-400' :
                    evalResult.verdict === 'Satisfactory' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {evalResult.verdict}
                  </span>
                  <span className="text-sm font-extrabold text-white">Score: {evalResult.score}/100</span>
                </div>

                <p className="text-[11px] text-gray-300 leading-relaxed">
                  {evalResult.feedback}
                </p>

                <div className="space-y-1 text-[10px] text-gray-400 pt-2 border-t border-[#262626]">
                  <p className="font-bold text-indigo-300">Actionable Improvement Tips:</p>
                  {evalResult.improvementTips?.map((tip: string, idx: number) => (
                    <p key={idx} className="leading-tight">• {tip}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Interview Preparation Checklist */}
          <div className="bg-[#141414] border border-[#222] p-5 rounded-2xl space-y-3 shadow-sm">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Interview Readiness Checklist
              </h4>
            </div>

            <div className="space-y-2">
              {checklistItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
                    item.completed
                      ? 'bg-emerald-950/10 border-emerald-500/30 text-gray-400'
                      : 'bg-[#181818] border-[#2a2a2a] hover:border-gray-500 text-white'
                  }`}
                >
                  {item.completed ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  )}
                  <span className={`text-[11px] ${item.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
