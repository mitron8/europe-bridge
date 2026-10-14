// Student stories shown on the landing page.
// Add new entries to this list — the layout is built for 30+ and
// spreads them across scrolling columns automatically.
//
// name        — as the student wants it shown (e.g. "Aarav S.")
// university  — where they were admitted
// programme   — optional, e.g. "M.Sc. Informatics"
// intake      — optional, e.g. "WS 2025"
// rating      — optional, 1–5
// text        — their words, unedited

export type Testimonial = {
  name: string;
  university: string;
  programme?: string;
  intake?: string;
  rating?: number;
  text: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Aarav S.",
    university: "TU Munich",
    programme: "M.Sc. Informatics",
    intake: "WS 2024",
    rating: 5,
    text: "The AI SOP builder is insane. I had no idea how to structure my motivation letter for Germany. EuropeBridge drafted a perfect version that my guide just tweaked a little. Got admitted in 3 weeks!",
  },
  {
    name: "Priya M.",
    university: "RWTH Aachen",
    programme: "M.Sc. Mechanical Eng.",
    intake: "SS 2025",
    rating: 5,
    text: "I was super stressed about the Blocked Account and APS. Their tracker literally walked me through every single document I needed. Zero confusion. I recommend this to everyone going to Germany.",
  },
  {
    name: "Rohan K.",
    university: "HU Berlin",
    programme: "M.Sc. Economics",
    intake: "WS 2024",
    rating: 5,
    text: "I thought my GPA was too low for a public uni. The calculator showed me 15 programs I was eligible for, and my counselor got my visa approved flawlessly. They handle everything.",
  },
  {
    name: "Ananya R.",
    university: "TU Berlin",
    programme: "M.Sc. Data Engineering",
    intake: "WS 2025",
    rating: 5,
    text: "The ECTS credit converter and prerequisite check saved me from applying to programs where I'd be rejected. My alumni mentor studied at TU Berlin and reviewed every single module.",
  },
  {
    name: "Vikram P.",
    university: "KIT Karlsruhe",
    programme: "M.Sc. Automotive",
    intake: "SS 2025",
    rating: 5,
    text: "APS verification took only 4 weeks with their document checklist. The mock visa interview prepared me for every tricky question the consulate officer asked.",
  },
  {
    name: "Sneha D.",
    university: "Univ. of Stuttgart",
    programme: "M.Sc. Computer Science",
    intake: "WS 2024",
    rating: 5,
    text: "From German grade conversion to accommodation hunt in Stuttgart, EuropeBridge was there at every milestone. Best decision I made for my master's journey.",
  },
];
