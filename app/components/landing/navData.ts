// Landing-page copy of the site navigation (mirrors app/components/Navbar.tsx,
// which other pages still use unchanged).

export type NavGroupItem = { title: string; desc?: string; badge?: string; href?: string };
export type NavGroup = {
  title: string;
  items: NavGroupItem[];
  action?: { label: string; href: string };
};
export type NavItem = {
  label: string;
  href: string;
  dropdown?: string[];
  groups?: NavGroup[];
  footerLink?: { label: string; href: string };
  customWidth?: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Study",
    href: "/#our-process",
    groups: [
      {
        title: "Am I eligible?",
        items: [
          { title: "Admission requirements", desc: "Grades, tests and documents", href: "/study/requirements" },
          { title: "APS verification", desc: "Required for India and China", href: "/study/aps" },
          { title: "Admission chance", desc: "See where you stand", href: "/tools/admission-chance" }
        ]
      },
      {
        title: "What will it cost?",
        items: [
          { title: "Cost of living", desc: "What a month really costs", href: "/study/cost-of-living" },
          { title: "Blocked account", desc: "Your proof of funds", href: "/services/blocked-account" },
          { title: "Scholarships", desc: "Funding you can actually get", href: "/study/scholarships" },
          { title: "Education loan", desc: "Financing the degree", href: "/services/education-loan" }
        ]
      },
      {
        title: "Getting the visa",
        items: [
          { title: "Student visa", desc: "Application to appointment", href: "/study/student-visa" },
          { title: "Motivation letter", desc: "The letter that gets you in", href: "/study/motivation-letter" },
          { title: "Health insurance", desc: "Cover from day one", href: "/study/health-insurance" }
        ]
      },
      {
        title: "The full path",
        items: [
          { title: "Master's guide", desc: "Everything, start to finish", href: "/study/masters" },
          { title: "Application process", desc: "Step by step, in order", href: "/study/application-process" },
          { title: "Life after the offer", desc: "Arriving, careers & Blue Card", href: "/study/life-after-offer" }
        ]
      }
    ]
  },
  {
    label: "Courses",
    href: "/#free-tools",
    dropdown: ["MS in CS", "MS in Data Science", "MBA", "Engineering"]
  },
  {
    label: "Free tools",
    href: "/tools",
    groups: [
      {
        title: "Most used",
        items: [
          { 
            title: "German grade calculator", 
            desc: "Convert your grade to the German 1.0 to 4.0 scale in seconds.",
            href: "/tools/german-grade-calculator"
          }
        ],
        action: { label: "Open Grade Calculator", href: "/tools/german-grade-calculator" }
      },
      {
        title: "Study & Admissions",
        items: [
          { title: "German grade calculator", desc: "Bavarian formula", href: "/tools/german-grade-calculator" },
          { title: "ECTS credit calculator", desc: "Convert course credits", href: "/tools/ects-credit-calculator" },
          { title: "Admission chance", desc: "Profile evaluation", href: "/tools/admission-chance" }
        ]
      },
      {
        title: "Finance & Living",
        items: [
          { title: "Blocked account calculator", desc: "Official €992/mo rate", href: "/tools/blocked-account-calculator" },
          { title: "Cost of living estimator", desc: "City-by-city budgets", href: "/tools/cost-of-living-estimator" },
          { title: "Net salary & Blue Card", desc: "Take-home pay & visa", href: "/tools/net-salary-calculator" }
        ]
      },
      {
        title: "Career & Visa",
        items: [
          { title: "Net salary & Blue Card", desc: "2026 thresholds", href: "/tools/net-salary-calculator" },
          { title: "APS verification guide", desc: "Mandatory cert", href: "/study/aps" },
          { title: "Post-study work guide", desc: "18-month visa", href: "/study/life-after-offer" }
        ]
      }
    ],
    footerLink: { label: "Browse all tools →", href: "/tools" }
  },
  {
    label: "Services",
    href: "/#our-process",
    groups: [
      {
        title: "Before you apply",
        items: [
          { title: "University shortlisting", href: "/services/university-shortlisting" },
          { title: "dMAT + APS Fast-Track", desc: "Registration before the deadline, or full refund.", href: "/services/dmat-aps-fast-track" },
          { title: "SOP writing", href: "/services/sop-writing" },
          { title: "LOR writing", href: "/services/lor-writing" },
          { title: "CV and Lebenslauf", href: "/services/cv-preparation" }
        ]
      },
      {
        title: "Applying and visa",
        items: [
          { title: "Student visa", href: "/services/german-student-visa-application" },
          { title: "Motivation letter", href: "/services/letter-of-motivation-for-german-student-visa" },
          { title: "Cover letter", href: "/services/cover-letter" },
          { title: "Document bundle", href: "/services/document-preparation-bundle" }
        ]
      },
      {
        title: "After admission",
        items: [
          { title: "Blocked account", href: "/services/blocked-account" },
          { title: "Health insurance", href: "/services/health-insurance" },
          { title: "Education loan", href: "/services/education-loan" },
          { title: "Money transfer", href: "/services/outward-remittance" },
          { title: "DHL Express", href: "/services/dhl-express" }
        ]
      },
      {
        title: "Done with you",
        items: [
          { title: "Counselors run it end to end", desc: "From 29,999 INR, admission handled start to finish." }
        ],
        action: { label: "See all packages", href: "/#cta" }
      }
    ]
  },
  {
    label: "Our Brands",
    href: "/#language-school",
    customWidth: "w-[620px]",
    groups: [
      {
        title: "Eurolingo Academy",
        items: [
          { title: "German Language Batches", desc: "Live A1 to C1 training with native German instructors.", badge: "25% Off", href: "/#language-school" },
          { title: "Goethe & TestDaF Prep", desc: "Specialized exam crash courses & mock evaluations.", href: "/#language-school" }
        ],
        action: { label: "Explore classes", href: "/#language-school" }
      },
      {
        title: "Student Housing",
        items: [
          { title: "Verified Apartments & Shared Flats", desc: "Furnished student rooms in Berlin, Munich, Aachen & Hamburg.", href: "/#our-process" },
          { title: "Address Registration Assistance", desc: "City address registration & lease agreement support.", href: "/#our-process" }
        ],
        action: { label: "Find housing", href: "/#our-process" }
      },
      {
        title: "Health Insurance",
        items: [
          { title: "Statutory Health Cover", desc: "Official TK & Barmer public health insurance for student visas.", href: "/#our-process" },
          { title: "Travel & Incoming Cover", desc: "Initial coverage before official university semester start.", href: "/#our-process" }
        ],
        action: { label: "Get insurance", href: "/#our-process" }
      }
    ],
    footerLink: { label: "Explore exclusive partner benefits & discounts", href: "/#language-school" }
  },
  { label: "Pricing", href: "/#cta" }
];
