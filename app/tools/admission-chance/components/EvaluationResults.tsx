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
    if (s >= 75) return { band: 'High Likelihood', color: 'text-emerald-700 bg-emerald-100 border-emerald-300', desc: 'Strong fit for top public German universities & TU9 programs!' };
    if (s >= 55) return { band: 'Moderate Likelihood', color: 'text-blue-700 bg-blue-100 border-blue-300', desc: 'Good prospects for standard public universities & Fachhochschulen.' };
    return { band: 'Reach / Conditional', color: 'text-amber-800 bg-amber-100 border-amber-300', desc: 'May require profile boosting or non-NC unrestricted programs.' };
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
    <section className="py-10 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="neu-card p-6 sm:p-10 relative overflow-hidden space-y-8">
          {/* Header & Reset Button */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div>
              <span className="text-xs font-black uppercase text-germany-red tracking-wider">Evaluation Results</span>
              <h2 className="text-2xl font-black text-germany-black font-display">Your Admission Likelihood Score</h2>
            </div>
            <button 
              onClick={onReset}
              className="px-4 py-2 rounded-full text-xs font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Recalculate</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Score & Gauge */}
            <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center justify-center p-8 rounded-full bg-gradient-to-br from-amber-50 to-red-50 border-4 border-germany-red/30 shadow-inner">
                <div className="text-center">
                  <div className="text-5xl font-black text-germany-black font-display">{fitScore}</div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Out of 100 Points</div>
                </div>
              </div>

              <div className="space-y-2">
                <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black border ${bandInfo.color}`}>
                  {bandInfo.band}
                </span>
                <p className="text-xs text-gray-600 font-medium leading-relaxed max-w-sm mx-auto lg:mx-0">
                  {bandInfo.desc}
                </p>
              </div>
            </div>

            {/* Profile Snapshot Card */}
            <div className="lg:col-span-6 space-y-3">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-gray-600">Converted German Scale:</span>
                  <span className="text-germany-red font-black font-display text-base">{germanGrade}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-gray-600">Target Major Field:</span>
                  <span className="text-germany-black">{data.field}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-gray-600">Target University Tier:</span>
                  <span className="text-germany-black capitalize">{data.tier === 'tier1' ? 'Tier 1 (TU9)' : data.tier === 'tier2' ? 'Tier 2 (Public)' : 'Tier 3 (Unrestricted)'}</span>
                </div>
              </div>

              </div>
          </div>

          {/* Single Easiest Profile Upgrade Recommendation */}
          <div className="neu-card p-6 border-l-4 border-l-germany-gold bg-amber-50/40 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm uppercase tracking-wide">
              <TrendingUp className="w-4 h-4 text-germany-gold" />
              <span>Recommended Single Profile Upgrade</span>
            </div>
            <p className="text-xs text-gray-700 font-semibold leading-relaxed">
              {getEasiestUpgrade()}
            </p>
          </div>

          {/* University Tier Fit Breakdown */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-germany-black text-base">University Fit Likelihood Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-1">
                <span className="text-xs font-bold text-germany-red">TU9 / Top Research Univs</span>
                <div className="text-sm font-extrabold text-germany-black">
                  {fitScore >= 75 ? 'Strong Match (75%+)' : fitScore >= 55 ? 'Reach Match (40–60%)' : 'Low Probability (<30%)'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-1">
                <span className="text-xs font-bold text-germany-red">Public Applied Sciences</span>
                <div className="text-sm font-extrabold text-germany-black">
                  {fitScore >= 55 ? 'High Probability (80%+)' : 'Moderate Match (50%)'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-1">
                <span className="text-xs font-bold text-germany-red">Non-NC Unrestricted Courses</span>
                <div className="text-sm font-extrabold text-germany-black">
                  Guaranteed Match (100%)
                </div>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-red-600 to-red-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-extrabold text-base font-display">Want a 100% Verified University Shortlist?</h4>
              <p className="text-xs text-red-100 font-medium">Book a 1-on-1 counselor session to map your profile to exact public German courses.</p>
            </div>
            <Link 
              href="/signup" 
              className="neu-btn-gold px-6 py-2.5 text-xs font-extrabold text-germany-black shrink-0 flex items-center gap-1.5 shadow"
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
