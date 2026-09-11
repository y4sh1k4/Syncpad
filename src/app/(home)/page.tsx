import {
  ArrowRight,
  Check,
  Bell,
  Bold,
  FilePlus2,
  Italic,
  MessageCircle,
  MousePointer2,
  Printer,
  Redo2,
  Star,
  Underline,
  Undo2,
  Clock,
} from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { SyncpadNavbar } from "@/components/syncpad-navbar";
import { JourneyReveal, ScrollReveal } from "@/components/journey-reveal";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const collaborators = [
  { initials: "MA", className: "bg-[#dd8d71]" },
  { initials: "JR", className: "bg-[#7e9e8b]" },
  { initials: "SL", className: "bg-[#8e80bd]" },
];

function ProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[1080px] pt-5 lg:pt-0">
      <div className="relative overflow-hidden rounded-xl border border-[#cfd4db] bg-[#f8fafd] shadow-[0_20px_60px_rgba(42,42,34,0.12)]">
        <div className="flex items-start justify-between gap-3 px-3 py-2.5 sm:px-4">
          <div className="flex min-w-0 items-start gap-2.5">
            <span className="mt-0.5 shrink-0 text-[13px] font-semibold tracking-[-0.08em] text-[#202124]">
              sync<span className="font-serif text-[15px] italic">pad</span>
              <span className="ml-1 inline-block size-1.5 rounded-full bg-[#496fe8]" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 leading-none">
                <span className="truncate text-[13px] font-medium text-[#202124] sm:text-[15px]">
                  Northstar launch plan
                </span>
                <Star size={13} className="shrink-0 text-[#5f6368]" />
              </div>
              <div className="mt-2 hidden h-5 items-center gap-3 rounded-[3px] border border-[#dadce0] bg-white px-2 text-[9px] text-[#202124] sm:flex">
                <span>File</span>
                <span>Edit</span>
                <span>Insert</span>
                <span>Format</span>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 pt-0.5">
            <div className="-space-x-1.5 hidden sm:flex">
              {collaborators.map((person) => (
                <span
                  key={person.initials}
                  className={`inline-flex size-5 items-center justify-center rounded-full border-2 border-[#f8fafd] text-[7px] font-semibold text-white ${person.className}`}
                >
                  {person.initials}
                </span>
              ))}
            </div>
            <Bell size={15} className="text-[#5f6368]" />
            <span className="flex size-6 items-center justify-center rounded-full bg-[#496fe8] text-[8px] font-semibold text-white">
              Y
            </span>
          </div>
        </div>

        <div className="mx-2 flex h-8 items-center gap-2 overflow-hidden rounded-[20px] bg-[#f1f4f9] px-2 text-[#34373b] sm:mx-3 sm:gap-3 sm:px-3">
          <Undo2 size={13} />
          <Redo2 size={13} />
          <Printer size={13} />
          <span className="h-4 w-px bg-[#a6a8aa]" />
          <span className="hidden rounded-sm bg-white px-2 py-1 text-[9px] sm:inline">
            Normal text
          </span>
          <span className="hidden h-4 w-px bg-[#a6a8aa] sm:inline" />
          <Bold size={13} />
          <Italic size={13} />
          <Underline size={13} />
          <span className="hidden h-4 w-px bg-[#a6a8aa] sm:inline" />
          <span className="text-[12px] font-medium">A</span>
          <span className="size-3 rounded-sm bg-[#f9e46f]" />
        </div>

        <div className="relative mt-2 min-h-[360px] bg-[#f9fbfd] px-4 pb-5 pt-3 sm:min-h-[430px] sm:px-8">
          <div className="mx-auto min-h-[400px] w-[70%] min-w-[330px] border border-[#c7c7c7] bg-white px-6 py-7 shadow-[0_1px_2px_rgba(32,33,36,0.12)] sm:min-h-[500px] sm:px-10 sm:py-10">
            <h2 className="text-[20px] font-semibold tracking-[-0.035em] text-[#202124] sm:text-[25px]">
              Northstar launch plan
            </h2>
            <p className="mt-5 text-[11px] leading-5 text-[#3c4043] sm:text-[12px]">
              We&apos;re making a calm, clear home for teams to shape ideas
              together—from the first note to the final draft.
            </p>
            <h3 className="mt-7 text-[13px] font-semibold text-[#202124] sm:text-[15px]">
              What we&apos;re making
            </h3>
            <p className="mt-2 text-[11px] leading-5 text-[#3c4043] sm:text-[12px]">
              A shared direction for the work we&apos;re taking into the world.
            </p>
            <p className="mt-4 inline bg-[#fff2a8] px-0.5 text-[11px] leading-5 text-[#202124] sm:text-[12px]">
              Make the first draft feel easy to begin.
            </p>
          </div>
          <div className="absolute right-[8%] top-[150px] hidden rounded-lg border border-[#dadce0] bg-white p-2.5 shadow-[0_3px_8px_rgba(60,64,67,0.15)] md:block">
            <div className="flex items-center gap-1.5 text-[9px] font-medium text-[#202124]">
              <span className="flex size-4 items-center justify-center rounded-full bg-[#dd8d71] text-[6px] text-white">
                MA
              </span>
              Maya
            </div>
            <p className="mt-1 max-w-[110px] text-[9px] leading-3.5 text-[#5f6368]">
              This is a lovely direction.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 -left-6 hidden items-center gap-2 rounded-lg border border-[#dadce0] bg-white px-3 py-2 shadow-[0_8px_24px_rgba(42,42,34,0.1)] md:flex">
        <span className="relative flex size-6 items-center justify-center rounded-full bg-[#8e80bd] text-[8px] font-semibold text-white">
          SL
          <span className="absolute -bottom-px -right-px size-2 rounded-full border-2 border-white bg-[#57a67d]" />
        </span>
        <span className="text-[10px] font-medium text-[#494944]">
          Sofia is editing
        </span>
      </div>
    </div>
  );
}

