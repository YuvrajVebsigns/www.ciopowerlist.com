export type Winner2018Entry = {
  name: string;
  category: string;
  company: string;
};

export type Winner2018Section = {
  title: string;
  entries: Winner2018Entry[];
};

export const winner2018Image = '/assets/logo/Anil-Porter.jpg';

const technologyIconEntries: Winner2018Entry[] = [
  { name: 'Manish Sinha', category: 'Analytics Icon', company: 'Vectus Industries' },
  {
    name: 'Dr. Makarand Sawant',
    category: 'Analytics Icon',
    company: 'Deepak Fertilisers And Petrochemicals',
  },
  { name: 'Sanjeev Jain', category: 'Cloud Icon', company: 'Integreon Managed Solutions' },
  { name: 'Girish Koppar', category: 'Cloud Icon', company: 'Lilavati Hospital & Research Center' },
  { name: 'Shailendra Choudhary', category: 'Cloud Icon', company: 'Interarch Building Products' },
  { name: 'Milind Khamkar', category: 'Cloud Icon', company: 'SUPERMAX' },
  { name: 'Sajith Chakkingal', category: 'Datacenter & IT Infrastructure', company: 'Eurofins' },
  {
    name: 'Srinivas R',
    category: 'Datacenter & IT Infrastructure',
    company: 'The Himalaya Drug Company',
  },
  {
    name: 'Sudhir Kanvinde',
    category: 'Datacenter & IT Infrastructure Icon',
    company: 'IL&FS Transportation Networks',
  },
  {
    name: 'Amit Khanna',
    category: 'Datacenter & IT Infrastructure Icon',
    company: 'WNS Global Services',
  },
  {
    name: 'Rajeev Khade',
    category: 'Datacenter & IT Infrastructure Icon',
    company: 'Adient India',
  },
  { name: 'Kamal Goel', category: 'Digital Icon', company: 'ANAND RATHI SHARES & STOCK BROKERS' },
  { name: 'Tarun Pandey', category: 'Digital Icon', company: 'Aditya Birla Capital' },
  { name: 'Ashish Mehta', category: 'Digital Icon', company: 'AGS Transact Technologies' },
  {
    name: 'Pramod Kulkarni',
    category: 'Digital Icon',
    company: 'The Ambassador Group - Narangs International Hotels',
  },
  { name: 'Vishal Gupta', category: 'Digital Icon', company: 'Indraprastha Apollo Hospitals' },
  {
    name: 'Sarang Deshpande',
    category: 'ERP Icon',
    company: 'Century Textiles & Industries (Cement Division)',
  },
  { name: 'Niranjan Ramakrishnan', category: 'ERP Icon', company: 'Kauvery Hospitals' },
  { name: 'Naresh Pathak', category: 'GRC Icon', company: 'Andritz Hydro' },
  { name: 'Sunil Kolambkar', category: 'GRC Icon', company: 'Indofil Industries' },
  { name: 'D V Seshu Kumar', category: 'GRC Icon', company: 'Orient Cement' },
  { name: 'Anjani Kumar', category: 'Intelligent Bots & RPA Icon', company: 'Collabera' },
  { name: 'Anand Budholia', category: 'Intelligent Bots & RPA Icon', company: 'Reliance Power' },
  {
    name: 'Lalit Popli',
    category: 'Intelligent Bots & RPA Icon',
    company: 'ICICI Prudential Asset Management Company',
  },
  { name: 'Achal Kataria', category: 'Intelligent Bots & RPA Icon', company: 'EXL Service' },
  {
    name: 'Hemal Shah',
    category: 'Intelligent Bots & RPA Icon',
    company: 'Gracenote Inc (A Nielsen Company)',
  },
  { name: 'Arun Attri', category: 'IOT Icon', company: 'Wonder Cement' },
  { name: 'Atul Bansal', category: 'IOT Icon', company: 'Gateway Rail Freight' },
  { name: 'Rajendra Bisht', category: 'Mobility Icon', company: 'Electronica Finance' },
  { name: 'Ninad Raje', category: 'Mobility Icon', company: 'HealthAssure' },
  { name: 'Radhakrishna Pillai', category: 'Mobility Icon', company: 'SRL' },
  { name: 'Kiran Komatla', category: 'Mobility Icon', company: 'Burger King India' },
  {
    name: 'Subhash Singh Punjabi',
    category: 'Product Lifecycle Management Icon',
    company: 'Alicon Castalloy',
  },
  { name: 'Ajay Bakshi', category: 'Productivity Icon', company: 'Aegis Customer Support' },
  {
    name: 'Thomson Thomas',
    category: 'Productivity Icon',
    company: 'HDFC Standard Life Insurance',
  },
  { name: 'Radhakrishnan Menon', category: 'Security Icon', company: 'Biocon' },
  { name: 'Pravin Savant', category: 'Security Icon', company: 'Mullen Lowe Lintas' },
  { name: 'Maya R Nair', category: 'Security Icon', company: 'Idea Cellular' },
  {
    name: 'Ranganathan N N',
    category: 'Unified Communications Icon',
    company: 'Mahindra Insurance Brokers',
  },
  {
    name: 'Pankaj Bhargava',
    category: 'Unified Communications Icon',
    company: 'Pidilite Industries',
  },
  { name: 'Atul Govil', category: 'Unified Communications Icon', company: 'India Glycols' },
  {
    name: 'Deena Dayalan K',
    category: 'Unified Communications Icon',
    company: 'Sears Holdings India',
  },
  { name: 'Joseph Kiran Kumar', category: 'Virtualization Icon', company: 'Eisai Pharmaceuticals' },
  { name: 'Ekhlaque Bari', category: 'Virtualization Icon', company: 'Max Life Insurance' },
  { name: 'Harnath Babu', category: 'Virtualization Icon', company: 'KPMG' },
  { name: 'Navneet Sharma', category: 'Virtualization Icon', company: 'Intex Technologies' },
  { name: 'Shreesh Patwardhan', category: 'Virtualization Icon', company: 'Dynamic Logistics' },
  { name: 'KRC Murty', category: 'Virtualization Icon', company: 'Deutsche Bank AG' },
  {
    name: 'Shiv Kumar Bhasin',
    category: 'Digital Transformation Icon',
    company: 'State Bank of India',
  },
  { name: 'Amit Waghmare', category: 'Digital Transformation Icon', company: 'Page Industries' },
  { name: 'Anand Ruhela', category: 'Digital Transformation Icon', company: 'Kwality' },
  { name: 'A Shiju Rawther', category: 'Digital Transformation Icon', company: 'TransUnion CIBIL' },
  { name: 'Sanjay Narkar', category: 'Digital Transformation Icon', company: 'IDFC Bank' },
  {
    name: 'V Sendil Kumar',
    category: 'Digital Transformation Icon',
    company: 'Shriram Value Services',
  },
  {
    name: 'Harish Sharma C L',
    category: 'Datacenter & IT Infrastructure Icon',
    company: 'Toyota Financial Services',
  },
  { name: 'Sanjay Verma', category: 'Mobility Icon', company: 'JK Lakshmi Cement' },
  { name: 'V Ranganathan Iyer', category: 'IOT Icon', company: 'JBM Group' },
  { name: 'Mayank Bedi', category: 'ERP Icon', company: 'VST Tillers Tractors' },
  { name: 'Rohit Gaur', category: 'Supply Chain Management Icon', company: 'Optiemus Group' },
];

