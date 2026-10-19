# Analytics Warehouse Evidence

Use this playbook for product analytics, experiment outcomes, migrations, and unexplained thresholds. Discover actual available MCP read tools and inspect their schemas first; warehouse names do not imply query access. Do not invent tables, columns, or tools. Report missing catalog/schema access, denied queries, retention limits, and unavailable historical snapshots explicitly.

## Safe search loop

1. Use available read-only catalog/schema metadata to identify relevant datasets, columns, units, timestamp semantics, and experiment definitions. If metadata is inaccessible, stop and request a schema or approved aggregate; do not guess identifiers.
2. Use only bounded, read-only `SELECT` queries on authorized datasets. No DDL/DML, procedures, exports, temporary tables, file writes, or stateful/side-effecting functions. Do not change permissions or warehouse settings.
3. Set a narrow time/partition range around the code change, select only required aggregate columns, and apply available query timeout, scan/byte, and result limits. `LIMIT` alone does not bound scanned data. If cost cannot be bounded safely, stop and report the limitation.
4. Prefer counts, rates, percentiles, and first/last-seen summaries. Avoid `SELECT *`, secrets, raw payloads, user identifiers, and PII; suppress small identifying cohorts. Redact sensitive results before returning them.
5. Compare pre/post windows and controls where appropriate. Check sampling, delayed ingestion, changed event definitions, confounders, and timezone alignment. Correlation is not evidence of author intent; recorded experiment decisions or rationale provide that link.

Example query shape (substitute only verified identifiers; adapt dialect and bind parameters):

```sql
SELECT event_day, COUNT(*) AS event_count
FROM verified_schema.verified_events
WHERE event_day >= :window_start AND event_day < :window_end
GROUP BY event_day
ORDER BY event_day
LIMIT 31;
```

Return fully qualified dataset identifiers, exact safe query and bounds, timezone, aggregate results, source/version dates, and access gaps. State what the data supports versus what remains inference. Pass linked decision documents to their category owner.

---
Original local playbook for the [pstack/why](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/skills/why/SKILL.md) adaptation pinned to `d457567332aa6989e753ea289f30ea2bfbc80bc0`; not an upstream analytics file. See [upstream MIT license](https://github.com/cursor/plugins/blob/d457567332aa6989e753ea289f30ea2bfbc80bc0/pstack/LICENSE).
