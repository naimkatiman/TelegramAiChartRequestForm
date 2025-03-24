-- Add reference_code column to bot_submissions table
ALTER TABLE bot_submissions 
ADD COLUMN reference_code TEXT;

-- Make it not null and unique (we'll add the constraint after updating existing rows)
UPDATE bot_submissions 
SET reference_code = 'BOT-' || SUBSTR(MD5(RANDOM()::TEXT), 1, 5) || '-' || SUBSTR(MD5(RANDOM()::TEXT), 1, 5)
WHERE reference_code IS NULL;

-- Add constraints
ALTER TABLE bot_submissions 
ALTER COLUMN reference_code SET NOT NULL;

ALTER TABLE bot_submissions 
ADD CONSTRAINT bot_submissions_reference_code_unique UNIQUE (reference_code);