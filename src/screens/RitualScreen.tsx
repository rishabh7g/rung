/**
 * The exit ritual — write → check (guidance only) → confirm, each step titled in the course's
 * own words (`ritual.stepTitle.*`, which is why no title is written here — shell purity, #80).
 * The arc is #100, the press-and-hold confirmation #101. A child of the rung, so it carries a
 * back header.
 */
import { ScreenStub } from './ScreenStub.tsx';

export default function RitualScreen() {
  return <ScreenStub title="Exit ritual" ticket="#100" />;
}
