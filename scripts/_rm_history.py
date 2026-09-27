from pathlib import Path

p = Path(r"c:\Projects\IndoSpark\src\components\about\AboutPage.jsx")
s = p.read_text(encoding="utf-8")
a = s.find("function HistorySection() {")
b = s.find("function LeadershipSection() {")
if a < 0 or b < 0:
    raise SystemExit(f"markers missing {a} {b}")
s = s[:a] + s[b:]
p.write_text(s, encoding="utf-8")
print("removed local HistorySection", a, b)
