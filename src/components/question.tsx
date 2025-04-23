"use client";

import { QuestionOption } from "@/components/question-option";
import { RadioGroup } from "@/components/ui/radio-group";
import {
  type QuestionType,
  type SurveyQuestionWithSection,
} from "@/payload-types";
import { hasCustomText, questionPostfix } from "@/utils/question";
import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "./ui/textarea";

interface QuestionProps {
  question: SurveyQuestionWithSection;
  selectedOptions: string[];
  handleOptionChange: (optionId: string) => void;
  customAnswers?: Record<string, string>;
  setCustomAnswers?: (answers: Record<string, string>) => void;
}

export const CUSTOM_TEXT = "custom_text";
const CustomTextOption = React.memo(
  ({
    question,
    selectedOptions,
    handleOptionChange,
    customAnswers,
    setCustomAnswers,
  }: {
    question: SurveyQuestionWithSection;
    selectedOptions: string[];
    handleOptionChange: (optionId: string) => void;
    type: QuestionType;
    customAnswers: Record<string, string>;
    setCustomAnswers: (answers: Record<string, string>) => void;
  }) => {
    const [showInput, setShowInput] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (selectedOptions.includes(CUSTOM_TEXT)) {
        setShowInput(true);
        // Only focus when transitioning from hidden to shown
        if (!showInput) {
          setTimeout(() => {
            inputRef.current?.focus();
          }, 100);
        }
      } else {
        setShowInput(false);
      }
    }, [selectedOptions, showInput]);

    if (!hasCustomText(question) || !question.options) return null;

    return (
      <>
        <QuestionOption
          option={{
            id: question.id + "_custom_text",
            text: "Other",
            optionId: CUSTOM_TEXT,
          }}
          index={question.options.length}
          selectedOptions={selectedOptions}
          handleOptionChange={handleOptionChange}
          type={question.type}
        />
        {showInput && (
          <Textarea
            value={customAnswers[question.questionId] ?? ""}
            ref={inputRef}
            onChange={(e) =>
              setCustomAnswers({
                ...customAnswers,
                [question.questionId]: e.target.value,
              })
            }
            placeholder="Write your answer here"
          />
        )}
      </>
    );
  },
);

CustomTextOption.displayName = "CustomTextOption";

export function Question({
  question,
  selectedOptions,
  handleOptionChange,
  customAnswers,
  setCustomAnswers,
}: QuestionProps) {
  const postfix = questionPostfix(question);

  return (
    <div className="space-y-2">
      <div className="">
        <h2 className="grid font-medium leading-tight text-gray-900">
          {question.text}
          <span className="text-sm text-gray-500">{postfix}</span>
        </h2>
      </div>
      {question.type === "single" && (
        <RadioGroup
          value={selectedOptions[0]}
          onValueChange={(value) => handleOptionChange(value)}
          className=""
        >
          {question.options?.map((option, index) => (
            <QuestionOption
              key={option.id}
              option={option}
              index={index}
              selectedOptions={selectedOptions}
              type={question.type}
              handleOptionChange={handleOptionChange}
            />
          ))}
          <CustomTextOption
            question={question}
            selectedOptions={selectedOptions}
            handleOptionChange={handleOptionChange}
            type={question.type}
            customAnswers={customAnswers!}
            setCustomAnswers={setCustomAnswers!}
            key={question.id + "_custom_text"}
          />
        </RadioGroup>
      )}
      {question.type === "multiple" && (
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <QuestionOption
              key={option.id}
              option={option}
              index={index}
              selectedOptions={selectedOptions}
              handleOptionChange={handleOptionChange}
              type={question.type}
            />
          ))}
          <CustomTextOption
            question={question}
            selectedOptions={selectedOptions}
            handleOptionChange={handleOptionChange}
            type={question.type}
            customAnswers={customAnswers!}
            setCustomAnswers={setCustomAnswers!}
            key={question.id + "_custom_text"}
          />
        </div>
      )}
      {question.type === "ranking" && (
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <QuestionOption
              key={option.id}
              option={option}
              index={index}
              selectedOptions={selectedOptions}
              handleOptionChange={handleOptionChange}
              type={question.type}
            />
          ))}
        </div>
      )}
      {question.type === "text" && (
        <div className="space-y-3">
          <Textarea
            value={customAnswers![question.questionId] ?? ""}
            onChange={(e) => {
              setCustomAnswers!({
                ...customAnswers,
                [question.questionId]: e.target.value,
              });
              if (!selectedOptions.includes(CUSTOM_TEXT)) {
                handleOptionChange(CUSTOM_TEXT);
              }
            }}
            placeholder="Write your answer here"
          />
        </div>
      )}
    </div>
  );
}
