// 'use client';

// import { FormEvent, useState } from 'react';

// const DIRECT_REPORTS = [1, 2, 3, 4];

// const LINK_CATEGORIES = [
//   { name: 'Case Studies', key: 'caseStudies' },
//   { name: 'Interviews', key: 'interviews' },
//   { name: 'Awards by Business', key: 'businessAwards' },
//   { name: 'Awards by Technology Media', key: 'technologyMediaAwards' },
// ];

// type FieldProps = {
//   label: string;
//   name: string;
//   required?: boolean;
//   type?: string;
//   placeholder?: string;
//   min?: string;
//   max?: string;
// };

// function Field({
//   label,
//   name,
//   required = false,
//   type = 'text',
//   placeholder,
//   min,
//   max,
// }: FieldProps) {
//   return (
//     <div className="cio-field">
//       <label htmlFor={name}>
//         {label}
//         {required && <span className="cio-required"> *</span>}
//       </label>

//       <input
//         id={name}
//         name={name}
//         type={type}
//         placeholder={placeholder || `Enter ${label.toLowerCase()}`}
//         required={required}
//         min={min}
//         max={max}
//       />
//     </div>
//   );
// }

// type SelectFieldProps = {
//   label: string;
//   name: string;
//   required?: boolean;
//   options: string[];
// };

// function SelectField({ label, name, required = false, options }: SelectFieldProps) {
//   return (
//     <div className="cio-field">
//       <label htmlFor={name}>
//         {label}
//         {required && <span className="cio-required"> *</span>}
//       </label>

//       <select id={name} name={name} required={required} defaultValue="">
//         <option value="" disabled>
//           Select title
//         </option>

//         {options.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// type TextAreaProps = {
//   label: string;
//   name: string;
//   required?: boolean;
//   rows?: number;
//   maxWords?: number;
//   description?: string;
// };

// function TextAreaField({
//   label,
//   name,
//   required = false,
//   rows = 5,
//   maxWords,
//   description,
// }: TextAreaProps) {
//   const [wordCount, setWordCount] = useState(0);

//   return (
//     <div className="cio-field cio-field-full">
//       <label htmlFor={name}>
//         {label}
//         {required && <span className="cio-required"> *</span>}
//       </label>

//       {description && <p className="cio-field-description">{description}</p>}

//       <textarea
//         id={name}
//         name={name}
//         rows={rows}
//         required={required}
//         placeholder={`Enter ${label.toLowerCase()}...`}
//         onChange={(event) => {
//           const words = event.target.value.trim()
//             ? event.target.value.trim().split(/\s+/).length
//             : 0;

//           setWordCount(words);
//           event.target.setCustomValidity(
//             maxWords && words >= maxWords ? `Please enter fewer than ${maxWords} words.` : '',
//           );
//         }}
//       />

//       {maxWords && (
//         <small className={`cio-field-hint ${wordCount >= maxWords ? 'cio-word-limit-error' : ''}`}>
//           {wordCount} / {maxWords - 1} words maximum
//         </small>
//       )}
//     </div>
//   );
// }

// function SectionHeading({
//   number,
//   title,
//   description,
// }: {
//   number: string;
//   title: string;
//   description?: string;
// }) {
//   return (
//     <div className="cio-section-heading">
//       <span className="cio-section-number">{number}</span>

//       <div>
//         <h2>{title}</h2>
//         {description && <p>{description}</p>}
//       </div>
//     </div>
//   );
// }

// export default function CIONominationForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     setSuccessMessage('');
//     setErrorMessage('');

//     const form = event.currentTarget;

//     if (!form.checkValidity()) {
//       form.reportValidity();
//       return;
//     }

//     const formData = new FormData(form);
//     const data: Record<string, FormDataEntryValue> = {};

//     formData.forEach((value, key) => {
//       data[key] = value;
//     });

//     setIsSubmitting(true);

//     try {
//       // Frontend demonstration only.
//       // Replace this section with your backend nomination API request.
//       // console.log('CIO Nomination Form Data:', data);

