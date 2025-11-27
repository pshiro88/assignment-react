export default function AnalysisPane({ onRefClick }) {
  const Ref = ({ n }) => (
    <button
      onClick={() => onRefClick(n)}
      className="text-blue-600 hover:underline font-semibold ml-1"
    >
      [{n}]
    </button>
  );

  return (
    <div className="space-y-4 text-white text-sm bg-black border-2 p-2 leading-relaxed">
      <p>
        <strong>Findings</strong><br />
        Page 3 — Highlights Q2 2025<br />
        EBITDA increase (USD 2.3 bn vs USD 2.1 bn prior year) attributed to operational improvements; no
        mention of extraordinary or one-off items. <Ref n="1" />
      </p>

      <p>
        Page 5 — Review Q2 2025<br />
        EBITDA rise driven by higher revenue and cost control across all segments; no extraordinary gains
        or losses included. <Ref n="2" />
      </p>

      <p>
        Page 15 — Condensed Income Statement<br />
        Gain on sale of non-current assets USD 25 m (vs USD 208 m prior year) reported separately below
        EBITDA; therefore, not part of EBITDA. <Ref n="3" />
      </p>

      <p>
        <strong>Supporting Evidence</strong>
      </p>

      <p>
        [1] A.P. Moller – Maersk Q2 2025 Interim Report (7 Aug 2025) — Page 3<br />
        “Maersk’s results continued to improve year-on-year … EBITDA of USD 2.3 bn (USD 2.1 bn) …
        driven by volume and other revenue growth in Ocean, margin improvements in Logistics &amp;
        Services and significant top line growth in Terminals.”
      </p>

      <p>
        [2] A.P. Moller – Maersk Q2 2025 Interim Report (7 Aug 2025) — Page 5<br />
        “EBITDA increased to USD 2.3 bn (USD 2.1 bn) … driven by higher revenue and cost management …
        Ocean’s EBITDA … slightly increased by USD 36 m … Logistics &amp; Services contributed
        significantly with a USD 71 m increase … Terminals’ EBITDA increased by USD 50 m.”
      </p>

      <p>
        [3] A.P. Moller – Maersk Q2 2025 Interim Report (7 Aug 2025) — Page 15<br />
        “Gain on sale of non-current assets, etc., net 25 (208) … Profit before depreciation, amortisation
        and impairment losses, etc. (EBITDA) 2,298”
      </p>
    </div>
  );
}
