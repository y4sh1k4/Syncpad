# Syncpad Product Context

## Product

Syncpad is a real-time collaborative workspace for writing, editing,
organizing, and working together on documents.

It enables individuals and teams to create documents, collaborate live,
leave comments, manage access, organize their work, and continue editing
from anywhere.

The product should make collaborative document work feel immediate,
focused, and lightweight.

---

# Core Product Idea

Syncpad is fundamentally about:

Create
→ Write
→ Collaborate
→ Organize
→ Return and continue

The document is the primary object in the product.

The interface exists to help users work with documents.

It should never feel like users are managing the application itself
instead of managing their work.

---

# Primary User Goals

Users should be able to accomplish these tasks with minimal friction.

## Create

Start working quickly.

Users can:

- create a blank document
- create from a template
- name and organize documents

Creating something should never feel like a setup process.

## Write

The editor is the core working environment.

Users should be able to focus on content without unnecessary application
chrome competing for attention.

Formatting tools should remain discoverable without dominating the
writing experience.

## Collaborate

Users can work together on the same document in real time.

Collaboration includes:

- active collaborators
- live document editing
- inline comments
- comment discussions
- notifications
- document sharing
- access management

Collaboration should feel embedded into the document experience rather
than like a separate administrative feature.

## Organize

Users need to find and manage their documents as the workspace grows.

This includes:

- recent documents
- document history
- search
- workspaces
- organization-based documents
- renaming
- duplication
- deletion

Organization should optimize for finding and continuing work rather
than exposing file-management complexity.

## Share

Users should be able to understand who has access to their work and
share documents confidently.

Permissions should feel:

- understandable
- predictable
- trustworthy

Avoid unnecessary complexity around access management.

---

# Product Mental Model

The primary mental model is:

Workspace
→ Documents
→ Content
→ Collaboration

Avoid introducing unnecessary organizational concepts unless the
product actually supports them.

Do not visually imply concepts such as:

- folders
- projects
- databases
- teams
- collections

unless they genuinely exist in the product model.

The UI should reflect the actual product architecture.

---

# Product Hierarchy

In most Syncpad surfaces, priority should roughly follow:

1. User's content
2. Current document or document collection
3. Primary action
4. Collaboration
5. Navigation
6. Secondary actions
7. Metadata
8. Application chrome

This hierarchy may change depending on the surface, but content should
usually remain dominant.

---

# Documents

Documents are first-class objects.

A document may contain:

- rich text
- headings
- fonts and text styles
- text colors and highlights
- alignment
- line spacing
- bulleted lists
- numbered lists
- task lists
- nested lists
- tables
- links
- images

Documents can also support actions such as:

- rename
- duplicate
- delete
- search
- print
- export

Export formats may include:

- JSON
- HTML
- text
- PDF

Users may also adjust document presentation such as margins.

Do not expose every available document capability simultaneously.

Surface functionality according to context.

---

# Document Library

The document library/history surface primarily exists to answer:

"What should I continue working on?"

Users should be able to quickly:

- recognize documents
- find documents
- understand recency
- see useful collaboration context
- open a document
- create something new

The interface should optimize for resuming work.

Document titles should generally be more visually prominent than
metadata.

Useful metadata may include:

- last edited time
- collaborators
- workspace
- ownership when relevant

Do not display metadata simply because it exists.

Only expose metadata that helps recognition, decision-making, or
organization.

---

# Templates

Templates answer a different question:

"What should I start?"

Templates may include document types such as:

- resumes
- proposals
- cover letters
- business letters

Templates should reduce the effort required to begin common documents.

Templates should feel like starting points rather than existing files.

Therefore templates and existing documents do not need identical visual
treatment.

Templates may emphasize:

- document type
- preview
- purpose
- recognizable structure

Existing documents should emphasize:

- identity
- title
- recency
- continuation

---

# Search

Search becomes increasingly important as the document collection grows.

Search should help users reach documents quickly.

Do not make search visually dominant merely because it exists.

Its prominence should reflect how important retrieval is on the current
surface.

---

# Document Actions

Common document actions may include:

- open
- rename
- duplicate
- delete
- share
- export
- print

Opening/continuing a document is usually more important than management
actions.

Secondary document actions should normally remain contextual.

Avoid permanently displaying several management buttons on every
document representation.

---

# Collaboration

Collaboration is a defining Syncpad capability.

Useful collaboration signals may include:

- active users
- collaborator avatars
- comments
- comment activity
- notifications
- shared state
- permissions

These signals should be visible when they help the user understand what
is happening.

Avoid turning collaboration into visual noise.

Do not create a badge for every collaborative state.

Presence should feel alive but calm.

---

# Comments

Comments belong in the context of content.

Users should be able to:

- leave inline comments
- understand which content a comment refers to
- participate in discussion threads
- understand unresolved activity
- receive relevant notifications

Comments should support collaboration without overwhelming the writing
experience.

---

# Workspaces

Syncpad supports personal and organization-based workspaces.

Workspace context should be clear when it affects:

- document ownership
- access
- collaboration
- navigation

Do not repeatedly display workspace information when the context is
already obvious.

---

# Access and Trust

Documents may contain important personal or professional work.

The interface should communicate trust.

Users should be able to understand:

- whether a document is private or shared
- who has access
- what permissions collaborators have
- what will happen when access changes

Destructive or permission-changing actions should be explicit.

Avoid ambiguous access states.

---

# Product Character

Syncpad should feel:

- calm
- focused
- fast
- lightweight
- collaborative
- thoughtful
- precise
- modern
- trustworthy

It should feel like a workspace designed around doing the work.

---

# Syncpad Should Not Feel Like

## A Generic SaaS Dashboard

Avoid defaulting to:

- KPI cards
- dashboard statistics
- excessive widgets
- administrative layouts

unless the product genuinely requires them.

## A File Manager

Document organization matters, but Syncpad should not feel like an
operating-system file browser.

Avoid unnecessary:

- file-system metaphors
- folder complexity
- dense management controls

unless these concepts exist in the product.

## A Project Management Tool

Do not introduce visual patterns implying:

- tickets
- sprints
- task boards
- project status

unless the feature genuinely requires them.

## A Marketing Website

Product screens should prioritize working efficiency over dramatic
presentation.

Avoid:

- oversized headings
- excessive whitespace
- decorative storytelling layouts

inside frequently used product surfaces.

---

# Product Design Principles

## Content Is the Product

The user's work should dominate the interface.

## Fast to Start

Starting a document should require minimal effort.

## Fast to Return

Returning users should quickly understand where they left off.

## Collaboration Without Noise

Collaborative activity should be visible without overwhelming content.

## Complexity on Demand

Advanced functionality should remain accessible without making every
surface complex.

## Predictable Actions

Users should understand what an action will do before performing it.

## Familiar Where Helpful

Use established document-editing interaction conventions when they
reduce learning effort.

Innovation should improve the workflow rather than make familiar tasks
unnecessarily unfamiliar.

---

# Design Decision Test

When deciding whether something belongs in the interface, ask:

Does this help the user:

- create?
- find?
- understand?
- write?
- collaborate?
- organize?
- continue?

If it does none of these, question why it exists.

The interface should contain as little UI as necessary while preserving
the power of the product.
