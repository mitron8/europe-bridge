"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const DmatFAQ = () => {
  const faqs = [
    {
      q: "Do I even need to take the dMAT?",
      a: "Maybe not! Run our free dMAT eligibility check above first. If you hold a 4-year B.Tech/B.E. degree from a recognized Indian university, standard APS document verification generally applies without dMAT. If you hold a 3-year Bachelor's degree (B.Sc, BCA, B.Com, BBA) applying for Master's programs starting Summer Semester 2027, dMAT is mandatory. If you don't need it, we'll tell you honestly and save your money."
    },
    {
      q: "What exactly do you do for the ₹1,999 service fee?",
      a: "We handle your complete candidate profile setup on the official g.a.s.t. portal, secure a seat at your preferred test centre in India before city slots fill up, track all countdown deadlines, provide official preparation materials with worked mock test solutions, guide you through linking the dMAT result to your APS application, and offer a 1:1 call with a counselor."
    },
    {
      q: "Is the 150 EUR exam fee included in the ₹1,999 fee?",
      a: "No. The 150 EUR dMAT examination fee is charged directly by the exam authority (g.a.s.t. / TestDaF Institute in Germany). You pay this official test fee directly to g.a.s.t. during registration using a credit card/forex card. We do not collect or markup this fee."
    },
    {
      q: "What is your refund policy?",
      a: "If we do not get you officially registered for the dMAT before the deadline, you get an immediate 100% full refund of our ₹1,999 service fee. Our guarantee covers our work securing your registration on time. Please note that test scores, university admission, and visa decisions depend on your academic performance."
    },
    {
      q: "Is the dMAT a pass or fail examination?",
      a: "No. The dMAT is not a pass-or-fail test. It provides a standardized percentile and score report reflecting your general academic problem-solving, cognitive reasoning, and quantitative abilities. German universities and APS evaluate your score alongside your undergraduate academic marksheet."
    },
    {
      q: "Which module do Indian Master's applicants sit for?",
      a: "Indian applicants sit for the General Academic Module (administered entirely in English on computer terminals at designated test centres). It tests quantitative problem solving, formal relationships, and cognitive text analysis."
    },
    {
      q: "Where are the test centres located in India?",
      a: "The dMAT is conducted across 10 major test hubs in India: Delhi NCR, Mumbai, Bengaluru, Chennai, Kolkata, Pune, Hyderabad, Ahmedabad, Chandigarh, and Kochi. Because test dates are synchronized, high-demand centres fill up quickly."
    }
  ];

  return (
    <StudyFAQ
      id="faq"
      badge="dMAT & APS FAQs"
      title="Frequently Asked Questions"
      subtitle="Clear answers regarding the new digital test, test center allocations in India, 150 EUR exam fees, and APS synchronization."
      faqs={faqs}
    />
  );
};
