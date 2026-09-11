# Syncpad Agent Instructions

## Product

Syncpad is a real-time collaborative workspace for writing, editing,
organizing, and collaborating on documents.

The product should feel focused, fast, calm, modern, and crafted.
The user's content should remain the center of the experience.

## UI / Design Tasks

For any task involving:

- creating a new UI
- redesigning an existing UI
- modifying a page or component
- responsive behavior
- interaction design
- visual polish

read:

1. `.agents/skills/product-design/SKILL.md`
2. `/design.md`
3. the relevant references inside
   `.agents/skills/product-design/references/`

Do this before writing implementation code.

---

## Redesign Tasks

When the task explicitly asks for a redesign, treat the existing
interface as a FUNCTIONAL reference, not a VISUAL reference.

Inspect the existing implementation to understand:

- functionality
- available data
- business logic
- API integrations
- permissions
- routing
- user flows
- interactions
- required states

Preserve those unless the task explicitly changes them.

Do NOT assume the existing implementation has the correct:

- information architecture
- layout
- visual hierarchy
- components
- typography
- spacing
- colors
- surfaces
- interaction presentation

These may be redesigned from scratch.

Existing UI components may be:

- reused
- modified
- replaced
- merged
- split
- removed

Do not compromise a redesign simply to reuse an existing component.

Existing backend logic, hooks, API integrations, and working product
behavior should be preserved whenever possible.

---

## Before Coding UI

Do not immediately generate JSX.

First determine:

1. Who is using this screen?
2. What are they trying to accomplish?
3. What is the primary task?
4. What should they notice first?
5. What information supports that task?
6. What is secondary?
7. What can be removed or progressively disclosed?

Then establish:

- information architecture
- visual hierarchy
- layout
- interaction model
- responsive behavior

Only then implement.

---

## Design System

`design.md` is the source of truth for the NEW Syncpad visual language.

Follow its constraints for:

- typography
- color
- spacing
- radius
- surfaces
- borders
- buttons
- controls
- icons
- motion
- density

Do not copy visual values from the old interface when they conflict
with `design.md`.

Do not introduce arbitrary visual values when an appropriate design
token or rule already exists.

If the redesign establishes a reusable new pattern, implement it in a
way that can become part of the new Syncpad design system.

---

## Implementation

Prefer clean, composable React components.

Separate product/business logic from presentation where practical.

New UI components are allowed during redesigns.

Do not create unnecessary abstractions for one-off visual elements.

Use accessible primitives for complex interactions.

Maintain:

- semantic HTML
- keyboard accessibility
- visible focus states
- responsive behavior
- loading states
- empty states
- error states

where relevant.

---

## Final Design Review

A UI task is not complete after the first implementation.

After implementation, inspect the result and ask:

- What catches the eye first?
- Is that the correct thing?
- Is the primary action obvious?
- Is anything unnecessarily competing for attention?
- Can any card, border, label, or control be removed?
- Is spacing communicating relationships clearly?
- Are repeated elements consistent?
- Does the page feel like one coherent system?
- Does the mobile hierarchy still make sense?
- Does anything look like generic AI-generated UI?

Fix meaningful issues before considering the task complete.
