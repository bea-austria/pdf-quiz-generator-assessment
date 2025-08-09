import { Loader2, FileText, Upload } from "lucide-react";
import { CardHeader, CardTitle, CardDescription, Button } from "../ui";
import { useRef } from "react";

type Props = {
  isLoading: boolean;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const uploadPDF = ({ isLoading, onFileSelect }: Props) => {
  const fileInputRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="p-8">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl">Upload Your PDF</CardTitle>
        <CardDescription>
          Select a PDF document to generate quiz questions from its content
        </CardDescription>
      </CardHeader>

      <div className="max-w-md mx-auto">
        <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${isLoading
          ? 'border-blue-300 bg-blue-50'
          : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
          }`}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={onFileSelect}
            className="hidden"
            disabled={isLoading}
          />

          {isLoading ? (
            <div className="space-y-4">
              <Loader2 className="h-12 w-12 text-blue-500 mx-auto animate-spin" />
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Extracting Content...</h3>
                <p className="text-slate-600">Please wait while we process your PDF</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <FileText className="h-12 w-12 text-slate-400 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  Choose PDF File
                </h3>
                <p className="text-slate-600 mb-4">
                  Maximum file size: 10MB • Maximum pages: 10
                </p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Upload className="h-4 w-4" />
                  Select File
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};

export default uploadPDF;