const businessIconEntries: Winner2018Entry[] = [
  { name: 'Bhavesh Lakhani', category: 'Asset Management Icon', company: 'DSP Blackrock' },
  { name: 'Kiran Belsekar', category: 'Asset Management Icon', company: 'ENAM AMC' },
  {
    name: 'Rajeev Mittal',
    category: 'Automobiles & Auto Ancillaries Icon',
    company: 'Endurance Technologies',
  },
  {
    name: 'Pratap Patjoshi',
    category: 'Automobiles & Auto Ancillaries Icon',
    company: 'Mercedes Benz',
  },
  { name: 'Sanjay Narkar', category: 'Banking Icon', company: 'IDFC Bank' },
  { name: 'Shiv Kumar Bhasin', category: 'Banking Icon', company: 'State Bank Of India' },
  { name: 'Rajesh Bhasin', category: 'Banking Icon', company: 'Societe Generale' },
  { name: 'Vinod Pandey', category: 'Chemicals Icon', company: 'GHCL' },
  { name: 'Suresh Kumar', category: 'Consulting Icon', company: 'Grant Thornton India' },
  { name: 'Kamal Karnataka', category: 'Diversified Group Icon', company: 'RJ Corp' },
  { name: 'Anil Nadkarni', category: 'Diversified Group Icon', company: 'Mahyco Seeds' },
  { name: 'Nikhil Kumar Nigam', category: 'Education Icon', company: 'Amity University' },
  { name: 'Yogesh Zope', category: 'Engineering Icon', company: 'Bharat Forge' },
  { name: 'Sivasubramanian M', category: 'Engineering Icon', company: 'L&T IDPL' },
  { name: 'Jagdish Lomte', category: 'Engineering Icon', company: 'Thermax' },
  {
    name: 'Umesh Mittal',
    category: 'Financial Services Icon',
    company: 'Alchemy Capital Management',
  },
  { name: 'Yagnesh Parikh', category: 'Financial Services Icon', company: 'ICICI Securities' },
  { name: 'Sammeer Saurabh', category: 'Financial Services Icon', company: 'HDFC Securities' },
  { name: 'Kersi Tavadia', category: 'Financial Services Icon', company: 'BSE' },
  { name: 'Manish Gaur', category: 'FMCG Icon', company: 'Patanjali' },
  { name: 'Abhay Bapna', category: 'FMCG Icon', company: 'Adani Wilmar' },
  {
    name: 'Sanjay Chowdhry',
    category: 'Healthcare & Pharma Icon',
    company: 'Hamdard Laboratories',
  },
  { name: 'Jitendra Mishra', category: 'Healthcare & Pharma Icon', company: 'Wanbury' },
  {
    name: 'Veneeth Purushotaman',
    category: 'Healthcare & Pharma Icon',
    company: 'Fortis Healthcare',
  },
  {
    name: 'Jai Prakash Dwivedi',
    category: 'Healthcare & Pharma Icon',
    company: 'Rajiv Gandhi Cancer Institute & Research Centre',
  },
  { name: 'Goutam Datta', category: 'Insurance Icon', company: 'ICICI Lombard GIC' },
  { name: 'Indra Bhushan Singh', category: 'IT, ITES & BPO Icon', company: 'Convergys' },
  {
    name: 'Rajendra Deshpande',
    category: 'IT, ITES & BPO Icon',
    company: 'Intelenet Global Services',
  },
  { name: 'RP Rath', category: 'IT, ITES & BPO Icon', company: 'Quatrro Global Services' },
  { name: 'Rajesh Garg', category: 'IT, ITES & BPO Icon', company: 'Rolta India' },
  { name: 'Debashis Singh', category: 'IT, ITES & BPO Icon', company: 'Mphasis' },
  { name: 'Jitendra Singh', category: 'Manufacturing Icon', company: 'JK Cement' },
  { name: 'Prasad Pudipeddi', category: 'Manufacturing Icon', company: 'Hafele India' },
  { name: 'Rajiv Singla', category: 'Manufacturing Icon', company: 'ACC' },
  {
    name: 'Sanjiv Kumar Jain',
    category: 'Manufacturing Icon',
    company: 'Spark Minda, Ashok Minda Group',
  },
  { name: 'Rupesh Nain', category: 'Manufacturing Icon', company: 'JCB India' },
  { name: 'Dwarka Srinath', category: 'Media & Entertainment Icon', company: 'Tata Sky' },
  { name: 'Sunil Mehta', category: 'Media & Entertainment Icon', company: 'J Walter Thompson' },
  {
    name: 'Ritu Madbhavi',
    category: 'Media & Entertainment Icon',
    company: 'FCB Ulka Advertising',
  },
  { name: 'Aneesh Nair', category: 'Media & Entertainment Icon', company: 'NDTV Worldwide' },
  { name: 'Ajay Meher', category: 'Media & Entertainment Icon', company: 'Sony Pictures Networks' },
  { name: 'Sandeep Jamdagni', category: 'Real Estate Icon', company: 'Ashiana Housing' },
  { name: 'Shailesh Joshi', category: 'Real Estate Icon', company: 'Birla Estates' },
  { name: 'Piyush Chouhan', category: 'Retail Icon', company: 'Arvind Lifestyle Brands' },
  { name: 'Kunal Mehta', category: 'Retail Icon', company: 'Raymond' },
  { name: 'Ajay Srivastava', category: 'Telecom Icon', company: 'Vectus Industries' },
  { name: 'Ajay Ajmera', category: 'Textile Icon', company: 'Banswara Syntex' },
  { name: 'Glory Nelson', category: 'Travel & Hospitality Icon', company: 'Spicejet Airlines' },
  { name: 'Neha Kini', category: 'Metals & Mining Icon', company: 'Vedanta (Sterlite Copper)' },
];

export const winner2018Sections: Winner2018Section[] = [
  {
    title: 'Technology Icons',
    entries: technologyIconEntries,
  },
  {
    title: 'Business Icons',
    entries: businessIconEntries,
  },
];
