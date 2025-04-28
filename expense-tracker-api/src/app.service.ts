import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Welcome to the Expense Tracker API',
      version: '1.0.0',
      documentation: '/api-docs',
      endpoints: {
        auth: [
          {
            method: 'POST',
            path: '/api/auth/register',
            description: 'Register a new user',
          },
          {
            method: 'POST',
            path: '/api/auth/login',
            description: 'Login a user',
          },
        ],
        expenses: [
          {
            method: 'GET',
            path: '/api/expenses',
            description: 'Get all expenses',
          },
          {
            method: 'POST',
            path: '/api/expenses',
            description: 'Create a new expense',
          },
          {
            method: 'GET',
            path: '/api/expenses/:id',
            description: 'Get an expense by ID',
          },
          {
            method: 'PUT',
            path: '/api/expenses/:id',
            description: 'Update an expense by ID',
          },
          {
            method: 'DELETE',
            path: '/api/expenses/:id',
            description: 'Delete an expense by ID',
          },
        ],
      },
    };
  }
}
