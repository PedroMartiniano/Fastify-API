/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_userId_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `status` INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE `Post`;

-- CreateTable
CREATE TABLE `Staff` (
    `id` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `Staff_cpf_key`(`cpf`),
    UNIQUE INDEX `Staff_email_key`(`email`),
    UNIQUE INDEX `Staff_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
