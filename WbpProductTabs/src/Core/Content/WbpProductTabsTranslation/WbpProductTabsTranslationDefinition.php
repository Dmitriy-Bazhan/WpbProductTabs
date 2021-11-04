<?php
namespace WbpProductTabs\Core\Content\WbpProductTabsTranslation;

use Shopware\Core\Content\Product\ProductDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\CreatedAtField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\ApiAware;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IntField;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\AllowHtml;
use Shopware\Core\Framework\DataAbstractionLayer\Field\LongTextField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\UpdatedAtField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use WbpProductTabs\Core\Content\WbpProductTabs\WbpProductTabsEntity;

class WbpProductTabsTranslationDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'wbp_product_tabs_translation';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getCollectionClass(): string
    {
        return WbpProductTabsTranslationCollection::class;
    }

    public function getEntityClass(): string
    {
        return WbpProductTabsTranslationEntity::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('product_tab_id', 'productTabId'))->addFlags(new ApiAware(), new Required()),
            (new IdField('language_id', 'languageId'))->addFlags(new ApiAware(), new Required()),
            (new StringField('tabs_name', 'tabsName'))->addFlags(new ApiAware(), new Required()),
            (new LongTextField('data', 'data'))->addFlags(new ApiAware(), new AllowHtml()),
            (new CreatedAtField()),
            (new UpdatedAtField()),

            new ManyToOneAssociationField('productTab', 'product_tab_id', WbpProductTabsEntity::class, 'id'),
        ]);
    }
}