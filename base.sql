CREATE TABLE "users"(
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "username" VARCHAR(225),
    "email" VARCHAR(225) UNIQUE,
    "password" VARCHAR(225),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);

CREATE TABLE "profile"(
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "userId" INTEGER,
    "image" VARCHAR(225),
    "fullName" VARCHAR(225),
    "phoneNumber" VARCHAR(225),
    "gender" BOOLEAN,
    "nasionality" VARCHAR(225),
    "birthDate" DATE,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);

CREATE TABLE "products"(
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "image" VARCHAR(225),
    "name" VARCHAR(225),
    "description" TEXT,
    "categoryId" INTEGER,
    "price" DECIMAL(10, 2),
    "skuId" INTEGER,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
)

CREATE TABLE "skuProduct" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "sku" VARCHAR(50),
    "width" INTEGER,
    "weight" INTEGER,
    "length" INTEGER,
    "height" INTEGER,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
)

CREATE TABLE "categories" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NULL
);

