export const X_HANDLE = "SeattleCigars";
export const X_USER_ID = "1067975870868930560";

export const xProfileUrl = `https://x.com/${X_HANDLE}`;
export const xDmUrl = `https://x.com/messages/compose?recipient_id=${X_USER_ID}`;

export function xStatusUrl(tweetId: string) {
  return `https://x.com/${X_HANDLE}/status/${tweetId}`;
}

export function buildDeskMessage(input: {
  name: string;
  handle?: string;
  state?: string;
  lines: string[];
  notes?: string;
}) {
  const handle = input.handle?.replace(/^@/, "").trim();
  const parts = [
    `Cigar Concierge request from ${input.name.trim() || "a client"}`,
    handle ? `X: @${handle}` : null,
    input.state ? `Ship to: ${input.state}` : null,
    "",
    ...input.lines,
    input.notes?.trim() ? `\nNotes: ${input.notes.trim()}` : null,
  ].filter((line): line is string => line !== null);
  return parts.join("\n");
}
