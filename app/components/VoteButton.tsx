"use client";

import { useState } from "react";

interface VoteButtonProps {
  dealId: number;
  initialVotes: number;
}

export default function VoteButton({ dealId, initialVotes }: VoteButtonProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleVote() {
    if (voted || loading) return;
    setLoading(true);
    // Optimistic update
    setVotes((v) => v + 1);
    setVoted(true);

    try {
      const res = await fetch(`/api/deals/${dealId}/vote`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setVotes(data.votes);
      } else {
        // Revert on error
        setVotes((v) => v - 1);
        setVoted(false);
      }
    } catch {
      setVotes((v) => v - 1);
      setVoted(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleVote}
      disabled={voted || loading}
      className={`flex items-center gap-1 text-xs font-medium transition-colors ${
        voted
          ? "text-pink-700 cursor-default"
          : "text-pink-500 hover:text-pink-700"
      }`}
      title={voted ? "Déjà voté !" : "Voter pour ce deal"}
    >
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 11l5-5 5 5H14v4h-4v-4H7z" />
      </svg>
      {votes}
    </button>
  );
}