//       setSuccessMessage(
//         'Your form passed validation. Connect the nomination API to save your submission.',
//       );
//     } catch {
//       setErrorMessage('Unable to process the form. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <main className="cio-nomination-page">
//       <div className="cio-nomination-container">
//         <header className="cio-form-header">
//           <span className="cio-form-eyebrow">CORE Media</span>

//           <h1>CIO POWER LIST 2026</h1>
//           <p>Please Note:</p>
//           <p>
//             {' '}
//             1. Only CIOs/ Senior Most ICT Decision Makers of an organization are eligible to
//             participate and nominate themselves for CIO POWER LIST 2026.
//           </p>
//           <p>
//             2. A nomination “DOES NOT” entitle you to be in CIO Power List 2026, there are other
//             parameters that will finally determine your candidature for featuring in CIO Power List
//             2026.
//           </p>

//           <div className="cio-form-notice">
//             Fields marked with <span className="cio-required">*</span> are required.
//           </div>
//         </header>

//         <form
//           className="cio-nomination-form"
//           onSubmit={handleSubmit}
//           onReset={() => {
//             setSuccessMessage('');
//             setErrorMessage('');
//           }}
//         >
//           {/* EMAIL */}
//           <section className="cio-form-section">
//             <SectionHeading number="01" title="Email" description="Provide your email address." />

//             <div className="cio-form-grid">
//               <Field label="Email" name="email" type="email" required />
//             </div>
//           </section>

//           {/* CIO INFORMATION */}
//           <section className="cio-form-section">
//             <SectionHeading
//               number="02"
//               title="CIO Information"
//               description="Personal, professional and contact details."
//             />

//             <div className="cio-form-grid">
//               <Field label="First Name" name="firstName" required />
//               <Field label="Last Name" name="lastName" required />
//               {/* <Field label="Title" name="title" required /> */}

//               <SelectField
//                 label="Title"
//                 name="title"
//                 required
//                 options={['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.']}
//               />

//               <Field label="Current Designation" name="currentDesignation" required />

//               <Field label="Official Email" name="officialEmail" type="email" required />

//               <Field label="Telephone No." name="telephoneNo" type="tel" required />

//               <Field label="CIO Mobile Phone No." name="cioMobilePhone" type="tel" required />

//               <Field label="Emergency Contact No." name="emergencyContact" type="tel" required />

//               <Field label="Date of Birth" name="dateOfBirth" type="date" required />

//               <Field
//                 label="Total Work Experience (Years)"
//                 name="totalWorkExperience"
//                 type="number"
//                 min="0"
//                 required
//               />

//               <Field
//                 label="Experience as CIO or Equivalent (Years)"
//                 name="cioExperience"
//                 type="number"
//                 min="0"
//                 required
//               />

//               <Field
//                 label="Work Experience as CIO or equivalent in Current Organization (in years)"
//                 name="cioExperienceCurrentOrganization"
//                 type="number"
//                 min="0"
//                 required
//               />
//             </div>

//             <h3 className="cio-subheading">Social Media Handles</h3>

//             <div className="cio-form-grid">
//               <Field label="Twitter Link" name="twitterLink" type="url" placeholder="https://..." />

//               <Field
//                 label="Facebook Link"
//                 name="facebookLink"
//                 type="url"
//                 placeholder="https://..."
//               />

//               <Field
//                 label="LinkedIn Link"
//                 name="linkedinLink"
//                 type="url"
//                 placeholder="https://..."
//               />

//               <Field label="Instagram ID" name="instagramId" placeholder="@username" />
//             </div>

//             <h3 className="cio-subheading">Reporting Manager Details</h3>

//             <div className="cio-form-grid">
//               <Field
//                 label="Name of Reporting Manager (MD, CEO, CFO, etc.)"
//                 name="reportingManagerName"
//                 required
//               />

//               <Field
//                 label="Designation of Reporting Manager"
//                 name="reportingManagerDesignation"
//                 required
//               />

//               <Field
//                 label="Email of Reporting Manager"
//                 name="reportingManagerEmail"
//                 type="email"
//                 required
//               />

