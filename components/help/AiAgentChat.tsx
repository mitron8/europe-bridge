"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  User, 
  Copy, 
  Check, 
  Lightbulb,
  ArrowUpRight,
  Headphones
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const KNOWLEDGE_RESPONSES: Record<string, string> = {
  aps: `**APS (Akademische Prüfstelle) Certificate Overview:**\n\n1. **Requirement:** Mandatory for all Indian degree holders applying for German student visas.\n2. **Processing Time:** 3 to 5 weeks on average.\n3. **Fee:** ₹18,000 paid directly to the APS India portal.\n4. **Key Documents:** Bachelor degree/provisional, all semester marksheets, Class 10 & 12 certificates, Aadhaar copy, and English test scores (IELTS/TOEFL).\n\n*If you have a name spelling mismatch between your passport and marksheets, notify your counsellor to issue a standard verification affidavit.*`,
  
  blocked: `**German Blocked Account (Sperrkonto) Guidelines (2026):**\n\n- **Required Amount:** **€992 per month** (€11,904/year) mandated by the German Federal Foreign Office.\n- **Approved Providers:** Expatrio, Fintiba, Coracle.\n- **EuropeBridge Advantage:** Expatrio offers EuropeBridge applicants reduced setup fees and bundled Techniker Krankenkasse (TK) public health insurance.\n- **Disbursement:** Released monthly into your local German bank account (like N26 or Sparkasse) after arriving in Germany.`,
  
  tu9: `**TU9 vs Universities of Applied Sciences (FH / HAW):**\n\n- **TU9 (Technical Universities):** Strong focus on theory, scientific research, and academic rigor. Best for students targeting R&D, PhDs, or fundamental engineering.\n- **FH / HAW:** Strong practical orientation with compulsory industry internships. Ideal for direct employment into top engineering & IT firms.`,
  
  uniassist: `**Uni-Assist & VPD Process:**\n\n- **Purpose:** Centralized evaluation service converting your Indian marks into the German grading scale (*Bavarian Formula*).\n- **VPD:** Universities like TUM only ask for a preliminary VPD certificate, after which you apply directly on the university portal.\n- **Duration:** Typically 4 to 6 weeks. Apply early!`,
  
  tuition: `**Tuition Fees in Germany:**\n\n- **Public Universities:** Most public universities in Germany charge **€0 tuition fee** for international students.\n- **Semester Contribution:** You only pay an administrative semester contribution (*Semesterbeitrag*) of approximately €150 to €350 per semester, which includes public transport.\n- **Exception:** The federal state of Baden-Württemberg charges €1,500/semester for non-EU students.`
};

const SUGGESTED_QUESTIONS = [
  'APS India Certificate steps',
  'Blocked Account 2026 amount',
  'TU9 vs Fachhochschule',
  'Uni-Assist & VPD process',
  'Tuition-free universities',
];

interface AiAgentChatProps {
  onAskCounsellor?: (queryContext?: string) => void;
}

