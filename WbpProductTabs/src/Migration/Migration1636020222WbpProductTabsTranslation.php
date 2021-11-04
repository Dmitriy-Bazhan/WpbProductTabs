<?php declare(strict_types=1);

namespace WbpProductTabs\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1636020222WbpProductTabsTranslation extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1636020222;
    }

    public function update(Connection $connection): void
    {
        $connection->executeStatement("
            CREATE TABLE IF NOT EXISTS `wbp_product_tabs_translation` (
                `product_tab_id` BINARY (16) NOT NULL,
                `language_id` BINARY (16) NOT NULL,
                `tabs_name` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
                `data` TEXT DEFAULT NULL,
                `created_at` datetime(3) NOT NULL,
                `updated_at` datetime(3) DEFAULT NULL,
                PRIMARY KEY ( `id` )
            ) ENGINE = INNODB DEFAULT CHARSET = utf8;
        ");
    }

    public function updateDestructive(Connection $connection): void
    {
    }
}