//               <Field
//                 label="Mobile No. of Reporting Manager"
//                 name="reportingManagerMobile"
//                 type="tel"
//               />
//             </div>
//           </section>

//           {/* COMPANY INFORMATION */}
//           <section className="cio-form-section">
//             <SectionHeading
//               number="03"
//               title="Company Information"
//               description="Information about your current organization."
//             />

//             <div className="cio-form-grid">
//               <Field label="Company Name" name="companyName" required />
//               <Field label="Company Address" name="companyAddress" required />
//               <Field label="City" name="city" required />
//               <Field label="State" name="state" required />

//               <Field label="Postal Code / ZIP" name="postalCode" required />

//               <Field label="Country" name="country" required />

//               <Field label="Telephone No." name="companyTelephone" type="tel" required />

//               {/* <Field
//                 label="Business Vertical"
//                 name="businessVertical"
//                 required
//               /> */}

//               <SelectField
//                 label="Business Vertical"
//                 name="businessVertical"
//                 required
//                 options={[
//                   'ASSET MANAGEMENT (AMC)',
//                   'AUTOMOBILES & AUTO ANCILLARIES',
//                   'BANKING',
//                   'CHEMICALS',
//                   'DIVERSIFIED GROUP',
//                   'E-COMMERCE',
//                   'EDUCATION',
//                   'ENGINEERING',
//                   'FINANCIAL SERVICES',
//                   'FMCG',
//                   'HEALTHCARE & PHARMA',
//                   'INSURANCE',
//                   'IT, BPO & ITES',
//                   'MANUFACTURING',
//                   'MEDIA & ENTERTAINMENT',
//                   'NBFC',
//                   'RETAIL',
//                   'TELECOM',
//                   'TRANSPORT & LOGISTICS',
//                   'TRAVEL & HOSPITALITY',
//                   'UTILITIES',
//                   'REAL ESTATE',
//                   'NOT APPLICABLE',
//                 ]}
//               />
//             </div>

//             <div className="cio-field cio-field-full cio-company-category">
//               <label>
//                 Company Category
//                 <span className="cio-required"> *</span>
//               </label>

//               <p className="cio-field-description">
//                 To qualify as a Large Enterprise, the company needs more than 500 employees or an
//                 annual turnover exceeding US$15 million in the Indian geography.
//               </p>

//               <div className="cio-radio-group">
//                 <label className="cio-radio-option">
//                   <input type="radio" name="companyCategory" value="Large Enterprise" required />
//                   <span>Large Enterprise</span>
//                 </label>

//                 <label className="cio-radio-option">
//                   <input type="radio" name="companyCategory" value="Small & Medium Enterprise" />
//                   <span>Small &amp; Medium Enterprise</span>
//                 </label>
//               </div>
//             </div>
//           </section>

//           {/* CIO TEAM DETAILS */}
//           <section className="cio-form-section">
//             <SectionHeading
//               number="04"
//               title="CIO Team Details"
//               description="(In the section below for name, email id and mobile no. of direct report, you can list upto 4 but if you have more than 4 then please do send the details separately on an email)"
//             />

//             <div className="cio-form-grid">
//               <Field
//                 label="Team Size (Number of people in your team)"
//                 name="teamSize"
//                 type="number"
//                 min="0"
//                 required
//               />

//               <Field
//                 label="Number of Direct Reports (Number of people reporting you)"
//                 name="numberOfDirectReports"
//                 type="number"
//                 min="0"
//                 max="4"
//                 required
//               />
//             </div>

//             <div className="cio-info-note">
//               List up to four direct reports. Enter the number of direct reports above and complete
//               only the applicable entries. Additional details can be shared separately by email.
//             </div>

//             {DIRECT_REPORTS.map((number) => (
//               <div className="cio-direct-report" key={number}>
//                 <h3 className="cio-subheading">Direct Report {number}</h3>

//                 <div className="cio-form-grid">
//                   <Field
//                     label={`Name of Direct Report ${number} (CISO, VP IT/Infra, AVP IT/Infra, Head IT/Infra, etc.)`}
//                     name={`directReport${number}Name`}
//                   />

