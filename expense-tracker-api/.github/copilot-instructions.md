# Expense Tracker API

The Expense Tracker API is a RESTful service designed to allow users to manage their personal expenses securely and efficiently. Users will be able to register, authenticate, and perform CRUD operations on their expense records. Each expense includes information such as amount, description, creation date, category, and association to a specific user.
The final goal is to deliver a fast, secure, and easy-to-use API that can handle a minimum of 100 concurrent users with low response times and provide strong validation and error handling mechanisms.

## Technologies Used

- **NestJS**: For building a scalable and maintainable server-side application.
- **Prisma ORM**: For interacting with a PostgreSQL database efficiently and safely.
- **Zod**: For robust schema validation of incoming data.
- **PostgreSQL**: As the relational database to persist all application data.

## Recommended Project Structure

```plaintext
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── strategies/
│   │   └── jwt.strategy.ts
├── users/
│   ├── users.service.ts
│   ├── users.module.ts
│   └── users.entity.ts
├── expenses/
│   ├── expenses.controller.ts
│   ├── expenses.service.ts
│   ├── expenses.module.ts
│   ├── dto/
│   │   ├── create-expense.dto.ts
│   │   ├── update-expense.dto.ts
│   ├── entities/
│   │   └── expense.entity.ts
├── common/
│   ├── filters/
│   │   └── http-exception.filter.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   ├── pipes/
│   │   └── validation.pipe.ts
├── prisma/
│   ├── prisma.module.ts
│   ├── prisma.service.ts
├── main.ts
├── app.module.ts
├── app.controller.ts
├── app.service.ts
prisma/
├── schema.prisma
```

## Best Practices by Technology

### NestJS

- Use DTOs (Data Transfer Objects) for all input and output data structures.
- Apply modularization: group related logic into separate modules (e.g., AuthModule, ExpenseModule).
- Use guards for authentication and authorization (e.g., JwtAuthGuard).
- Apply interceptors and filters for centralized error handling and response transformation.
- Follow the SOLID principles and maintain a clear service/controller separation.
- Configure global pipes for validation and error handling.

### Prisma

- Always use schema-first development: define the prisma/schema.prisma file before generating the client.
- Use prisma.service.ts to manage a singleton instance of PrismaClient across the application.
- Handle Prisma exceptions with a custom exception filter that maps database errors to meaningful HTTP errors.
- Leverage Prisma Relations properly to associate users with expenses.
- Add indexes in the Prisma schema where necessary to optimize queries (especially for userId, category, createdAt fields).
- Use transactions when multiple database operations must succeed or fail together.

### Zod

- Define Zod schemas for all incoming request bodies instead of relying only on class-validator.
- Use zod.createDto style objects if integrating with NestJS DTOs.
- Validate incoming data early (before reaching the service layer).
- Create centralized schemas for shared validations, like common parameters (e.g., filters by date or category).
- Use refinements for complex field-level validation, such as ensuring dates are not in the future or amounts are positive.

### General Security Practices

- Always hash passwords using bcrypt before storing in the database.
- Use JWT (JSON Web Tokens) for authentication.
- Validate all user inputs to prevent injection attacks.
- Store sensitive environment variables like database URL and JWT secrets in a .env file and never commit them to GitHub.
- Configure CORS policies appropriately if the API will be accessed from a frontend application.

### Additional Notes

- Ensure consistent error handling throughout the app with meaningful messages and status codes.
- Maintain API documentation (e.g., Swagger with NestJS @nestjs/swagger if applicable).
- Write unit and integration tests for critical parts like authentication and expense management.
- Implement pagination and filtering on the expense listing endpoint to ensure performance at scale.


