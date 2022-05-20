import db from './db.json';

export default function context({ req }) {
  return {
    config: req.config,
    ip: req.ip,
    db,
  };
}
