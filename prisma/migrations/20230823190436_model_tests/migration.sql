-- CreateTable
CREATE TABLE `Tests` (
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
ALTER TABLE `Tests` ADD CONSTRAINT `Tests_id_module_fkey` FOREIGN KEY (`id_module`) REFERENCES `Module`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
