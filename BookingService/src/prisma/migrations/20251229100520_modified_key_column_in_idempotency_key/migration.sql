/*
  Warnings:

  - You are about to drop the column `key` on the `idempotency_key` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idem_key]` on the table `idempotency_key` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idem_key` to the `idempotency_key` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `idempotency_key_key_key` ON `idempotency_key`;

-- AlterTable
ALTER TABLE `idempotency_key` DROP COLUMN `key`,
    ADD COLUMN `idem_key` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `idempotency_key_idem_key_key` ON `idempotency_key`(`idem_key`);
