import { ContextType } from '../types';
import db from './db.json';

export default function context({ req }: { req: ContextType }) {
  return {
    config: req.config,
    ip: req.ip,
    db,
  };
}
