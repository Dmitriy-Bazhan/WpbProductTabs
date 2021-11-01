<?php

namespace WbpProductTabs\Controller\Api;


use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\Uuid\Uuid;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Storefront\Framework\Cache\Annotation\HttpCache;
use Shopware\Core\Framework\Routing\Annotation\RouteScope;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @RouteScope(scopes={"api"})
 */
class WbpProductTabsApiController extends AbstractController
{
    private $productTabsRepository;

    public function __construct(
        EntityRepositoryInterface $productTabsRepository
    )
    {
        $this->productTabsRepository = $productTabsRepository;
    }

    /**
     * @Route("/api/wbp-product-tabs/set-default-tabs", name="api.action.wbpproducttabs.setdefaulttabs", methods={"POST"})
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function setDefaultTabs(Request $request, Context $context): JsonResponse
    {
        $params = $request->request->all();

        if (!isset($params['productId'])) {
            return new JsonResponse([
                'state' => 'failed',
                'error' => 'Configuration invalid'
            ]);
        }

        $id = Uuid::randomHex();

        $this->productTabsRepository->create([
            [
                'id' => $id,
                'productId' => $params['productId'],
                'tabsName' => 'Reviews',
                'data' => null,
                'isEnabled' => 1,
                'createdAt' => date('Y-m-d H:i:s'),
                'updatedAt' => null,
            ]
        ], $context);

        $id = Uuid::randomHex();

        $this->productTabsRepository->create([
            [
                'id' => $id,
                'productId' => $params['productId'],
                'tabsName' => 'Description',
                'data' => null,
                'isEnabled' => 1,
                'createdAt' => date('Y-m-d H:i:s'),
                'updatedAt' => null,
            ]
        ], $context);

        return new JsonResponse([
            'success' => 'Default tabs created'
        ]);
    }


    /**
     * @Route("/api/wbp-product-tabs/change-visibility", name="api.action.wbpproducttabs.changevisibility", methods={"POST"})
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function changeVisibility(Request $request, Context $context): JsonResponse
    {
        $params = $request->request->all();

        if (!isset($params['tabsId'])) {
            return new JsonResponse([
                'state' => 'failed',
                'error' => 'Configuration invalid'
            ]);
        }

        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('id', $params['tabsId']));
        $tabsId = $this->productTabsRepository->searchIds($criteria, $context)->firstId();
        $tab = $this->productTabsRepository->search($criteria, $context)->first();

        if ($tab->isEnabled == 0) {
            $this->productTabsRepository->update([
                [
                    'id' => $tabsId,
                    'isEnabled' => 1
                ]
            ], $context);
        } else {
            $this->productTabsRepository->update([
                [
                    'id' => $tabsId,
                    'isEnabled' => 0
                ]
            ], $context);
        }


        return new JsonResponse([
            'success' => 'Visibility changed'
        ]);
    }

    /**
     * @Route("/api/wbp-product-tabs/set-new-tab", name="api.action.wbpproducttabs.setnewtab", methods={"POST"})
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function setNewTab(Request $request, Context $context): JsonResponse
    {
        $params = $request->request->all();

        if(is_null($params['newTab']['tabsName']) || is_null($params['newTab']['data']) || is_null($params['newTab']['productId'])){
            return new JsonResponse([
                'state' => 'failed',
                'error' => 'Configuration invalid'
            ]);
        }

        $id = Uuid::randomHex();

        $this->productTabsRepository->create([
            [
                'id' => $id,
                'productId' => $params['newTab']['productId'],
                'tabsName' => $params['newTab']['tabsName'],
                'data' => $params['newTab']['data'],
                'isEnabled' => 1,
                'createdAt' => date('Y-m-d H:i:s'),
                'updatedAt' => null,
            ]
        ], $context);


        return new JsonResponse([
            'success' => 'Ok'
        ]);
    }

    /**
     * @Route("/api/wbp-product-tabs/remove-tab", name="api.action.wbpproducttabs.removetab", methods={"POST"})
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function removeTab(Request $request, Context $context): JsonResponse
    {
        $params = $request->request->all();

        if(is_null($params['id'])){
            return new JsonResponse([
                'state' => 'failed',
                'error' => 'Configuration invalid'
            ]);
        }

        $this->productTabsRepository->delete([
            [
                'id' => $params['id']
            ]
        ], $context);

        return new JsonResponse([
            'success' => 'Ok'
        ]);
    }
}