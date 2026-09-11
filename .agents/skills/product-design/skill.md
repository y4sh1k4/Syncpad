---
name: product-design
description: Design, redesign, implement, and critique polished production interfaces. Use for user-facing pages, components, flows, responsive layouts, interactions, visual redesigns, and UI quality improvements.
---

---

# Product Design Skill

Act as a design engineer, not a component generator.

Your job is not to make interfaces merely look attractive.

Your job is to create interfaces that are:

- clear
- intentional
- usable
- visually coherent
- responsive
- accessible
- appropriate for the product
- efficient for the user's task

Design decisions should follow from user needs, information hierarchy,
interaction requirements, and the project's design language.

Do not begin with decoration.

---

# 1. Read Context First

Before designing or changing UI, understand the environment.

Read:

1. repository-level agent instructions
2. project `design.md`
3. relevant product/design references
4. the existing implementation when one exists

The project `design.md` is the visual source of truth.

This skill provides design methodology, not project-specific styling.

Do not replace project-specific design rules with generic preferences
from this skill.

---

# 2. Determine the Task Type

First identify whether the task is:

- new interface
- feature addition
- redesign
- visual polish
- interaction improvement
- responsive adaptation
- accessibility improvement
- design critique

The approach differs depending on the task.

## Existing Feature Work

When extending an established interface, preserve the project's
existing design language unless instructed otherwise.

## Redesign

When explicitly redesigning an interface, treat the old interface as
a functional reference rather than a visual specification.

Understand what it does.

Do not automatically preserve how it looks.

Existing:

- layout
- hierarchy
- component structure
- spacing
- styling
- surfaces
- visual patterns

may be reconsidered.

Preserve required:

- functionality
- business logic
- data
- permissions
- routes
- integrations
- important user flows

unless the task explicitly changes them.

---

# 3. Do Not Start With Code

Before writing JSX, CSS, or components, establish the design problem.

Determine:

## User

Who is using this interface?

## Job

What are they trying to accomplish?

## Primary Task

What is the most important thing they need to do?

## Secondary Tasks

What else needs to remain accessible?

## Information

What information is required to complete the task?

## Decision

What decisions does the user need to make?

## Frequency

Which actions are frequent?

Which are occasional?

Which are rare?

## Context

What did the user likely do before arriving here?

What will they likely do next?

If these answers can be reasonably inferred from the product and
existing implementation, infer them.

Do not interrupt implementation with unnecessary questions.

---

# 4. Establish Information Architecture

Before visual styling, decide what belongs on the screen.

Ask:

- What should appear first?
- What belongs together?
- What should be separated?
- What should remain visible?
- What can be contextual?
- What can be progressively disclosed?
- What can be removed?
- What deserves more space?
- What deserves less space?

Do not assume the current information architecture is correct during
a redesign.

Every visible element should justify its presence.

---

# 5. Establish Visual Hierarchy

The interface should communicate importance before the user reads
everything.

A useful hierarchy is:

Primary
→ user's main task, content, or decision

Secondary
→ information supporting the primary task

Tertiary
→ secondary controls and metadata

Background
→ information that should remain available without demanding attention

Use:

- position
- size
- typography
- weight
- contrast
- spacing
- grouping

to create hierarchy.

Do not solve hierarchy primarily through color.

If everything is visually prominent, nothing is prominent.

---

# 6. Design the Page Before the Components

Do not begin by independently designing:

- cards
- buttons
- badges
- inputs
- widgets

First establish the composition of the entire surface.

Determine:

- content order
- major regions
- alignment
- widths
- whitespace
- density
- scan path
- primary action placement
- relationship between sections

A collection of individually attractive components does not
automatically create a good interface.

The page should feel intentionally composed as a whole.

---

# 7. Use Layout Before Decoration

Prefer solving visual relationships through:

1. proximity
2. alignment
3. spacing
4. typography
5. contrast

before adding:

6. dividers
7. borders
8. containers
9. cards
10. shadows
11. color

Do not introduce a visual container when spacing alone communicates
the relationship clearly.

---

# 8. Spacing

Spacing communicates relationships.

Related elements should generally be closer together than unrelated
elements.

Maintain consistent rhythm.

Prefer the spacing scale defined by the project's design system.

Avoid arbitrary values when an existing token communicates the same
relationship.

Look for:

- inconsistent section gaps
- unrelated elements placed too closely
- related elements separated too much
- excessive internal padding
- large empty areas without purpose

Whitespace should clarify the interface, not merely make it look
minimal.

---

# 9. Alignment

Strong alignment makes interfaces feel intentional.

Repeated objects should share stable:

- edges
- baselines
- widths
- columns
- spacing

Avoid subtle misalignments between related elements.

When presenting comparable information, align it so comparison is
easy.

---

# 10. Typography

Typography is one of the primary tools for hierarchy.

Use differences in:

- size
- weight
- contrast
- line height
- spacing

deliberately.

Avoid excessive typography variants.

Repeated semantic roles should look consistent.

Examples:

