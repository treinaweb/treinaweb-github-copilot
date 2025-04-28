# Expense Tracker API Project Requirements

## Project Overview

The Expense Tracker API is a RESTful web service that allows users to manage their expenses. It provides endpoints for creating, reading, updating, and deleting expense records. The API is designed to be simple, efficient, and easy to use.

## Functional Requirements

1. **User Authentication**
   - Users must be able to register and log in to the system.
   - Passwords must be securely hashed and stored.
2. **Expense Management**
   - Users must be able to create, read, update, and delete their expense records.
   - Each expense record must include the following fields:
     - Amount
     - Description
     - Creation date
     - Category
       - GROCERIES
       - LEISURE
       - ELECTRONICS
       - UTILITIES
       - CLOTHING
       - HEALTH
       - OTHERS
     - User ID (to associate the expense with a specific user)
   - Users must be able to filter their expenses by date range and category.
   - Users can only view their own expenses.
3. **Error Handling**
   - The API must return appropriate HTTP status codes for different scenarios (e.g., 200 for success, 400 for bad request, 401 for unauthorized, 404 for not found).
   - The API must return meaningful error messages in the response body.
4. **Data Storage**
   - All data must be stored in a PostgreSQL database.
   - The database schema must be designed to efficiently store and retrieve expense records.
   - The database must be properly indexed to optimize query performance.

## Non-Functional Requirements

1. **Performance**
   - The API must be able to handle at least 100 concurrent users without significant performance degradation.
   - Response times for API requests should be under 200ms for most operations.
2. **Security**
   - The API must implement rate limiting to prevent abuse.
3. **Stack**
   - The API must be build using Fastify.
   - The database must be accessed using Prisma.
   - The validation must be handled using Zod.
