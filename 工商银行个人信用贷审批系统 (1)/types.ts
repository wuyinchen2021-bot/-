
export enum UnitLevel {
  RI = 'RI 国家事业',
  A1 = 'A1 上市 500强',
  B1 = 'B1 国企',
  C1 = 'C1 创新科技',
  D1 = 'D1 普通单位'
}

export interface CustomerData {
  name: string;
  idCard: string;
  phone: string;
  relativePhone: string;
  fundBase: number;
  unitLevel: UnitLevel | string;
  tenure: string;
  hasProperty: boolean;
  spouseInformed: boolean;
  purpose: string;
  product: string;
  appliedAmount: string;
}

export interface ApprovalResponse {
  status: 'Approved' | 'Rejected' | 'ManualReview';
  amount: number;
  interestRate: string;
  riskScore: number;
  justification: string;
}

export enum AppStep {
  LOGIN = 'LOGIN',
  INPUT = 'INPUT',
  VERIFICATION = 'VERIFICATION',
  SCORING = 'SCORING',
  PURPOSE_DOCS = 'PURPOSE_DOCS',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT',
  ARCHIVE_SUCCESS = 'ARCHIVE_SUCCESS'
}
