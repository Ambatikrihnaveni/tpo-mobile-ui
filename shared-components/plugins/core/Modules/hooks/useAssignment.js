import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId";
import useLesson from "./useLesson";
import CreateAssignment from '../../../../client/ui/graphql/services/modules/mutations/createAssignment'
import Assignment from "../../../../client/ui/graphql/services/modules/queries/assignment";
import UpdateAssignment from "../../../../client/ui/graphql/services/modules/mutations/updateAssignment";
import DeleteAssignment from "../../../../client/ui/graphql/services/modules/mutations/deleteAssignment";

function useAssignment(args = {}) {

  const {
    Id: productIdProp,
    lessonId: lessonIdProp,
    assignmentId: assignmentIdPro
  } = args;
  const routeParams = useParams();
  const [createAssignment] = useMutation(CreateAssignment);
  const [updateAssignment] = useMutation(UpdateAssignment);
  const [deleteAssignment] = useMutation(DeleteAssignment);
  const { shopId: currentShopId } = useCurrentShopId();
  const productId = routeParams.product_id || productIdProp;
  const lessonId = lessonIdProp || routeParams.lessonId;
  const assignmentId = assignmentIdPro || routeParams.assignmentId;
  const shopId = currentShopId;
  const { lessonssRefresh } = useLesson({ Id: productId })

  const { data: assignmentQueryResult, isLoading, refetch: refetchAssignment } = useQuery(Assignment, {
    variables: {
      id: assignmentId
    },
    skip: !shopId
  });

  const { assignment } = assignmentQueryResult || {};

  /**
   * @method onUpdateTopic
   * @param {Object} args
   * @param {Object} args.product Product fields to update
   * @param {Object} [args.productId] Product ID to update. Leave blank for current product.
   * @param {Object} [args.shopId] Shop ID of the product to update. Leave blank for current shop.
   */
  const onCreateAssignment = useCallback(async ({
    lessonId: lessonIdLocal = lessonId,
    productId: productIdLocal = productId,
    shopId: shopIdLocal = shopId,
    assignment: assignmentLocal
  }) => {

    try {
      await createAssignment({
        variables: {
          input: {
            // Modify these field names as per the schema if needed
            lessonId: lessonIdLocal,
            shopId: shopIdLocal,
            productId: productIdLocal,
            assignment_title: assignmentLocal.assignmentTitle,
            summary: assignmentLocal.descriptionText,
            time_limit: assignmentLocal.timeLimit,
            time_limit_type: assignmentLocal.selectedValue,
            total_points: assignmentLocal.totalPoints,
            min_pass_points: assignmentLocal.minPassPoints,

          }
        }
      });

      // Refetch on success to force a cache update
      refetchAssignment();
      lessonssRefresh()

      // enqueueSnackbar("Module updated successfully", { variant: "success" });
    } catch (error) {
      // enqueueSnackbar("Module update failed", { variant: "error" });
    }
  }, [
    assignment,
    shopId,
    //enqueueSnackbar,
    lessonssRefresh(),
    refetchAssignment()
  ]);

  const onUpdateAssignment = useCallback(async ({
    lessonId: lessonIdLocal = lessonId,
    productId: productIdLocal = productId,
    shopId: shopIdLocal = shopId,
    assignment: assignmentLocal
  }) => {

    try {
      await updateAssignment({
        variables: {
          input: {
            // Modify these field names as per the schema if needed
            assignment_id: assignmentLocal.assignmentId,
            assignment_title: assignmentLocal.assignmentTitle,
            summary: assignmentLocal.descriptionText,
            time_limit: assignmentLocal.timeLimit,
            time_limit_type: assignmentLocal.selectedValue,
            total_points: assignmentLocal.totalPoints,
            min_pass_points: assignmentLocal.minPassPoints,

          }
        }
      });

      // Refetch on success to force a cache update
      refetchAssignment();
      lessonssRefresh()

      // enqueueSnackbar("Module updated successfully", { variant: "success" });
    } catch (error) {
      // enqueueSnackbar("Module update failed", { variant: "error" });
    }
  }, [
    assignment,
    shopId,
    //enqueueSnackbar,
    lessonssRefresh,
    refetchAssignment
  ]);

  const onDeleteAssignment = useCallback(async ({
    assignment: assignmentLocal
  }) => {

    try {
      await deleteAssignment({
        variables: {
          input: {
            _id: assignmentLocal._id
          }
        }
      });
      refetchAssignment();
      lessonssRefresh()
    } catch (error) {

    }
  }, [
    assignment,
    shopId,
    lessonssRefresh,
    refetchAssignment
  ]
  );


  return {
    onCreateAssignment,
    onUpdateAssignment,
    onDeleteAssignment
  };
}

export default useAssignment;

