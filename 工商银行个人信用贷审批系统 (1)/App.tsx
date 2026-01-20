
import React, { useState, useCallback } from 'react';
import Layout from './components/Layout';
import Login from './components/Login';
import CreditForm from './components/CreditForm';
import Processing from './components/Processing';
import ApprovalResult from './components/ApprovalResult';
import BigDataScoring from './components/BigDataScoring';
import SystemVerification from './components/SystemVerification';
import PurposeDocsUpload from './components/PurposeDocsUpload';
import ArchiveSuccess from './components/ArchiveSuccess';
import { CustomerData, ApprovalResponse, AppStep } from './types';
import { evaluateRisk } from './services/riskEngine';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.LOGIN);
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [approvalResult, setApprovalResult] = useState<ApprovalResponse | null>(null);

  const handleLoginSuccess = () => {
    setStep(AppStep.INPUT);
  };

  const handleFormSubmit = async (data: CustomerData) => {
    setCustomerData(data);
    setStep(AppStep.VERIFICATION);
  };

  const handleVerificationComplete = () => {
    setStep(AppStep.SCORING);
  };

  const handleScoringComplete = async () => {
    setStep(AppStep.PROCESSING);
    
    if (customerData) {
      try {
        const result = await evaluateRisk(customerData);
        setApprovalResult(result);
      } catch (err) {
        console.error("Risk evaluation failed:", err);
      }
    }
  };

  const handleProcessingComplete = useCallback(() => {
    setStep(AppStep.RESULT);
  }, []);

  const handleGoToSupplement = () => {
    setStep(AppStep.PURPOSE_DOCS);
  };

  const handlePurposeDocsComplete = () => {
    setStep(AppStep.ARCHIVE_SUCCESS);
  };

  const handleReset = () => {
    setStep(AppStep.INPUT);
    setCustomerData(null);
    setApprovalResult(null);
  };

  const handleGoHome = () => {
    setStep(AppStep.LOGIN);
    setCustomerData(null);
    setApprovalResult(null);
  };

  return (
    <Layout hideWatermark={step === AppStep.RESULT || step === AppStep.ARCHIVE_SUCCESS}>
      <div className="animate-in fade-in duration-1000">
        {step === AppStep.LOGIN && (
          <Login onLogin={handleLoginSuccess} />
        )}

        {step === AppStep.INPUT && (
          <CreditForm onSubmit={handleFormSubmit} />
        )}

        {step === AppStep.VERIFICATION && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <SystemVerification onComplete={handleVerificationComplete} />
          </div>
        )}

        {step === AppStep.SCORING && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-full max-w-xl">
              <BigDataScoring onContinue={handleScoringComplete} />
            </div>
          </div>
        )}

        {step === AppStep.PROCESSING && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-full max-w-xl">
              <Processing onComplete={handleProcessingComplete} />
            </div>
          </div>
        )}
        
        {step === AppStep.RESULT && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-full max-w-3xl">
              <ApprovalResult 
                result={approvalResult} 
                customerName={customerData?.name}
                idCard={customerData?.idCard}
                onReset={handleReset} 
                onSupplement={handleGoToSupplement}
              />
            </div>
          </div>
        )}

        {step === AppStep.PURPOSE_DOCS && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-full max-w-2xl">
              <PurposeDocsUpload 
                purpose={customerData?.purpose || '日常消费'} 
                onComplete={handlePurposeDocsComplete} 
                onGoHome={handleGoHome}
              />
            </div>
          </div>
        )}

        {step === AppStep.ARCHIVE_SUCCESS && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-full max-w-2xl">
              <ArchiveSuccess onReset={handleReset} onGoHome={handleGoHome} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;
