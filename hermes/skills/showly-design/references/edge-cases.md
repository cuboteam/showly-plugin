# Content and state edge cases

Adapted from Emil Kowalski's UI stress-testing guidance; see
[source record](upstream.md). Focus on data and states the changed surface can
actually receive. Do not turn a small visual edit into a whole-app audit.

Use realistic long names, translated action labels, mixed scripts, unbroken
identifiers, missing optional fields, empty and single-item lists, and plausible
large counts. Use schema limits where available. Feed these values through the
same props or fixture boundary as normal content; do not alter markup just to
manufacture a broken "before" screenshot. Keep stress fixtures and switches in
review artifacts or development routes, not in the user-facing product.

Decide per field what must remain readable. Wrap identifying titles and names;
allow email/URL wrapping where needed. Use `min-width: 0` on flexible text columns
and `minmax(0, 1fr)` in grids; preserve the size of trailing actions. Do not clip
amounts or hide essential distinctions in identical ellipses. If secondary text
is truncated, provide a keyboard- and touch-accessible way to read the full value.
A title tooltip alone is not sufficient on a phone.

Check empty, loading, error and success states for the requested flow, including
retry and repeated activation where applicable. Use locale-aware counts and
numbers. Missing imagery should have a useful fallback without layout collapse.
Keep text selectable and avoid hiding overflow merely to conceal a layout defect.

Compare the same content at narrow and wide widths and with enlarged text. Fix
within the authorized scope, then recheck normal data as well as the failing case.
A review-only request returns observed findings and recommendations. Distinguish
source-based inference from rendered or interaction evidence; don't invent scores,
failures or findings to fill a quota.