export default function AiAgentChat({ onAskCounsellor }: AiAgentChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Guten Tag! I'm your **EuropeBridge AI Advisor**.\n\nAsk me anything about German universities, APS verification, Uni-Assist deadlines, blocked accounts, or visa rules.`,
      timestamp: 'Just now',
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let responseText = '';

      if (lower.includes('aps') || lower.includes('certificate')) {
        responseText = KNOWLEDGE_RESPONSES.aps;
      } else if (lower.includes('blocked') || lower.includes('account') || lower.includes('money') || lower.includes('expatrio') || lower.includes('fintiba')) {
        responseText = KNOWLEDGE_RESPONSES.blocked;
      } else if (lower.includes('tu9') || lower.includes('fh') || lower.includes('fachhochschule') || lower.includes('university vs')) {
        responseText = KNOWLEDGE_RESPONSES.tu9;
      } else if (lower.includes('uni-assist') || lower.includes('vpd')) {
        responseText = KNOWLEDGE_RESPONSES.uniassist;
      } else if (lower.includes('tuition') || lower.includes('fee') || lower.includes('free')) {
        responseText = KNOWLEDGE_RESPONSES.tuition;
      } else {
        responseText = `Regarding **"${query}"**:\n\nGerman universities assess eligibility based on your degree curriculum, ECTS credit mapping, and minimum German GPA (Bavarian formula).\n\nIf you need tailored profile evaluation or have a specific university condition, you can drop a query directly to your assigned **EuropeBridge Counsellor** for personalized guidance.`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="flex flex-col h-[560px] bg-white rounded-2xl border border-gray-200/80 shadow-[2px_2px_8px_rgba(71,85,105,0.04)] overflow-hidden relative">
      {/* Subtle German Tricolor Accent */}
      <div className="w-full h-[3px] flex shrink-0">
        <div className="flex-1 bg-germany-black"></div>
        <div className="flex-1 bg-germany-red"></div>
        <div className="flex-1 bg-germany-gold"></div>
      </div>

      {/* Sub-header */}
      <div className="px-5 py-3 border-b border-gray-200/70 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-germany-gold/20 flex items-center justify-center text-germany-black">
            <Bot className="w-4 h-4 text-germany-red" />
          </div>
          <div>
            <span className="text-xs font-bold text-germany-black">EuropeBridge AI Advisor</span>
            <span className="text-[10px] text-gray-400 font-medium ml-2">Germany Higher Education Knowledge</span>
          </div>
        </div>

        {onAskCounsellor && (
          <button
            onClick={() => onAskCounsellor()}
            className="text-xs font-bold text-germany-red hover:underline flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Ask Counsellor</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Suggested Questions */}
      <div className="px-5 py-2.5 bg-gray-50/60 border-b border-gray-200/60 overflow-x-auto custom-scrollbar flex items-center gap-2">
        <span className="text-[11px] font-bold text-gray-400 shrink-0 flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-germany-red" /> Topics:
        </span>
        {SUGGESTED_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="text-[11px] font-bold px-2.5 py-1 bg-white hover:bg-red-50 hover:text-germany-red text-gray-700 border border-gray-200/80 rounded-lg shrink-0 transition-colors cursor-pointer shadow-2xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#FDFBF7]/40 custom-scrollbar">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
              m.sender === 'user' ? 'bg-germany-black text-white' : 'bg-germany-gold/20 text-germany-black border border-germany-gold/40'
            }`}>
              {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5 text-germany-black" />}
            </div>

            <div className={`max-w-[80%] space-y-1 ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-germany-red text-white font-medium rounded-tr-xs shadow-xs'
                    : 'bg-white text-gray-800 border border-gray-200/80 rounded-tl-xs shadow-2xs'
                }`}
              >
                <div className="whitespace-pre-line">
                  {m.text}
                </div>
              </div>

              <div className="flex items-center gap-2 px-1 text-[10px] text-gray-400">
                <span>{m.timestamp}</span>
                {m.sender === 'ai' && (
                  <>
                    <span>·</span>
                    <button
                      onClick={() => handleCopy(m.text, m.id)}
                      className="hover:text-gray-700 font-semibold cursor-pointer"
                    >
                      {copiedId === m.id ? <span className="text-emerald-600 font-bold">Copied</span> : 'Copy'}
                    </button>
                    {onAskCounsellor && (
                      <>
                        <span>·</span>
                        <button
                          onClick={() => onAskCounsellor(m.text.slice(0, 150))}
                          className="text-germany-red hover:underline font-bold cursor-pointer"
                        >
                          Forward to Counsellor
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-gray-400 pl-9 font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-germany-red animate-pulse" />
            <span>AI Advisor is typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-gray-200/70">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about APS, blocked account, German universities, etc..."
            className="flex-1 bg-gray-50 focus:bg-white border border-gray-200/80 focus:border-germany-red rounded-xl px-3.5 py-2.5 text-xs text-germany-black placeholder-gray-400 focus:outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-germany-red hover:bg-[#D62839] disabled:bg-gray-200 text-white p-2.5 rounded-xl transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
