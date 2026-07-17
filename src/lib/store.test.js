import { reset, addRecord, listRecords, deleteRecord, report } from "./store.js";

beforeEach(() => {
  reset();
});

test("adds a valid record and marks it PASSED", () => {
  const result = addRecord({ name: "Ana", subject: "Math", grade: 90 });
  expect(result.ok).toBe(true);
  expect(result.record.status).toBe("PASSED");
  expect(listRecords()).toHaveLength(1);
});

test("marks grades below 75 as FAILED", () => {
  const result = addRecord({ name: "Ben", subject: "Science", grade: 70 });
  expect(result.record.status).toBe("FAILED");
});

test("rejects a missing name", () => {
  const result = addRecord({ name: "", subject: "Math", grade: 90 });
  expect(result.ok).toBe(false);
  expect(result.error).toMatch(/name is required/i);
});

test("rejects an out-of-range grade", () => {
  const result = addRecord({ name: "Cel", subject: "Math", grade: 150 });
  expect(result.ok).toBe(false);
});

test("deletes a record by id", () => {
  const { record } = addRecord({ name: "Dan", subject: "PE", grade: 80 });
  expect(deleteRecord(record.id)).toBe(true);
  expect(listRecords()).toHaveLength(0);
});

test("report summarizes passed, failed and average", () => {
  addRecord({ name: "A", subject: "X", grade: 100 });
  addRecord({ name: "B", subject: "Y", grade: 50 });
  const r = report();
  expect(r.count).toBe(2);
  expect(r.passed).toBe(1);
  expect(r.failed).toBe(1);
  expect(r.average).toBe(75);
});
