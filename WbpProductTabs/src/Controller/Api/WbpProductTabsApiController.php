<?php

namespace WbpProductTabs\Controller\Api;


use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Sorting\FieldSorting;
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
                'position' => 1,
                'tabsName' => 'Description',
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
                'position' => 2,
                'tabsName' => 'Reviews',
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

        if (is_null($params['newTab']['tabsName']) || is_null($params['newTab']['data']) || is_null($params['newTab']['productId'])) {
            return new JsonResponse([
                'state' => 'failed',
                'error' => 'Configuration invalid'
            ]);
        }

        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('productId', $params['newTab']['productId']));
        $criteria->addSorting(new FieldSorting('position', FieldSorting::ASCENDING));
        $element = $this->productTabsRepository->search($criteria, $context)->last();


        $id = Uuid::randomHex();

        $this->productTabsRepository->create([
            [
                'id' => $id,
                'productId' => $params['newTab']['productId'],
                'position' => ++$element->position,
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

        if (is_null($params['id'])) {
            return new JsonResponse([
                'state' => 'failed',
                'error' => 'Configuration invalid'
            ]);
        }

        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('id', $params['id']));
        $productId = $this->productTabsRepository->search($criteria, $context)->first()->productId;

        $this->productTabsRepository->delete([
            [
                'id' => $params['id']
            ]
        ], $context);

        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('productId', $productId));
        $criteria->addSorting(new FieldSorting('position', FieldSorting::ASCENDING));
        $elements = $this->productTabsRepository->search($criteria, $context)->getElements();

        $i = 0;
        foreach ($elements as $element) {
            $i++;
            $this->productTabsRepository->update([
                [
                    'id' => $element->id,
                    'position' => $i
                ]
            ], $context);
        }


        return new JsonResponse([
            'success' => 'Ok'
        ]);
    }

    /**
     * @Route("/api/wbp-product-tabs/edit-tab", name="api.action.wbpproducttabs.edittab", methods={"POST"})
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function editTab(Request $request, Context $context): JsonResponse
    {
        $params = $request->request->all();

        if (!isset($params['tab']['id'])) {
            return new JsonResponse([
                'state' => 'failed',
                'error' => 'Configuration invalid'
            ]);
        }

        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('id', $params['tab']['id']));
        $tabsId = $this->productTabsRepository->searchIds($criteria, $context)->firstId();

        $this->productTabsRepository->update([
            [
                'id' => $tabsId,
                'tabsName' => $params['tab']['tabsName'],
                'data' => $params['tab']['data']
            ]
        ], $context);


        return new JsonResponse([
            'success' => 'Visibility changed'
        ]);
    }

    /**
     * @Route("/api/wbp-product-tabs/position-down", name="api.action.wbpproducttabs.positiondown", methods={"POST"})
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function positionDown(Request $request, Context $context): JsonResponse
    {
        $params = $request->request->all();

        if (is_null($params['id'])) {
            return new JsonResponse([
                'state' => 'failed',
                'error' => 'Configuration invalid'
            ]);
        }


        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('id', $params['id']));
        $tab = $this->productTabsRepository->search($criteria, $context)->first();
        $oldPosition = $tab->position - 1;

        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('productId', $params['productId']));
        $criteria->addFilter(new EqualsFilter('position', $oldPosition));
        $changesTab = $this->productTabsRepository->search($criteria, $context)->first();

        $this->productTabsRepository->update([
            [
                'id' => $changesTab->id,
                'position' => $tab->position
            ]
        ], $context);


        $this->productTabsRepository->update([
            [
                'id' => $tab->id,
                'position' => $changesTab->position
            ]
        ], $context);


        return new JsonResponse([
            'success' => 'Visibility changed'
        ]);
    }

    /**
     * @Route("/api/wbp-product-tabs/position-up", name="api.action.wbpproducttabs.positionup", methods={"POST"})
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function positionUp(Request $request, Context $context): JsonResponse
    {
        $params = $request->request->all();

        if (is_null($params['id'])) {
            return new JsonResponse([
                'state' => 'failed',
                'error' => 'Configuration invalid'
            ]);
        }


        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('id', $params['id']));
        $tab = $this->productTabsRepository->search($criteria, $context)->first();
        $oldPosition = $tab->position + 1;

        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('productId', $params['productId']));
        $criteria->addFilter(new EqualsFilter('position', $oldPosition));
        $changesTab = $this->productTabsRepository->search($criteria, $context)->first();

        $this->productTabsRepository->update([
            [
                'id' => $changesTab->id,
                'position' => $tab->position
            ]
        ], $context);


        $this->productTabsRepository->update([
            [
                'id' => $tab->id,
                'position' => $changesTab->position
            ]
        ], $context);


        return new JsonResponse([
            'success' => 'Visibility changed'
        ]);
    }
}