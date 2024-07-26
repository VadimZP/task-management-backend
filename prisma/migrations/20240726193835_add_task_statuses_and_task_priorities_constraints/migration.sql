ALTER TABLE task_statuses
ADD CONSTRAINT "chk_statusName_valid"
CHECK (
  (id = 1 AND "statusName" = 'backlog') OR
  (id = 2 AND "statusName" = 'in progress') OR
  (id = 3 AND "statusName" = 'done')
);

ALTER TABLE task_priorities
ADD CONSTRAINT "chk_priorityName_valid"
CHECK (
  (id = 1 AND "priorityName" = 'low') OR
  (id = 2 AND "priorityName" = 'medium') OR
  (id = 3 AND "priorityName" = 'high')
);