- page title
- section title
- item title
- body
- label
- metadata
- caption

Metadata should normally remain quieter than primary content.

Avoid using bold text everywhere to create hierarchy.

For numerical comparison, use tabular numerals where appropriate.

---

# 11. Color

Color should have a job.

Appropriate uses include:

- primary action
- selection
- focus
- semantic state
- meaningful categorization
- data visualization
- collaboration presence

Do not introduce color merely to make an interface visually
interesting.

Avoid multiple competing accent colors unless the design system
requires them.

Never rely on color alone to communicate important state.

---

# 12. Surfaces and Containers

Do not default to cards.

A card is useful when content represents:

- a distinct object
- a meaningful group
- an interactive unit
- a separate context

Before creating a card, ask:

"Would spacing, alignment, typography, or a divider communicate this
relationship just as well?"

Avoid unnecessary:

- cards
- nested cards
- bordered sections
- tinted containers
- floating panels

Too many surfaces flatten hierarchy instead of strengthening it.

---

# 13. Actions

Every local context should have a clear action hierarchy.

Common hierarchy:

Primary
→ most important action

Secondary
→ useful alternative

Tertiary
→ lower-priority action

Contextual
→ infrequent actions

Destructive
→ dangerous or irreversible action

Do not make several actions visually primary.

Rare actions should not permanently compete with frequent actions.

Use progressive disclosure where appropriate.

Icon-only actions must remain understandable and accessible.

---

# 14. Components

Components should represent reusable product patterns.

Do not create abstractions solely because two elements currently look
similar.

Create or extract a component when there is meaningful reuse in:

- behavior
- structure
- semantics
- interaction
- visual treatment

During redesigns, existing components are not sacred.

They may be:

- reused
- modified
- replaced
- merged
- split
- removed

when doing so creates a stronger system.

Do not force a new design into an abstraction built for the old one.

At the same time, do not create unnecessary new primitives when an
existing primitive naturally fits the new system.

---

# 15. Interaction Design

Interfaces should clearly communicate what can be interacted with.

Interactive elements should provide appropriate feedback.

Consider relevant states:

- default
- hover
- focus
- pressed
- active
- selected
- disabled
- loading
- success
- error

Do not design only the default screenshot.

The actual product exists across states.

---

# 16. Loading States

Loading should preserve context whenever possible.

Avoid replacing an entire interface with a spinner when only one
region is updating.

Prevent unnecessary layout shifts.

Use:

- skeletons
- local loading indicators
- optimistic updates
- progress feedback

where appropriate.

Do not fabricate fake progress.

---

# 17. Empty States

An empty state should answer:

1. What is this area?
2. Why is it empty?
3. What can I do next?

Provide an appropriate action when one exists.

Do not automatically use:

- giant illustrations
- excessive copy
- oversized cards
- decorative graphics

Empty states should remain proportional to their importance.

---

# 18. Error States

Errors should explain:

- what happened
- what the user can do
- whether their work is safe

Place errors close to the action or information they affect.

Avoid generic "Something went wrong" messages when a useful recovery
action can be provided.

---

# 19. Forms

Forms should reduce effort.

Prefer:

- clear labels
- sensible defaults
- logical grouping
- inline validation
- preserved user input after errors
- helpful error messages

Do not use placeholders as the only label.

Avoid requesting information before it is necessary.

---

# 20. Search, Filters, and Controls

Controls exist to help users reach content.

They should not become more visually important than the content they
control.

Only introduce filters that solve a real retrieval problem.

Do not add:

- sorting
- filtering
- view toggles
- category selectors

simply because similar products commonly have them.

Search prominence should reflect how necessary search is for the
expected amount of content.

---

# 21. Data-Dense Interfaces

When an interface contains repeated or comparable information,
optimize for scanning.

Prefer:

- stable alignment
- consistent columns
- predictable placement
- restrained metadata
- tabular numerals
- compact controls

Avoid turning every data point into a large card.

Density is not inherently bad.

The correct density depends on how quickly users need to scan and
compare information.

---

# 22. Responsive Design

Responsive design is not:

desktop
→ shrink
→ stack everything vertically.

At each breakpoint determine:

- what remains essential
- what can shrink
- what can wrap
- what can collapse
- what can move
- what can become contextual
- what can be hidden

Preserve the user's primary task.

Do not allow secondary information to push primary information below
the fold unnecessarily.

Test content with realistic lengths.

Consider:

- long titles
- empty content
- many items
- few items
- localization
- touch interaction

---

# 23. Mobile

Mobile interfaces should be intentionally composed.

Prioritize:

- primary content
- primary actions
- readable typography
- touch targets
- simple navigation

Reduce persistent secondary controls where appropriate.

Avoid blindly reproducing desktop toolbars on smaller screens.

---

# 24. Accessibility

Accessibility is part of design quality.

Use semantic HTML.

Ensure:

- keyboard navigation
- visible focus
- accessible labels
- sufficient contrast
- logical heading structure
- appropriate form labels
- accessible dialogs and menus
- understandable error messages
- reduced-motion support where appropriate

