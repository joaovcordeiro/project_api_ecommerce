import supertest from "supertest";
import app from "../src/index.js";
import { prisma } from "../src/config/database.js";
import bcrypt from "bcryptjs";

const agent = supertest(app);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "user" CASCADE;`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Auth", () => {
  describe("Registration", () => {
    it("should be able to create a new user with valid name, email and password", async () => {
      const response = await agent.post("auth/register").send({
        name: "John Doe",
        email: "test@example.com",
        password: "1@3_5*7&",
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("user");
      expect(response.body.user).toHaveProperty("id");
      expect(response.body.name).toBe("John Doe");
      expect(response.body.email).toBe("test@example.com");

      const user = await prisma.user.findUnique({
        where: {
          email: "test@example.com",
        },
      });

      expect(user).toBeTruthy();
      expect(user?.name).toBe("John Doe");
      expect(user?.email).toBe("test@example.com");
      expect(await bcrypt.compare("1@3_5*7&", user?.password || "")).toBe(true);
    });

    it("should not be able to create a new user with an already registered email", async () => {
      const body = {
        name: "John Doe",
        email: "test@example.com",
        password: "1@3_5*7&",
      };

      await agent.post("auth/register").send(body);

      const response = await agent.post("auth/register").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("User already exists");
    });

    it("should not be able to create a new user with an invalid email", async () => {
      const response = await agent.post("auth/register").send({
        name: "John Doe",
        email: "testexample.com",
        password: "1@3_5*7&",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Invalid email");
    });

    it("should not be able to create a new user with an invalid password", async () => {
      const response = await agent.post("auth/register").send({
        name: "John Doe",
        email: "test@example.com",
        password: "12345",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Invalid password");
    });

    it("should not be able to create a new user with an invalid name", async () => {
      const response = await agent.post("auth/register").send({
        name: "",
        email: "test@example.com",
        password: "1@3_5*7&",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Invalid name");
    });
  });
});

// Testar se é possível criar um novo usuário com nome, email e senha válidos;
// Testar se o sistema impede o cadastro de um usuário com um email já cadastrado;
// Testar se o sistema impede o cadastro de um usuário com um email inválido;
// Testar se é possível fazer login com um email e senha válidos;
// Testar se o sistema impede o login com um email inválido;
// Testar se o sistema impede o login com uma senha inválida;
// Testar se o sistema retorna um token de autenticação válido após o login;
// Testar se o sistema impede o acesso a rotas protegidas sem um token de autenticação válido;
// Testar se o sistema permite o acesso a rotas protegidas com um token de autenticação válido.
