import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      // Add explicit type annotation to handle the 'any' return type from Zod
      const parsed = this.schema.parse(value) as unknown;
      return parsed;
    } catch (error) {
      if (error instanceof ZodError) {
        // Transform Zod validation errors into a structured format
        const formattedErrors = this.formatZodError(error);
        throw new BadRequestException({
          message: 'Validation error',
          errors: formattedErrors,
        });
      }
      throw error;
    }
  }

  private formatZodError(error: ZodError) {
    const errors: Record<string, string[]> = {};

    error.errors.forEach((err) => {
      const path = err.path.join('.');
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(err.message);
    });

    return errors;
  }
}
