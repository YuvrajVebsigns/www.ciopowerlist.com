// 'use client';

// import { useEffect, useState } from 'react';
// import Link from 'next/link';

// import {
//   fetchWebsiteNominationCategories,
//   fetchWebsiteNominationSubCategories,
//   submitWebsiteNomination,
// } from '@/services/nominations.service';

// import { MONGODB_ID_REGEX } from '@/constants/nominations.constants';

// /* =========================================================
//    CATEGORY TYPE
//    ========================================================= */

// type NominationCategory = {
//   _id?: string;
//   id?: string;
//   name?: string;
//   title?: string;
//   label?: string;
//   categoryId?: string;
// };

// /* =========================================================
//    SUBCATEGORY TYPE
//    ========================================================= */

// type NominationSubCategory = {
//   _id?: string;
//   id?: string;
//   name?: string;
//   title?: string;
//   label?: string;
//   categoryId?: string;
//   parentCategoryId?: string;
//   nominationCategoryId?: string;
// };

// /* =========================================================
//    CIO ENTRY
//    ========================================================= */

// type CIOEntry = {
//   categoryId: string;
//   subCategoryId: string;
//   name: string;
//   company: string;
//   email: string;
//   mobile: string;
// };

// /* =========================================================
//    FORM ERRORS
//    ========================================================= */

// type FormErrors = {
//   nominatorName?: string;
//   nominatorCompany?: string;
//   nominatorCity?: string;
//   nominatorEmail?: string;
//   nominatorContact?: string;

//   cios?: {
//     [key: number]: {
//       categoryId?: string;
//       subCategoryId?: string;
//       name?: string;
//       company?: string;
//       email?: string;
//       mobile?: string;
//     };
//   };
// };

// /* =========================================================
//    EMPTY CIO
//    ========================================================= */

// const emptyCio = (): CIOEntry => ({
//   categoryId: '',
//   subCategoryId: '',
//   name: '',
//   company: '',
//   email: '',
//   mobile: '',
// });

// /* =========================================================
//    GET ID
//    ========================================================= */

// function getId(
//   item: NominationCategory | NominationSubCategory,
// ): string {
//   return String(
//     item._id ??
//       item.id ??
//       item.categoryId ??
//       '',
//   );
// }

// /* =========================================================
//    GET LABEL
//    ========================================================= */

// function getLabel(
//   item: NominationCategory | NominationSubCategory,
// ): string {
//   return String(
//     item.name ??
//       item.title ??
//       item.label ??
//       '',
//   );
// }

// /* =========================================================
//    GET SUBCATEGORY PARENT CATEGORY ID
//    ========================================================= */

// function getCategoryId(
//   item: NominationSubCategory,
// ): string {
//   return String(
//     item.categoryId ??
//       item.parentCategoryId ??
//       item.nominationCategoryId ??
//       '',
//   );
// }

// /* =========================================================
//    NORMALIZE API LIST
//    ========================================================= */

// function normalizeList<T>(response: unknown): T[] {
//   if (Array.isArray(response)) {
//     return response as T[];
//   }

//   if (response && typeof response === 'object') {
//     const data = response as {
//       data?: unknown;
//       results?: unknown;
//       categories?: unknown;
//       subCategories?: unknown;
//       subcategories?: unknown;
//     };

//     if (Array.isArray(data.data)) {
//       return data.data as T[];
//     }

//     if (Array.isArray(data.results)) {
//       return data.results as T[];
//     }

//     if (Array.isArray(data.categories)) {
//       return data.categories as T[];
//     }

//     if (Array.isArray(data.subCategories)) {
//       return data.subCategories as T[];
//     }

//     if (Array.isArray(data.subcategories)) {
//       return data.subcategories as T[];
//     }
//   }

//   return [];
// }

// /* =========================================================
//    NOMINATE PAGE
//    ========================================================= */

// export default function NominatePage() {
//   /* ---------------------------------------------------------
//      NOMINATOR DETAILS
//      --------------------------------------------------------- */

//   const [nominatorName, setNominatorName] = useState('');
//   const [nominatorCompany, setNominatorCompany] = useState('');
//   const [nominatorCity, setNominatorCity] = useState('');
//   const [nominatorContact, setNominatorContact] = useState('');
//   const [nominatorEmail, setNominatorEmail] = useState('');

//   /* ---------------------------------------------------------
//      CATEGORIES
//      --------------------------------------------------------- */

//   const [categories, setCategories] = useState<
//     NominationCategory[]
//   >([]);

//   const [subCategories, setSubCategories] = useState<
//     NominationSubCategory[]
//   >([]);

//   const [categoriesLoading, setCategoriesLoading] =
//     useState(true);

//   const [subCategoriesLoading, setSubCategoriesLoading] =
//     useState(true);

//   const [categoriesError, setCategoriesError] =
//     useState<string | null>(null);

//   const [subCategoriesError, setSubCategoriesError] =
//     useState<string | null>(null);

//   /* ---------------------------------------------------------
//      CIO ENTRIES
//      --------------------------------------------------------- */

//   const [cios, setCios] = useState<CIOEntry[]>([
//     emptyCio(),
//   ]);

//   const maxCios = 10;

//   /* ---------------------------------------------------------
//      FORM STATE
//      --------------------------------------------------------- */

//   const [submitted, setSubmitted] = useState(false);

//   const [status, setStatus] =
//     useState<string | null>(null);

//   const [errors, setErrors] =
//     useState<FormErrors>({});

//   const [isSubmitting, setIsSubmitting] =
//     useState(false);

//   /* ---------------------------------------------------------
//      CIO ANIMATION
//      --------------------------------------------------------- */

//   const [animatingCioIndex, setAnimatingCioIndex] =
//     useState<number | null>(null);

//   const [animationType, setAnimationType] =
//     useState<'add' | 'remove' | null>(null);

//   /* =========================================================
//      LOAD CATEGORIES + SUBCATEGORIES
//      ========================================================= */

//   useEffect(() => {
//     let mounted = true;

//     const loadNominationData = async () => {
//       setCategoriesLoading(true);
//       setSubCategoriesLoading(true);

//       setCategoriesError(null);
//       setSubCategoriesError(null);

//       /* -----------------------------------------------------
//          LOAD CATEGORIES
//          ----------------------------------------------------- */

//       try {
//         const response =
//           await fetchWebsiteNominationCategories();

//         if (!mounted) return;

//         const list =
//           normalizeList<NominationCategory>(
//             response,
//           );

//         setCategories(list);
//       } catch (error) {
//         if (!mounted) return;

//         setCategoriesError(
//           error instanceof Error
//             ? error.message
//             : 'Failed to load nomination categories.',
//         );
//       } finally {
//         if (mounted) {
//           setCategoriesLoading(false);
//         }
//       }

//       /* -----------------------------------------------------
//          LOAD SUBCATEGORIES
//          ----------------------------------------------------- */

//       try {
//         const response =
//           await fetchWebsiteNominationSubCategories();

//         if (!mounted) return;

//         const list =
//           normalizeList<NominationSubCategory>(
//             response,
//           );

//         setSubCategories(list);
//       } catch (error) {
//         if (!mounted) return;

//         setSubCategoriesError(
//           error instanceof Error
//             ? error.message
//             : 'Failed to load nomination subcategories.',
//         );
//       } finally {
//         if (mounted) {
//           setSubCategoriesLoading(false);
//         }
//       }
//     };

//     loadNominationData();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   /* =========================================================
//      SCROLL TO TOP AFTER SUBMISSION
//      ========================================================= */

//   useEffect(() => {
//     if (submitted) {
//       window.scrollTo({
//         top: 0,
//         behavior: 'smooth',
//       });
//     }
//   }, [submitted]);

//   /* =========================================================
//      GET SUBCATEGORIES FOR SELECTED CATEGORY
//      ========================================================= */

//   const getSubCategoriesForCategory = (
//     categoryId: string,
//   ) => {
//     if (!categoryId) {
//       return [];
//     }

//     /*
//      * Match subcategory against:
//      * categoryId
//      * parentCategoryId
//      * nominationCategoryId
//      */

