export type NomineeInput = {
  categoryId: string;
  contactName: string;
  companyName: string;
  contactEmail: string;
  mobileNo?: string;
};

export type NominationSubmissionInput = {
  nominatorName: string;
  nominatorCompany: string;
  nominatorCity: string;
  nominatorContact?: string;
  nominatorEmail: string;
  nominees: NomineeInput[];
};

export type WebsiteNominationCategory = {
  id: string;
  name: string;
  slug?: string;
  isActive?: boolean;
  sortOrder?: number;
};

/** Matches backend SubmitNominationDto (Postman). */
export type SubmitNominationApiBody = {
  nominatorName: string;
  nominatorCompany: string;
  nominatorCity: string;
  nominatorPhone?: string;
  nominatorEmail: string;
  nominees: {
    categoryId: string;
    contactName: string;
    companyName: string;
    contactEmail: string;
    mobileNo?: string;
  }[];
};

export type NominationResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
};
