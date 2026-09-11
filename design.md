# Syncpad Design System

## Product Character

Syncpad is a collaborative workspace centered around documents.

The interface should feel:

- calm
- focused
- editorial
- precise
- lightweight
- collaborative
- crafted

The product should feel like a place to work, not a dashboard to manage.

Content is the product.

Application chrome should support the user's documents rather than
compete with them.

---

# Design Principles

## 1. Content First

Documents, writing, and collaboration are the primary objects.

Visual priority should generally follow:

Content
→ Primary actions
→ Navigation
→ Secondary controls
→ Metadata

Do not allow navigation, filters, cards, or decorative elements to
become more visually prominent than the user's work.

## 2. Quiet Interface

Prefer restraint over decoration.

Use:

- typography
- spacing
- alignment
- contrast
- subtle surfaces

before:

- cards
- borders
- shadows
- accent colors
- illustrations
- animation

## 3. Designed, Not Decorated

Every strong visual treatment should have a reason.

Do not justify a decision only because it looks:

- modern
- premium
- clean
- aesthetic

The visual treatment should improve hierarchy, comprehension,
interaction, or product character.

## 4. Progressive Disclosure

Keep common actions accessible.

Keep secondary actions available without making them permanently
prominent.

Prefer contextual menus, popovers, hover actions, or progressive
disclosure for infrequent actions.

Do not hide essential actions.

---

# Visual Direction

Syncpad should combine:

Notion's document-first calm

with

Linear's precision and interaction quality

with

Craft's editorial attention to documents.

These are references for principles only.

Do not reproduce their branding, layouts, or components.

Syncpad should develop its own identity.

---

# Color

## Foundation

Use a predominantly neutral palette.

The interface should not depend on large amounts of color for visual
interest.

Use subtle differences between:

- page
- primary surface
- secondary surface
- overlay

to establish depth.

## Background

Prefer a slightly warm or neutral near-white background rather than a
clinical pure-white canvas.

## Text

Maintain approximately three levels of text emphasis:

### Primary

High contrast.

Used for:

- document names
- important content
- primary labels

### Secondary

Medium contrast.

Used for:

- supporting information
- descriptions
- secondary labels

### Muted

Lower contrast.

Used for:

- timestamps
- metadata
- tertiary information

Important information must never rely on muted contrast.

## Accent

Use one primary product accent.

Use it intentionally for:

- primary actions
- selected states
- focus
- active navigation
- meaningful collaboration moments

Avoid introducing multiple competing accent colors.

Semantic colors for error, warning, success, etc. are separate from
the product accent.

---

# Typography

Typography should carry much of the visual hierarchy.

Use one primary sans-serif family.

Prefer a neutral, highly readable grotesk such as:

- Geist
- Inter
- another equivalent product sans

Do not introduce multiple font families without a clear design reason.

## Suggested Scale

Caption / tiny metadata:
12px

Metadata / compact UI:
13px

Standard UI:
14px

Body:
15–16px

Important secondary heading:
18px

Section heading:
20–24px

Page heading:
28–36px

Large editorial display:
use sparingly and only when the surface benefits from it.

Do not create a new font size for every component.

## Weight

Prefer approximately:

400 — body

500 — controls and emphasized information

600 — headings and important labels

Avoid excessive bold typography.

## Numeric Information

When numbers need comparison, use tabular numerals where appropriate.

---

# Spacing

Use a 4px base spacing system.

Preferred values:

4px
8px
12px
16px
20px
24px
32px
40px
48px
64px

Prefer these values over arbitrary spacing.

Spacing should communicate relationships.

Elements belonging together should be closer than unrelated elements.

Do not use containers merely to compensate for unclear spacing.

---

# Radius

Use restrained rounding.

Suggested system:

Small:
6px

Controls:
8px

Panels / cards:
10–12px

Full:
9999px only for elements that are genuinely pills/circles.

Avoid large 16–32px radii on ordinary rectangular UI.

Do not make every object pill-shaped.

---

# Borders

Prefer subtle 1px borders.

Elements using border must have small invisible shadows.

They should not become a major decorative element.

Prefer spacing when a boundary is already understandable.

Avoid surrounding every section with a border.

---

# Surfaces

Use as few surface levels as possible.

Typical hierarchy:

Page
→ Content surface
→ Elevated/floating surface
→ Overlay

Do not create a different background for every section.

Do not automatically place every piece of content inside a card.

---

# Elevation

Use shadows only when something is actually elevated.

Appropriate:

- dropdowns
- popovers
- dialogs
- floating toolbars
- drag states

Usually inappropriate:

- ordinary document cards
- every section
- every button
- static containers

Prefer subtle borders and surface contrast for ordinary separation.

---

