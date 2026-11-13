export const ELIGIBILITY_STYLES: Record<string, string> = {
  ELIGIBLE: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  CONDITIONAL: 'bg-amber-100 text-amber-700 border-amber-200',
  NEEDS_REVIEW: 'bg-blue-100 text-blue-700 border-blue-200',
  NOT_ELIGIBLE: 'bg-red-100 text-red-700 border-red-200',
};

export const ELIGIBILITY_LABELS: Record<string, string> = {
  ELIGIBLE: 'Eligible',
  CONDITIONAL: 'Conditional',
  NEEDS_REVIEW: 'Needs Review',
  NOT_ELIGIBLE: 'Not Eligible',
};

export function EligibilityBadge({ status }: { status: string }) {
  return (
    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${ELIGIBILITY_STYLES[status] ?? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`}>
      {ELIGIBILITY_LABELS[status] ?? status}
    </span>
  );
}