//                   <Field
//                     label={`Email ID of Direct Report ${number}`}
//                     name={`directReport${number}Email`}
//                     type="email"
//                   />

//                   <Field
//                     label={`Mobile No. of Direct Report ${number}`}
//                     name={`directReport${number}Mobile`}
//                     type="tel"
//                   />
//                 </div>
//               </div>
//             ))}
//           </section>

//           {/* ONLINE LINKS */}
//           <section className="cio-form-section">
//             <SectionHeading
//               number="05"
//               title="Online Links"
//               description="Please mention up to a maximum of 3 URL links for each"
//             />

//             <div className="cio-link-categories">
//               {LINK_CATEGORIES.map((category) => (
//                 <div className="cio-link-category" key={category.key}>
//                   <h3 className="cio-subheading">{category.name}</h3>

//                   <div className="cio-form-grid">
//                     {[1].map((number) => (
//                       <Field
//                         key={number}
//                         label={`${category.name} URL ${number}`}
//                         name={`${category.key}${number}`}
//                         type="url"
//                         placeholder="https://..."
//                       />
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* RECOGNITIONS */}
//           <section className="cio-form-section">
//             <SectionHeading
//               number="06"
//               title="Industry & Company Internal Recognitions, Honours & Awards"
//               description="You are requested to list down all the honours, recognitions and awards conferred upon you till date, both Industry as well as Internal Recognitions from your company (Past as well as current)"
//             />

//             <TextAreaField
//               label="Honours, Recognitions and Awards"
//               name="recognitionsAwards"
//               required
//               rows={6}
//             />
//           </section>

//           {/* WORK PROFILE */}
//           <section className="cio-form-section">
//             <SectionHeading
//               number="07"
//               title="Work Profile"
//               description="You are requested to write a short description in the space below of your work profile especially around your current role & its influences on Business & Beyond. Please keep it simple, clear & concise; around 200 words."
//             />

//             <TextAreaField
//               label="Work Profile"
//               name="workProfile"
//               required
//               rows={7}
//               maxWords={200}
//               description="Keep it simple, clear and concise, using fewer than 200 words."
//             />
//           </section>

//           {/* KEY MOMENTS OF 2025 */}
//           <section className="cio-form-section">
//             <SectionHeading
//               number="08"
//               title="Key Moments of 2025"
//               description="Highlight your most important achievements and initiatives during 2025."
//             />

//             <div className="cio-info-note">
//               You are requested to write a short description in the space below of your Key Moments
//               of 2025, eg. Your role in Revenue Generation (Top Line), Savings generated through
//               Initiatives (Bottom line Impact), Strategic SMAC, AI, ML, RPA, etc, Initiatives for
//               enhancing Customer Experience, etc for your company. Please keep it simple, clear and
//               concise; around 200 words. This section is important for featuring as a Technology
//               Icon & Business Icon.
//             </div>

//             <TextAreaField
//               label="Key Moments of 2025"
//               name="keyMoments2025"
//               required
//               rows={7}
//               maxWords={200}
//               description="Keep it simple, clear and concise, using fewer than 200 words."
//             />
//           </section>

//           {/* KEY BUSINESS OUTCOMES */}
//           <section className="cio-form-section">
//             <SectionHeading
//               number="09"
//               title="Key Business Outcomes Achieved"
//               description="Describe tangible business outcomes achieved through IT initiatives."
//             />

//             <TextAreaField
//               label="Key Business Outcomes"
//               name="keyBusinessOutcomes"
//               required
//               rows={7}
//               maxWords={200}
//               description="Use fewer than 200 words. Include measurable business impact wherever possible."
//             />
//           </section>

//           {/* INSTRUCTIONS */}
//           <section className="cio-form-section cio-instructions">
//             <h2>Instructions for Completing This Form</h2>