//     const matched = subCategories.filter(
//       (subCategory) =>
//         getCategoryId(subCategory) === categoryId,
//     );

//     /*
//      * If backend does not provide category relation,
//      * show all subcategories.
//      */

//     if (
//       matched.length === 0 &&
//       subCategories.length > 0 &&
//       subCategories.every(
//         (item) => !getCategoryId(item),
//       )
//     ) {
//       return subCategories;
//     }

//     return matched;
//   };

//   /* =========================================================
//      ADD CIO
//      ========================================================= */

//   const addCio = () => {
//     if (cios.length >= maxCios) {
//       return;
//     }

//     setCios((prev) => {
//       const newIndex = prev.length;

//       setTimeout(() => {
//         setAnimationType('add');
//         setAnimatingCioIndex(newIndex);

//         setTimeout(() => {
//           setAnimatingCioIndex(null);
//           setAnimationType(null);
//         }, 800);
//       }, 10);

//       return [
//         ...prev,
//         emptyCio(),
//       ];
//     });
//   };

//   /* =========================================================
//      REMOVE CIO
//      ========================================================= */

//   const removeCio = (idx: number) => {
//     setAnimationType('remove');
//     setAnimatingCioIndex(idx);

//     setTimeout(() => {
//       setCios((prev) =>
//         prev.filter((_, i) => i !== idx),
//       );

//       if (errors.cios?.[idx]) {
//         const nextCioErrors = {
//           ...errors.cios,
//         };

//         delete nextCioErrors[idx];

//         setErrors({
//           ...errors,
//           cios: nextCioErrors,
//         });
//       }

//       setAnimatingCioIndex(null);
//       setAnimationType(null);
//     }, 600);
//   };

//   /* =========================================================
//      UPDATE CIO
//      ========================================================= */

//   const updateCio = (
//     idx: number,
//     key: keyof CIOEntry,
//     value: string,
//   ) => {
//     setCios((prev) =>
//       prev.map((cio, index) =>
//         index === idx
//           ? {
//               ...cio,
//               [key]: value,

//               /*
//                * When category changes,
//                * reset the selected subcategory.
//                */
//               ...(key === 'categoryId'
//                 ? {
//                     subCategoryId: '',
//                   }
//                 : {}),
//             }
//           : cio,
//       ),
//     );

//     /* -------------------------------------------------------
//        CLEAR CURRENT FIELD ERROR
//        ------------------------------------------------------- */

//     if (errors.cios?.[idx]?.[key]) {
//       setErrors({
//         ...errors,
//         cios: {
//           ...errors.cios,
//           [idx]: {
//             ...errors.cios[idx],
//             [key]: undefined,
//           },
//         },
//       });
//     }

//     /* -------------------------------------------------------
//        CLEAR SUBCATEGORY ERROR WHEN CATEGORY CHANGES
//        ------------------------------------------------------- */

//     if (
//       key === 'categoryId' &&
//       errors.cios?.[idx]?.subCategoryId
//     ) {
//       setErrors({
//         ...errors,
//         cios: {
//           ...errors.cios,
//           [idx]: {
//             ...errors.cios[idx],
//             categoryId: undefined,
//             subCategoryId: undefined,
//           },
//         },
//       });
//     }
//   };

//   /* =========================================================
//      HANDLE SUBMIT
//      ========================================================= */

//   const handleSubmit = async (
//     e: React.FormEvent,
//   ) => {
//     e.preventDefault();

//     const emailRegex =
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     const phoneRegex =
//       /^[0-9]{10}$/;

//     const nameRegex =
//       /^[A-Za-z\s]+$/;

//     const nextErrors: FormErrors = {};

//     let hasErrors = false;

//     /* -------------------------------------------------------
//        NOMINATOR NAME
//        ------------------------------------------------------- */

//     if (!nominatorName.trim()) {
//       nextErrors.nominatorName =
//         'Nominator name is required.';

//       hasErrors = true;
//     } else if (!nameRegex.test(nominatorName)) {
//       nextErrors.nominatorName =
//         'Only alphabets are allowed.';

//       hasErrors = true;
//     }

//     /* -------------------------------------------------------
//        COMPANY
//        ------------------------------------------------------- */

//     if (!nominatorCompany.trim()) {
//       nextErrors.nominatorCompany =
//         'Company name is required.';

//       hasErrors = true;
//     }

//     /* -------------------------------------------------------
//        CITY
//        ------------------------------------------------------- */

//     if (!nominatorCity.trim()) {
//       nextErrors.nominatorCity =
//         'City is required.';

//       hasErrors = true;
//     }

//     /* -------------------------------------------------------
//        EMAIL
//        ------------------------------------------------------- */

//     if (!nominatorEmail.trim()) {
//       nextErrors.nominatorEmail =
//         'Email is required.';

//       hasErrors = true;
//     } else if (!emailRegex.test(nominatorEmail)) {
//       nextErrors.nominatorEmail =
//         'Enter a valid email.';

//       hasErrors = true;
//     }

//     /* -------------------------------------------------------
//        NOMINATOR PHONE
//        ------------------------------------------------------- */

//     if (
//       nominatorContact &&
//       !phoneRegex.test(nominatorContact)
//     ) {
//       nextErrors.nominatorContact =
//         'Enter a valid 10-digit phone number.';

//       hasErrors = true;
//     }

//     /* -------------------------------------------------------
//        CIO ERRORS
//        ------------------------------------------------------- */

//     const cioErrorsMap: NonNullable<
//       FormErrors['cios']
//     > = {};

//     cios.forEach((cio, idx) => {
//       const currentCioErrors: NonNullable<
//         FormErrors['cios']
//       >[number] = {};

//       /* CATEGORY */

//       if (!cio.categoryId) {
//         currentCioErrors.categoryId =
//           'Please select a category.';

//         hasErrors = true;
//       } else if (
//         !MONGODB_ID_REGEX.test(cio.categoryId)
//       ) {
//         currentCioErrors.categoryId =
//           'Invalid category. Please select again.';

//         hasErrors = true;
//       }

//       /* SUBCATEGORY */

//       if (!cio.subCategoryId) {
//         currentCioErrors.subCategoryId =
//           'Please select a subcategory.';

//         hasErrors = true;
//       } else if (
//         !MONGODB_ID_REGEX.test(
//           cio.subCategoryId,
//         )
//       ) {
//         currentCioErrors.subCategoryId =
//           'Invalid subcategory. Please select again.';

//         hasErrors = true;
//       }

//       /* CIO NAME */

//       if (!cio.name.trim()) {
//         currentCioErrors.name =
//           'CIO name is required.';

//         hasErrors = true;
//       } else if (!nameRegex.test(cio.name)) {
//         currentCioErrors.name =
//           'Only alphabets are allowed.';

//         hasErrors = true;
//       }

//       /* CIO COMPANY */

//       if (!cio.company.trim()) {
//         currentCioErrors.company =
//           'CIO company is required.';

//         hasErrors = true;
//       }

//       /* CIO EMAIL */

//       if (!cio.email.trim()) {
//         currentCioErrors.email =
//           'Email is required.';

//         hasErrors = true;
//       } else if (!emailRegex.test(cio.email)) {
//         currentCioErrors.email =
//           'Enter a valid email address.';

//         hasErrors = true;
//       }

//       /* CIO MOBILE */

//       if (
//         cio.mobile &&
//         !phoneRegex.test(cio.mobile)
//       ) {
//         currentCioErrors.mobile =
//           'Enter a valid 10-digit mobile number.';

//         hasErrors = true;
//       }

//       if (
//         Object.keys(currentCioErrors).length > 0
//       ) {
//         cioErrorsMap[idx] =
//           currentCioErrors;
//       }
//     });

//     if (
//       Object.keys(cioErrorsMap).length > 0
//     ) {
//       nextErrors.cios = cioErrorsMap;
//     }

//     setErrors(nextErrors);

//     /* -------------------------------------------------------
//        STOP IF VALIDATION FAILED
//        ------------------------------------------------------- */

//     if (hasErrors) {
//       setStatus(
//         'Please fix the errors marked in the form below.',
//       );

//       return;
//     }

//     setStatus(null);
//     setIsSubmitting(true);

