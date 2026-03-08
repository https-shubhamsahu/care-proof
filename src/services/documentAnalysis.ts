/**
 * documentAnalysis.ts
 *
 * Heuristic-based document analyser that inspects file name / type
 * and maps it to a caregiving activity with skills & estimated hours.
 *
 * This is the integration point for a real AI / OCR service.
 * To upgrade: replace `analyseDocument` with an API call that parses
 * the actual file content (Gemini Vision, OpenAI, AWS Textract, etc.).
 */

export interface ExtractedEntry {
    activity: string;
    date: string;
    hours: string;
    hoursValue: number;
    skills: string[];
    careType: string;
}

// ── Document-type signatures ────────────────────────────────────────────────

const PATTERN_MAP: Array<{
    patterns: RegExp[];
    activity: string;
    hours: number;
    skills: string[];
    careType: string;
}> = [
        {
            patterns: [/hospital|discharge|admit|prescription|rx|med/i],
            activity: "Medical & Hospital Care Coordination",
            hours: 6,
            skills: ["Healthcare coordination", "Medical navigation", "Stakeholder communication"],
            careType: "medical",
        },
        {
            patterns: [/bill|invoice|receipt|payment|expense/i],
            activity: "Household Financial Management",
            hours: 2,
            skills: ["Budget planning", "Financial management", "Record keeping"],
            careType: "household",
        },
        {
            patterns: [/school|attendance|report card|exam|tuition|teacher/i],
            activity: "Child Education Support",
            hours: 3,
            skills: ["Project management", "Scheduling", "Stakeholder communication"],
            careType: "child_care",
        },
        {
            patterns: [/therapy|counsell|mental health|psycholog|wellness/i],
            activity: "Emotional & Therapy Support",
            hours: 3,
            skills: ["Emotional support", "Crisis counseling", "Active listening"],
            careType: "emotional",
        },
        {
            patterns: [/elder|senior|grandpar|aging|nursing/i],
            activity: "Elder Care Support",
            hours: 4,
            skills: ["Elder care", "Healthcare coordination", "Companionship support"],
            careType: "elder_care",
        },
        {
            patterns: [/grocery|super ?market|pharmacy|drug ?store/i],
            activity: "Household Provisioning & Management",
            hours: 2,
            skills: ["Household management", "Budgeting", "Logistics planning"],
            careType: "household",
        },
        {
            patterns: [/appointment|schedule|calendar|booking/i],
            activity: "Multi-Appointment Scheduling & Coordination",
            hours: 3,
            skills: ["Scheduling", "Multi-stakeholder coordination", "Time management"],
            careType: "general",
        },
        {
            patterns: [/insurance|claim|cover|policy/i],
            activity: "Insurance & Claims Management",
            hours: 2,
            skills: ["Financial administration", "Healthcare navigation", "Documentation"],
            careType: "medical",
        },
    ];

const FALLBACK: Omit<(typeof PATTERN_MAP)[0], "patterns"> = {
    activity: "Caregiving Support Activity",
    hours: 2,
    skills: ["Family care management", "Coordination", "Emotional support"],
    careType: "general",
};

// ── Helpers ─────────────────────────────────────────────────────────────────

function formatDisplayDate(d: Date): string {
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function formatISODate(d: Date): string {
    return d.toISOString().split("T")[0];
}

// ── Main export ──────────────────────────────────────────────────────────────

/**
 * Analyse a file and return a structured care entry.
 * Currently works on file name / extension heuristics.
 * Swap the internals for a real AI call without changing the interface.
 */
export async function analyseDocument(file: File): Promise<ExtractedEntry> {
    // Simulate async processing (would be an API call with real AI)
    await new Promise((r) => setTimeout(r, 2500));

    const name = file.name.toLowerCase();

    // Find the best matching pattern
    let matched = PATTERN_MAP.find((p) => p.patterns.some((rx) => rx.test(name)));
    if (!matched) matched = { ...FALLBACK, patterns: [] };

    // Estimate date: infer from file metadata or use today
    const fileDate = file.lastModified ? new Date(file.lastModified) : new Date();

    return {
        activity: matched.activity,
        date: formatDisplayDate(fileDate),
        hours: `${matched.hours} hour${matched.hours !== 1 ? "s" : ""}`,
        hoursValue: matched.hours,
        skills: matched.skills,
        careType: matched.careType,
        // isoDate used when saving to the database
        ..._withISO(formatISODate(fileDate)),
    } as ExtractedEntry & { isoDate: string };
}

function _withISO(isoDate: string) {
    return { isoDate };
}

// Re-export so callers can use the full type
export type ExtractedEntryWithDate = ExtractedEntry & { isoDate: string };
