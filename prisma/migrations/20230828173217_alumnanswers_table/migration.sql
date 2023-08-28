-- CreateTable
CREATE TABLE `AlumnAnswer` (
    `id` VARCHAR(191) NOT NULL,
    `id_alumn` VARCHAR(191) NOT NULL,
    `id_task` VARCHAR(191) NOT NULL,
    `alumn_answer` VARCHAR(191) NOT NULL,
    `is_right` BOOLEAN NOT NULL,
    `answer_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AlumnAnswer` ADD CONSTRAINT `AlumnAnswer_id_alumn_fkey` FOREIGN KEY (`id_alumn`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlumnAnswer` ADD CONSTRAINT `AlumnAnswer_id_task_fkey` FOREIGN KEY (`id_task`) REFERENCES `Tasks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