//     /* =======================================================
//        SUBMIT API
//        ======================================================= */

//     try {
//       const response =
//         await submitWebsiteNomination({
//           nominatorName,
//           nominatorCompany,
//           nominatorCity,
//           nominatorContact,
//           nominatorEmail,

//           nominees: cios.map((cio) => ({
//             categoryId: cio.categoryId,

//             /*
//              * IMPORTANT:
//              * Subcategory ID is sent to backend.
//              */
//             subCategoryId:
//               cio.subCategoryId,

//             contactName: cio.name,

//             companyName:
//               cio.company,

//             contactEmail:
//               cio.email,

//             mobileNo:
//               cio.mobile,
//           })),
//         });

//       const apiMessage =
//         response &&
//         typeof response === 'object' &&
//         'message' in response
//           ? String(
//               (
//                 response as {
//                   message?: string;
//                 }
//               ).message ?? '',
//             )
//           : '';

//       if (apiMessage) {
//         setStatus(apiMessage);
//       }

//       setSubmitted(true);
//     } catch (error) {
//       setStatus(
//         error instanceof Error
//           ? error.message
//           : 'Failed to submit nomination. Please try again.',
//       );

//       setSubmitted(false);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   /* =========================================================
//      SUCCESS SCREEN
//      ========================================================= */

//   if (submitted) {
//     return (
//       <main className="nominate-page-container">
//         <section className="nominate-success-section">
//           <h1>
//             CIO Power List 2026 — Nomination Received
//           </h1>

//           <p>
//             Thank you. Your nomination has been
//             recorded. You will receive a confirmation
//             email shortly and the nominated CIO(s) will
//             be notified as described.
//           </p>

//           <p>
//             <Link href="/">
//               Return to home
//             </Link>
//           </p>
//         </section>
//       </main>
//     );
//   }

//   /* =========================================================
//      PAGE
//      ========================================================= */

//   return (
//     <main className="nominate-page-container">
//       <section className="nominate-page-content">

//         <h1>
//           CIO Power List 2026: Nominate the Nation&apos;s
//           Most Influential Technology Leaders
//         </h1>

//         <p>
//           Your nomination plays a vital role in
//           recognizing CIOs for the exemplary impact they
//           have created and in helping them qualify for the
//           CIO Power List 2026, placing their work firmly
//           in the spotlight.
//         </p>

//         <h3>Categories</h3>

//         <p>
//           CIOs may be nominated under either of the
//           following categories:{' '}
//           <strong>Business Icon</strong> or{' '}
//           <strong>Technology Icon</strong>.
//         </p>

//         <h3>
//           Nomination Process &amp; Confirmation
//         </h3>

//         <p>
//           Once you submit your nomination, an automated
//           process will trigger three confirmation emails:
//         </p>

//         <ol>
//           <li>
//             To the CIO Power List (CORE Media) team,
//             sharing the nomination details.
//           </li>

//           <li>
//             To you, acknowledging and summarizing all
//             your nominations.
//           </li>

//           <li>
//             To each nominated CIO, informing them that
//             they have been nominated by you for CIO Power
//             List 2026.
//           </li>
//         </ol>

//         <h3>Note</h3>

//         <ol>
//           <li>
//             All nominations are treated with strict
//             confidentiality.
//           </li>

//           <li>
//             CIOs are welcome to nominate themselves.
//           </li>

//           <li>
//             For ICT vendors, there is no commercial or
//             sponsorship obligation associated with
//             nominating.
//           </li>
//         </ol>

//         {/* =================================================
//             NOMINATION FORM
//             ================================================= */}

//         <div className="nominate-wrapper">
//           <div className="nominate-card">

//             <div className="nominate-card-header">
//               NOMINATION FORM
//             </div>

//             <div className="nominate-card-body">

//               <p className="nominate-sub">
//                 You can nominate up to 10 Influential
//                 CIOs by clicking on the &quot;Add CIO&quot;
//                 button.
//               </p>

//               <form
//                 id="nominate-form"
//                 onSubmit={handleSubmit}
//                 className="nominate-form"
//                 noValidate
//               >

//                 {/* =================================================
//                     NOMINATOR DETAILS
//                     ================================================= */}

//                 <fieldset className="nominate-fieldset">
//                   <legend className="nominate-legend">
//                     Nominator details
//                   </legend>

//                   {/* NAME */}

//                   <label className="nominate-label">
//                     Name of the Nominator *

//                     <input
//                       value={nominatorName}
//                       onChange={(e) => {
//                         setNominatorName(
//                           e.target.value.replace(
//                             /[^A-Za-z\s]/g,
//                             '',
//                           ),
//                         );

//                         if (
//                           errors.nominatorName
//                         ) {
//                           setErrors({
//                             ...errors,
//                             nominatorName:
//                               undefined,
//                           });
//                         }
//                       }}
//                       placeholder="Full Name"
//                       className="nominate-input-field"
//                     />

//                     {errors.nominatorName && (
//                       <div className="registration-error">
//                         {errors.nominatorName}
//                       </div>
//                     )}
//                   </label>

//                   {/* COMPANY */}

//                   <label className="nominate-label">
//                     Name of the Nominator&apos;s Company *

//                     <input
//                       value={nominatorCompany}
//                       onChange={(e) => {
//                         setNominatorCompany(
//                           e.target.value,
//                         );

//                         if (
//                           errors.nominatorCompany
//                         ) {
//                           setErrors({
//                             ...errors,
//                             nominatorCompany:
//                               undefined,
//                           });
//                         }
//                       }}
//                       className="nominate-input-field"
//                     />

//                     {errors.nominatorCompany && (
//                       <div className="registration-error">
//                         {
//                           errors.nominatorCompany
//                         }
//                       </div>
//                     )}
//                   </label>

//                   {/* CITY */}

//                   <label className="nominate-label">
//                     Nominator City *

//                     <input
//                       value={nominatorCity}
//                       onChange={(e) => {
//                         setNominatorCity(
//                           e.target.value,
//                         );

//                         if (
//                           errors.nominatorCity
//                         ) {
//                           setErrors({
//                             ...errors,
//                             nominatorCity:
//                               undefined,
//                           });
//                         }
//                       }}
//                       placeholder="eg. Mumbai"
//                       className="nominate-input-field"
//                     />

//                     {errors.nominatorCity && (
//                       <div className="registration-error">
//                         {errors.nominatorCity}
//                       </div>
//                     )}
//                   </label>

//                   {/* CONTACT */}

//                   <label className="nominate-label">
//                     Nominator Contact No

//                     <input
//                       type="tel"
//                       value={nominatorContact}
//                       onChange={(e) => {
//                         setNominatorContact(
//                           e.target.value.replace(
//                             /[^0-9]/g,
//                             '',
//                           ),
//                         );

//                         if (
//                           errors.nominatorContact
//                         ) {
//                           setErrors({
//                             ...errors,
//                             nominatorContact:
//                               undefined,
//                           });
//                         }
//                       }}
//                       maxLength={10}
//                       placeholder="9876543210"
//                       className="nominate-input-field"
//                     />

//                     {errors.nominatorContact && (
//                       <div className="registration-error">
//                         {
//                           errors.nominatorContact
//                         }
//                       </div>
//                     )}
//                   </label>

//                   {/* EMAIL */}

//                   <label className="nominate-label">
//                     Nominator Email ID *

//                     <input
//                       type="email"
//                       value={nominatorEmail}
//                       onChange={(e) => {
//                         setNominatorEmail(
//                           e.target.value,
//                         );

//                         if (
//                           errors.nominatorEmail
//                         ) {
//                           setErrors({
//                             ...errors,
//                             nominatorEmail:
//                               undefined,
//                           });
//                         }
//                       }}
//                       placeholder="abc@abc.com"
//                       className="nominate-input-field"
//                     />

//                     {errors.nominatorEmail && (
//                       <div className="registration-error">
//                         {
//                           errors.nominatorEmail
//                         }
//                       </div>
//                     )}
//                   </label>
//                 </fieldset>

//                 {/* =================================================
//                     CIO NOMINATIONS
//                     ================================================= */}

