-- GRE & GMAT Prep Hub — database schema
-- Run with: psql -d gre_gmat_prep_hub -f server/models/schema.sql

CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(120) NOT NULL,
  email         VARCHAR(160) UNIQUE NOT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS questions (
  id              SERIAL PRIMARY KEY,
  exam            VARCHAR(10)  NOT NULL CHECK (exam IN ('GRE', 'GMAT')),
  section         VARCHAR(60)  NOT NULL,       -- e.g. 'Verbal Reasoning', 'Quantitative Reasoning', 'Data Insights'
  subtype         VARCHAR(60),                 -- e.g. 'Sentence Equivalence', 'Data Sufficiency'
  difficulty      VARCHAR(20)  NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  prompt          TEXT         NOT NULL,
  options         JSONB        NOT NULL,       -- array of answer choice strings
  correct_options JSONB        NOT NULL,       -- array of correct choice strings (supports multi-answer)
  explanation     TEXT,
  created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS attempts (
  id                SERIAL PRIMARY KEY,
  user_id           VARCHAR(60) NOT NULL,     -- string id to allow demo/anon users without a users row
  section           VARCHAR(60) NOT NULL,
  score             INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
  total_questions   INTEGER NOT NULL,
  time_taken_sec    INTEGER NOT NULL,
  created_at        TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chatbot_logs (
  id          SERIAL PRIMARY KEY,
  user_id     VARCHAR(60),
  question    TEXT NOT NULL,
  context     TEXT,
  answer      TEXT NOT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_questions_section_difficulty ON questions (section, difficulty);
CREATE INDEX IF NOT EXISTS idx_attempts_user ON attempts (user_id);
