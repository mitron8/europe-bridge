"use client";
import React from 'react';
import { StudyFAQ } from '@/app/study/components/StudyFAQ';

export const CvFAQ = () => {
  const faqs = [
    {
      q: "What is a German Tabellarischer Lebenslauf and how does it differ from a standard US/Indian resume?",
      a: "A German Tabellarischer Lebenslauf (tabular CV) is a structured, factual document designed for German admissions committees and employers. Unlike US resumes that emphasize narrative storytelling and creative graphics, a German CV uses a strict two-column layout with dates (MM/YYYY - MM/YYYY) aligned on the left and achievements on the right. It requires a gapless timeline (lückenlos), converted German grades (Bavarian Formula), CEFR language levels (A1-C2), and formal signature blocks."
    },
    {
      q: "Do I need to include a photograph on my CV for German university applications?",
      a: "For pure university admissions (via uni-assist or direct university portals like TUMonline), a photograph is generally optional under modern anti-discrimination guidelines. However, if you are applying for an Ausbildung, corporate scholarships (DAAD), or Werkstudent (working student) / internship roles in Germany, a professional German application photo (Bewerbungsfoto) is still widely expected. We can format your CV with or without a photo slot based on your goal."
    },
    {
      q: "How are gaps in my education or career handled in a 'lückenloser' CV?",
      a: "German reviewers scrutinize unexplained gaps of more than 1 to 2 months. In our questionnaire, we will ask you about any gap periods between schooling, college, or jobs. We strategically frame these intervals constructively—such as 'Preparation for Master’s entrance exams & German A1/A2 certification', 'Self-directed research and open-source project development', or 'Sabbatical & career reorientation'—so admission boards and visa officers have no grounds for inquiry."
    },
    {
      q: "In what file formats will I receive my finalized CV?",
      a: "You will receive both:\n1. A high-resolution, vector-formatted PDF formatted to modern ATS and German typography standards, ready for immediate upload to uni-assist and university portals.\n2. An editable Microsoft Word (.docx) source file so you can easily update projects, grades, or contact details in future semesters."
    },
    {
      q: "Can this CV be used for both university applications and Werkstudent / student jobs in Germany?",
      a: "Yes! The core structure of your Tabellarischer Lebenslauf remains consistent across both academic and employment contexts. We focus heavily on practical laboratory tools, software proficiencies, and industry projects, making the document immediately appealing to German tech recruiters seeking student interns or research assistants (HiWi)."
    },
    {
      q: "Do I need German language skills on my CV if applying for an English-taught program?",
      a: "Even for 100% English-taught Master's degrees, German faculty and visa consulates love seeing that you have started learning German. Listing 'German: A1 / A2 (In Progress)' on your CV shows cultural adaptability, initiative, and long-term commitment to studying and working in Germany."
    },
    {
      q: "What is the turnaround time and how do revisions work?",
      a: "Standard Plan: First draft delivered in 2 to 3 working days.\nExpress Plan: First draft delivered within 1 working day (24 hours).\n\nAfter delivery, you can review the document, leave comments or request wording adjustments, and our editors will refine it promptly."
    }
  ];

  return (
    <StudyFAQ
      id="faq"
      badge="Lebenslauf FAQs"
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about German DIN 5008 tabular CV formatting, photo standards, gap explanations, and ATS optimization."
      faqs={faqs}
    />
  );
};
