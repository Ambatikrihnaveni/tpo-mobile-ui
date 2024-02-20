import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Meteor } from "meteor/meteor";
import i18next from "i18next";
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId";

// GraphQL Queries / Mutations
import ArchiveProductsMutation from '../../../../client/ui/graphql/services/modules/mutations/archiveProducts'
import ArchiveProductVariantsMutation from "../../../../client/ui/graphql/services/modules/mutations/archiveProductVariants";
import CloneProductsMutation from "../../../../client/ui/graphql/services/modules/mutations/cloneProducts";
import CloneProductVariantsMutation from "../../../../client/ui/graphql/services/modules/mutations/cloneProductVariants";
import CreateProductVariantMutation from "../../../../client/ui/graphql/services/modules/mutations/createProductVariant";
import LessonQuery from "../../../../client/ui/graphql/services/modules/queries/lesson";
import PublishProductsToCatalogMutation from "../../../../client/ui/graphql/services/modules/mutations/publishProductsToCatalog";
import UpdateLessonMutation from "../../../../client/ui/graphql/services/modules/mutations/updateLesson";
import DeleteLessonMutation from "../../../../client/ui/graphql/services/modules/mutations/deleteLesson";
import UpdateProductVariantMutation from "../../../../client/ui/graphql/services/modules/mutations/updateProductVariant";
import UpdateProductVariantPricesMutation from "../../../../client/ui/graphql/services/modules/mutations/updateProductVariantPrices";
import LessonsQuery from "../../../../client/ui/graphql/services/modules/queries/lessons";
import ModulesService from "../../../../client/ui/graphql/services/modules/modules-service";
import dragAndDropLessonMutation from "../../../../client/ui/graphql/services/modules/mutations/dragAndDropLesson";

/**
 * Restore an archived product
 * @param {Object} lesson Lesson object
 * @returns {undefined} No return
 */



export function handleLessonRestore(lesson) {
  Meteor.call("products/updateProductField", lesson._id, "isDeleted", false);
}

/**
 * @method useLesson
 * @summary useProduct hook
 * @param {Object} args input arguments
 * @param {String} args.lessonId Product Id to load product data for
 * @param {String} args.variantId Variant Id to load product data for
 * @param {String} args.optionId Option Id to load product data for
 * @returns {Object} Result containing the product and other helpers for managing that product
 */
