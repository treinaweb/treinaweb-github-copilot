import { z } from 'zod';
import { ExpenseCategory } from '@prisma/client';

export const expenseFilterSchema = z.object({
  category: z
    .enum(
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
    )
    .optional(),
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Invalid date format (YYYY-MM-DD)',
    })
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), {
      message: 'Invalid date',
    })
    .optional(),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Invalid date format (YYYY-MM-DD)',
    })
    .transform((val) => {
      const date = new Date(val);
      // Set time to end of day for inclusive search
      date.setHours(23, 59, 59, 999);
      return date;
    })
    .refine((date) => !isNaN(date.getTime()), {
      message: 'Invalid date',
    })
    .optional(),
});

export type ExpenseFilterDto = z.infer<typeof expenseFilterSchema>;
