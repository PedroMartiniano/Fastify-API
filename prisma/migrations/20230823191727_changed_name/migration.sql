/*
  Warnings:

  - You are about to drop the `Tests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Tests` DROP FOREIGN KEY `Tests_id_module_fkey`;

-- DropTable
DROP TABLE `Tests`;

-- CreateTable
CREATE TABLE `Tasks` (
    `id` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `answers` VARCHAR(191) NOT NULL,
    `right_answer` VARCHAR(191) NOT NULL,
    `id_module` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_id_module_fkey` FOREIGN KEY (`id_module`) REFERENCES `Module`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
