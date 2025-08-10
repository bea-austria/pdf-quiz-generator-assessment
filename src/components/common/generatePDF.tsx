import { Brain, FileText, Loader2 } from "lucide-react"
import { CardDescription, CardHeader, CardTitle, Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui";
import React from "react";

type Props = {
  isLoading: boolean;
  file: File;
  generateQuiz?: () => void;
};

const GeneratePDF = React.forwardRef<HTMLCanvasElement, Props>(
  ({ isLoading, file, generateQuiz }, canvasRef) => {
    return (
      <div>
        <CardHeader className="text-center pb-6 pt-2">
          <CardTitle className="text-2xl">PDF Processed Successfully</CardTitle>
          <CardDescription>
            Ready to generate quiz questions from your document
          </CardDescription>
        </CardHeader>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-center">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              <FileText className="h-4 w-4 mr-2" />
              {file?.name}
            </Badge>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-center text-slate-800 mb-2">Content Preview</h4>
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto"
                style={{ display: 'block', margin: '0 auto' }}
              />
            </CardContent>
          </Card>

          <div className="text-center">
            {isLoading ? (
              <div className="space-y-4">
                <Loader2 className="h-12 w-12 text-blue-500 mx-auto animate-spin" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Generating Quiz...</h3>
                  <p className="text-slate-600">AI is analyzing your document and creating questions</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Brain className="h-12 w-12 text-blue-500 mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Ready to Generate</h3>
                  <p className="text-slate-600 mb-4">
                    We'll create 5 multiple-choice questions based on your PDF content
                  </p>
                  <Button
                    onClick={generateQuiz}
                    className="bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <Brain className="h-4 w-4" />
                    Generate Quiz
                  </Button>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    )
  }
);
export default GeneratePDF;