# Interaction and motion

Adapted from Emil Kowalski's design engineering and animation guidance; see
[source record](upstream.md). Preserve the site's established character and stack.

## Decide what earns motion

Use motion to connect a trigger to its result, explain a state change or acknowledge
input. Frequent navigation and keyboard workflows should remain immediate; do not
make users wait for decoration. A brand story may support expressive motion where
a dense tool needs restraint. Content and primary actions must work without it.

Give press feedback at contact with CSS `:active`, but execute the action on the
normal click/activation event so pointer cancellation, keyboard use and scrolling
still work. A subtle color or scale change can help; do not force scaling onto
text-heavy controls or an existing component with adequate feedback. If removing
native tap highlighting, provide an equally visible replacement and retain focus.

As starting points, try roughly 100–160ms for press feedback, 125–250ms for a small
popover and 200–300ms for a larger overlay. Adjust to travel, content and brand;
these are not mandatory numbers. Entering UI should respond promptly; moving
between two established positions may ease at both ends. Avoid excessive bounce
in routine controls. Use the existing motion tokens where present.

## Make interruption correct

Anchor a popover's transform origin to its trigger; a centered modal can remain
centered and a bottom sheet should emerge from the bottom. Avoid scaling a whole
text panel from zero. Prefer a small displacement or scale with opacity.

Use explicit transition properties rather than `transition: all`. Retarget from
the current rendered position when an interaction reverses. Use CSS transitions
for simple state changes; use the existing animation library or WAAPI when the
interaction needs more control. Cancel obsolete completion callbacks so a stale
close cannot hide a newly reopened panel. No new dependency is needed for a
simple fade or press response.

For modal surfaces, reuse accessible dialog primitives: name the dialog, move
focus inside, keep background content inert, support Escape, and return focus to
the invoking control. Keep the close action usable during entry and exit. A drag
handle or swipe gesture supplements a visible button; it never replaces it.
Announce meaningful async results without moving focus or announcing every frame.

## Performance and verification

Prefer transform and opacity when they express the intended effect. Do not infer
GPU acceleration or a frame-rate guarantee from a CSS property, animation API or
library name. Browser versions, paint cost and layer size matter. Profile a
reported performance problem before claiming it is fixed. Avoid per-frame React
state updates and large inherited CSS-variable changes when direct element updates
will do; add `will-change` only for a measured need and remove it afterward.

Honor reduced motion by removing nonessential travel, scale and stagger while
keeping the state change clear. Functional completion must not depend solely on
an animation event that may not run in this mode.

Exercise rapid open/close/reopen, switching mid-transition, keyboard activation,
Escape and focus return. Record the changed interaction at normal speed when
showing a motion comparison. Inspect a slowed replay only to diagnose timing;
label it if shared. State which checks were run and which remain unverified.
