<?php

namespace WbpProductTabs\Subscriber;

use Psr\Container\ContainerInterface;
use Shopware\Core\Framework\Struct\ArrayEntity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\Struct\ArrayStruct;
use Shopware\Core\Framework\Uuid\Uuid;
use Shopware\Storefront\Page\Product\ProductPageCriteriaEvent;
use Shopware\Storefront\Page\Product\ProductPageLoadedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;

class WbpProductTabsSubscriber implements EventSubscriberInterface
{
    private $productTabsRepository;


    public function __construct(
        EntityRepositoryInterface $productTabsRepository
    )
    {
        $this->productTabsRepository = $productTabsRepository;
    }

    /**
     * @return string[]
     */
    public static function getSubscribedEvents()
    {
        return [
            ProductPageLoadedEvent::class => 'onProductPage',
        ];
    }

    /**
     * @param ProductPageLoadedEvent $event
     */
    public function onProductPage(ProductPageLoadedEvent $event)
    {
        $context = $event->getContext();
        $productId = $event->getPage()->getProduct()->id;


        //Todo: это для демо даты. Что бы на продукты с разными размерами тоже расостронялись настройки. Пока не ясно, как будет работать с продукцией клиента
        $parentProductId = $event->getPage()->getProduct()->getParentId();
        if(!is_null($parentProductId)) {
            $productId = $parentProductId;
        }

        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('productId', $productId));

        $tabs = $this->productTabsRepository->search($criteria, $context)->getElements();

        if (count($tabs) > 0) {
            foreach ($tabs as $tab) {
                if ($tab->tabsName == 'Reviews') {
                    $event->getPage()->addExtension('reviews', new ArrayStruct([
                        'visibility' => $tab->isEnabled]));
                }

                if ($tab->tabsName == 'Description') {
                    $event->getPage()->addExtension('description', new ArrayStruct([
                        'visibility' => $tab->isEnabled]));
                }
            }
        }else{
            //default visibility
            $event->getPage()->addExtensions([
                'reviews' => new ArrayStruct(['visibility' => 1]),
                'description' => new ArrayStruct(['visibility' => 1]),
            ]);
        }
    }
}