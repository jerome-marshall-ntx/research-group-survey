import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface SurveyLayoutProps {
  children: React.ReactNode;
  title: string;
  onBack?: () => void;
}

export function SurveyLayout({ children, title, onBack }: SurveyLayoutProps) {
  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-purple-200 via-purple-100 to-pink-100">
      <div className="mx-auto max-w-md px-4 py-8">
        <div className="overflow-hidden rounded-2xl bg-white/80 shadow-xl ring-1 ring-black/5 backdrop-blur-xl">
          <div className="border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AnimatePresence>
                  {onBack && title !== "Welcome" && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={onBack}
                        className="hover:bg-purple-100/50"
                      >
                        <ArrowLeft className="h-4 w-4 text-purple-600" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
                <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-lg font-semibold text-transparent">
                  {title}
                </h1>
              </div>
            </div>
            {/* <AnimatePresence>
              {!hideProgress && currentQuestion && totalQuestions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4"
                >
                  <div className="mb-2 flex justify-between text-sm text-purple-600">
                    <span>
                      Question {currentQuestion} of {totalQuestions}
                    </span>
                    <span>
                      {Math.round(
                        ((currentQuestion - 1) / totalQuestions) * 100,
                      )}
                      %
                    </span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-purple-100">
                    <div
                      className="h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-in-out"
                      style={{
                        width: `${((currentQuestion - 1) / totalQuestions) * 100}%`,
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence> */}
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
