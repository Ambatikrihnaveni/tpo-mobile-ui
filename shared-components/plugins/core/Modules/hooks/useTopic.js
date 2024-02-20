import React, { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Meteor } from "meteor/meteor";
import i18next from "i18next";
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId";
import useLesson from "./useLesson";
// GraphQL Queries / Mutations
import ArchiveProductsMutation from '../../../../client/ui/graphql/services/modules/mutations/archiveProducts'
import ArchiveProductVariantsMutation from "../../../../client/ui/graphql/services/modules/mutations/archiveProductVariants";
import CloneProductsMutation from "../../../../client/ui/graphql/services/modules/mutations/cloneProducts";
import CloneProductVariantsMutation from "../../../../client/ui/graphql/services/modules/mutations/cloneProductVariants";
import CreateProductVariantMutation from "../../../../client/ui/graphql/services/modules/mutations/createProductVariant";
import TopicQuery from "../../../../client/ui/graphql/services/modules/queries/topic";
import PublishProductsToCatalogMutation from "../../../../client/ui/graphql/services/modules/mutations/publishProductsToCatalog";
import UpdateTopicMutation from "../../../../client/ui/graphql/services/modules/mutations/updateTopic"
import DeleteTopicMutation from "../../../../client/ui/graphql/services/modules/mutations/deleteTopic";
import UpdateProductVariantMutation from "../../../../client/ui/graphql/services/modules/mutations/updateProductVariant";
import UpdateProductVariantPricesMutation from "../../../../client/ui/graphql/services/modules/mutations/updateProductVariantPrices";
import TopicsQuery from "../../../../client/ui/graphql/services/modules/queries/topics";
import dragAndDropMutation from "../../../../client/ui/graphql/services/modules/mutations/dragAndDrop";

/**
 * Restore an archived product
 * @param {Object} topic Lesson object
 * @returns {undefined} No return
 */



export function handleLessonRestore(topic) {
  Meteor.call("products/updateProductField", topic._id, "isDeleted", false);
}

/**
 * @method useTopic
 * @summary useProduct hook
 * @param {Object} args input arguments
 * @param {String} args.topicId Product Id to load product data for
 * @param {String} args.variantId Variant Id to load product data for
 * @param {String} args.optionId Option Id to load product data for
 * @returns {Object} Result containing the product and other helpers for managing that product
 */
