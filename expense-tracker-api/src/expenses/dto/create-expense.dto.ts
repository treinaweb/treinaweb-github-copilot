import { z } from 'zod';
import { ExpenseCategory } from '@prisma/client';

export const createExpenseSchema = z.object({
  amount: z
    .number({ coerce: true }) // Added coerce option to handle string to number conversion
    .positive('Amount must be a positive number')
    .transform((val) => parseFloat(val.toFixed(2))),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(255, 'Description cannot exceed 255 characters'),
  category: z.enum(
    [
      ExpenseCategory.GROCERIES,
      ExpenseCategory.LEISURE,
      ExpenseCategory.ELECTRONICS,
      ExpenseCategory.UTILITIES,
      ExpenseCategory.CLOTHING,
      ExpenseCategory.HEALTH,
      ExpenseCategory.OTHERS,
    ],
    {
      errorMap: () => ({ message: 'Invalid category' }),
    },
  ),
});

export type CreateExpenseDto = z.infer<typeof createExpenseSchema>;
