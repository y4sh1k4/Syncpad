# UI Libraries & Component Resources

These resources may be used when designing and implementing Syncpad interfaces.

They are sources of:

- components
- interaction patterns
- motion patterns
- implementation primitives
- visual inspiration

They are NOT the Syncpad design system.

Always adapt anything taken from these resources to:

- `design.md`
- Syncpad's typography
- spacing system
- color system
- radius system
- interaction principles
- product character

Do not assemble pages by randomly combining attractive components from
different libraries.

The page should feel like one coherent Syncpad interface.

---

## Beautiful UI

Reference:
https://beautifului.dev

Use for:

- polished product UI primitives
- interaction ideas
- loading states
- search experiences
- contextual actions
- task/status presentation
- side navigation patterns
- AI-native interaction patterns where relevant

Treat components primarily as interaction and composition references.

Do not automatically copy their visual styling.

Only use patterns that solve an actual Syncpad product need.

---

## beUI

Reference:
https://beui.dev

Use for:

- animated React components
- micro-interactions
- interactive controls
- animated tabs
- modals
- tooltips
- command palettes
- action bars
- transitions
- motion primitives

Use selectively.

Syncpad should feel responsive and crafted, not constantly animated.

Prefer subtle motion for ordinary productivity interactions.

Do not introduce expressive animation merely because a component is
available.

Adapt animation timing and visual treatment to `design.md`.

---

## Rare UI

Reference:
https://rareui.com

Use for:

- animated UI inspiration
- interaction patterns
- polished component ideas
- micro-interactions
- visually interesting primitives

Treat Rare UI primarily as an inspiration and implementation resource.

Do not allow highly expressive components to override Syncpad's calm,
document-focused character.

Simplify components when necessary.

---

## Transitions.dev

Reference:
https://transitions.dev

Use primarily for:

- UI transitions
- state changes
- spatial transitions
- enter/exit behavior
- layout transitions
- polished interaction feedback

Use transitions when they help users understand:

- where something came from
- where something went
- what changed
- what is selected
- what became active

Avoid animation that exists only for visual spectacle.

Simple interactions should remain fast.

---

## shadcn/ui

Reference:
https://ui.shadcn.com

Use as the preferred source for common application primitives when
appropriate.

Useful for:

- dialogs
- dropdown menus
- popovers
- tooltips
- sheets
- command menus
- inputs
- buttons
- tabs
- selects
- context menus
- forms

shadcn/ui provides implementation structure and accessible primitives.

It does NOT define Syncpad's visual identity.

When using a shadcn component:

1. confirm the interaction pattern fits the problem
2. use the component as an implementation primitive
3. adapt styling to `design.md`
4. remove unnecessary variants or visual complexity
5. ensure it visually belongs to Syncpad

Do not build the product as a collection of default shadcn components.

Avoid the recognizable generic:

"shadcn dashboard"

appearance.

---

## Drawably

Reference:
https://www.drawably.dev/

Use for:

- hand-drawn illustration elements
- imperfect visual accents
- doodles
- arrows
- annotations
- lightweight decorative graphics

Use sparingly.

Drawably should help Syncpad feel human and crafted, not childish or
illustration-heavy.

Appropriate uses include:

- subtle hero annotations
- directional arrows
- small supporting sketches
- visual emphasis around product screenshots
- lightweight empty/decorative areas

Avoid placing multiple drawings around every section.

The product UI should remain the visual anchor.

# Resource Priority

For foundational application primitives:

1. shadcn/ui

For polished interaction patterns:

2. Beautiful UI

For motion and animated controls:

3. beUI
4. Transitions.dev

For additional visual/motion exploration:

5. Rare UI

This priority is not absolute.

Choose based on the problem being solved.

---

# Selection Rule

Before using a component from any external library, ask:

1. Does this solve a real user or interaction problem?
2. Is this simpler than implementing an equivalent ourselves?
3. Does the interaction fit Syncpad?
4. Can it be adapted cleanly to the Syncpad design system?
5. Does it introduce unnecessary visual or motion complexity?

If the answer to the first question is no, do not use it.

---

# Visual Consistency

Never mix components from multiple libraries while preserving each
library's original visual language.

For example, avoid:

Beautiful UI component styling

- beUI animation styling
- default shadcn button styling
- Rare UI card styling

on the same surface.

Instead:

External library
→ extract behavior / primitive
→ apply Syncpad design tokens
→ simplify if necessary
→ make it feel native to Syncpad

The final interface should make it difficult to tell which external
library a component originally came from.

---

# Motion Constraint

Animated libraries are optional tools, not a requirement.

Prefer:

CSS transitions
→ simple hover/focus/state feedback

Motion / Framer Motion
→ meaningful layout or state transitions

Animated component libraries
→ specialized interactions where they substantially improve the
experience

Do not animate every available interaction.

Syncpad should feel alive, not busy.

---

# Final Rule

External UI libraries provide implementation vocabulary.

`design.md` provides the visual language.

The product-design skill provides the reasoning.

Syncpad's user needs determine which components should exist.
