"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  CATEGORY_LABEL,
  RATING_LABEL,
  RATING_STYLES,
  STATUS_STYLES,
} from "@/lib/data";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Calendar, Clock, Sparkles, Video } from "lucide-react";
import {
  formatDate,
  formatDuration,
  formatTime,
} from "@/lib/helpers";
import { Button } from "./ui/button";
import Link from "next/link";
import { FeedbackModal } from "./FeedbackModal";

const AppointmentCard = ({ booking, mode, isPast = false }) => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const {
    startTime,
    endTime,
    status,
    creditsCharged,
    streamCallId,
    recordingUrl,
    feedback,
  } = booking;

  /* */
  

  const person =
    mode === "interviewer"
      ? booking.interviewee
      : booking.interviewer;

  const creditsLabel =
    mode === "interviewer"
      ? `+${creditsCharged} credits earned`
      : `-${creditsCharged} credits spent`;

  const creditsStyle =
    mode === "interviewer"
      ? "border-green-500/20 bg-green-500/10 text-green-400"
      : "border-red-400/20 bg-red-400/5 text-red-400";

  const isUpcoming = status === "SCHEDULED";

  return (
    <>
      <FeedbackModal
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
        feedback={feedback}
        intervieweeName={
          mode === "interviewer"
            ? booking.interviewee?.name
            : undefined
        }
      />

      <article
        className="
          group relative
          bg-[#0f0f11]
          border border-white/10
          rounded-2xl
          p-7
          flex flex-col gap-6
          transition-all duration-300
          hover:-translate-y-0.5
          bg-linear-to-t
          from-transparent
          via-transparent
          to-cyan-300/10
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Avatar>
              <AvatarImage
                src={person?.imageUrl}
                alt={person?.name}
                className="rounded-2xl"
              />
              <AvatarFallback
                className="
                  rounded-2xl
                  bg-cyan-400/10
                  border border-cyan-400/20
                  text-cyan-400
                  text-lg
                  font-medium
                "
              >
                {person?.name?.[0] ?? "?"}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="text-base font-medium text-stone-200 truncate">
                {person?.name ?? "—"}
              </p>

              {person?.title && person?.company ? (
                <p className="text-xs text-stone-500 truncate">
                  {person.title}
                  <span className="text-stone-700 mx-1.5">•</span>
                  {person.company}
                </p>
              ) : (
                <p className="text-xs text-stone-600 truncate">
                  {person?.email}
                </p>
              )}

              {mode === "interviewee" &&
                person?.categories?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {person.categories.slice(0, 3).map((cat) => (
                      <span
                        key={cat}
                        className="
                          text-[10px]
                          px-2 py-0.5
                          rounded-md
                          border border-cyan-400/20
                          bg-cyan-400/5
                          text-cyan-400
                        "
                      >
                        {CATEGORY_LABEL[cat]}
                      </span>
                    ))}
                  </div>
                )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <Badge
              variant="outline"
              className={STATUS_STYLES[status]}
            >
              {status.charAt(0) +
                status.slice(1).toLowerCase()}
            </Badge>

            <Badge
              variant="outline"
              className={creditsStyle}
            >
              {creditsLabel}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Date / Time / Duration */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-stone-600">
              <Calendar size={12} />
              <span className="text-[10px] font-semibold tracking-widest uppercase">
                Date
              </span>
            </div>

            <p className="text-sm text-stone-300">
              {formatDate(startTime)}
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-stone-600">
              <Clock size={12} />
              <span className="text-[10px] font-semibold tracking-widest uppercase">
                Time
              </span>
            </div>

            <p className="text-sm text-stone-300">
              {formatTime(startTime)}
              <span className="text-stone-600 mx-1">-</span>
              {formatTime(endTime)}
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-stone-600">
              <Video size={12} />
              <span className="text-[10px] font-semibold tracking-widest uppercase">
                Duration
              </span>
            </div>

            <p className="text-sm text-stone-300">
              {formatDuration(startTime, endTime)}
            </p>
          </div>
        </div>

        {/* Feedback Summary */}
        {feedback?.summary && (
          <div className="rounded-xl border border-white/10 bg-[#141417] px-4 py-3 flex flex-col gap-1.5">
            <p className="text-[10px] font-semibold text-stone-600 tracking-widest uppercase">
              AI Feedback
            </p>

            <p className="text-xs text-stone-400 font-light leading-relaxed line-clamp-2">
              {feedback.summary}
            </p>
          </div>
        )}

        {/* Actions */}
        {(streamCallId || recordingUrl || feedback) && (
          <div className="flex flex-wrap gap-2">
            {!isPast &&
              streamCallId &&
              isUpcoming && (
                <Button
                  variant="blue"
                  size="sm"
                  className="gap-2"
                  asChild
                >
                  <Link href={`/call/${streamCallId}`}>
                    <Video size={13} />
                    Join Call
                  </Link>
                </Button>
              )}

            {recordingUrl && (
              <Button size="sm" asChild
              variant="outline">
                <a
                  href={recordingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                 ● Recording
                </a>
              </Button>
            )}

            {feedback && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="
                    gap-1.5
                    border-cyan-400/20
                    text-cyan-400
                    hover:bg-cyan-400/10
                    hover:border-cyan-400/40
                  "
                  onClick={() =>
                    setFeedbackOpen(true)
                  }
                >
                  <Sparkles size={12} />
                  Full Feedback
                </Button>

                <Badge
                  variant="outline"
                  className={
                    RATING_STYLES[
                      feedback.overallRating
                    ]
                  }
                >
                  {
                    RATING_LABEL[
                      feedback.overallRating
                    ]
                  }{" "}
                  Performance
                </Badge>
              </>
            )}
          </div>
        )}
      </article>
    </>
  );
};

export default AppointmentCard;