function FeatureBento() {
  return (
    <section
      id="features"
      className="mx-auto max-w-[1280px] px-5 pb-24 pt-10 sm:px-8 sm:pt-20 lg:px-10"
      aria-labelledby="feature-heading"
    >
      <div>
        <div className="mx-auto max-w-[610px] text-center">
          <p className="text-[15px] landing-eyebrow font-medium text-[#496fe8]">
            Made for the work in progress
          </p>
          <h2
            id="feature-heading"
            className="landing-display mt-3 font-medium text-[50px] leading-[0.98] tracking-[-0.05em] text-[#252521] sm:text-[52px]"
          >
            A calmer way to bring ideas forward.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-6">
          <article className="feature-card group relative min-h-[300px] overflow-hidden rounded-xl border border-[#cfe1f3] bg-[#eaf5ff] p-7 lg:col-span-3 lg:h-[350px] lg:p-7">
            <div className="relative z-10 max-w-[320px]">
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-white/85 text-[#3971c6] shadow-[0_2px_6px_rgba(44,91,144,0.1)]">
                <MessageCircle size={17} />
              </span>
              <h3 className="mt-5 text-[27px] font-semibold leading-[1.05] tracking-[-0.045em] text-[#1c4f8e]">
                Comments and updates, in context.
              </h3>
              <p className="mt-3 text-[14px] leading-6 text-[#4e6d8f]">
                Comment beside the sentence and get notified when the work moves
                forward.
              </p>
            </div>
            <Image
              src="/illustrations/comment-collaborator-mascot.png"
              alt=""
              width={120}
              height={132}
              className="feature-comment-mascot"
            />
            <div className="feature-thought-field" aria-hidden="true">
              <span className="feature-thought-summary">
                <i>MA</i>
                <i>JR</i>
                <i>SL</i>
                <b>3 comments</b>
              </span>
              <span className="feature-thought-sheet">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className="feature-thought-highlight">
                This part looks great!
              </span>
              <svg
                className="feature-thought-connectors"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  className="feature-thought-path feature-thought-path-one"
                  d="M 34 64 C 43 58, 38 19, 66 18"
                />
                <path
                  className="feature-thought-path feature-thought-path-two"
                  d="M 34 64 C 48 62, 53 49, 72 49"
                />
                <path
                  className="feature-thought-path feature-thought-path-three"
                  d="M 34 64 C 49 65, 49 82, 63 82"
                />
              </svg>
              <span className="feature-thought-bubble feature-thought-bubble-one">
                <b>MA</b>A thought
              </span>
              <span className="feature-thought-bubble feature-thought-bubble-two">
                <b>JR</b>A reply
              </span>
              <span className="feature-thought-bubble feature-thought-bubble-three">
                <b>SL</b>A way forward
              </span>
              <span className="feature-thought-anchor" />
            </div>
          </article>

          <article className="feature-card group relative min-h-[300px] overflow-hidden rounded-xl border border-[#ded0f4] bg-[#f3edff] p-7 lg:col-span-3 lg:h-[350px] lg:p-8">
            <div className="relative z-10 max-w-[245px]">
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-white/85 text-[#7b54c9] shadow-[0_2px_6px_rgba(98,62,166,0.1)]">
                ✦
              </span>
              <h3 className="mt-5 text-[25px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#5d32b4]">
                One document. The whole team.
              </h3>
              <p className="mt-3 text-[14px] leading-6 text-[#78659c]">
                Everyone can contribute to the same draft, together and in real
                time.
              </p>
            </div>
            <div className="feature-orbit" aria-hidden="true">
              <span className="feature-orbit-ring feature-orbit-ring-one" />
              <span className="feature-orbit-ring feature-orbit-ring-two" />
              <span className="feature-orbit-page">
                <i />
                <i />
                <i />
                <i />
                <em />
              </span>
              <span className="feature-orbit-person feature-orbit-person-one">
                MA
              </span>
              <span className="feature-orbit-person feature-orbit-person-two">
                JR
              </span>
              <span className="feature-orbit-person feature-orbit-person-three">
                SL
              </span>
            </div>
            <div className="team-collaboration-scene" aria-hidden="true">
              <span className="team-orbit" />
              <span className="team-editing">Editing…</span>
              <span className="team-feedback team-feedback-two">
                Adding this…
              </span>
              <span className="team-person team-person-one">MA</span>
              <span className="team-person team-person-two">JR</span>
              <span className="team-person team-person-three">SL</span>
              <div className="team-document">
                <strong>Team plan</strong>
                <i />
                <i />
                <i className="team-line-purple" />
                <i />
                <i className="team-line-green" />
                <i />
                <i />
                <span className="team-cursor team-cursor-purple">MA</span>
                <span className="team-cursor team-cursor-green">SL</span>
                <span className="team-cursor team-cursor-red">JR</span>
              </div>
            </div>
            <div className="team-collaboration-status" aria-hidden="true">
              <span>MA</span>
              <span>JR</span>
              <span>SL</span>
              <p>
                <b>3 teammates</b> are shaping this together
              </p>
            </div>
          </article>

          <article className="feature-card group relative min-h-[330px] overflow-hidden rounded-xl border border-[#f0d8ad] bg-[#fff4df] p-7 lg:col-span-2 lg:min-h-[360px] lg:p-8">
            <span className="inline-flex size-9 items-center justify-center rounded-lg bg-white/85 text-[#b45e23] shadow-[0_2px_6px_rgba(98,62,166,0.1)]">
              <Clock size={17} />
            </span>
            <h3 className="mt-5 max-w-[235px] text-[25px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#b45e23]">
              Pick up where you left off.
            </h3>
            <p className="mt-3 max-w-[250px] text-[14px] leading-6 text-[#96734a]">
              Your recent work is ready when the next thought arrives.
            </p>
            <div className="recent-document-stack" aria-hidden="true">
              <div className="recent-document recent-document-project">
                <strong>Project plan</strong>
                <small>Edited 1d ago</small>
                <i />
                <i />
                <i />
              </div>
              <div className="recent-document recent-document-ideas">
                <strong>Ideas</strong>
                <small>Edited 3d ago</small>
                <i />
                <i />
                <i />
              </div>
              <div className="recent-document recent-document-primary">
                <strong>Design notes</strong>
                <small>Edited 4h ago</small>
                <i />
                <i />
                <i />
                <i />
                <span className="recent-preview" />
                <span className="recent-avatars">
                  <b>MA</b>
                  <b>JR</b>
                  <b>SL</b>
                </span>
                <span className="recent-resume">
                  Resume <ArrowRight size={11} />
                </span>
              </div>
              <span className="recent-spark recent-spark-one" />
              <span className="recent-spark recent-spark-two" />
              <span className="recent-spark recent-spark-three" />
            </div>
          </article>

          <article className="feature-card group relative min-h-[330px] overflow-hidden rounded-xl border border-[#cce3ce] bg-[#eaf8e8] p-7 lg:col-span-2 lg:min-h-[360px] lg:p-8">
            <div className="relative z-10 max-w-[330px]">
              <h3 className="text-[27px] font-semibold leading-[1.05] tracking-[-0.045em] text-[#266b45]">
                Start with a blank page. Keep the momentum.
              </h3>
              <p className="mt-3 text-[14px] leading-6 text-[#5a8667]">
                A place for the early notes, the polished draft, and every
                useful version between.
              </p>
            </div>
            <div className="feature-bento-legacy feature-pages absolute bottom-0 right-9 flex items-end -space-x-12">
              <div className="h-[138px] w-[150px] rotate-[-7deg] rounded-t-lg border border-[#c5dfc6] bg-[#f8fff8] shadow-[0_-3px_12px_rgba(54,112,67,0.1)]" />
              <div className="h-[180px] w-[190px] rotate-[2deg] rounded-t-lg border border-[#bddabe] bg-white px-5 py-6 shadow-[0_-5px_18px_rgba(54,112,67,0.15)]">
                <span className="block h-2 w-24 rounded bg-[#d3edcf]" />
                <span className="mt-3 block h-1.5 w-full rounded bg-[#e5f3e4]" />
                <span className="mt-2 block h-1.5 w-4/5 rounded bg-[#e5f3e4]" />
                <span className="mt-5 block h-2 w-16 rounded bg-[#d3edcf]" />
                <span className="mt-3 block h-1.5 w-full rounded bg-[#e5f3e4]" />
              </div>
            </div>
            <div className="feature-word-field" aria-hidden="true">
              <span className="feature-word-page feature-word-page-one" />
              <span className="feature-word-page feature-word-page-two" />
              <span className="feature-word-page feature-word-page-three" />
              <span className="feature-word feature-word-one">begin</span>
              <span className="feature-word feature-word-two">shape</span>
              <span className="feature-word feature-word-three">make</span>
              <span className="feature-word-stroke feature-word-stroke-one" />
              <span className="feature-word-stroke feature-word-stroke-two" />
            </div>
          </article>

          <article className="feature-card group relative min-h-[330px] overflow-hidden rounded-xl border border-[#d8ddea] bg-[#f0f3fb] p-7 lg:col-span-2 lg:min-h-[360px] lg:p-8">
            <div className="relative z-10 max-w-[250px]">
              <h3 className="text-[25px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#40577f]">
                Share the work, not the overhead.
              </h3>
              <p className="mt-3 text-[14px] leading-6 text-[#6c7e9d]">
                Invite the people who need a seat at the table, then keep
                moving.
              </p>
            </div>
            <div className="feature-bento-legacy feature-sharing absolute bottom-6 left-7 right-7 rounded-lg border border-[#d8dfeb] bg-white/90 p-3 shadow-[0_6px_18px_rgba(67,88,131,0.1)]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-[#40577f]">
                  Share “Launch brief”
                </span>
                <span className="rounded bg-[#edf1fb] px-1.5 py-1 text-[8px] font-medium text-[#536b9b]">
                  Can edit
                </span>
              </div>
              <div className="feature-invite mt-3 flex items-center gap-2 rounded-md border border-[#dce3ef] bg-[#fafcff] px-2.5 py-2">
                <span className="size-2 rounded-full bg-[#6e8ad0]" />
                <span className="text-[9px] text-[#71809b]">
                  maya@northstar.co
                </span>
                <span className="ml-auto text-[9px] font-medium text-[#496fe8]">
                  Invite
                </span>
              </div>
            </div>
            <div className="feature-share-network" aria-hidden="true">
              <span className="feature-share-page">
                <i />
                <i />
                <i />
              </span>
              <span className="feature-share-ray feature-share-ray-one" />
              <span className="feature-share-ray feature-share-ray-two" />
              <span className="feature-share-ray feature-share-ray-three" />
              <span className="feature-share-core">✦</span>
              <span className="feature-share-node feature-share-node-one">
                MA
              </span>
              <span className="feature-share-node feature-share-node-two">
                JR
              </span>
              <span className="feature-share-node feature-share-node-three">
                SL
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function WorkJourney() {
  const stages = [
    {
      number: "01",
      title: "Start with the thought in front of you.",
      copy: "A blank page, a useful template, or a half-formed note—begin wherever the work is.",
      tone: "bg-[#fff1de] text-[#b45e23] border-[#f0d8ad]",
    },
    {
      number: "02",
      title: "Shape it together as it takes form.",
      copy: "Invite the right people. Write live. Keep every good question close to the sentence.",
      tone: "bg-[#edf1ff] text-[#5d45bd] border-[#d9d3f3]",
    },
    {
      number: "03",
      title: "Return with a clear way forward.",
      copy: "Find the draft again, see what changed, and carry the work into its next chapter.",
      tone: "bg-[#e8f7ed] text-[#327452] border-[#cce3d2]",
    },
  ];

  return (
    <section
      className="journey-section relative isolate overflow-hidden bg-[#fffdf8] py-24 sm:py-32"
      aria-labelledby="journey-heading"
    >
      <JourneyMarginalia />
      <JourneyReveal className="relative z-10 mx-auto max-w-[1160px] px-5 sm:px-8 lg:px-10">
        <div className="journey-intro mx-auto max-w-[620px] text-center">
          <p className="text-[15px] font-medium text-[#496fe8] landing-eyebrow">
            A document is never just one moment
          </p>
          <h2
            id="journey-heading"
            className="landing-display mt-3 text-[40px] leading-[0.98] tracking-[-0.05em] text-[#252521] sm:text-[56px]"
          >
            From first note to the next good move.
          </h2>
          <p className="mx-auto mt-5 max-w-[480px] text-[15px] leading-6 text-[#686861]">
            Syncpad gives the work a place to start, grow, and stay in
            motion—with the people who move it forward.
          </p>
        </div>

        <div className="relative mt-16 lg:mt-20">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            {stages.map((stage, index) => (
              <article key={stage.number} className="journey-stage relative">
                <div
                  className={`journey-stage-marker relative z-10 flex size-10 items-center justify-center rounded-full border bg-[#fffdf8] text-[12px] font-semibold ${stage.tone}`}
                >
                  {stage.number}
                </div>
                <span className="journey-stage-stem" aria-hidden="true" />
                <div className="journey-stage-copy mt-5 max-w-[300px]">
                  <h3 className="text-[24px] font-semibold leading-[1.1] tracking-[-0.04em] text-[#2b2b27]">
                    {stage.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-6 text-[#6d6d66]">
                    {stage.copy}
                  </p>
                </div>

                {index === 0 ? (
                  <div className="journey-stage-preview journey-start-card mt-8 h-[190px] rounded-xl border border-[#efd9b7] bg-[#fff7e9] p-5">
                    <div className="flex items-center justify-between">
                      <span className="flex size-8 items-center justify-center rounded-md bg-white text-[#b87528] shadow-[0_2px_6px_rgba(148,96,30,0.1)]">
                        <FilePlus2 size={15} />
                      </span>
                      <span className="text-[10px] font-medium text-[#a77a43]">
                        New document
                      </span>
                    </div>
                    <p className="mt-7 text-[16px] font-medium tracking-[-0.03em] text-[#65431e]">
                      A note for the launch
                    </p>
                    <span className="journey-caret mt-3 block h-4 w-[2px] bg-[#c9782e]" />
                  </div>
                ) : null}

                {index === 1 ? (
                  <div className="journey-stage-preview journey-team-card mt-8 h-[190px] rounded-xl border border-[#d9d3f3] bg-[#f4f1ff] p-4">
                    <div className="rounded-lg border border-[#ddd8f4] bg-white p-3 shadow-[0_4px_14px_rgba(86,66,151,0.1)]">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-[#514184]">
                          Launch brief
                        </span>
                        <span className="flex -space-x-1.5">
                          {collaborators.map((person) => (
                            <span
                              key={person.initials}
                              className={`flex size-5 items-center justify-center rounded-full border-2 border-white text-[7px] font-semibold text-white ${person.className}`}
                            >
                              {person.initials}
                            </span>
                          ))}
                        </span>
                      </div>
                      <span className="mt-4 block h-1.5 w-full rounded bg-[#edeaff]" />
                      <span className="mt-2 block h-1.5 w-4/5 rounded bg-[#edeaff]" />
                      <span className="mt-2 block h-1.5 w-3/5 rounded bg-[#edeaff]" />
                    </div>
                    <div className="journey-comment mt-3 inline-flex items-center gap-1.5 rounded-md border border-[#ddd8f4] bg-white px-2 py-1.5 text-[9px] text-[#66538f] shadow-[0_2px_6px_rgba(86,66,151,0.08)]">
                      <span className="flex size-4 items-center justify-center rounded-full bg-[#dd8d71] text-[6px] text-white">
                        MA
                      </span>{" "}
                      I added a thought here.
                    </div>
                  </div>
                ) : null}

                {index === 2 ? (
                  <div className="journey-stage-preview journey-return-card mt-8 h-[190px] rounded-xl border border-[#cce3d2] bg-[#effaf1] p-4">
                    <div className="space-y-2 rounded-lg border border-[#d3e8d8] bg-white p-3 shadow-[0_4px_14px_rgba(45,105,73,0.1)]">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-medium text-[#315f43]">
                          Northstar launch plan
                        </span>
                        <span className="flex size-4 items-center justify-center rounded-full bg-[#d9f1e0] text-[#368257]">
                          <Check size={10} />
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-[#6a8a75]">
                          Edited 4 minutes ago
                        </span>
                        <span className="text-[#4e966a]">Open</span>
                      </div>
                    </div>
                    <div className="journey-return-note mt-3 rounded-md border border-[#d3e8d8] bg-white/80 px-3 py-2 text-[10px] text-[#5d8069]">
                      Ready when you are.
                    </div>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </JourneyReveal>
    </section>
  );
}

function JourneyMarginalia() {
  return (
    <div className="journey-marginalia" aria-hidden="true">
      <span className="journey-margin-mark journey-margin-comment">
        <MessageCircle size={16} />
      </span>
      <span className="journey-margin-mark journey-margin-cursor">
        <MousePointer2 size={17} />
      </span>
      <span className="journey-margin-mark journey-margin-document">
        <FilePlus2 size={15} />
      </span>
      <span className="journey-margin-mark journey-margin-check">
        <Star size={15} />
      </span>
    </div>
  );
}

function ClosingCta() {
  return (
    <section
      className="bg-[#fafaf7] px-5 pb-8 pt-8 sm:px-8 sm:pb-12 lg:px-10"
      aria-labelledby="closing-heading"
    >
      <ScrollReveal
        className="closing-reveal mx-auto max-w-[1160px]"
        revealClass="closing-reveal"
      >
        <div className="closing-cta-surface relative overflow-hidden rounded-2xl border border-[#d8e0fb] px-6 py-16 text-center sm:px-12 sm:py-20">
          <p className="relative landing-eyebrow text-[15px] font-medium text-[#496fe8]">
            Make room for the work ahead
          </p>
          <h2
            id="closing-heading"
            className="landing-display relative mx-auto mt-3 max-w-[680px] text-[42px] leading-[0.98] tracking-[-0.05em] text-[#292a35] sm:text-[62px]"
          >
            Start with the page in front of you.
          </h2>
          <p className="relative mx-auto mt-5 max-w-[470px] text-[16px] leading-6 text-[#606574]">
            Syncpad gives every good idea a calm place to begin—and the right
            people a place to build on it.
          </p>
          <Link
            href="/sign-up"
            className="group relative mt-7 inline-flex h-11 items-center gap-2 rounded-lg bg-[#496fe8] px-4 text-[14px] font-medium text-white shadow-[0_2px_0_rgba(26,50,135,0.2)] transition-colors hover:bg-[#3f63d5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496fe8] focus-visible:ring-offset-2"
          >
            Start writing together{" "}
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}

function LandingFooter() {
  return (
    <footer className="bg-[#fafaf7] px-5 pb-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-[1160px] flex-col gap-6 border-t border-[#e5e3dc] py-8 text-[13px] text-[#74746d] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="#top"
            className="group inline-flex items-baseline rounded-md text-[#252521] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496fe8] focus-visible:ring-offset-4"
            aria-label="Syncpad home"
          >
            <span className="landing-wordmark text-[18px]">
              sync<span>pad</span>
            </span>
            <span className="ml-1.5 inline-block size-1.5 rounded-full bg-[#496fe8] transition-transform duration-200 group-hover:scale-125" />
          </Link>
          <p className="mt-2">A calmer place to make progress together.</p>
        </div>
        <div className="flex items-center gap-5 font-medium">
          <Link
            href="#features"
            className="rounded-sm transition-colors hover:text-[#252521] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496fe8]"
          >
            Features
          </Link>
          <Link
            href="/sign-in"
            className="rounded-sm transition-colors hover:text-[#252521] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496fe8]"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="rounded-sm transition-colors hover:text-[#252521] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496fe8]"
          >
            Get started
          </Link>
        </div>
      </div>
      <p className="mx-auto max-w-[1160px] text-[12px] text-[#92928a]">
        © {new Date().getFullYear()} Syncpad
      </p>
    </footer>
  );
}

function LandingMarginalia() {
  return (
    <div className="landing-marginalia" aria-hidden="true">
      <span className="landing-margin-mark landing-margin-comment">
        <MessageCircle size={17} />
      </span>
      <span className="landing-margin-mark landing-margin-cursor">
        <MousePointer2 size={18} />
      </span>
      {/* <span className="landing-margin-mark landing-margin-document"><FilePlus2 size={16} /></span> */}
      <span className="landing-margin-mark landing-margin-presence">MA</span>
      {/* <span className="landing-margin-mark landing-margin-check"><Check size={16} /></span> */}
      <span className="landing-margin-mark landing-margin-star">
        <Star size={15} />
      </span>
      <span className="landing-margin-mark landing-margin-bell">
        <Bell size={16} />
      </span>
    </div>
  );
}

export default async function LandingPage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/documents");
  }

  return (
    <main
      id="top"
      className="landing-shell relative min-h-screen overflow-hidden bg-[#fafaf7] text-[#252521]"
    >
      <SyncpadNavbar />
      <LandingMarginalia />

      <section
        className="relative mx-auto max-w-[1280px] px-5 pb-12 pt-8 sm:px-8 sm:pt-10 lg:px-10 lg:pt-10"
        aria-labelledby="hero-heading"
      >
        <div className="relative z-10 mx-auto max-w-[650px] text-center">
          <div className="landing-hero-eyebrow mb-4 flex items-center justify-center gap-2 text-[#496fe8]">
            <svg
              className="size-4 shrink-0"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 1.5L9.2 6.8L14.5 8L9.2 9.2L8 14.5L6.8 9.2L1.5 8L6.8 6.8L8 1.5Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="landing-eyebrow relative text-[15px] leading-none">
              Your ideas, in sync.
              <svg
                className="absolute -bottom-2 left-0 h-2 w-full"
                viewBox="0 0 150 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 5.6C27 2.8 47 7.8 73 5.2C99 2.7 122 6.5 148 3.8"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </svg>
            </p>
          </div>
          <h1
            id="hero-heading"
            className="landing-display landing-hero-heading text-[55px] font-normal leading-[0.94] tracking-[-0.055em] text-[#22221f] sm:text-[66px] lg:text-[90px]"
          >
            Where good work
            <br className="hidden sm:block" />{" "}
            <span className="italic text-[#62625c]">comes together.</span>
          </h1>
          <p className="landing-hero-copy mx-auto mt-4 max-w-[470px] text-[16px] leading-6 text-[#63635d]">
            A shared workspace for shaping documents, trading thoughts, and
            getting good work out the door.
          </p>
          <div className="landing-hero-cta mt-6 flex items-center justify-center gap-4">
            <Link
              href="/sign-up"
              className="group inline-flex h-11 items-center gap-2 rounded-lg bg-[#496fe8] px-4 text-[14px] font-medium text-white shadow-[0_2px_0_rgba(26,50,135,0.2)] transition-colors hover:bg-[#3f63d5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#496fe8] focus-visible:ring-offset-2"
            >
              Get started{" "}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
            <span className="text-[12px] text-[#83837c]">Free to begin</span>
          </div>
        </div>
        <div className="landing-product-preview relative z-10 mt-8 sm:mt-10">
          <ProductPreview />
        </div>
      </section>
      <FeatureBento />
      <WorkJourney />
      <ClosingCta />
      <LandingFooter />
    </main>
  );
}