function useTopic(args = {}) {

  const {
    Id: productIdProp,
    variantId: variantIdProp,
    optionId: optionIdProp,
    lessonId: lessonIdProp,
    topicId: topicIdProp
  } = args;
  const [newMetaField, setNewMetaField] = useState({ key: "", value: "" });
  const navigate = useNavigate();
  const routeParams = useParams();
  const [updateTopic] = useMutation(UpdateTopicMutation);
  const [dragAndDrop] = useMutation(dragAndDropMutation);
  const [deleteTopic] = useMutation(DeleteTopicMutation)
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
  const lessonId = lessonIdProp || routeParams.lessonId;
  const topicId = topicIdProp || routeParams.topicId;;
  const variantId = routeParams.variantId || variantIdProp;
  const optionId = routeParams.optionId || optionIdProp;
  const shopId = currentShopId;
  const { lessonssRefresh } = useLesson({ Id: productId })

  const { data: topicQueryResult, isLoading, refetch: refetchTopic } = useQuery(TopicQuery, {
    variables: {
      topicId
    },
    skip: !shopId
  });

  const { topic } = topicQueryResult || {};





  let variant;
  let option;

  if (topic && variantId) {
    variant = topic.variants.find(({ _id }) => _id === variantId);
  }

  if (topic && variantId && optionId) {
    option = variant.options.find(({ _id }) => _id === optionId);
  }



  const onPublishProduct = useCallback(async ({ topicId: topicIdLocal = topic._id }) => {
    try {
      await publishProductsToCatalog({
        variables: {
          topicIds: [topicIdLocal]
        }
      });

      // Refetch on success to force a cache update
      refetchTopic();

      // enqueueSnackbar(i18next.t("admin.catalogProductPublishSuccess"), { variant: "success" });
    } catch (error) {
      //  enqueueSnackbar(error.message, { variant: "error" });
    }
  }, [topic, publishProductsToCatalog, refetchTopic]);

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
    parentId: parentIdLocal = topic._id,
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
          navigate(`/${shopIdLocal}/products/${topic._id}/${newVariantId}`);
        } else {
          const newOptionId = data.createProductVariant && data.createProductVariant.variant && data.createProductVariant.variant._id;
          navigate(`/${shopIdLocal}/products/${topic._id}/${parentIdLocal}/${newOptionId}`);
        }
      }

      // Refetch product data when we adda new variant
      refetchTopic();

      // Because of the way GraphQL and meteor interact when creating a new variant,
      // we can't immediately redirect a user to the new variant as GraphQL is too quick
      // and the meteor subscription isn't yet updated. Once this page has been updated
      // to use GraphQL for data fetching, add a redirect to the new variant when it's created
      // enqueueSnackbar(i18next.t("productDetailEdit.addVariant"), { variant: "success" });
    } catch (error) {
      // enqueueSnackbar(i18next.t("productDetailEdit.addVariantFail"), { variant: "error" });
    }
  }, [createProductVariant, topic, refetchTopic, shopId]);

  const onToggleProductVisibility = useCallback(async () => {
    try {
      await updateTopic({
        variables: {
          input: {
            productId: topic._id,
            shopId,
            product: {
              isVisible: !topic.isVisible
            }
          }
        }
      });

      // enqueueSnackbar("Module updated successfully", { variant: "success" });
    } catch (error) {
      // enqueueSnackbar(i18next.t("Module update failed"), { variant: "error" });
    }
  }, [
    topic,
    shopId,
    updateTopic
  ]);



  const onDragAndDrop = useCallback(async (lessonId, fromIndex, toIndex) => {
    try {
      await dragAndDrop({
        variables: {
          input: {
            id: lessonId,
            fromIndex: fromIndex,
            toIndex: toIndex,
            orderType: "Topics",
          }
        }
      });



      // Refetch on success to force a cache update
      refetchTopic();
      lessonssRefresh()

      // enqueueSnackbar("Module updated successfully", { variant: "success" });
    } catch (error) {
      // enqueueSnackbar("Module update failed", { variant: "error" });
    }
  }, [
    topic,
    shopId,
    dragAndDrop,
    //enqueueSnackbar,
    lessonssRefresh,
    refetchTopic
  ]);


  /**
   * @method onUpdateTopic
   * @param {Object} args
   * @param {Object} args.product Product fields to update
   * @param {Object} [args.productId] Product ID to update. Leave blank for current product.
   * @param {Object} [args.shopId] Shop ID of the product to update. Leave blank for current shop.
   */
  const onUpdateTopic = useCallback(async ({
    topic: topiocLocal,
    lessonId: lessonIdLocal = lessonId || topiocLocal.lessonId,
    productId: productIdLocal = productId || topiocLocal.Id,
    topicId: topicIdLocal = topicId || topiocLocal.topicId,
    shopId: shopIdLocal = shopId,
  }) => {

    try {
      await updateTopic({
        variables: {
          input: {
            lessonId: lessonIdLocal,
            shopId: shopIdLocal,
            topicId: topicIdLocal,
            topic_name: topiocLocal.name,
            topic_content: topiocLocal.content,
            productId: productIdLocal
          }
        }
      });



      // Refetch on success to force a cache update
      refetchTopic();
      lessonssRefresh()

      // enqueueSnackbar("Module updated successfully", { variant: "success" });
    } catch (error) {
      // enqueueSnackbar("Module update failed", { variant: "error" });
    }
  }, [
    topic,
    shopId,
    updateTopic,
    //enqueueSnackbar,
    lessonssRefresh,
    refetchTopic
  ]);


  const onDeleteTopic = useCallback(async ({
    topicId: topicIdLocal = topicId,
  }) => {
    try {
      await deleteTopic({
        variables: {
          input: {
            _id: topicIdLocal,

          }
        }
      });



      // Refetch on success to force a cache update
      refetchTopic();
      lessonssRefresh()
      // enqueueSnackbar("Module updated successfully", { variant: "success" });
    } catch (error) {
      // enqueueSnackbar("Module update failed", { variant: "error" });
    }
  }, [
    topic,
    deleteTopic,
    //enqueueSnackbar,
    lessonssRefresh,
    refetchTopic
  ]);

  const handleDeleteProductTag = useCallback(async ({
    tag: tagLocal,
    product: productLocal = topic,
    productId: productIdLocal = topic._id,
    shopId: shopIdLocal = shopId
  }) => {
    const filteredTagIds = productLocal.tags.nodes
      .filter(({ _id }) => _id !== tagLocal._id)
      .map(({ _id }) => _id);

    try {
      await updateTopic({
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

    topic,
    shopId,
    updateTopic
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
      refetchTopic();

      // enqueueSnackbar(i18next.t("productVariant.updateVariantSuccess"), { variant: "success" });
    } catch (error) {
      // enqueueSnackbar(i18next.t("productVariant.updateVariantFail"), { variant: "error" });
    }
  }, [shopId, updateProductVariant, refetchTopic]);

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
      refetchTopic();

      //  enqueueSnackbar(i18next.t("productVariant.updateVariantPricesSuccess"), { variant: "success" });
    } catch (error) {
      //  enqueueSnackbar(i18next.t("productVariant.updateVariantPricesFail"), { variant: "error" });
    }
  }, [shopId, updateProductVariantPrices, refetchTopic]);

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
      refetchTopic();

      //  enqueueSnackbar(i18next.t("productDetailEdit.cloneProductSuccess"), { variant: "success" });
    } catch (error) {
      // enqueueSnackbar(i18next.t("productDetailEdit.cloneProductFail"), { variant: "error" });
    }
  }, [cloneProductVariants, refetchTopic, shopId]);

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
      refetchTopic();

      //  enqueueSnackbar(i18next.t("productDetailEdit.archiveProductVariantsSuccess"), { variant: "success" });
    } catch (error) {
      // enqueueSnackbar(i18next.t("productDetailEdit.archiveProductVariantsFail"), { variant: "error" });
    }
  }, [archiveProductVariants, option, topic, refetchTopic, shopId, variant]);

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
    onUpdateTopic,
    onDeleteTopic,
    onUpdateProductVariantPrices,
    option,
    onRestoreLesson: handleLessonRestore,
    onToggleProductVisibility,
    onToggleVariantVisibility,
    onUpdateProductVariant,
    onDragAndDrop,
    topic: topicQueryResult && topicQueryResult.topic,
    refetchTopic,
    setNewMetaField,
    shopId,
    variant
  };
}

export default useTopic;
