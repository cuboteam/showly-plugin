# Mobile interaction

Adapted from Emil Kowalski's mobile guidance; see [source record](upstream.md).
Apply fixes to the surface that needs them, preserving browser navigation and
accessibility. A responsive screenshot is not a real-device interaction test.

- Gate decorative hover effects with input-capability queries such as
  `(hover: hover) and (pointer: fine)`, not viewport width or user-agent sniffing.
  Keep touch press feedback and keyboard focus distinct; hybrid devices need both.
- Size controls for touch (at least 44px here). Let translated labels wrap or grow
  instead of clipping them; never hide the primary action to fit a narrow screen.
- Use `dvh` for overlays that track the visible viewport; consider `svh` for a
  stable full-screen hero, or let content determine its height. Avoid forcing a
  marketing page into a fixed-height app shell.
- Pair edge-to-edge viewport configuration with safe-area padding on fixed bars
  and sheets. Keep long overlay content scrollable and the close/action controls
  reachable. Test the action with the software keyboard open on a real device;
  `dvh` alone does not guarantee keyboard avoidance in every browser.
- Keep mobile form text at least 16px. Preserve pinch zoom; do not add
  `user-scalable=no` or `maximum-scale=1`. Use appropriate input types, inputmode,
  autocomplete and enterkeyhint without blocking password managers or paste.
- Keep normal document scrolling and text selection. Use `overscroll-behavior: contain`
  on a modal's scrolling content when scroll chaining is a problem;
  do not globally disable pull-to-refresh or selection just to feel native.
- Prefer native overflow scrolling and scroll snap for a simple carousel. Only
  restrict `touch-action` on a custom gesture surface when it actually implements
  the claimed axis. Preserve page panning and pinch zoom elsewhere. Handle pointer
  cancellation and capture for a custom drag; do not let a second pointer jump it.

At 390×844 and about 320px, check heading wraps, image focal points, controls,
long sheet content and input focus. Exercise portrait and a short viewport when
an overlay is involved. Verify reduced motion and keyboard use too. Browser
emulation can check layout and many events, but keyboard occlusion, Safari input
zoom, browser chrome, safe areas and touch feel still need representative hardware.
Describe those limits instead of claiming that emulation proves phone support.