//                 <fieldset className="nominate-fieldset">
//                   <legend className="nominate-legend">
//                     CIO nominations (up to {maxCios})
//                   </legend>

//                   {/* CATEGORY ERROR */}

//                   {categoriesError && (
//                     <div className="registration-error">
//                       {categoriesError}
//                     </div>
//                   )}

//                   {/* SUBCATEGORY ERROR */}

//                   {subCategoriesError && (
//                     <div className="registration-error">
//                       {subCategoriesError}
//                     </div>
//                   )}

//                   {/* =================================================
//                       CIO LOOP
//                       ================================================= */}

//                   {cios.map((cio, idx) => {
//                     const availableSubCategories =
//                       getSubCategoriesForCategory(
//                         cio.categoryId,
//                       );

//                     return (
//                       <div
//                         key={idx}
//                         className={`nominate-cio-block ${
//                           animatingCioIndex === idx &&
//                           animationType === 'add'
//                             ? 'cio-slide-in'
//                             : ''
//                         } ${
//                           animatingCioIndex === idx &&
//                           animationType === 'remove'
//                             ? 'cio-slide-out'
//                             : ''
//                         }`}
//                       >

//                         {/* CIO HEADER */}

//                         <div className="nominate-cio-top">
//                           <strong className="nominate-cio-title">
//                             CIO {idx + 1}
//                           </strong>

//                           {cios.length > 1 && (
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 removeCio(idx)
//                               }
//                               className="nominate-remove-btn"
//                             >
//                               Remove
//                             </button>
//                           )}
//                         </div>

//                         {/* =================================================
//                             CATEGORY
//                             ================================================= */}

//                         <label className="nominate-label">
//                           Nominated CIO by Category *

//                           <select
//                             value={cio.categoryId}
//                             onChange={(e) =>
//                               updateCio(
//                                 idx,
//                                 'categoryId',
//                                 e.target.value,
//                               )
//                             }
//                             className="nominate-input-field"
//                             disabled={
//                               categoriesLoading
//                             }
//                           >
//                             <option value="">
//                               {categoriesLoading
//                                 ? 'Loading categories...'
//                                 : '- Select Category -'}
//                             </option>

//                             {!categoriesLoading &&
//                               categories.map(
//                                 (category) => {
//                                   const id =
//                                     getId(
//                                       category,
//                                     );

//                                   const label =
//                                     getLabel(
//                                       category,
//                                     );

//                                   return (
//                                     <option
//                                       key={id}
//                                       value={id}
//                                     >
//                                       {label}
//                                     </option>
//                                   );
//                                 },
//                               )}
//                           </select>

//                           {errors.cios?.[idx]
//                             ?.categoryId && (
//                             <div className="registration-error">
//                               {
//                                 errors.cios[
//                                   idx
//                                 ].categoryId
//                               }
//                             </div>
//                           )}
//                         </label>

//                         {/* =================================================
//                             SUBCATEGORY
//                             ================================================= */}

//                         <label className="nominate-label">
//                           Nominated CIO by Subcategory *

//                           <select
//                             value={
//                               cio.subCategoryId
//                             }
//                             onChange={(e) =>
//                               updateCio(
//                                 idx,
//                                 'subCategoryId',
//                                 e.target.value,
//                               )
//                             }
//                             className="nominate-input-field"
//                             disabled={
//                               !cio.categoryId ||
//                               subCategoriesLoading
//                             }
//                           >
//                             <option value="">
//                               {subCategoriesLoading
//                                 ? 'Loading subcategories...'
//                                 : !cio.categoryId
//                                   ? '- Select Category First -'
//                                   : '- Select Subcategory -'}
//                             </option>

//                             {!subCategoriesLoading &&
//                               cio.categoryId &&
//                               availableSubCategories.map(
//                                 (subCategory) => {
//                                   const id =
//                                     getId(
//                                       subCategory,
//                                     );

//                                   const label =
//                                     getLabel(
//                                       subCategory,
//                                     );

//                                   return (
//                                     <option
//                                       key={id}
//                                       value={id}
//                                     >
//                                       {label}
//                                     </option>
//                                   );
//                                 },
//                               )}
//                           </select>

//                           {errors.cios?.[idx]
//                             ?.subCategoryId && (
//                             <div className="registration-error">
//                               {
//                                 errors.cios[
//                                   idx
//                                 ].subCategoryId
//                               }
//                             </div>
//                           )}
//                         </label>

//                         {/* =================================================
//                             CIO NAME
//                             ================================================= */}

//                         <label className="nominate-label">
//                           CIO Contact Name *

//                           <input
//                             value={cio.name}
//                             onChange={(e) =>
//                               updateCio(
//                                 idx,
//                                 'name',
//                                 e.target.value.replace(
//                                   /[^A-Za-z\s]/g,
//                                   '',
//                                 ),
//                               )
//                             }
//                             className="nominate-input-field"
//                           />

//                           {errors.cios?.[idx]
//                             ?.name && (
//                             <div className="registration-error">
//                               {
//                                 errors.cios[
//                                   idx
//                                 ].name
//                               }
//                             </div>
//                           )}
//                         </label>

//                         {/* =================================================
//                             COMPANY
//                             ================================================= */}

//                         <label className="nominate-label">
//                           CIO Company Name *

//                           <input
//                             value={cio.company}
//                             onChange={(e) =>
//                               updateCio(
//                                 idx,
//                                 'company',
//                                 e.target.value,
//                               )
//                             }
//                             className="nominate-input-field"
//                           />

//                           {errors.cios?.[idx]
//                             ?.company && (
//                             <div className="registration-error">
//                               {
//                                 errors.cios[
//                                   idx
//                                 ].company
//                               }
//                             </div>
//                           )}
//                         </label>

//                         {/* =================================================
//                             EMAIL
//                             ================================================= */}

//                         <label className="nominate-label">
//                           Contact Email *

//                           <input
//                             type="email"
//                             value={cio.email}
//                             onChange={(e) =>
//                               updateCio(
//                                 idx,
//                                 'email',
//                                 e.target.value,
//                               )
//                             }
//                             className="nominate-input-field"
//                           />

//                           {errors.cios?.[idx]
//                             ?.email && (
//                             <div className="registration-error">
//                               {
//                                 errors.cios[
//                                   idx
//                                 ].email
//                               }
//                             </div>
//                           )}
//                         </label>

//                         {/* =================================================
//                             MOBILE
//                             ================================================= */}

//                         <label className="nominate-label">
//                           Mobile No.

//                           <input
//                             type="tel"
//                             value={cio.mobile}
//                             onChange={(e) =>
//                               updateCio(
//                                 idx,
//                                 'mobile',
//                                 e.target.value.replace(
//                                   /[^0-9]/g,
//                                   '',
//                                 ),
//                               )
//                             }
//                             maxLength={10}
//                             placeholder="9876543210"
//                             className="nominate-input-field"
//                           />

//                           {errors.cios?.[idx]
//                             ?.mobile && (
//                             <div className="registration-error">
//                               {
//                                 errors.cios[
//                                   idx
//                                 ].mobile
//                               }
//                             </div>
//                           )}
//                         </label>
//                       </div>
//                     );
//                   })}
//                 </fieldset>

//                 {/* =================================================
//                     ADD CIO
//                     ================================================= */}

//                 <div className="nominate-add-wrap">
//                   <button
//                     type="button"
//                     onClick={addCio}
//                     disabled={
//                       cios.length >= maxCios
//                     }
//                     className="nominate-btn nominate-btn-add"
//                   >
//                     + Add CIO
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* =================================================
//             SUBMIT
//             ================================================= */}

//         <div className="nominate-submit-row">

//           {status && (
//             <p
//               className="registration-status"
//               style={{
//                 marginBottom: '15px',
//                 color: 'red',
//               }}
//             >
//               {status}
//             </p>
//           )}

//           <button
//             type="submit"
//             form="nominate-form"
//             className="nominate-btn nominate-btn-primary nominate-submit"
//             aria-label="Submit nomination"
//             disabled={isSubmitting}
//           >
//             {isSubmitting
//               ? 'Submitting...'
//               : 'Submit'}
//           </button>

