export type QuestionType = "single" | "multiple" | "text" | "ranking";

export interface Option {
  id: string;
  text: string;
}

export interface BaseQuestion {
  id: string;
  text: string;
  type: QuestionType;
  options: Option[];
  subText?: string;
}

export interface ConditionalQuestion extends BaseQuestion {
  condition: {
    parentId: string;
    triggerOptionId: string;
  };
}

export type Question = BaseQuestion | ConditionalQuestion;

export interface Survey {
  questions: Question[];
}
