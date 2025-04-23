import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { type QuestionType } from "types/survey";

interface QuestionOptionProps {
  option: {
    id?: string | null;
    optionId?: string | null | number;
    text: string;
  };
  index: number;
  selectedOptions: string[];
  type?: QuestionType;
  handleOptionChange: (optionId: string) => void;
  onOptionChange?: (optionId: string, value: string) => void;
}

export function QuestionOption({
  option,
  selectedOptions,
  type = "single",
  handleOptionChange,
}: QuestionOptionProps) {
  if (!option.optionId) return null;

  const optionId = option.optionId.toString();

  const rankingNumber =
    type === "ranking" ? selectedOptions.indexOf(optionId) + 1 : null;
  const isRanked = rankingNumber !== null && rankingNumber !== 0;

  return (
    <div className="w-full">
      <Label
        htmlFor={optionId}
        className="flex items-center space-x-3 rounded-md px-3 py-2 transition-colors hover:bg-purple-50"
      >
        {type === "single" && <RadioGroupItem value={optionId} id={optionId} />}
        {type === "multiple" && (
          <Checkbox
            id={optionId}
            checked={selectedOptions.includes(optionId)}
            onCheckedChange={() => handleOptionChange(optionId)}
            className="border-purple-300 data-[state=checked]:border-purple-600 data-[state=checked]:bg-purple-600"
          />
        )}
        {type === "ranking" && (
          <div className="flex items-center space-x-3">
            <Checkbox
              id={optionId}
              checked={selectedOptions.includes(optionId)}
              onCheckedChange={() => handleOptionChange(optionId)}
              hidden={true}
            />
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium transition-colors",
                isRanked
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 text-purple-600 hover:bg-purple-200",
              )}
            >
              {!isRanked ? (
                <span className="relative -top-[1px]">+</span>
              ) : (
                rankingNumber
              )}
            </div>
          </div>
        )}
        <span className="text-base text-purple-900 md:text-sm">
          {option.text}
        </span>
      </Label>
    </div>
  );
}