//           <small className="nominate-submit-note">
//             By submitting you agree that nominated
//             CIOs will be contacted. All nominations are
//             confidential.
//           </small>
//         </div>
//       </section>
//     </main>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Select from 'react-select';

import {
  fetchWebsiteNominationCategories,
  fetchWebsiteNominationSubCategories,
  fetchWebsiteNominationStatus,
  submitWebsiteNomination,
} from '@/services/nominations.service';

import { MONGODB_ID_REGEX } from '@/constants/nominations.constants';

/* =========================================================
   CATEGORY TYPE
   ========================================================= */

type NominationCategory = {
  _id?: string;
  id?: string;
  name?: string;
  title?: string;
  label?: string;
  categoryId?: string;
};

/* =========================================================
   SUBCATEGORY TYPE
   ========================================================= */

type NominationSubCategory = {
  _id?: string;
  id?: string;
  name?: string;
  title?: string;
  label?: string;
  categoryId?: string;
  parentCategoryId?: string;
  nominationCategoryId?: string;
};

/* =========================================================
   CIO ENTRY
   ========================================================= */

type CIOEntry = {
  categoryId: string;
  subCategoryId: string;
  name: string;
  company: string;
  email: string;
  mobile: string;
};

/* =========================================================
   FORM ERRORS
   ========================================================= */

type FormErrors = {
  nominatorName?: string;
  nominatorCompany?: string;
  nominatorCity?: string;
  nominatorEmail?: string;
  nominatorContact?: string;

  cios?: {
    [key: number]: {
      categoryId?: string;
      subCategoryId?: string;
      name?: string;
      company?: string;
      email?: string;
      mobile?: string;
    };
  };
};

/* =========================================================
   EMPTY CIO
   ========================================================= */

const emptyCio = (): CIOEntry => ({
  categoryId: '',
  subCategoryId: '',
  name: '',
  company: '',
  email: '',
  mobile: '',
});

/* =========================================================
   GET ID
   ========================================================= */

function getId(item: NominationCategory | NominationSubCategory): string {
  return String(item._id ?? item.id ?? item.categoryId ?? '');
}

/* =========================================================
   GET LABEL
   ========================================================= */

function getLabel(item: NominationCategory | NominationSubCategory): string {
  return String(item.name ?? item.title ?? item.label ?? '');
}

/* =========================================================
   GET SUBCATEGORY PARENT CATEGORY ID
   ========================================================= */

function getCategoryId(item: NominationSubCategory): string {
  return String(item.categoryId ?? item.parentCategoryId ?? item.nominationCategoryId ?? '');
}

/* =========================================================
   NORMALIZE API LIST
   ========================================================= */

function normalizeList<T>(response: unknown): T[] {
  if (Array.isArray(response)) {
    return response as T[];
  }

  if (response && typeof response === 'object') {
    const data = response as {
      data?: unknown;
      results?: unknown;
      categories?: unknown;
      subCategories?: unknown;
      subcategories?: unknown;
    };

    if (Array.isArray(data.data)) {
      return data.data as T[];
    }

    if (Array.isArray(data.results)) {
      return data.results as T[];
    }

    if (Array.isArray(data.categories)) {
      return data.categories as T[];
    }

    if (Array.isArray(data.subCategories)) {
      return data.subCategories as T[];
    }

    if (Array.isArray(data.subcategories)) {
      return data.subcategories as T[];
    }
  }

  return [];
}

/* =========================================================
   NOMINATE PAGE
   ========================================================= */

