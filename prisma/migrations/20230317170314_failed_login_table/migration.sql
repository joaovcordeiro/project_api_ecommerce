-- CreateTable
CREATE TABLE "failed_login" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "failed_login_pkey" PRIMARY KEY ("id")
);
