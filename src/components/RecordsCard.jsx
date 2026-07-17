import { useState } from "react";
import config from "../config.js";
import * as store from "../lib/store.js";

export default function RecordsCard({ onLogout }) {
  const [records, setRecords] = useState(store.listRecords());
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [addError, setAddError] = useState("");
  const [report, setReport] = useState(null);

  function refresh() {
    setRecords(store.listRecords());
    setReport(null);
  }

  function handleAdd(e) {
    e.preventDefault();
    const res = store.addRecord({ name, subject, grade });
    setAddError(res.ok ? "" : res.error);
    if (res.ok) {
      setName("");
      setSubject("");
      setGrade("");
      refresh();
    }
  }

  function handleDelete(id) {
    store.deleteRecord(id);
    refresh();
  }

  return (
    <section className="nb-card">
      <div className="card-header">
        <h1>Student Records</h1>
        <button className="nb-button orange" onClick={onLogout}>Log out</button>
      </div>

      <h2>Add record</h2>
      <form onSubmit={handleAdd}>
        <input className="nb-input" placeholder="Student name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="nb-input" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <input
          className="nb-input"
          placeholder="Grade (0-100)"
          style={{ width: 130 }}
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <button className="nb-button green" type="submit">Add</button>
      </form>
      <p className="error">{addError}</p>

      <table className="nb-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Subject</th><th>Grade</th><th>Status</th><th></th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.name}</td>
              <td>{r.subject}</td>
              <td>{r.grade}</td>
              <td className={r.status}>{r.status}</td>
              <td>
                {config.features.deleteRecords && (
                  <button className="nb-button orange sm" onClick={() => handleDelete(r.id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {config.features.reports && (
        <>
          <h2>Class report</h2>
          <button className="nb-button blue" type="button" onClick={() => setReport(store.report())}>Generate report</button>
          {report && (
            <div className="stats">
              <div className="stat"><b>{report.count}</b>Records</div>
              <div className="stat"><b>{report.average}</b>Average</div>
              <div className="stat"><b>{report.passed}</b>Passed</div>
              <div className="stat"><b>{report.failed}</b>Failed</div>
              {report.highest && (
                <div className="stat"><b>{report.highest.grade}</b>Top: {report.highest.name}</div>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