export default function NominatePage() {
  /* ---------------------------------------------------------
     NOMINATOR DETAILS
     --------------------------------------------------------- */

  const [nominatorName, setNominatorName] = useState('');
  const [nominatorCompany, setNominatorCompany] = useState('');
  const [nominatorCity, setNominatorCity] = useState('');
  const [nominatorContact, setNominatorContact] = useState('');
  const [nominatorEmail, setNominatorEmail] = useState('');

  /* ---------------------------------------------------------
     CATEGORIES
     --------------------------------------------------------- */

  const [categories, setCategories] = useState<NominationCategory[]>([]);

  const [subCategories, setSubCategories] = useState<NominationSubCategory[]>([]);

  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [subCategoriesLoading, setSubCategoriesLoading] = useState(true);

  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  const [subCategoriesError, setSubCategoriesError] = useState<string | null>(null);

  /* ---------------------------------------------------------
     CIO ENTRIES
     --------------------------------------------------------- */

  const [cios, setCios] = useState<CIOEntry[]>([emptyCio()]);

  const maxCios = 10;

  /* ---------------------------------------------------------
     FORM STATE
     --------------------------------------------------------- */

  const [submitted, setSubmitted] = useState(false);

  const [status, setStatus] = useState<string | null>(null);

  const [errors, setErrors] = useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ---------------------------------------------------------
     CIO ANIMATION
     --------------------------------------------------------- */

  const [animatingCioIndex, setAnimatingCioIndex] = useState<number | null>(null);

  const [animationType, setAnimationType] = useState<'add' | 'remove' | null>(null);

  /* =========================================================
     NOMINATION STATUS

     null  = checking status
     true  = nomination active
     false = nomination inactive / closed
     ========================================================= */

  const [nominationActive, setNominationActive] = useState<boolean | null>(null);

  /* =========================================================
     CHECK NOMINATION STATUS
     ========================================================= */

  useEffect(() => {
    let isMounted = true;

    async function checkNominationStatus() {
      try {
        const response = await fetchWebsiteNominationStatus();

        if (!isMounted) {
          return;
        }

        const data = response?.data;

        /*
         * Supports:
         *
         * data: true
         * data: false
         *
         * data: {
         *   isActive: true
         * }
         *
         * data: {
         *   active: true
         * }
         *
         * data: {
         *   status: "ACTIVE"
         * }
         */

        if (typeof data === 'boolean') {
          setNominationActive(data);
          return;
        }

        if (typeof data === 'object' && data !== null) {
          const statusData = data as {
            isActive?: unknown;
            active?: unknown;
            status?: unknown;
          };

          if (typeof statusData.isActive === 'boolean') {
            setNominationActive(statusData.isActive);
            return;
          }

          if (typeof statusData.active === 'boolean') {
            setNominationActive(statusData.active);
            return;
          }

          if (typeof statusData.status === 'string') {
            setNominationActive(statusData.status.toLowerCase() === 'active');
            return;
          }
        }

        /*
         * If the API response cannot be understood,
         * keep the nomination closed for safety.
         */

        setNominationActive(false);
      } catch {
        // console.error('Failed to fetch nomination status:', error);

        if (isMounted) {
          setNominationActive(false);
        }
      }
    }

    checkNominationStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =========================================================
     LOAD CATEGORIES + SUBCATEGORIES
     ========================================================= */

  useEffect(() => {
    /*
     * Don't load nomination data while
     * nomination is checking or closed.
     */

    if (nominationActive !== true) {
      return;
    }

    let mounted = true;

    const loadNominationData = async () => {
      setCategoriesLoading(true);
      setSubCategoriesLoading(true);

      setCategoriesError(null);
      setSubCategoriesError(null);

      /* -----------------------------------------------------
         LOAD CATEGORIES
         ----------------------------------------------------- */

      try {
        const response = await fetchWebsiteNominationCategories();

        if (!mounted) return;

        const list = normalizeList<NominationCategory>(response);

        setCategories(list);
      } catch (error) {
        if (!mounted) return;

        setCategoriesError(
          error instanceof Error ? error.message : 'Failed to load nomination categories.',
        );
      } finally {
        if (mounted) {
          setCategoriesLoading(false);
        }
      }

      /* -----------------------------------------------------
         LOAD SUBCATEGORIES
         ----------------------------------------------------- */

      try {
        const response = await fetchWebsiteNominationSubCategories();

        if (!mounted) return;

        const list = normalizeList<NominationSubCategory>(response);

        setSubCategories(list);
      } catch (error) {
        if (!mounted) return;

        setSubCategoriesError(
          error instanceof Error ? error.message : 'Failed to load nomination subcategories.',
        );
      } finally {
        if (mounted) {
          setSubCategoriesLoading(false);
        }
      }
    };

    loadNominationData();

    return () => {
      mounted = false;
    };
  }, [nominationActive]);

  /* =========================================================
     SCROLL TO TOP AFTER SUBMISSION
     ========================================================= */

  useEffect(() => {
    if (submitted) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [submitted]);

  /* =========================================================
     GET SUBCATEGORIES FOR SELECTED CATEGORY
     ========================================================= */

  const getSubCategoriesForCategory = (categoryId: string) => {
    if (!categoryId) {
      return [];
    }

    /*
     * Match subcategory against:
     * categoryId
     * parentCategoryId
     * nominationCategoryId
     */

    const matched = subCategories.filter(
      (subCategory) => getCategoryId(subCategory) === categoryId,
    );

    /*
     * If backend does not provide category relation,
     * show all subcategories.
     */

    if (
      matched.length === 0 &&
      subCategories.length > 0 &&
      subCategories.every((item) => !getCategoryId(item))
    ) {
      return subCategories;
    }

    return matched;
  };

  /* =========================================================
     ADD CIO
     ========================================================= */

  const addCio = () => {
    if (cios.length >= maxCios) {
      return;
    }

    setCios((prev) => {
      const newIndex = prev.length;

      setTimeout(() => {
        setAnimationType('add');
        setAnimatingCioIndex(newIndex);

        setTimeout(() => {
          setAnimatingCioIndex(null);
          setAnimationType(null);
        }, 800);
      }, 10);

      return [...prev, emptyCio()];
    });
  };

  /* =========================================================
     REMOVE CIO
     ========================================================= */

  const removeCio = (idx: number) => {
    setAnimationType('remove');
    setAnimatingCioIndex(idx);

    setTimeout(() => {
      setCios((prev) => prev.filter((_, i) => i !== idx));

      if (errors.cios?.[idx]) {
        const nextCioErrors = {
          ...errors.cios,
        };

        delete nextCioErrors[idx];

        setErrors({
          ...errors,
          cios: nextCioErrors,
        });
      }

      setAnimatingCioIndex(null);
      setAnimationType(null);
    }, 600);
  };

  /* =========================================================
     UPDATE CIO
     ========================================================= */

  const updateCio = (idx: number, key: keyof CIOEntry, value: string) => {
    setCios((prev) =>
      prev.map((cio, index) =>
        index === idx
          ? {
              ...cio,
              [key]: value,

              /*
               * When category changes,
               * reset selected subcategory.
               */

              ...(key === 'categoryId'
                ? {
                    subCategoryId: '',
                  }
                : {}),
            }
          : cio,
      ),
    );

    /* -------------------------------------------------------
       CLEAR CURRENT FIELD ERROR
       ------------------------------------------------------- */

    if (errors.cios?.[idx]?.[key]) {
      setErrors({
        ...errors,
        cios: {
          ...errors.cios,
          [idx]: {
            ...errors.cios[idx],
            [key]: undefined,
          },
        },
      });
    }

    /* -------------------------------------------------------
       CLEAR SUBCATEGORY ERROR WHEN CATEGORY CHANGES
       ------------------------------------------------------- */

    if (key === 'categoryId' && errors.cios?.[idx]?.subCategoryId) {
      setErrors({
        ...errors,
        cios: {
          ...errors.cios,
          [idx]: {
            ...errors.cios[idx],
            categoryId: undefined,
            subCategoryId: undefined,
          },
        },
      });
    }
  };

  /* =========================================================
     HANDLE SUBMIT
     ========================================================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /*
     * Extra protection:
     * Don't submit if nomination is inactive.
     */

    if (nominationActive !== true) {
      setStatus('Nominations are currently closed.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex = /^[0-9]{10}$/;

    const nameRegex = /^[A-Za-z\s]+$/;

    const nextErrors: FormErrors = {};

    let hasErrors = false;

    /* -------------------------------------------------------
       NOMINATOR NAME
       ------------------------------------------------------- */

    if (!nominatorName.trim()) {
      nextErrors.nominatorName = 'Nominator name is required.';

      hasErrors = true;
    } else if (!nameRegex.test(nominatorName)) {
      nextErrors.nominatorName = 'Only alphabets are allowed.';

      hasErrors = true;
    }

    /* -------------------------------------------------------
       COMPANY
       ------------------------------------------------------- */

    if (!nominatorCompany.trim()) {
      nextErrors.nominatorCompany = 'Company name is required.';

      hasErrors = true;
    }

    /* -------------------------------------------------------
       CITY
       ------------------------------------------------------- */

    if (!nominatorCity.trim()) {
      nextErrors.nominatorCity = 'City is required.';

      hasErrors = true;
    }

    /* -------------------------------------------------------
       EMAIL
       ------------------------------------------------------- */

    if (!nominatorEmail.trim()) {
      nextErrors.nominatorEmail = 'Email is required.';

      hasErrors = true;
    } else if (!emailRegex.test(nominatorEmail)) {
      nextErrors.nominatorEmail = 'Enter a valid email.';

      hasErrors = true;
    }

    /* -------------------------------------------------------
       NOMINATOR PHONE
       ------------------------------------------------------- */

    if (nominatorContact && !phoneRegex.test(nominatorContact)) {
      nextErrors.nominatorContact = 'Enter a valid 10-digit phone number.';

      hasErrors = true;
    }

    /* -------------------------------------------------------
       CIO ERRORS
       ------------------------------------------------------- */

    const cioErrorsMap: NonNullable<FormErrors['cios']> = {};

    cios.forEach((cio, idx) => {
      const currentCioErrors: NonNullable<FormErrors['cios']>[number] = {};

      /* CATEGORY */

      if (!cio.categoryId) {
        currentCioErrors.categoryId = 'Please select a category.';

        hasErrors = true;
      } else if (!MONGODB_ID_REGEX.test(cio.categoryId)) {
        currentCioErrors.categoryId = 'Invalid category. Please select again.';

        hasErrors = true;
      }

      /* SUBCATEGORY */

      if (!cio.subCategoryId) {
        currentCioErrors.subCategoryId = 'Please select a subcategory.';

        hasErrors = true;
      } else if (!MONGODB_ID_REGEX.test(cio.subCategoryId)) {
        currentCioErrors.subCategoryId = 'Invalid subcategory. Please select again.';

        hasErrors = true;
      }

      /* CIO NAME */

      if (!cio.name.trim()) {
        currentCioErrors.name = 'CIO name is required.';

        hasErrors = true;
      } else if (!nameRegex.test(cio.name)) {
        currentCioErrors.name = 'Only alphabets are allowed.';

        hasErrors = true;
      }

      /* CIO COMPANY */

      if (!cio.company.trim()) {
        currentCioErrors.company = 'CIO company is required.';

        hasErrors = true;
      }

      /* CIO EMAIL */

      if (!cio.email.trim()) {
        currentCioErrors.email = 'Email is required.';

        hasErrors = true;
      } else if (!emailRegex.test(cio.email)) {
        currentCioErrors.email = 'Enter a valid email address.';

        hasErrors = true;
      }

      /* CIO MOBILE */

      if (cio.mobile && !phoneRegex.test(cio.mobile)) {
        currentCioErrors.mobile = 'Enter a valid 10-digit mobile number.';

        hasErrors = true;
      }

      if (Object.keys(currentCioErrors).length > 0) {
        cioErrorsMap[idx] = currentCioErrors;
      }
    });

    if (Object.keys(cioErrorsMap).length > 0) {
      nextErrors.cios = cioErrorsMap;
    }

    setErrors(nextErrors);

    /* -------------------------------------------------------
       STOP IF VALIDATION FAILED
       ------------------------------------------------------- */

    if (hasErrors) {
      setStatus('Please fix the errors marked in the form below.');

      return;
    }

    setStatus(null);
    setIsSubmitting(true);

    /* =======================================================
       SUBMIT API
       ======================================================= */

    try {
      const response = await submitWebsiteNomination({
        nominatorName,
        nominatorCompany,
        nominatorCity,
        nominatorContact,
        nominatorEmail,

        nominees: cios.map((cio) => ({
          categoryId: cio.categoryId,

          /*
           * IMPORTANT:
           * Subcategory ID is sent to backend.
           */

          subCategoryId: cio.subCategoryId,

          contactName: cio.name,

          companyName: cio.company,

          contactEmail: cio.email,

          mobileNo: cio.mobile,
        })),
      });

      const apiMessage =
        response && typeof response === 'object' && 'message' in response
          ? String(
              (
                response as {
                  message?: string;
                }
              ).message ?? '',
            )
          : '';

      if (apiMessage) {
        setStatus(apiMessage);
      }

      setSubmitted(true);
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : 'Failed to submit nomination. Please try again.',
      );

      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================================================
     CHECKING STATUS SCREEN
     ========================================================= */

  if (nominationActive === null) {
    return (
      <main className="nominate-page-container">
        <section className="nominate-success-section">
          <h1>Nomination</h1>

          <p>Checking nomination availability...</p>
        </section>
      </main>
    );
  }

  /* =========================================================
     NOMINATION CLOSED SCREEN
     ========================================================= */

  if (nominationActive === false) {
    return (
      <main className="nominate-page-container">
        <section className="nominate-success-section nomination-closed-section">
          <h1>Nomination Closed</h1>

          <p>Thank you for your interest in CIO Power List. Nominations are currently closed.</p>

          <p>Please check back later for the next nomination cycle.</p>

          <p>
            <Link href="/">Return to Home</Link>
          </p>
        </section>
      </main>
    );
  }

  /* =========================================================
     SUCCESS SCREEN
     ========================================================= */

  if (submitted) {
    return (
      <main className="nominate-page-container">
        <section className="nominate-success-section">
          <h1>CIO Power List 2026 — Nomination Received</h1>

          <p>
            Thank you. Your nomination has been recorded. You will receive a confirmation email
            shortly and the nominated CIO(s) will be notified as described.
          </p>

          <p>
            <Link href="/">Return to home</Link>
          </p>
        </section>
      </main>
    );
  }

  /* =========================================================
     PAGE
     ========================================================= */

  return (
    <main className="nominate-page-container">
      <section className="nominate-page-content">
        <h1>CIO Power List 2026: Nominate the Nation&apos;s Most Influential Technology Leaders</h1>

        <p>
          Your nomination plays a vital role in recognizing CIOs for the exemplary impact they have
          created and in helping them qualify for the CIO Power List 2026, placing their work firmly
          in the spotlight.
        </p>

        <h3>Categories</h3>

        <p>
          CIOs may be nominated under either of the following categories:{' '}
          <strong>Business Icon</strong> or <strong>Technology Icon</strong>.
        </p>

        <h3>Nomination Process &amp; Confirmation</h3>

        <p>
          Once you submit your nomination, an automated process will trigger three confirmation
          emails:
        </p>

        <ol>
          <li>To the CIO Power List (CORE Media) team, sharing the nomination details.</li>

          <li>To you, acknowledging and summarizing all your nominations.</li>

          <li>
            To each nominated CIO, informing them that they have been nominated by you for CIO Power
            List 2026.
          </li>
        </ol>

        <h3>Note</h3>

        <ol>
          <li>All nominations are treated with strict confidentiality.</li>

          <li>CIOs are welcome to nominate themselves.</li>

          <li>
            For ICT vendors, there is no commercial or sponsorship obligation associated with
            nominating.
          </li>
        </ol>

        {/* =================================================
            NOMINATION FORM
            ================================================= */}

        <div className="nominate-wrapper">
          <div className="nominate-card">
            <div className="nominate-card-header">NOMINATION FORM</div>

            <div className="nominate-card-body">
              <p className="nominate-sub">
                You can nominate up to 10 Influential CIOs by clicking on the &quot;Add CIO&quot;
                button.
              </p>

              <form id="nominate-form" onSubmit={handleSubmit} className="nominate-form" noValidate>
                {/* =================================================
                    NOMINATOR DETAILS
                    ================================================= */}

                <fieldset className="nominate-fieldset">
                  <legend className="nominate-legend">Nominator details</legend>

                  {/* NAME */}

                  <label className="nominate-label">
                    Name of the Nominator *
                    <input
                      value={nominatorName}
                      onChange={(e) => {
                        setNominatorName(e.target.value.replace(/[^A-Za-z\s]/g, ''));

                        if (errors.nominatorName) {
                          setErrors({
                            ...errors,
                            nominatorName: undefined,
                          });
                        }
                      }}
                      placeholder="Full Name"
                      className="nominate-input-field"
                    />
                    {errors.nominatorName && (
                      <div className="registration-error">{errors.nominatorName}</div>
                    )}
                  </label>

                  {/* COMPANY */}

                  <label className="nominate-label">
                    Name of the Nominator&apos;s Company *
                    <input
                      value={nominatorCompany}
                      onChange={(e) => {
                        setNominatorCompany(e.target.value);

                        if (errors.nominatorCompany) {
                          setErrors({
                            ...errors,
                            nominatorCompany: undefined,
                          });
                        }
                      }}
                      className="nominate-input-field"
                    />
                    {errors.nominatorCompany && (
                      <div className="registration-error">{errors.nominatorCompany}</div>
                    )}
                  </label>

                  {/* CITY */}

                  <label className="nominate-label">
                    Nominator City *
                    <input
                      value={nominatorCity}
                      onChange={(e) => {
                        setNominatorCity(e.target.value);

                        if (errors.nominatorCity) {
                          setErrors({
                            ...errors,
                            nominatorCity: undefined,
                          });
                        }
                      }}
                      placeholder="eg. Mumbai"
                      className="nominate-input-field"
                    />
                    {errors.nominatorCity && (
                      <div className="registration-error">{errors.nominatorCity}</div>
                    )}
                  </label>

                  {/* CONTACT */}

                  <label className="nominate-label">
                    Nominator Contact No
                    <input
                      type="tel"
                      value={nominatorContact}
                      onChange={(e) => {
                        setNominatorContact(e.target.value.replace(/[^0-9]/g, ''));

                        if (errors.nominatorContact) {
                          setErrors({
                            ...errors,
                            nominatorContact: undefined,
                          });
                        }
                      }}
                      maxLength={10}
                      placeholder="9876543210"
                      className="nominate-input-field"
                    />
                    {errors.nominatorContact && (
                      <div className="registration-error">{errors.nominatorContact}</div>
                    )}
                  </label>

                  {/* EMAIL */}

                  <label className="nominate-label">
                    Nominator Email ID *
                    <input
                      type="email"
                      value={nominatorEmail}
                      onChange={(e) => {
                        setNominatorEmail(e.target.value);

                        if (errors.nominatorEmail) {
                          setErrors({
                            ...errors,
                            nominatorEmail: undefined,
                          });
                        }
                      }}
                      placeholder="abc@abc.com"
                      className="nominate-input-field"
                    />
                    {errors.nominatorEmail && (
                      <div className="registration-error">{errors.nominatorEmail}</div>
                    )}
                  </label>
                </fieldset>

                {/* =================================================
                    CIO NOMINATIONS
                    ================================================= */}

                <fieldset className="nominate-fieldset">
                  <legend className="nominate-legend">CIO nominations (up to {maxCios})</legend>

                  {/* CATEGORY ERROR */}

                  {categoriesError && <div className="registration-error">{categoriesError}</div>}

                  {/* SUBCATEGORY ERROR */}

                  {subCategoriesError && (
                    <div className="registration-error">{subCategoriesError}</div>
                  )}

                  {/* =================================================
                      CIO LOOP
                      ================================================= */}

                  {cios.map((cio, idx) => {
                    const availableSubCategories = getSubCategoriesForCategory(cio.categoryId);

                    return (
                      <div
                        key={idx}
                        className={`nominate-cio-block ${
                          animatingCioIndex === idx && animationType === 'add' ? 'cio-slide-in' : ''
                        } ${
                          animatingCioIndex === idx && animationType === 'remove'
                            ? 'cio-slide-out'
                            : ''
                        }`}
                      >
                        {/* CIO HEADER */}

                        <div className="nominate-cio-top">
                          <strong className="nominate-cio-title">CIO {idx + 1}</strong>

                          {cios.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeCio(idx)}
                              className="nominate-remove-btn"
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        {/* <label className="nominate-label">

                          Nominated CIO by Category *

                          <select
                            value={
                              cio.categoryId
                            }
                            onChange={(e) =>
                              updateCio(
                                idx,
                                'categoryId',
                                e.target.value,
                              )
                            }
                            className="nominate-input-field"
                            disabled={
                              categoriesLoading
                            }
                          >

                            <option value="">
                              {categoriesLoading
                                ? 'Loading categories...'
                                : '- Select Category -'}
                            </option>

                            {!categoriesLoading &&
                              categories.map(
                                (category) => {
                                  const id =
                                    getId(
                                      category,
                                    );

                                  const label =
                                    getLabel(
                                      category,
                                    );

                                  return (
                                    <option
                                      key={id}
                                      value={id}
                                    >
                                      {label}
                                    </option>
                                  );
                                },
                              )}

                          </select>

                          {errors.cios?.[idx]
                            ?.categoryId && (
                            <div className="registration-error">
                              {
                                errors.cios[
                                  idx
                                ].categoryId
                              }
                            </div>
                          )}

                        </label>

                  

                        <label className="nominate-label">

                          Nominated CIO by
                          Subcategory *

                          <select
                            value={
                              cio.subCategoryId
                            }
                            onChange={(e) =>
                              updateCio(
                                idx,
                                'subCategoryId',
                                e.target.value,
                              )
                            }
                            className="nominate-input-field"
                            disabled={
                              !cio.categoryId ||
                              subCategoriesLoading
                            }
                          >

                            <option value="">
                              {subCategoriesLoading
                                ? 'Loading subcategories...'
                                : !cio.categoryId
                                  ? '- Select Category First -'
                                  : '- Select Subcategory -'}
                            </option>

                            {!subCategoriesLoading &&
                              cio.categoryId &&
                              availableSubCategories.map(
                                (subCategory) => {
                                  const id =
                                    getId(
                                      subCategory,
                                    );

                                  const label =
                                    getLabel(
                                      subCategory,
                                    );

                                  return (
                                    <option
                                      key={id}
                                      value={id}
                                    >
                                      {label}
                                    </option>
                                  );
                                },
                              )}

                          </select>

                          {errors.cios?.[idx]
                            ?.subCategoryId && (
                            <div className="registration-error">
                              {
                                errors.cios[
                                  idx
                                ].subCategoryId
                              }
                            </div>
                          )}

                        </label> */}
                        {/* =================================================
    CATEGORY
    ================================================= */}

                        <label className="nominate-label">
                          Nominated CIO by Category *
                          <Select
                            value={
                              cio.categoryId
                                ? (() => {
                                    const selectedCategory = categories.find(
                                      (category) => getId(category) === cio.categoryId,
                                    );

                                    return selectedCategory
                                      ? {
                                          value: getId(selectedCategory),
                                          label: getLabel(selectedCategory),
                                        }
                                      : null;
                                  })()
                                : null
                            }
                            onChange={(selectedOption) => {
                              updateCio(idx, 'categoryId', selectedOption?.value ?? '');
                            }}
                            options={categories.map((category) => ({
                              value: getId(category),
                              label: getLabel(category),
                            }))}
                            isLoading={categoriesLoading}
                            isDisabled={categoriesLoading}
                            isSearchable={true}
                            isClearable={true}
                            placeholder={
                              categoriesLoading ? 'Loading categories...' : '- Select Category -'
                            }
                            className="nominate-react-select"
                            classNamePrefix="nominate-select"
                            noOptionsMessage={() => 'No categories available'}
                          />
                          {errors.cios?.[idx]?.categoryId && (
                            <div className="registration-error">{errors.cios[idx].categoryId}</div>
                          )}
                        </label>

                        {/* =================================================
    SUBCATEGORY
    ================================================= */}

                        <label className="nominate-label">
                          Nominated CIO by Subcategory *
                          <Select
                            value={
                              cio.subCategoryId
                                ? (() => {
                                    const selectedSubCategory = availableSubCategories.find(
                                      (subCategory) => getId(subCategory) === cio.subCategoryId,
                                    );

                                    return selectedSubCategory
                                      ? {
                                          value: getId(selectedSubCategory),
                                          label: getLabel(selectedSubCategory),
                                        }
                                      : null;
                                  })()
                                : null
                            }
                            onChange={(selectedOption) => {
                              updateCio(idx, 'subCategoryId', selectedOption?.value ?? '');
                            }}
                            options={availableSubCategories.map((subCategory) => ({
                              value: getId(subCategory),
                              label: getLabel(subCategory),
                            }))}
                            isLoading={subCategoriesLoading}
                            isDisabled={!cio.categoryId || subCategoriesLoading}
                            isSearchable={true}
                            isClearable={true}
                            placeholder={
                              subCategoriesLoading
                                ? 'Loading subcategories...'
                                : !cio.categoryId
                                  ? '- Select Category First -'
                                  : '- Select Subcategory -'
                            }
                            className="nominate-react-select"
                            classNamePrefix="nominate-select"
                            noOptionsMessage={() =>
                              !cio.categoryId
                                ? 'Please select a category first'
                                : 'No subcategories available'
                            }
                          />
                          {errors.cios?.[idx]?.subCategoryId && (
                            <div className="registration-error">
                              {errors.cios[idx].subCategoryId}
                            </div>
                          )}
                        </label>

                        {/* =================================================
                            CIO NAME
                            ================================================= */}

                        <label className="nominate-label">
                          CIO Contact Name *
                          <input
                            value={cio.name}
                            onChange={(e) =>
                              updateCio(idx, 'name', e.target.value.replace(/[^A-Za-z\s]/g, ''))
                            }
                            className="nominate-input-field"
                          />
                          {errors.cios?.[idx]?.name && (
                            <div className="registration-error">{errors.cios[idx].name}</div>
                          )}
                        </label>

                        {/* =================================================
                            COMPANY
                            ================================================= */}

                        <label className="nominate-label">
                          CIO Company Name *
                          <input
                            value={cio.company}
                            onChange={(e) => updateCio(idx, 'company', e.target.value)}
                            className="nominate-input-field"
                          />
                          {errors.cios?.[idx]?.company && (
                            <div className="registration-error">{errors.cios[idx].company}</div>
                          )}
                        </label>

                        {/* =================================================
                            EMAIL
                            ================================================= */}

                        <label className="nominate-label">
                          Contact Email *
                          <input
                            type="email"
                            value={cio.email}
                            onChange={(e) => updateCio(idx, 'email', e.target.value)}
                            className="nominate-input-field"
                          />
                          {errors.cios?.[idx]?.email && (
                            <div className="registration-error">{errors.cios[idx].email}</div>
                          )}
                        </label>

                        {/* =================================================
                            MOBILE
                            ================================================= */}

                        <label className="nominate-label">
                          Mobile No.
                          <input
                            type="tel"
                            value={cio.mobile}
                            onChange={(e) =>
                              updateCio(idx, 'mobile', e.target.value.replace(/[^0-9]/g, ''))
                            }
                            maxLength={10}
                            placeholder="9876543210"
                            className="nominate-input-field"
                          />
                          {errors.cios?.[idx]?.mobile && (
                            <div className="registration-error">{errors.cios[idx].mobile}</div>
                          )}
                        </label>
                      </div>
                    );
                  })}
                </fieldset>

                {/* =================================================
                    ADD CIO
                    ================================================= */}

                <div className="nominate-add-wrap">
                  <button
                    type="button"
                    onClick={addCio}
                    disabled={cios.length >= maxCios}
                    className="nominate-btn nominate-btn-add"
                  >
                    + Add CIO
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* =================================================
            SUBMIT
            ================================================= */}

        <div className="nominate-submit-row">
          {status && (
            <p
              className="registration-status"
              style={{
                marginBottom: '15px',
                color: 'red',
              }}
            >
              {status}
            </p>
          )}

          <button
            type="submit"
            form="nominate-form"
            className="nominate-btn nominate-btn-primary nominate-submit"
            aria-label="Submit nomination"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>

          <small className="nominate-submit-note">
            By submitting you agree that nominated CIOs will be contacted. All nominations are
            confidential.
          </small>
        </div>
      </section>
    </main>
  );
}