Icon-only buttons require accessible names.

Do not communicate meaning through color alone.

Prefer proven accessible primitives for complex interactions.

---

# 25. Motion

Motion should communicate:

- feedback
- state change
- spatial relationship
- hierarchy
- entry or exit

Ordinary UI motion should generally feel quick and subtle.

Avoid:

- animating everything
- decorative bouncing
- unnecessary scroll animation
- long transitions that delay interaction
- motion without informational value

Use expressive motion only when it contributes to the product's
character or meaning.

Respect reduced-motion preferences.

---

# 26. Copy

Interface copy is part of the design.

Prefer copy that is:

- concise
- specific
- useful
- human
- action-oriented

Avoid unnecessary explanatory text when the interface can communicate
the idea structurally.

Buttons should normally describe actions.

Prefer:

"Create document"

over vague labels such as:

"Continue"

when the action is not obvious from context.

---

# 27. Avoid Generic Generated UI

Do not automatically introduce fashionable visual patterns.

Be suspicious of:

- gradient text
- purple or blue glows
- excessive gradients
- glassmorphism
- giant rounded cards
- pill-shaped everything
- badges everywhere
- icons beside every heading
- unnecessary decorative icons
- excessive shadows
- arbitrary accent colors
- decorative blobs
- floating 3D objects
- dashboard metric cards without purpose
- card-inside-card layouts
- excessive border treatments
- huge page headings
- excessive whitespace
- unnecessary illustrations

These patterns are not forbidden.

They require a product reason.

"Looks modern" is not a sufficient reason.

---

# 28. Avoid Generic SaaS Composition

Do not automatically produce:

Header

→ giant title and subtitle

→ row of metric cards

→ filter toolbar

→ grid of rounded cards

→ large empty-state illustration

because the task mentions a dashboard, workspace, application, or
product.

Derive composition from the user's actual task.

---

# 29. Visual References

When visual references are provided, extract principles rather than
blindly copying the surface.

Analyze:

- hierarchy
- density
- typography
- spacing
- alignment
- surface usage
- interaction patterns
- navigation
- information architecture

Ask why the reference works.

Do not reproduce another product's brand identity unless explicitly
requested.

Project-specific references may intentionally provide exact visual
tokens. Follow them when the project design system explicitly adopts
those values.

---

# 30. Design System Discipline

A design system should reduce arbitrary decisions.

Use established project tokens for:

- colors
- spacing
- typography
- radius
- borders
- shadows
- motion

when available.

Do not introduce a new value when an existing token serves the same
purpose.

During an active redesign, new patterns may be explored.

A new decision should become part of the design system only when it
has meaningful reuse.

Do not turn every one-off visual choice into a token or component.

---

# 31. Critique Before Completion

The first valid implementation is not the final implementation.

After building the interface, perform a design critique.

Do not merely confirm that the page looks good.

Actively search for weaknesses.

## Hierarchy

- What catches the eye first?
- Is it the right thing?
- Are multiple elements competing?
- Is metadata too prominent?
- Is the primary action obvious?

## Layout

- Is the page composition clear?
- Are related things grouped?
- Are unrelated things sufficiently separated?
- Is alignment consistent?
- Is whitespace intentional?

## Typography

- Are there too many text styles?
- Are semantic roles consistent?
- Is important content distinguishable at a glance?

## Surfaces

- Are there unnecessary cards?
- Are there nested containers?
- Can borders be removed?
- Are shadows communicating real elevation?

## Actions

- Are several buttons competing as primary?
- Are rare actions too prominent?
- Are contextual actions discoverable?

## Density

- Is the interface unnecessarily sparse?
- Is it unnecessarily dense?
- Can users scan repeated content efficiently?

## Consistency

- Are repeated objects visually consistent?
- Are spacing and alignment predictable?
- Are similar interactions presented similarly?

## Responsive

- Does the hierarchy survive smaller screens?
- Did responsive behavior preserve the primary task?
- Are touch interactions comfortable?

## Accessibility

- Can the interface be navigated by keyboard?
- Are focus states visible?
- Are controls labeled?
- Is meaning available without color?

## Generated-UI Check

Ask:

"Which parts of this interface look like they were added because an
AI commonly generates them rather than because the product needs
them?"

Remove or redesign those elements.

---

# 32. Simplification Pass

After critique, perform one final simplification pass.

For each:

- card
- border
- badge
- icon
- label
- button
- section
- color
- shadow
- animation

ask:

"Does this help the user understand, navigate, decide, or act?"

If not, strongly consider removing it.

Do not confuse visual complexity with design quality.

---

# 33. Definition of Done

A UI task is complete only when:

- the primary user task is clear
- information hierarchy is intentional
- layout supports scanning
- design follows the project's visual language
- important interaction states exist
- responsive behavior is intentional
- accessibility basics are handled
- unnecessary visual treatments have been removed
- the interface has been critiqued after implementation
- meaningful critique findings have been fixed

Working code is necessary.

Working code alone is not completion.
