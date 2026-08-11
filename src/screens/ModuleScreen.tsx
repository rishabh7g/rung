/**
 * Module list — a child of the active rung, reached from the Ladder with a back header
 * (PRD-design §4). Collapse/expand, production dots and scroll restore are #88.
 */
import { useParams } from 'react-router-dom';
import { ScreenStub } from './ScreenStub.tsx';

export default function ModuleScreen() {
  const { id = '' } = useParams();

  return <ScreenStub title={`Module ${id}`} ticket="#88" />;
}
