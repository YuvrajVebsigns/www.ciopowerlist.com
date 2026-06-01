export type Winner2017Entry = {
  name: string;
  category: string;
  company: string;
};

export type Winner2017Section = {
  title: string;
  entries: Winner2017Entry[];
};

export const winner2017Image = '/assets/logo/Anil-Porter.jpg';

const technologyIconEntries: Winner2017Entry[] = [
  {
    name: 'Ajay Kumar Meher',
    category: 'Analytics Icon',
    company: 'Sony Pictures Networks Pvt. Ltd.',
  },
  { name: 'Umesh Mittal', category: 'Analytics Icon', company: 'Alchemy Capital' },
  {
    name: 'Jayantha Prabhu',
    category: 'Big Data Icon',
    company: 'Essar Services India Private Ltd.',
  },
  { name: 'Amit Phadke', category: 'Cloud Icon', company: 'Accelya Kale Solutions Ltd.' },
  {
    name: 'Arun Narasimhan',
    category: 'Cloud Icon',
    company: 'The Hindu Group Of Publications, Kasturi & Sons Ltd.',
  },
  { name: 'Jai Thomas', category: 'Cloud Icon', company: 'DailyHunt' },
  { name: 'Jitendra Mishra', category: 'Cloud Icon', company: 'Wanbury Ltd.' },
  { name: 'Ritu Madbhavi', category: 'Cloud Icon', company: 'FCB Ulka Advertising Pvt. Ltd.' },
  { name: 'Jaswinder Singh', category: 'CRM Icon', company: 'Jetair Pvt Ltd.' },
  { name: 'Pratap Gharge', category: 'CRM Icon', company: 'Bajaj Electricals Ltd.' },
  { name: 'Sudesh Agarwal', category: 'CRM Icon', company: 'Sterling Holiday Resort Ltd.' },
  { name: 'Navneet Sharma', category: 'Database Icon', company: 'Intex Technologies India Ltd.' },
  { name: 'Pawan Kumar Nijhawan', category: 'Database Icon', company: 'Wolkem India Ltd.' },
  {
    name: 'Ajay Srivastava',
    category: 'Datacenter & IT Infrastructure Icon',
    company: 'Himachal Futuristic Communications Ltd.(HFCL)',
  },
  {
    name: 'Ashish Mehta',
    category: 'Datacenter & IT Infrastructure Icon',
    company: 'AGS Transact Technologies Ltd.',
  },
  { name: 'Hemal Shah', category: 'Datacenter & IT Infrastructure Icon', company: 'Gracenote Inc' },
  {
    name: 'Jai Daga',
    category: 'Datacenter & IT Infrastructure Icon',
    company: 'Viacom18 Media Pvt. Ltd.',
  },
  {
    name: 'Sanjeev Jain',
    category: 'Datacenter & IT Infrastructure Icon',
    company: 'Integreon Managed Solutions',
  },
  { name: 'Ashish Bharadwaj', category: 'Digital Icon', company: 'Laureate Education India' },
  { name: 'Manish Kumar Sinha', category: 'Digital Icon', company: 'Vectus Industries Ltd.' },
  { name: 'Niranjan K Ramakrishnan', category: 'Digital Icon', company: 'Sir Ganga Ram Hospital' },
  { name: 'Aneesh Nair', category: 'Ecommerce Icon', company: 'NDTV Worldwide Ltd.' },
  { name: 'Girish Koppar', category: 'ERP Icon', company: 'Lilavati Hospital & Research Centre' },
  { name: 'Niranjan Bhalivade', category: 'ERP Icon', company: 'CEAT Ltd.' },
  { name: 'Prasenjit Mukherjee', category: 'ERP Icon', company: 'BSES Power Ltd. (RelianceADAG)' },
  {
    name: 'Sabyasachi Chakraborty Thakur',
    category: 'ERP Icon',
    company: 'Parksons Packaging Ltd.',
  },
  { name: 'Anand Ruhela', category: 'HRMS Icon', company: 'Kwality Ltd.' },
  {
    name: 'Dhananjay Prasad',
    category: 'HRMS Icon',
    company: 'Hero Management Services Pvt. Ltd.',
  },
  { name: 'Srinivas Anappindi', category: 'HRMS Icon', company: 'CSS Corp Pvt. Ltd.' },
  {
    name: 'Ajit Aloz',
    category: 'Intelligent Bots & RPA Icon',
    company: 'Firstsource Solutions Ltd.',
  },
  { name: 'Anjani Kumar', category: 'Intelligent Bots & RPA Icon', company: 'Collabera' },
  { name: 'Harnath Babu', category: 'Intelligent Bots & RPA Icon', company: 'KPMG India' },
  {
    name: 'Thomson Thomas',
    category: 'Intelligent Bots & RPA Icon',
    company: 'HDFC Standard Life Insurance Company Ltd.',
  },
  { name: 'Kamal Karnataka', category: 'IoT Icon', company: 'RJ Corp' },
  { name: 'Manoj Kumar', category: 'IoT Icon', company: 'Jakson Group' },
  { name: 'Rajeev Mittal', category: 'IoT Icon', company: 'Endurance Technologies Ltd.' },
  { name: 'Ravi Ramakrishnan', category: 'IoT Icon', company: 'UFlex Ltd.' },
  {
    name: 'Shailendra Choudhary',
    category: 'Productivity Icon',
    company: 'Interarch Building Products Pvt.Ltd.',
  },
  { name: 'Anand Mangalam', category: 'SCM Icon', company: 'Gerdau Steel India Pvt. Ltd.' },
  { name: 'Anil Kumar Singh', category: 'SCM Icon', company: 'KRIBHCO Ltd.' },
  { name: 'Raghubir Singh', category: 'SCM Icon', company: 'Relaxo Footwears Ltd.' },
  { name: 'Rohit Gaur', category: 'SCM Icon', company: 'Optiemus Group' },
  { name: 'Rajat Sharma', category: 'Mobility Icon', company: 'Atul Ltd.' },
  { name: 'Rajendra Deshpande', category: 'Mobility Icon', company: 'Intelenet Global Services' },
  { name: 'Shailesh Bhagwat', category: 'Mobility Icon', company: 'Kamat Hotels (India) Ltd.' },
  {
    name: 'Mani Kant Singh R',
    category: 'Security Icon',
    company: 'ORBIS Financial Corporation Ltd.',
  },
  { name: 'Rajesh Garg', category: 'Security Icon', company: 'Rolta India Ltd.' },
  {
    name: 'Sudhir Kanvinde',
    category: 'Security Icon',
    company: 'IL&FS Transportation Networks Ltd.',
  },
  { name: 'Vikas Arora', category: 'Security Icon', company: 'Toluna India Pvt Ltd.' },
  { name: 'Anand Budholia', category: 'Tax & Compliance Icon', company: 'Reliance Power Ltd.' },
  { name: 'Rajiv Singla', category: 'Tax & Compliance Icon', company: 'ACC Ltd.' },
  { name: 'Sanjay Banerjee', category: 'Tax & Compliance Icon', company: 'P. N. Gadgil Jewellers' },
  { name: 'Anthony Thomas', category: 'Transformation Icon', company: 'General Electric' },
  {
    name: 'Aruna Rao',
    category: 'Transformation Icon',
    company: 'Kotak Mahindra Bank & Group Company',
  },
  {
    name: 'Kalpana Maniar',
    category: 'Transformation Icon',
    company: 'Edelweiss Financial Services Ltd.',
  },
  { name: 'Shivkumar Bhasin', category: 'Transformation Icon', company: 'State Bank Of India' },
  { name: 'A Shiju Rawther', category: 'Virtualization Icon', company: 'Transunion CIBIL Ltd.' },
  { name: 'Gyan Pandey', category: 'Virtualization Icon', company: 'Aurobindo Pharma Ltd.' },
  {
    name: 'Joseph Kiran Kumar',
    category: 'Virtualization Icon',
    company: 'Eisai Pharmaceuticals India Pvt. Ltd.',
  },
];

