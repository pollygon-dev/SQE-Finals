// Student records store, persisted to localStorage so records survive
// page refreshes and logins.
const STORAGE_KEY = "student-records";

const VALID_GRADE = /^(9[0-9]|100|[6-8][0-9]|[0-5]?[0-9])$/;

function load() {
  try {
    const raw =
      typeof localStorage !== "undefined" && localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore corrupt/unavailable storage and start fresh
  }
  return { records: [], nextId: 1 };
}

let { records, nextId } = load();

function save() {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ records, nextId }));
    }
  } catch {
    // ignore storage write failures
  }
}

function reset() {
  records = [];
  nextId = 1;
  save();
}

function seed() {
  // Only seed sample data the first time; keep any records already saved.
  if (records.length > 0) return;
  addRecord({ name: "Juan Dela Cruz", subject: "Mathematics", grade: 92 });
  addRecord({ name: "Maria Santos", subject: "Science", grade: 88 });
  addRecord({ name: "Pedro Reyes", subject: "English", grade: 75 });
}

function listRecords() {
  return records.slice();
}

function addRecord({ name, subject, grade }) {
  if (!name || !String(name).trim()) {
    return { ok: false, error: "Student name is required." };
  }
  if (!subject || !String(subject).trim()) {
    return { ok: false, error: "Subject is required." };
  }
  const gradeNum = Number(grade);
  if (!VALID_GRADE.test(String(grade)) || gradeNum < 0 || gradeNum > 100) {
    return { ok: false, error: "Grade must be a whole number between 0 and 100." };
  }
  const record = {
    id: nextId++,
    name: String(name).trim(),
    subject: String(subject).trim(),
    grade: gradeNum,
    status: gradeNum >= 75 ? "PASSED" : "FAILED"
  };
  records.push(record);
  save();
  return { ok: true, record };
}

function deleteRecord(id) {
  const before = records.length;
  records = records.filter((r) => r.id !== Number(id));
  const changed = records.length < before;
  if (changed) save();
  return changed;
}

function report() {
  if (records.length === 0) {
    return { count: 0, average: 0, passed: 0, failed: 0, highest: null, lowest: null };
  }
  const grades = records.map((r) => r.grade);
  const sum = grades.reduce((a, b) => a + b, 0);
  const passed = records.filter((r) => r.status === "PASSED").length;
  return {
    count: records.length,
    average: Math.round((sum / records.length) * 100) / 100,
    passed,
    failed: records.length - passed,
    highest: records.reduce((a, b) => (a.grade >= b.grade ? a : b)),
    lowest: records.reduce((a, b) => (a.grade <= b.grade ? a : b))
  };
}

export { reset, seed, listRecords, addRecord, deleteRecord, report };
