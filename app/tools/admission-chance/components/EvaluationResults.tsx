"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserProfileData } from './AdmissionEvaluatorForm';
import { 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle, 
  Building2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface EvaluationResultsProps {
  data: UserProfileData;
  onReset: () => void;
}

export const EvaluationResults: React.FC<EvaluationResultsProps> = ({ data, onReset }) => {
  // Calculate German Bavarian Grade Estimate
  const calculateGermanGrade = () => {
    if (data.scale === 'german') return data.score.toFixed(2);
    if (data.scale === '10-point') {
      const pct = data.score * 10;
      const g = 1 + 3 * ((100 - pct) / (100 - 40));
      return Math.max(1.0, Math.min(4.0, g)).toFixed(2);
    }
    if (data.scale === '4-point') {
      const pct = (data.score / 4.0) * 100;
      const g = 1 + 3 * ((100 - pct) / (100 - 40));
      return Math.max(1.0, Math.min(4.0, g)).toFixed(2);
    }
    if (data.scale === 'percentage') {
      const g = 1 + 3 * ((100 - data.score) / (100 - 40));
      return Math.max(1.0, Math.min(4.0, g)).toFixed(2);
    }
    return "2.10";
  };

  const germanGrade = Number(calculateGermanGrade());

  // Calculate 100-Point Fit Score
  const calculateFitScore = () => {
    let score = 0;

    // Academic GPA score (Max 40)
    if (germanGrade <= 1.5) score += 40;
    else if (germanGrade <= 2.0) score += 34;
    else if (germanGrade <= 2.5) score += 26;
    else if (germanGrade <= 3.0) score += 18;
    else score += 10;

    // English Score (Max 15)
    if (data.english === 'ielts_7_5') score += 15;
    else if (data.english === 'ielts_6_5') score += 12;
    else if (data.english === 'ielts_6_0') score += 8;
    else score += 6;

    // German Score (Max 15)
    if (data.german === 'c1') score += 15;
    else if (data.german === 'b1_b2') score += 10;
    else if (data.german === 'a1_a2') score += 6;
    else score += 2;

    // Work Experience (Max 15)
    if (data.workExp === '2_plus') score += 15;
    else if (data.workExp === '1_to_2') score += 11;
    else if (data.workExp === 'less_1') score += 6;
    else score += 2;

    // Extras (Max 15)
    if (data.extras === 'both') score += 15;
    else if (data.extras === 'gre_gmat') score += 12;
    else if (data.extras === 'research') score += 10;
    else score += 2;

    // Adjust for target tier expectations
    if (data.tier === 'tier1') score = Math.round(score * 0.9);
    else if (data.tier === 'tier3') score = Math.min(100, Math.round(score * 1.15));

    return Math.min(98, Math.max(35, score));
  };

  const fitScore = calculateFitScore();

  const getLikelihoodBand = (s: number) => {
    if (s >= 75) return { band: 'High Likelihood', color: 'text-[#16161a] bg-[#f4f1ea] border-[#16161a]', desc: 'Strong fit for top public German universities & TU9 programs!' };
    if (s >= 55) return { band: 'Moderate Likelihood', color: 'text-[#5e5b54] bg-[#faf8f3] border-[#dcd7cb]', desc: 'Good prospects for standard public universities & Fachhochschulen.' };
    return { band: 'Reach / Conditional', color: 'text-[#9e2a2b] bg-[#faf8f3] border-[#9e2a2b]/30', desc: 'May require profile boosting or non-NC unrestricted programs.' };
  };

  const bandInfo = getLikelihoodBand(fitScore);

  // Identify Easiest Profile Upgrade
  const getEasiestUpgrade = () => {
    if (data.english === 'ielts_6_5' || data.english === 'moi' || data.english === 'ielts_6_0') {
      return "Upgrade IELTS score to 7.5+ (+10 Points). Many top TU9 universities give significant bonus weight to high English scores.";
    }
    if (data.german === 'none' || data.german === 'a1_a2') {
      return "Complete B1/B2 German level (+10 Points). Enhances admission points and opens 3x more university options.";
    }
    if (data.extras === 'none') {
      return "Take GRE (Target 315+) or publish a research paper (+12 Points) to compensate for academic GPAs.";
    }
    return "Highlight industry project experience and secure strong academic LORs to maximize qualitative ranking.";
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-[var(--lp-card)] border border-[#e5e0d3] rounded-3xl p-6 sm:p-10 shadow-[0_16px_40px_rgba(22,22,26,0.05)] relative overflow-hidden space-y-8">
          {/* Header & Reset Button */}
          <div className="flex items-center justify-between border-b border-[#e5e0d3] pb-5">
            <div>
              <span className="text-[11px] font-semibold uppercase text-[var(--lp-red)] tracking-[0.2em] block mb-1">Evaluation Results</span>
              <h2 className="lp-serif text-2xl sm:text-3xl font-semibold text-[var(--lp-text)]">Your Admission Likelihood Score</h2>
            </div>
            <button 
              onClick={onReset}
              className="px-4 py-2 rounded-full text-xs font-bold text-[var(--lp-text)] bg-white border border-[#e5e0d3] hover:border-[#cfc8b8] transition-all flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Recalculate</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Score & Gauge */}
            <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center justify-center p-8 rounded-full bg-gradient-to-br from-[#faf8f4] to-[#ede7dc] border-4 border-[var(--lp-red)]/20 shadow-inner">
                <div className="text-center">
                  <div className="lp-serif text-5xl sm:text-6xl font-bold text-[var(--lp-text)]">{fitScore}</div>
                  <div className="text-[11px] font-semibold text-[var(--lp-text-muted)] uppercase tracking-widest mt-1">Out of 100 Points</div>
                </div>
              </div>

              <div className="space-y-2">
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold border ${bandInfo.color}`}>
                  {bandInfo.band}
                </span>
                <p className="text-xs text-[var(--lp-text-muted)] font-medium leading-relaxed max-w-sm mx-auto lg:mx-0">
                  {bandInfo.desc}
                </p>
              </div>
            </div>

            {/* Profile Snapshot Card */}
            <div className="lg:col-span-6 space-y-3">
              <div className="p-5 rounded-2xl bg-white/70 border border-[#e5e0d3] space-y-2.5">
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-[var(--lp-text-muted)]">Converted German Scale:</span>
                  <span className="text-[var(--lp-red)] font-bold text-base">{germanGrade}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-[var(--lp-text-muted)]">Target Major Field:</span>
                  <span className="text-[var(--lp-text)] font-semibold">{data.field}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-[var(--lp-text-muted)]">Target University Tier:</span>
                  <span className="text-[var(--lp-text)] font-semibold capitalize">{data.tier === 'tier1' ? 'Tier 1 (TU9)' : data.tier === 'tier2' ? 'Tier 2 (Public)' : 'Tier 3 (Unrestricted)'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Single Easiest Profile Upgrade Recommendation */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#ece7dd]/70 border border-[#ded8cb] flex items-start gap-4 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#f4f1ea] text-[#9e2a2b] flex items-center justify-center shrink-0 border border-[#dcd7cb]">
              <TrendingUp className="w-4 h-4 text-[#9e2a2b]" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#16161a] bg-[#f3efe6] border border-[#dcd7cb]">
                  Actionable Strategy
                </span>
                <span className="text-sm font-semibold text-[var(--lp-text)]">
                  Recommended Single Profile Upgrade
                </span>
              </div>
              <p className="text-xs text-[var(--lp-muted)] font-medium leading-relaxed">
                {getEasiestUpgrade()}
              </p>
            </div>
          </div>

          {/* University Tier Fit Breakdown */}
          <div className="space-y-4">
            <h3 className="lp-serif font-semibold text-[var(--lp-text)] text-lg">University Fit Likelihood Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/70 border border-[#e5e0d3] space-y-1">
                <span className="text-xs font-semibold text-[var(--lp-red)]">TU9 / Top Research Univs</span>
                <div className="text-sm font-bold text-[var(--lp-text)]">
                  {fitScore >= 75 ? 'Strong Match (75%+)' : fitScore >= 55 ? 'Reach Match (40–60%)' : 'Low Probability (<30%)'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/70 border border-[#e5e0d3] space-y-1">
                <span className="text-xs font-semibold text-[var(--lp-red)]">Public Applied Sciences</span>
                <div className="text-sm font-bold text-[var(--lp-text)]">
                  {fitScore >= 55 ? 'High Probability (80%+)' : 'Moderate Match (50%)'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/70 border border-[#e5e0d3] space-y-1">
                <span className="text-xs font-semibold text-[var(--lp-red)]">Non-NC Unrestricted Courses</span>
                <div className="text-sm font-bold text-[var(--lp-text)]">
                  Guaranteed Match (100%)
                </div>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#16161a] text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10 shadow-xl">
            <div className="space-y-1.5 text-center sm:text-left">
              <h4 className="lp-serif font-semibold text-lg text-white">Want a 100% Verified University Shortlist?</h4>
              <p className="text-xs text-white/70 font-medium">Book a 1-on-1 counselor session to map your profile to exact public German courses.</p>
            </div>
            <Link 
              href="/signup" 
              className="lp-btn lp-btn--red px-6 py-3 text-xs font-bold text-white shrink-0 inline-flex items-center gap-2"
            >
              <span>Get Free Counselor Evaluation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
