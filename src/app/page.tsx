"use client";
import StepsHeader from '@/components/common/stepsHeader';
import UploadPDF from '@/components/common/uploadPDF';
import { useRef, useState } from "react";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<StepType>("upload");
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const steps: StepType[] = ["upload", "generate", "quiz"];

  const extractTextFromPDF = async (file: File) => {
    setIsExtracting(true);
    setError('');

    try {
      const pdfjsLib = await import('pdfjs-dist');

      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

      const arrayBuffer = await file.arrayBuffer();

      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

      if (pdf._pdfInfo.numPages > 10) {
        throw Error('PDF has too many pages. Maximum 10 pages allowed.')
      }

      if (!canvasRef.current) return

      const page = await pdf.getPage(1)
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');

      if (!context) return
      const viewport = page.getViewport({ scale: 0.75 });
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
      console.log(context)
    } catch (e) {
      console.log(e)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size too large. Please select a PDF smaller than 10MB.');
        return;
      }
      setPdfFile(file);
      setError('');
      extractTextFromPDF(file);
      setCurrentStep("generate");
    } else {
      setError('Please select a valid PDF file.');
    }
  };

  const getStepStatus = (step: StepType): StepStatus => {
    const currentIndex = steps.indexOf(currentStep);
    const stepIndex = steps.indexOf(step);

    if (stepIndex < currentIndex) return 'complete';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="flex flex-col gap-10 items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className='flex flex-col gap-3 text-center'>
        <h1 className="text-4xl font-bold">PDF Quiz Generator</h1>
        <h2 className='text-xl'>Upload a PDF and generate an interactive quiz with OpenAI</h2>
      </div>

      <StepsHeader onStatusChange={getStepStatus} steps={steps} />

      {currentStep === "upload" &&
        <UploadPDF 
          isLoading={isExtracting} 
          onFileSelect={handleFileSelect}
        />
      }
    </div>
  );
}
