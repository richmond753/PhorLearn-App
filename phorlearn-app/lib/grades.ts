// Maps a percentage score to the WAEC/WASSCE grade scale (A1–F9).

export interface Grade {
  code: string;
  label: string;
  /** Hex colour used for bars/labels. */
  color: string;
  /** True for credit passes (A1–C6). */
  credit: boolean;
}

const BANDS: { min: number; grade: Grade }[] = [
  { min: 75, grade: { code: "A1", label: "Excellent", color: "#16A34A", credit: true } },
  { min: 70, grade: { code: "B2", label: "Very Good", color: "#16A34A", credit: true } },
  { min: 65, grade: { code: "B3", label: "Good", color: "#1B4FD8", credit: true } },
  { min: 60, grade: { code: "C4", label: "Credit", color: "#1B4FD8", credit: true } },
  { min: 55, grade: { code: "C5", label: "Credit", color: "#D4A017", credit: true } },
  { min: 50, grade: { code: "C6", label: "Credit", color: "#D4A017", credit: true } },
  { min: 45, grade: { code: "D7", label: "Pass", color: "#DC2626", credit: false } },
  { min: 40, grade: { code: "E8", label: "Pass", color: "#DC2626", credit: false } },
  { min: 0, grade: { code: "F9", label: "Fail", color: "#DC2626", credit: false } },
];

export function gradeFor(percentage: number): Grade {
  return (BANDS.find((b) => percentage >= b.min) ?? BANDS[BANDS.length - 1])
    .grade;
}

/** Target for a solid WASSCE credit (grade C4 and above). */
export const TARGET_PERCENTAGE = 65;
