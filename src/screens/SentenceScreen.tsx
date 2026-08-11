/**
 * Sentence Detail — the deconstruction, in the frozen section order [D10]. Built in #89.
 */
import { useParams } from 'react-router-dom';
import { ScreenStub } from './ScreenStub.tsx';

export default function SentenceScreen() {
  const { id = '' } = useParams();

  return <ScreenStub title={`Sentence ${id}`} ticket="#89" />;
}
