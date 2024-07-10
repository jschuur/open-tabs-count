export const updateTriggers = ['tabCreated', 'tabRemoved', 'cron', 'restart'] as const;

export type UpdateTrigger = (typeof updateTriggers)[number];
