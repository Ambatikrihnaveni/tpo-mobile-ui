import gql from "graphql-tag";

export default gql`
  query competitivePreps($shopId:ID!,$query:String,$first:ConnectionLimitInt,$offset:Int) {
    competitivePreps(shopId:$shopId,query:$query,first:$first,offset:$offset){
       nodes{
         _id
        shopId
        title
        overview
        eligibility
        syllabus
        createdBy
        createdAt
        faqs{
            faqType
            qAndA{
                question
                answer

            }

        }

        products {
          _id
          title
          lessonsDuration {
              lesson{
                  _id
                  name
                  topics{
                      _id
                      topic_name
                      topic_content
                      createdAt
                  }
                  assignments{
                      _id
                      shopId
                      productId
                      lessonId
                      assignment_title
                      summary
                      time_limit
                      time_limit_type
                      total_points
                      min_pass_points
                      createdAt
                  }
                  quizs{
                      _id
                      quiz_question
                      quiz_answer
                      quiz_hint
                      quiz_options{
                          optionA
                          optionB
                          optionC
                          optionD
                      }
                  }
              }
              lessonDuration
          }
      }

          examPattern {
            subjectName
            numberOfQuestions
            marksPerSubject
        }
        examDate
        examStartTime
        examEndTime
        cutOffMarksAllotment {
            marks_GPA
            collegeName
            collegeLocation
        }


}
}
  }`