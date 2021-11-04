<?php

namespace WbpProductTabs\Core\Content\WbpProductTabsTranslation;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;

class WbpProductTabsTranslationEntity extends Entity
{
    use EntityIdTrait;

    protected $productTabId;
    protected $languageId;
    protected $tabsName;
    protected $data;

    public function getProductTabId()
    {
        return $this->productTabId;
    }

    public function setProductTabId($productTabId)
    {
        $this->productTabId = $productTabId;
    }

    public function getLanguageId()
    {
        return $this->languageId;
    }

    public function setLanguageId($languageId)
    {
        $this->languageId = $languageId;
    }

    public function getTabsName()
    {
        return $this->tabsName;
    }

    public function setTabsName(string $tabsName)
    {
        $this->tabsName = $tabsName;
    }

    public function getData()
    {
        return $this->data;
    }

    public function setData($data)
    {
        return $this->data = $data;
    }

}