function useLesson(args = {}) {

  const {
    Id: productIdProp,
    variantId: variantIdProp,
    optionId: optionIdProp,
    lessonId: lessonIdProp
  } = args;
  const [newMetaField, setNewMetaField] = useState({ key: "", value: "" });
  const navigate = useNavigate();
  const routeParams = useParams();
  const [updateLesson] = useMutation(UpdateLessonMutation);
  const [dragAndDropLesson] = useMutation(dragAndDropLessonMutation);
  const [deleteLesson] = useMutation(DeleteLessonMutation)
  const [archiveProducts] = useMutation(ArchiveProductsMutation);
  const [cloneProducts] = useMutation(CloneProductsMutation);
  const [createProductVariant] = useMutation(CreateProductVariantMutation);
  const [updateProductVariant] = useMutation(UpdateProductVariantMutation);
  const [cloneProductVariants] = useMutation(CloneProductVariantsMutation);
  const [archiveProductVariants] = useMutation(ArchiveProductVariantsMutation);
  const [publishProductsToCatalog] = useMutation(PublishProductsToCatalogMutation);
  const [updateProductVariantPrices] = useMutation(UpdateProductVariantPricesMutation);

  const { shopId: currentShopId } = useCurrentShopId();
  const productId = routeParams.product_id || productIdProp;
  const lessonId = lessonIdProp || routeParams.lessonId
  const variantId = routeParams.variantId || variantIdProp;
  const optionId = routeParams.optionId || optionIdProp;
  const shopId = currentShopId;
  let lessons = []


  const { data: lessonsQueryResult } = useQuery(LessonsQuery, {
    variables: {
      productId,
      shopId,
    },
    skip: !shopId
  });
  ;
  lessons = lessonsQueryResult?.lessons || [];



  const lessonssRefresh = async () => {
    const { data: lessonsQueryResult } = await ModulesService.getLessons(shopId, productId)
    lessons = lessonsQueryResult.data.lessons || [];
  }
  let lesson;
  let refetchLesson;
  if(lessonId) {
    const { data: lessonQueryResult, isLoading, refetch: queryRefetchLesson } = useQuery(LessonQuery, {
      variables: {
        productId,
        shopId,
        lessonId
      },
      skip: !shopId
    });
  
    const { lesson: queryLesson } = lessonQueryResult || {};
    lesson = queryLesson;
    refetchLesson = queryRefetchLesson;
  }
  
  let variant;
  let option;

  if (lesson && variantId) {
    variant = lesson.variants.find(({ _id }) => _id === variantId);
  }

  if (lesson && variantId && optionId) {
    option = variant.options.find(({ _id }) => _id === optionId);
  }



  const onPublishProduct = useCallback(async ({ lessonId: lessonIdLocal = lesson._id }) => {
    try {
      await publishProductsToCatalog({
        variables: {
          lessonIds: [lessonIdLocal]
        }
      });

      // Refetch on success to force a cache update
      refetchLesson();

      // enqueueSnackbar(i18next.t("admin.catalogProductPublishSuccess"), { variant: "success" });
    } catch (error) {
      //  enqueueSnackbar(error.message, { variant: "error" });
    }
  }, [lesson, publishProductsToCatalog, refetchLesson]);

  const onArchiveProduct = useCallback(async (productLocal, redirectUrl) => {
    try {
      await archiveProducts({ variables: { input: { shopId, productIds: [productLocal] } } });
      // enqueueSnackbar(i18next.t("productDetailEdit.archiveProductsSuccess"), { variant: "success" });
      navigate(redirectUrl);
    } catch (error) {
      //  enqueueSnackbar(i18next.t("productDetailEdit.archiveProductsFail"), { variant: "success" });
    }
  }, [
    archiveProducts,
    shopId
  ]);


  const onCloneProduct = useCallback(async (productLocal) => {
    try {
      await cloneProducts({ variables: { input: { shopId, productIds: [productLocal] } } });
      //  enqueueSnackbar(i18next.t("productDetailEdit.cloneProductSuccess"), { variant: "success" });
    } catch (error) {
      // enqueueSnackbar(i18next.t("productDetailEdit.cloneProductFail"), { variant: "error" });
    }
  }, [cloneProducts, shopId]);

  const onCreateVariant = useCallback(async ({
    parentId: parentIdLocal = lesson._id,
    shopId: shopIdLocal = shopId,
    redirectOnCreate = false
  }) => {
    try {
      const { data } = await createProductVariant({
        variables: {
          input: {
            productId: parentIdLocal,
            shopId: shopIdLocal
          }
        }
      });

      // Optionally redirect to the new variant or option on create
      if (redirectOnCreate) {
        if (data && parentIdLocal === product._id) {
          const newVariantId = data.createProductVariant && data.createProductVariant.variant && data.createProductVariant.variant._id;
          navigate(`/${shopIdLocal}/products/${lesson._id}/${newVariantId}`);
        } else {
          const newOptionId = data.createProductVariant && data.createProductVariant.variant && data.createProductVariant.variant._id;
          navigate(`/${shopIdLocal}/products/${lesson._id}/${parentIdLocal}/${newOptionId}`);
        }
      }

      // Refetch product data when we adda new variant
      refetchLesson();

      // Because of the way GraphQL and meteor interact when creating a new variant,
      // we can't immediately redirect a user to the new variant as GraphQL is too quick
      // and the meteor subscription isn't yet updated. Once this page has been updated
      // to use GraphQL for data fetching, add a redirect to the new variant when it's created
      // enqueueSnackbar(i18next.t("productDetailEdit.addVariant"), { variant: "success" });
    } catch (error) {
      // enqueueSnackbar(i18next.t("productDetailEdit.addVariantFail"), { variant: "error" });
    }
  }, [createProductVariant, lesson, refetchLesson, shopId]);

  const onToggleProductVisibility = useCallback(async () => {
    try {
      await updateLesson({
        variables: {
          input: {
            productId: product._id,
            shopId,
            product: {
              isVisible: !product.isVisible
            }
          }
        }
      });

      // enqueueSnackbar("Module updated successfully", { variant: "success" });
    } catch (error) {
      // enqueueSnackbar(i18next.t("Module update failed"), { variant: "error" });
    }
  }, [
    lesson,
    shopId,
    updateLesson
  ]);

  /**
   * @method onUpdateLesson
   * @param {Object} args
   * @param {Object} args.product Product fields to update
   * @param {Object} [args.productId] Product ID to update. Leave blank for current product.
   * @param {Object} [args.shopId] Shop ID of the product to update. Leave blank for current shop.
   */
  const onUpdateLesson = useCallback(async ({
    lesson: lessonLocal,
    lessonId: lessonIdLocal = lessonId,
    productId: productIdLocal = productId,
    shopId: shopIdLocal = shopId,
  }) => {
    try {
      await updateLesson({
        variables: {
          input: {
            lessonId: lessonIdLocal,
            shopId: shopIdLocal,
            name: lessonLocal.name, fea_img: lessonLocal.fea_img,
            lesson_content: lessonLocal.content,
            productId: productIdLocal
          }
        }
      });



      // Refetch on success to force a cache update
      lessonssRefresh()
      refetchLesson();

      // enqueueSnackbar("Module updated successfully", { variant: "success" });
    } catch (error) {
      // enqueueSnackbar("Module update failed", { variant: "error" });
    }
  }, [
    lesson,
    shopId,
    updateLesson,
    //enqueueSnackbar,
    refetchLesson
  ]);


  const onDragandDropLesson = useCallback(async ( productId, fromIndex,toIndex ) => {
    try {
      await dragAndDropLesson({
        variables: {
          input: {
            productId: productId,
            fromIndex: fromIndex,
            toIndex:toIndex
          }
        }
      });



      // Refetch on success to force a cache update
      lessonssRefresh()
      refetchLesson();

      // enqueueSnackbar("Module updated successfully", { variant: "success" });
    } catch (error) {
      // enqueueSnackbar("Module update failed", { variant: "error" });
    }
  }, [
    lesson,
    shopId,
    dragAndDropLesson,
    //enqueueSnackbar,
    refetchLesson
  ]);



  const onDeleteLesson = useCallback(async ({
    lessonId: lessonIdLocal
  }) => {
    try {
      await deleteLesson({
        variables: {
          input: {
            _id: lessonIdLocal,

          }
        }
      });



      // Refetch on success to force a cache update
      lessonssRefresh()
      refetchLesson();

      // enqueueSnackbar("Module updated successfully", { variant: "success" });
    } catch (error) {
      // enqueueSnackbar("Module update failed", { variant: "error" });
    }
  }, [
    lesson,
    deleteLesson,
    //enqueueSnackbar,
    lessonssRefresh,
    refetchLesson
  ]);

  const handleDeleteProductTag = useCallback(async ({
    tag: tagLocal,
    product: productLocal = product,
    productId: productIdLocal = product._id,
    shopId: shopIdLocal = shopId
  }) => {
    const filteredTagIds = productLocal.tags.nodes
      .filter(({ _id }) => _id !== tagLocal._id)
      .map(({ _id }) => _id);

    try {
      await updateLesson({
        variables: {
          input: {
            productId: productIdLocal,
            shopId: shopIdLocal,
            product: {
              tagIds: filteredTagIds
            }
          }
        }
      });

      //  enqueueSnackbar(i18next.t("productDetailEdit.removeProductTagSuccess"), { variant: "success" });
    } catch (error) {
      // enqueueSnackbar(i18next.t("productDetailEdit.removeProductTagFail"), { variant: "error" });
    }
  }, [

    lesson,
    shopId,
    updateLesson
  ]);


  const onUpdateProductVariant = useCallback(async ({
    variant: variantLocal,
    variantId: variantIdLocal,
    shopId: shopIdLocal = shopId
  }) => {
    try {
      await updateProductVariant({
        variables: {
          input: {
            shopId: shopIdLocal,
            variant: variantLocal,
            variantId: variantIdLocal
          }
        }
      });

      // Refetch on success to force a cache update
      refetchLesson();

      // enqueueSnackbar(i18next.t("productVariant.updateVariantSuccess"), { variant: "success" });
    } catch (error) {
      // enqueueSnackbar(i18next.t("productVariant.updateVariantFail"), { variant: "error" });
    }
  }, [shopId, updateProductVariant, refetchLesson]);

  const onUpdateProductVariantPrices = useCallback(async ({
    variantPrices: variantPricesLocal,
    variantId: variantIdLocal,
    shopId: shopIdLocal = shopId
  }) => {
    const { price, compareAtPrice } = variantPricesLocal;
    try {
      await updateProductVariantPrices({
        variables: {
          input: {
            shopId: shopIdLocal,
            prices: {
              price,
              compareAtPrice: compareAtPrice?.amount
            },
            variantId: variantIdLocal
          }
        }
      });

      // Refetch on success to force a cache update
      refetchLesson();

      //  enqueueSnackbar(i18next.t("productVariant.updateVariantPricesSuccess"), { variant: "success" });
    } catch (error) {
      //  enqueueSnackbar(i18next.t("productVariant.updateVariantPricesFail"), { variant: "error" });
    }
  }, [shopId, updateProductVariantPrices, refetchLesson]);

  const onToggleVariantVisibility = useCallback(async ({
    variant: variantLocal,
    shopId: shopIdLocal = shopId
  }) => {
    try {
      await updateProductVariant({
        variables: {
          input: {
            variantId: variantLocal._id,
            shopId: shopIdLocal,
            variant: {
              isVisible: !variantLocal.isVisible
            }
          }
        }
      });

      //  enqueueSnackbar(i18next.t("productDetailEdit.updateProductFieldSuccess"), { variant: "success" });
    } catch (error) {
      //  enqueueSnackbar(i18next.t("productDetailEdit.updateProductFieldFail"), { variant: "error" });
    }
  }, [shopId, updateProductVariant]);

  const onCloneProductVariants = useCallback(async ({
    variantIds: variantIdsLocal,
    shopId: shopIdLocal = shopId
  }) => {
    try {
      await cloneProductVariants({
        variables: {
          input: {
            shopId: shopIdLocal,
            variantIds: variantIdsLocal
          }
        }
      });

      // Refetch product data when we adda new variant
      refetchLesson();

      //  enqueueSnackbar(i18next.t("productDetailEdit.cloneProductSuccess"), { variant: "success" });
    } catch (error) {
      // enqueueSnackbar(i18next.t("productDetailEdit.cloneProductFail"), { variant: "error" });
    }
  }, [cloneProductVariants, refetchLesson, shopId]);

  const onArchiveProductVariants = useCallback(async ({
    variantIds: variantIdsLocal,
    shopId: shopIdLocal = shopId,
    redirectOnArchive = false
  }) => {
    try {
      await archiveProductVariants({
        variables: {
          input: {
            shopId: shopIdLocal,
            variantIds: variantIdsLocal
          }
        }
      });

      if (redirectOnArchive) {
        let redirectUrl;

        if (option) {
          redirectUrl = `/${shopIdLocal}/products/${product._id}/${variant._id}`;
        } else {
          redirectUrl = `/${shopIdLocal}/products/${product._id}`;
        }

        navigate(redirectUrl);
      }

      // Refetch product data when we adda new variant
      refetchLesson();

      //  enqueueSnackbar(i18next.t("productDetailEdit.archiveProductVariantsSuccess"), { variant: "success" });
    } catch (error) {
      // enqueueSnackbar(i18next.t("productDetailEdit.archiveProductVariantsFail"), { variant: "error" });
    }
  }, [archiveProductVariants, option, lesson, refetchLesson, shopId, variant]);

  // Convert the social metadata to a format better suited for forms


  return {
    currentVariant: option || variant,
    newMetaField,
    // isLoading,
    handleDeleteProductTag,
    onArchiveProduct,
    onArchiveProductVariants,
    onCloneProduct,
    onCloneProductVariants,
    onCreateVariant,
    onPublishProduct,
    lessonssRefresh,
    onUpdateLesson,
    onDeleteLesson,
    onUpdateProductVariantPrices,
    option,
    onRestoreLesson: handleLessonRestore,
    onToggleProductVisibility,
    onToggleVariantVisibility,
    onUpdateProductVariant,
    lesson: lesson ? lesson : {},
    lessons: lessons,
    onDragandDropLesson,
    refetchLesson,
    setNewMetaField,
    shopId,
    variant
  };
}

export default useLesson;