//             <ol>
//               <li>
//                 While it is not compulsory, please try to complete all fields and answer all
//                 questions to provide the information required for the evaluation.
//               </li>
//               <li>All forms must be completed in English.</li>
//               <li>
//                 The original submission deadline was 25 May 2026. Please confirm the current
//                 nomination cycle before submitting.
//               </li>
//               <li>
//                 For questions about the entry form, contact{' '}
//                 <a href="mailto:contact@core-mediagroup.com">contact@core-mediagroup.com</a>.
//               </li>
//             </ol>
//           </section>

//           {/* FORM MESSAGES */}
//           {successMessage && (
//             <div className="cio-form-success" role="status">
//               {successMessage}
//             </div>
//           )}

//           {errorMessage && (
//             <div className="cio-form-error" role="alert">
//               {errorMessage}
//             </div>
//           )}

//           {/* FORM ACTIONS */}
//           <div className="cio-form-actions">
//             <button type="reset" className="cio-reset-button" disabled={isSubmitting}>
//               Clear Form
//             </button>

//             <button type="submit" className="cio-submit-button" disabled={isSubmitting}>
//               {isSubmitting ? 'Processing...' : 'Submit'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }

'use client';

import { FormEvent, useState } from 'react';

const DIRECT_REPORTS = [1, 2, 3, 4];

const LINK_CATEGORIES = [
  { name: 'Case Studies', key: 'caseStudies' },
  { name: 'Interviews', key: 'interviews' },
  { name: 'Awards by Business', key: 'businessAwards' },
  { name: 'Awards by Technology Media', key: 'technologyMediaAwards' },
];

type FieldProps = {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  min?: string;
  max?: string;
};

