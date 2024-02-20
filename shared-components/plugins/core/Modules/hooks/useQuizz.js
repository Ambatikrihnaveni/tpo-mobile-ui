import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import i18next from "i18next";
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId";
import useLesson from "./useLesson";
import CreateQuiz from "../../../../client/ui/graphql/services/modules/mutations/createQuiz"
import UpdateQuiz from "../../../../client/ui/graphql/services/modules/mutations/updateQuiz"
import DeleteQuiz from "../../../../client/ui/graphql/services/modules/mutations/deleteQuiz";
import Quiz from "../../../../client/ui/graphql/services/programs/queries/quiz";
import MultipleQuizCreate from "../../../../client/ui/graphql/services/modules/mutations/multipleQuizCreate";
import CreateAiService from "../../../../client/ui/graphql/services/aiService/mutations/createAiService";
function useQuiz(args = {}) {

  const {
    Id: productIdProp,
    lessonId: lessonIdProp,
    quizId: quizIdPro
  } = args;
  const routeParams = useParams();
  const [createQuiz] = useMutation(CreateQuiz);
  const [deleteQuiz] = useMutation(DeleteQuiz)
  const [updateQuiz] = useMutation(UpdateQuiz)
  const [multipleQuizCreate] = useMutation(MultipleQuizCreate)
  const [createAiService] = useMutation(CreateAiService)
  const { shopId: currentShopId } = useCurrentShopId();
  const productId = routeParams.product_id || productIdProp;
  const lessonId = lessonIdProp || routeParams.lessonId;
  const quizId = quizIdPro || routeParams.quizId;
  const shopId = currentShopId;
  const { lessonssRefresh } = useLesson({ Id: productId })

  const { data: quizQueryResult, isLoading, refetch: refetchQuiz } = useQuery(Quiz, {
    variables: {
      quizId
    },
    skip: !shopId
  });

  const { quiz } = quizQueryResult || {};

  /**
   * @method onUpdateTopic
   * @param {Object} args
   * @param {Object} args.product Product fields to update
   * @param {Object} [args.productId] Product ID to update. Leave blank for current product.
   * @param {Object} [args.shopId] Shop ID of the product to update. Leave blank for current shop.
   */
  const onCreateQuiz = useCallback(async ({
    lessonId: lessonIdLocal = lessonId,
    productId: productIdLocal = productId,
    shopId: shopIdLocal = shopId,
    quiz: quizLocal
  }) => {

    try {
      await createQuiz({
        variables: {
          input: {
            // Modify these field names as per the schema if needed
            lessonId: lessonIdLocal,
            shopId: shopIdLocal,
            productId: productIdLocal,
            quiz_title: quizLocal.quiz_question,
            quiz_question: quizLocal.quiz_question,
            quiz_hint: quizLocal.quiz_hint,
            quiz_answer: quizLocal.quiz_answer,
            quiz_options: quizLocal.quiz_options
          }
        }
      });

      // Refetch on success to force a cache update
      refetchQuiz();
      lessonssRefresh()

      // enqueueSnackbar("Module updated successfully", { variant: "success" });
    } catch (error) {
      // enqueueSnackbar("Module update failed", { variant: "error" });
    }
  }, [
    quiz,
    shopId,
    //enqueueSnackbar,
    lessonssRefresh,
    refetchQuiz
  ]);

  const onMultipleQuizCreate = useCallback(async ({
    lessonId: lessonIdLocal = lessonId,
    productId: productIdLocal = productId,
    shopId: shopIdLocal = shopId,
    quiz: quizLocal
  }) => {

    try {
      await multipleQuizCreate({
        variables: {
          input: {
            // Modify these field names as per the schema if needed

            Quiz: quizLocal.quiz,
            shopId: shopIdLocal,
            productId: productIdLocal,
            lessonId: lessonIdLocal,

          }
        }
      });

      // Refetch on success to force a cache update
      refetchQuiz();
      lessonssRefresh()

      // enqueueSnackbar("Module updated successfully", { variant: "success" });
    } catch (error) {
      // enqueueSnackbar("Module update failed", { variant: "error" });
    }
  }, [
    quiz,
    shopId,
    //enqueueSnackbar,
    lessonssRefresh,
    refetchQuiz
  ]);


  const onCreteAiService = useCallback(async ({
    lessonId: lessonIdLocal = lessonId,
    productId: productIdLocal = productId,
    shopId: shopIdLocal = shopId
  }) => {
    try {
      const data = await createAiService({
        variables: {
          input: {
            serviceType: "AiQuizCreation",
            shopId,
            lessonId,
            productId
          }
        }
      })
      if (data==true) {
        refetchQuiz();
        lessonssRefresh()
      }
    } catch (error) {
    }
  }, [
    shopId,
    //enqueueSnackbar,
    lessonssRefresh,
    refetchQuiz
  ]);


  const onUpdateQuiz = useCallback(async ({
    lessonId: lessonIdLocal = lessonId,
    productId: productIdLocal = productId,
    shopId: shopIdLocal = shopId,
    quiz: quizLocal
  }) => {

    try {
      await updateQuiz({
        variables: {
          input: {
            // Modify these field names as per the schema if needed
            quiz_Id: quizLocal.quizId,
            quiz_question: quizLocal.quiz_question,
            quiz_hint: quizLocal.quiz_hint,
            quiz_answer: quizLocal.quiz_answer,
            quiz_optionA: quizLocal.quiz_optionA,
            quiz_optionB: quizLocal.quiz_optionB,
            quiz_optionC: quizLocal.quiz_optionC,
            quiz_optionD: quizLocal.quiz_optionD,

          }
        }
      });

      // Refetch on success to force a cache update
      refetchQuiz();
      lessonssRefresh()

      // enqueueSnackbar("Module updated successfully", { variant: "success" });
    } catch (error) {
      // enqueueSnackbar("Module update failed", { variant: "error" });
    }
  }, [
    quiz,
    shopId,
    //enqueueSnackbar,
    lessonssRefresh,
    refetchQuiz
  ]);



  const onDeleteQuiz = useCallback(async ({
    quiz: quizLocal
  }) => {

    try {
      await deleteQuiz({
        variables: {
          input: {
            _id: quizLocal._id


          }
        }
      });

      // Refetch on success to force a cache update
      refetchQuiz();
      lessonssRefresh()

      // enqueueSnackbar("Module updated successfully", { variant: "success" });
    } catch (error) {
      // enqueueSnackbar("Module update failed", { variant: "error" });
    }
  }, [
    quiz,
    shopId,
    //enqueueSnackbar,
    lessonssRefresh,
    refetchQuiz
  ]);


  return {
    onCreateQuiz,
    onUpdateQuiz,
    onDeleteQuiz,
    onMultipleQuizCreate,
    onCreteAiService,
    quiz: quizQueryResult && quizQueryResult.quiz,
  };
}

export default useQuiz;