# Buttons

There should normally be one visually dominant action in a local
context.

## Primary

Filled product accent.

Use for the main action.

## Secondary

Neutral, subtle filled, or outlined.

## Tertiary

Ghost or text.

## Destructive

Visually distinct only where necessary.

Do not make several actions look equally primary.

Buttons should use consistent:

- height
- padding
- typography
- radius
- icon sizing

---

# Inputs

Inputs should feel integrated into the product rather than like large
form widgets.

Use:

- restrained borders
- consistent height
- clear focus treatment
- readable labels
- predictable error states

Avoid excessive padding.

---

# Icons

Use one consistent icon family.

Prefer simple stroke icons.

Icons should communicate:

- actions
- objects
- states
- navigation

Do not place icons beside headings merely to decorate the interface.

Keep icon sizing consistent.

---

# Cards

Cards are not the default layout primitive.

Use a card when content represents a meaningful independent object or
group.

Before creating a card, ask whether the relationship could be
communicated through:

1. spacing
2. alignment
3. typography
4. divider

Avoid:

card
inside card
inside card

---

# Document UI

Documents are first-class objects.

Document representations should prioritize:

1. Document identity
2. Document title
3. Useful preview/context
4. Recency
5. Collaboration information
6. Secondary actions

Do not overload document items with metadata.

Actions such as:

- rename
- duplicate
- move
- delete

should normally remain contextual rather than permanently competing
with opening the document.

---

# Templates

Templates represent:

"I want to start something."

Existing documents represent:

"I want to continue something."

These are different user intentions.

Their visual treatment may therefore differ.

Templates can be more visual and preview-oriented.

Existing documents should optimize for:

- recognition
- scanning
- recency
- resuming work

Do not force both into identical card designs.

---

# Collaboration

Collaboration should feel naturally embedded in the interface.

Possible signals include:

- avatars
- active presence
- comments
- shared status
- recent collaborators

Keep these signals useful but quiet.

Do not turn every collaboration state into a badge.

---

# Motion

Motion should communicate:

- feedback
- state changes
- hierarchy
- spatial relationships

Suggested ordinary transition duration:

150–220ms

Use animation sparingly.

Avoid:

- bouncing ordinary controls
- animating everything on page load
- excessive scroll animation
- decorative motion that delays interaction

Respect reduced-motion preferences.

---

# Density

Syncpad should balance calmness with productivity.

It should not feel like:

a sparse marketing page

or

a dense enterprise file manager.

Users should be able to scan several documents without excessive
scrolling.

Use comfortable density for document browsing and slightly higher
density for utility controls.

---

# Responsive Design

Do not treat responsive design as:

desktop → stack everything vertically.

At smaller sizes determine:

- what must remain
- what can move
- what can collapse
- what can disappear
- what can become contextual

Preserve the primary user task.

Touch controls should remain comfortable.

---

# Accessibility

Use semantic HTML.

All interactive controls must support keyboard use.

Maintain visible focus states.

Icon-only controls require accessible labels.

Do not communicate state using color alone.

Use accessible interaction primitives for complex components.

---

# Avoid Generic AI UI

Avoid unless explicitly justified:

- gradient text
- purple/blue glow
- excessive gradients
- glassmorphism
- giant rounded cards
- pill-shaped everything
- icons beside every heading
- badges everywhere
- excessive shadows
- decorative blobs
- arbitrary accent colors
- dashboard metric cards without purpose
- card-inside-card layouts
- oversized empty states
- unnecessary decorative illustrations

Do not add visual elements merely to make empty space feel occupied.

---

# Redesign Rule

During the current redesign, this file defines the NEW visual direction.

The existing Syncpad interface is not the visual source of truth.

Existing UI should only be inspected to understand:

- functionality
- data
- flows
- interactions
- permissions
- business logic

Existing components may be replaced when they conflict with the new
design system.

Do not change working product behavior solely for visual reasons.

---

# Design System Evolution

This document is intentionally not completely frozen.

During the redesign, when a visual decision repeatedly proves successful,
promote it into this design system.

Examples:

- final accent color
- final background color
- exact control heights
- document card pattern
- template pattern
- navigation treatment
- exact type scale
- exact border colors
- hover treatment

Do not add one-off decisions to the design system.

A pattern should earn its place through reuse.

---

# Final Principle

The goal is not to make Syncpad visually impressive at first glance.

The goal is to make it feel exceptionally natural to use.

Prefer the simplest intentional solution that makes the user's work
easier to understand, find, create, or continue.

For landing-page or marketing-page work, also read:

`.agents/skills/product-design/references/landing-page.md`
`.agents/skills/product-design/references/visual-references.md`
`.agents/skills/product-design/references/ui-libraries.md`