function Field({
  label,
  name,
  required = false,
  type = 'text',
  placeholder,
  min,
  max,
}: FieldProps) {
  const isNameField =
    ['firstName', 'lastName', 'reportingManagerName'].includes(name) ||
    /^directReport\d+Name$/.test(name);

  const isDigitOnlyField = type === 'tel' || type === 'number';

  return (
    <div className="cio-field">
      <label htmlFor={name}>
        {label}
        {required && <span className="cio-required"> *</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        required={required}
        min={min}
        max={max}
        inputMode={isDigitOnlyField ? 'numeric' : isNameField ? 'text' : undefined}
        pattern={isNameField ? "[A-Za-z][A-Za-z '-]*" : type === 'tel' ? '[0-9]+' : undefined}
        title={
          isNameField
            ? 'Enter letters only. Spaces, hyphens, and apostrophes are allowed.'
            : type === 'tel'
              ? 'Enter digits only. Letters and special characters are not allowed.'
              : undefined
        }
        onChange={(event) => {
          const input = event.currentTarget;

          if (isNameField) {
            input.value = input.value.replace(/[^A-Za-z '-]/g, '');
          } else if (isDigitOnlyField) {
            input.value = input.value.replace(/\D/g, '');
          }
        }}
      />
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  name: string;
  required?: boolean;
  options: string[];
};

function SelectField({ label, name, required = false, options }: SelectFieldProps) {
  return (
    <div className="cio-field">
      <label htmlFor={name}>
        {label}
        {required && <span className="cio-required"> *</span>}
      </label>

      <select id={name} name={name} required={required} defaultValue="">
        <option value="" disabled>
          Select title
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

type TextAreaProps = {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
  maxWords?: number;
  description?: string;
};

function TextAreaField({
  label,
  name,
  required = false,
  rows = 5,
  maxWords,
  description,
}: TextAreaProps) {
  const [wordCount, setWordCount] = useState(0);

  return (
    <div className="cio-field cio-field-full">
      <label htmlFor={name}>
        {label}
        {required && <span className="cio-required"> *</span>}
      </label>

      {description && <p className="cio-field-description">{description}</p>}

      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={`Enter ${label.toLowerCase()}...`}
        onChange={(event) => {
          const words = event.target.value.trim()
            ? event.target.value.trim().split(/\s+/).length
            : 0;

          setWordCount(words);
          event.target.setCustomValidity(
            maxWords && words >= maxWords ? `Please enter fewer than ${maxWords} words.` : '',
          );
        }}
      />

      {maxWords && (
        <small className={`cio-field-hint ${wordCount >= maxWords ? 'cio-word-limit-error' : ''}`}>
          {wordCount} / {maxWords - 1} words maximum
        </small>
      )}
    </div>
  );
}

function SectionHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="cio-section-heading">
      <span className="cio-section-number">{number}</span>

      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}

export default function CIONominationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSuccessMessage('');
    setErrorMessage('');

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const data: Record<string, FormDataEntryValue> = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    setIsSubmitting(true);

    try {
      // Frontend demonstration only.
      // Replace this section with your backend nomination API request.
      // console.log('CIO Nomination Form Data:', data);

      setSuccessMessage(
        'Your form passed validation. Connect the nomination API to save your submission.',
      );
    } catch {
      setErrorMessage('Unable to process the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="cio-nomination-page">
      <div className="cio-nomination-container">
        <header className="cio-form-header">
          <span className="cio-form-eyebrow">CORE Media</span>

          <h1>CIO POWER LIST 2026</h1>
          <p>Please Note:</p>

          <p>
            1. Only CIOs/ Senior Most ICT Decision Makers of an organization are eligible to
            participate and nominate themselves for CIO POWER LIST 2026.
          </p>

          <p>
            2. A nomination “DOES NOT” entitle you to be in CIO Power List 2026, there are other
            parameters that will finally determine your candidature for featuring in CIO Power List
            2026.
          </p>

          <div className="cio-form-notice">
            Fields marked with <span className="cio-required">*</span> are required.
          </div>
        </header>

        <form
          className="cio-nomination-form"
          onSubmit={handleSubmit}
          onReset={() => {
            setSuccessMessage('');
            setErrorMessage('');
          }}
        >
          {/* EMAIL */}
          <section className="cio-form-section">
            <SectionHeading number="01" title="Email" description="Provide your email address." />

            <div className="cio-form-grid">
              <Field label="Email" name="email" type="email" required />
            </div>
          </section>

          {/* CIO INFORMATION */}
          <section className="cio-form-section">
            <SectionHeading
              number="02"
              title="CIO Information"
              description="Personal, professional and contact details."
            />

            <div className="cio-form-grid">
              <Field label="First Name" name="firstName" required />
              <Field label="Last Name" name="lastName" required />

              <SelectField
                label="Title"
                name="title"
                required
                options={['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.']}
              />

              <Field label="Current Designation" name="currentDesignation" required />

              <Field label="Official Email" name="officialEmail" type="email" required />

              <Field label="Telephone No." name="telephoneNo" type="tel" required />

              <Field label="CIO Mobile Phone No." name="cioMobilePhone" type="tel" required />

              <Field label="Emergency Contact No." name="emergencyContact" type="tel" required />

              <Field label="Date of Birth" name="dateOfBirth" type="date" required />

              <Field
                label="Total Work Experience (Years)"
                name="totalWorkExperience"
                type="number"
                min="0"
                required
              />

              <Field
                label="Experience as CIO or Equivalent (Years)"
                name="cioExperience"
                type="number"
                min="0"
                required
              />

              <Field
                label="Work Experience as CIO or equivalent in Current Organization (in years)"
                name="cioExperienceCurrentOrganization"
                type="number"
                min="0"
                required
              />
            </div>

            <h3 className="cio-subheading">Social Media Handles</h3>

            <div className="cio-form-grid">
              <Field label="Twitter Link" name="twitterLink" type="url" placeholder="https://..." />

              <Field
                label="Facebook Link"
                name="facebookLink"
                type="url"
                placeholder="https://..."
              />

              <Field
                label="LinkedIn Link"
                name="linkedinLink"
                type="url"
                placeholder="https://..."
              />

              <Field label="Instagram ID" name="instagramId" placeholder="@username" />
            </div>

            <h3 className="cio-subheading">Reporting Manager Details</h3>

            <div className="cio-form-grid">
              <Field
                label="Name of Reporting Manager (MD, CEO, CFO, etc.)"
                name="reportingManagerName"
                required
              />

              <Field
                label="Designation of Reporting Manager"
                name="reportingManagerDesignation"
                required
              />

              <Field
                label="Email of Reporting Manager"
                name="reportingManagerEmail"
                type="email"
                required
              />

              <Field
                label="Mobile No. of Reporting Manager"
                name="reportingManagerMobile"
                type="tel"
              />
            </div>
          </section>

          {/* COMPANY INFORMATION */}
          <section className="cio-form-section">
            <SectionHeading
              number="03"
              title="Company Information"
              description="Information about your current organization."
            />

            <div className="cio-form-grid">
              <Field label="Company Name" name="companyName" required />
              <Field label="Company Address" name="companyAddress" required />
              <Field label="City" name="city" required />
              <Field label="State" name="state" required />
              <Field label="Postal Code / ZIP" name="postalCode" required />
              <Field label="Country" name="country" required />

              <Field label="Telephone No." name="companyTelephone" type="tel" required />

              <SelectField
                label="Business Vertical"
                name="businessVertical"
                required
                options={[
                  'ASSET MANAGEMENT (AMC)',
                  'AUTOMOBILES & AUTO ANCILLARIES',
                  'BANKING',
                  'CHEMICALS',
                  'DIVERSIFIED GROUP',
                  'E-COMMERCE',
                  'EDUCATION',
                  'ENGINEERING',
                  'FINANCIAL SERVICES',
                  'FMCG',
                  'HEALTHCARE & PHARMA',
                  'INSURANCE',
                  'IT, BPO & ITES',
                  'MANUFACTURING',
                  'MEDIA & ENTERTAINMENT',
                  'NBFC',
                  'RETAIL',
                  'TELECOM',
                  'TRANSPORT & LOGISTICS',
                  'TRAVEL & HOSPITALITY',
                  'UTILITIES',
                  'REAL ESTATE',
                  'NOT APPLICABLE',
                ]}
              />
            </div>

            <div className="cio-field cio-field-full cio-company-category">
              <label>
                Company Category
                <span className="cio-required"> *</span>
              </label>

              <p className="cio-field-description">
                To qualify as a Large Enterprise, the company needs more than 500 employees or an
                annual turnover exceeding US$15 million in the Indian geography.
              </p>

              <div className="cio-radio-group">
                <label className="cio-radio-option">
                  <input type="radio" name="companyCategory" value="Large Enterprise" required />
                  <span>Large Enterprise</span>
                </label>

                <label className="cio-radio-option">
                  <input type="radio" name="companyCategory" value="Small & Medium Enterprise" />
                  <span>Small &amp; Medium Enterprise</span>
                </label>
              </div>
            </div>
          </section>

          {/* CIO TEAM DETAILS */}
          <section className="cio-form-section">
            <SectionHeading
              number="04"
              title="CIO Team Details"
              description="In the section below for name, email ID and mobile number of direct reports, you can list up to 4. If you have more than 4, please send the details separately by email."
            />

            <div className="cio-form-grid">
              <Field
                label="Team Size (Number of people in your team)"
                name="teamSize"
                type="number"
                min="0"
                required
              />

              <Field
                label="Number of Direct Reports (Number of people reporting you)"
                name="numberOfDirectReports"
                type="number"
                min="0"
                max="4"
                required
              />
            </div>

            <div className="cio-info-note">
              List up to four direct reports. Enter the number of direct reports above and complete
              only the applicable entries. Additional details can be shared separately by email.
            </div>

            {DIRECT_REPORTS.map((number) => (
              <div className="cio-direct-report" key={number}>
                <h3 className="cio-subheading">Direct Report {number}</h3>

                <div className="cio-form-grid">
                  <Field
                    label={`Name of Direct Report ${number} (CISO, VP IT/Infra, AVP IT/Infra, Head IT/Infra, etc.)`}
                    name={`directReport${number}Name`}
                  />

                  <Field
                    label={`Email ID of Direct Report ${number}`}
                    name={`directReport${number}Email`}
                    type="email"
                  />

                  <Field
                    label={`Mobile No. of Direct Report ${number}`}
                    name={`directReport${number}Mobile`}
                    type="tel"
                  />
                </div>
              </div>
            ))}
          </section>

          {/* ONLINE LINKS */}
          <section className="cio-form-section">
            <SectionHeading
              number="05"
              title="Online Links"
              description="Please mention up to a maximum of 3 URL links for each."
            />

            <div className="cio-link-categories">
              {LINK_CATEGORIES.map((category) => (
                <div className="cio-link-category" key={category.key}>
                  <h3 className="cio-subheading">{category.name}</h3>

                  <div className="cio-form-grid">
                    {[1].map((number) => (
                      <Field
                        key={number}
                        label={`${category.name} URL ${number}`}
                        name={`${category.key}${number}`}
                        type="url"
                        placeholder="https://..."
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RECOGNITIONS */}
          <section className="cio-form-section">
            <SectionHeading
              number="06"
              title="Industry & Company Internal Recognitions, Honours & Awards"
              description="List the honours, recognitions and awards conferred upon you to date, including industry and internal recognitions from your past and current companies."
            />

            <TextAreaField
              label="Honours, Recognitions and Awards"
              name="recognitionsAwards"
              required
              rows={6}
            />
          </section>

          {/* WORK PROFILE */}
          <section className="cio-form-section">
            <SectionHeading
              number="07"
              title="Work Profile"
              description="Write a short description of your work profile, especially your current role and its influence on business and beyond. Keep it simple, clear and concise, around 200 words."
            />

            <TextAreaField
              label="Work Profile"
              name="workProfile"
              required
              rows={7}
              maxWords={200}
              description="Keep it simple, clear and concise, using fewer than 200 words."
            />
          </section>

          {/* KEY MOMENTS OF 2025 */}
          <section className="cio-form-section">
            <SectionHeading
              number="08"
              title="Key Moments of 2025"
              description="Highlight your most important achievements and initiatives during 2025."
            />

            <div className="cio-info-note">
              Describe your key moments of 2025, such as your role in revenue generation, savings
              through initiatives, strategic SMAC, AI, ML or RPA initiatives, and improvements to
              customer experience. Keep it simple, clear and concise, around 200 words. This section
              is important for consideration as a Technology Icon and Business Icon.
            </div>

            <TextAreaField
              label="Key Moments of 2025"
              name="keyMoments2025"
              required
              rows={7}
              maxWords={200}
              description="Keep it simple, clear and concise, using fewer than 200 words."
            />
          </section>

          {/* KEY BUSINESS OUTCOMES */}
          <section className="cio-form-section">
            <SectionHeading
              number="09"
              title="Key Business Outcomes Achieved"
              description="Describe tangible business outcomes achieved through IT initiatives."
            />

            <TextAreaField
              label="Key Business Outcomes"
              name="keyBusinessOutcomes"
              required
              rows={7}
              maxWords={200}
              description="Use fewer than 200 words. Include measurable business impact wherever possible."
            />
          </section>

          {/* INSTRUCTIONS */}
          <section className="cio-form-section cio-instructions">
            <h2>Instructions for Completing This Form</h2>

            <ol>
              <li>
                While it is not compulsory, please try to complete all fields and answer all
                questions to provide the information required for the evaluation.
              </li>
              <li>All forms must be completed in English.</li>
              <li>
                The original submission deadline was 25 May 2026. Please confirm the current
                nomination cycle before submitting.
              </li>
              {/* <li>
                For questions about the entry form, contact{' '}
                <a href="mailto:contact@core-mediagroup.com">contact@core-mediagroup.com</a>.
              </li> */}

              <li>
                For questions about the entry form, contact{' '}
                <a
                  href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=contact@core-mediagroup.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  contact@core-mediagroup.com
                </a>
                .
              </li>
            </ol>
          </section>

          {/* FORM MESSAGES */}
          {successMessage && (
            <div className="cio-form-success" role="status">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="cio-form-error" role="alert">
              {errorMessage}
            </div>
          )}

          {/* FORM ACTIONS */}
          <div className="cio-form-actions">
            <button type="reset" className="cio-reset-button" disabled={isSubmitting}>
              Clear Form
            </button>

            <button type="submit" className="cio-submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