const businessIconEntries: Winner2017Entry[] = [
  { name: 'Lalit Popli', category: 'Asset Management Icon', company: 'ICICI Prudential AMC' },
  {
    name: 'Raghunatha Reddy',
    category: 'Asset Management Icon',
    company: 'UTI Asset Management Co Ltd.',
  },
  {
    name: 'Bishwanath Ghosh',
    category: 'Automobiles & Auto Ancillaries Icon',
    company: 'Mahindra & Mahindra Ltd.',
  },
  { name: 'Aruna Rao', category: 'Banking Icon', company: 'Kotak Mahindra Bank & Group Company' },
  { name: 'Sanjay Narkar', category: 'Banking Icon', company: 'IDFC Bank Ltd.' },
  { name: 'Shivkumar Bhasin', category: 'Banking Icon', company: 'State Bank Of India' },
  { name: 'Pankaj Bhargava', category: 'Chemicals Icon', company: 'Pidilite Industries Ltd.' },
  { name: 'Suresh Kumar', category: 'Consulting Icon', company: 'Grant Thornton India' },
  { name: 'Anthony Thomas', category: 'Diversified Group Icon', company: 'General Electric' },
  {
    name: 'Jayantha Prabhu',
    category: 'Diversified Group Icon',
    company: 'Essar Services India Pvt. Ltd.',
  },
  { name: 'Kamal Karnataka', category: 'Diversified Group Icon', company: 'RJ Corp' },
  {
    name: 'Rahul Mahajan',
    category: 'Diversified Group Icon',
    company: 'K Raheja Corporate Services Pvt. Ltd.',
  },
  { name: 'Jagdish Lomte', category: 'Engineering Icon', company: 'Thermax Ltd.' },
  {
    name: 'Harish Sharma C L',
    category: 'Financial Services Icon',
    company: 'Toyota Financial Services India Ltd.',
  },
  {
    name: 'Himanshu Shah',
    category: 'Financial Services Icon',
    company: 'Adarsh Credit Co-Operative Society Ltd.',
  },
  {
    name: 'Kalpana Maniar',
    category: 'Financial Services Icon',
    company: 'Edelweiss Financial Services Ltd.',
  },
  { name: 'Kersi Tavadia', category: 'Financial Services Icon', company: 'BSE Ltd.' },
  {
    name: 'Sendil Kumar Venkatesan',
    category: 'Financial Services Icon',
    company: 'Shriram Value Services Ltd.',
  },
  {
    name: 'Tarun Pandey',
    category: 'Financial Services Icon',
    company: 'Aditya Birla Financial Services',
  },
  { name: 'Yagnesh Parikh', category: 'Financial Services Icon', company: 'ICICI Securities Ltd.' },
  { name: 'Girish Rao', category: 'FMCG Icon', company: 'Marico Ltd.' },
  { name: 'Milind Khamkar', category: 'FMCG Icon', company: 'Supermax' },
  { name: 'Santosh Singh', category: 'FMCG Icon', company: 'Dharampal Satyapal Ltd.' },
  { name: 'Venkatarao Demera', category: 'FMCG Icon', company: 'Godfrey Phillips India Ltd.' },
  {
    name: 'Jai Prakash Dwivedi',
    category: 'Healthcare & Pharma Icon',
    company: 'Rajiv Gandhi Cancer Institute & Research Centre',
  },
  {
    name: 'Sanjay Chowdhry',
    category: 'Healthcare & Pharma Icon',
    company: 'Hamdard Laboratories (India)',
  },
  {
    name: 'Veneeth Purushotaman',
    category: 'Healthcare & Pharma Icon',
    company: 'Fortis Healthcare Ltd.',
  },
  { name: 'Ajay Bakshi', category: 'IT, BPO & ITES Icon', company: 'Aegis Ltd.' },
  { name: 'Avinash Velhal', category: 'IT, BPO & ITES Icon', company: 'Atos India' },
  { name: 'Jitendra Singh', category: 'Manufacturing Icon', company: 'JK Cement Ltd.' },
  { name: 'Rupesh Nain', category: 'Manufacturing Icon', company: 'JCB India Ltd.' },
  { name: 'Vineet Bansal', category: 'Manufacturing Icon', company: 'Greenply Industries Ltd.' },
  { name: 'Ajay Kumar Meher', category: 'Media Icon', company: 'Sony Pictures Networks Pvt. Ltd.' },
  { name: 'Ritu Madbhavi', category: 'Media Icon', company: 'FCB Ulka Advertising Pvt. Ltd.' },
  { name: 'Sayed Peerzade', category: 'Media Icon', company: 'Reliance Big Enetertainment' },
  { name: 'Sunil Mehta', category: 'Media Icon', company: 'J Walter Thompson' },
  { name: 'Anil Shankar', category: 'Retail Icon', company: 'Shoppers Stop Ltd.' },
  { name: 'Deena Dayalan K', category: 'Retail Icon', company: 'Sears Holdings India' },
  { name: 'Prasad Pudipeddi', category: 'Retail Icon', company: 'Hafele India Pvt. Ltd.' },
  {
    name: 'Ananthakrishnan Ganesan',
    category: 'Transport & Logistics Icon',
    company: 'APM Terminals',
  },
  { name: 'G.S. Ravi Kumar', category: 'Transport & Logistics Icon', company: 'Gati Ltd.' },
  { name: 'Prasad Patil', category: 'Transport & Logistics Icon', company: 'JM Baxi Group' },
  {
    name: 'Rishi Sareen',
    category: 'Transport & Logistics Icon',
    company: 'Ecom Express Pvt. Ltd.',
  },
  {
    name: 'Shreesh Patwardhan',
    category: 'Transport & Logistics Icon',
    company: 'Dynamic Logistics',
  },
  {
    name: 'Harish Chandra',
    category: 'Travel & Hospitality Icon',
    company: 'Sarovar Hotels & Resorts',
  },
  { name: 'Anand Budholia', category: 'Utilities Icon', company: 'Reliance Power Ltd.' },
  { name: 'Asha Poulose Johnson', category: 'Utilities Icon', company: 'General Electric' },
  { name: 'Rajiv Sharaf', category: 'Utilities Icon', company: 'Reliance Infrastructure Ltd.' },
];

export const winner2017Sections: Winner2017Section[] = [
  {
    title: 'Technology Icons',
    entries: technologyIconEntries,
  },
  {
    title: 'Business Icons',
    entries: businessIconEntries,
  },
];
