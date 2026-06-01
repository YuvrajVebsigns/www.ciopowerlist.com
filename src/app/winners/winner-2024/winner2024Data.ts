export type Winner2024Entry = {
  name: string;
  category: string;
  company: string;
};

export type Winner2024Section = {
  title: string;
  entries: Winner2024Entry[];
};

export const winner2024Image = '/assets/logo/Anil-Porter.jpg';

const technologyIconEntries: Winner2024Entry[] = [
  { name: 'Anand Tomar', category: 'AI Icon', company: "McDonald's India" },
  { name: 'Manoj Kumar', category: 'AI Icon', company: 'Ambica Steels' },
  { name: 'Sivasubramanian M', category: 'AI Icon', company: 'Welspun Corp' },
  { name: 'Sunil Kumar', category: 'AI Icon', company: 'Shiprocket' },
  { name: 'Binod Roy', category: 'Analytics Icon', company: 'Wonder Home Finance' },
  { name: 'Dr. Suresh Nadar', category: 'Analytics Icon', company: "Dr. Batra's Group" },
  { name: 'Rahul Puri', category: 'Analytics Icon', company: 'Devyani International' },
  { name: 'Yogendra Singh', category: 'Analytics Icon', company: 'Barista Coffee Company' },
  { name: 'Abhishek Arora', category: 'Cloud Icon', company: 'K Raheja Corp' },
  { name: 'Pankaj Kumar', category: 'Cloud Icon', company: 'Central Bank Housing Finance' },
  { name: 'Sudip Mazumder', category: 'Cloud Icon', company: 'PGP Glass' },
  { name: 'Ashok Tiwari', category: 'CRM Icon', company: 'Finolex Cables' },
  { name: 'Bhushan Deshpande', category: 'CRM Icon', company: 'ArcelorMittal Nippon Steel India' },
  { name: 'Rupesh Nirgude', category: 'CRM Icon', company: 'Prism Johnson' },
  { name: 'Sanjay Joshi', category: 'CRM Icon', company: 'Parle Products' },
  {
    name: 'Rajeev Bhatia',
    category: 'Datacenter & IT Infrastructure Icon',
    company: 'CMS Info Systems',
  },
  { name: 'Amol Deshpande', category: 'Digital Icon', company: 'RPG Enterprises' },
  { name: 'Anand Maliwal', category: 'Digital Icon', company: 'Inditrade Capital' },
  { name: 'Arpanarghya Saha', category: 'Digital Icon', company: 'Nippon India Mutual Fund' },
  { name: 'Harvinder Singh Banga', category: 'Digital Icon', company: 'CJ Darcl Logistics' },
  { name: 'Raghu Vokuda', category: 'Digital Icon', company: 'JSW Cement' },
  { name: 'Santhosh TG', category: 'Digital Icon', company: 'Switch Mobility' },
  { name: 'Sarbani Bhatia', category: 'Digital Icon', company: 'Dainik Jagran' },
  {
    name: 'R SRINIVAS',
    category: 'Datacenter & IT Infrastructure Icon',
    company: 'The Himalaya Drug Company',
  },
  { name: 'Abhijit Bhalerao', category: 'ERP Icon', company: 'Raymond' },
  { name: 'Ajay Bharwani', category: 'ERP Icon', company: 'Writer Corporation' },
  { name: 'Dr. Vineet Bansal', category: 'ERP Icon', company: 'Surya Roshni' },
  { name: 'Pankaj Singh', category: 'ERP Icon', company: 'VVF Group' },
  { name: 'Sudhansu Bhusan Satapathy', category: 'ERP Icon', company: 'RSPL Group' },
  { name: 'Pushkar Rege', category: 'ERP Icon', company: 'UPL' },
  { name: 'Vinod Chandnani', category: 'ERP Icon', company: 'Patel Engineering' },
  { name: 'Anand Sinha', category: 'Gen AI Icon', company: 'Birlasoft' },
  { name: 'Anuj Joshi', category: 'Gen AI Icon', company: 'Evalueserve' },
  { name: 'Ashish Desai', category: 'IoT Icon', company: 'Grasim Industries' },
  { name: 'Satej Revankar', category: 'IoT Icon', company: 'Fiat India Automobiles' },
  { name: 'Neeraj Singh', category: 'IT Modernizations Icon', company: 'InterGlobe Enterprises' },
  {
    name: 'Rajeev Taneja',
    category: 'IT Modernization Icon',
    company: 'Honda Motorcycle and Scooter India',
  },
  { name: 'Anand Deodhar', category: 'ML Icon', company: 'Force Motors' },
  { name: 'Piyush Srivastav', category: 'ML Icon', company: 'The Muthoot Group' },
  { name: 'Abhishek Gupta', category: 'Productivity Icon', company: 'DishTV' },
  {
    name: 'Binita Prasad',
    category: 'Productivity Icon',
    company: 'Saint-Gobain Grindwell Norton',
  },
  { name: 'Farhan Khan', category: 'Productivity Icon', company: 'Allied Blenders & Distillers' },
  { name: 'Shobhana Lele', category: 'Productivity Icon', company: 'The Bombay Dyeing' },
  {
    name: 'Suresh Vijayaraghavan',
    category: 'Productivity Icon',
    company: 'THG Publishing (The Hindu Group)',
  },
  { name: 'Avneesh Kumar Vats', category: 'RPA Icon', company: 'Energy Efficiency Services' },
  { name: 'Manu Sharma', category: 'RPA Icon', company: 'Onmobile Global' },
  { name: 'Neilmani Sahu', category: 'RPA Icon', company: 'JSW Paints' },
  { name: 'Niraj Godiwala', category: 'RPA Icon', company: 'Knight Frank India' },
  { name: 'Rajendra S Bisht', category: 'RPA Icon', company: 'Bajaj Finance - Auto Finance' },
  {
    name: 'Sanjay Kumar Purohit',
    category: 'RPA Icon',
    company: 'National Engineering Industries',
  },
  { name: 'Satyanarayana Kasturi', category: 'RPA Icon', company: 'Dilip Buildcon' },
  { name: 'Sudeep Dey', category: 'RPA Icon', company: 'HealthCare Global Enterprises' },
  { name: 'Mahendra Upadhyay', category: 'Secure Digital Workspace Icon', company: 'BARC' },
  {
    name: 'Manoj Srivastava',
    category: 'Secure Digital Workspace Icon',
    company: 'EaseMyTrip.com',
  },
  { name: 'Sanjay Kukreja', category: 'Secure Digital Workspace Icon', company: 'EclerX' },
  { name: 'Amit Jaokar', category: 'Security Icon', company: 'Sharekhan' },
  { name: 'Neehar Pathare', category: 'Security Icon', company: '63 SATS' },
  { name: 'Sanjeev Sinha', category: 'Security Icon', company: 'India Power Corporation' },
  { name: 'Sonia Swami', category: 'Security Icon', company: 'O2 Power' },
  { name: 'Bal Singh', category: 'Software Icon', company: 'Shahi Exports' },
  { name: 'Harsh Arora', category: 'Supply Chain Icon', company: 'Hindustan Power Projects' },
  {
    name: 'Mandar Sahasrabudhe',
    category: 'Supply Chain Icon',
    company: 'Kirloskar Management Services',
  },
  { name: 'Ravi Razdan', category: 'Supply Chain Icon', company: 'Jyothy Labs' },
  { name: 'Narottam Sharma', category: 'Transformation Icon', company: 'Jubilant FoodWorks' },
  { name: 'Shweta Bhatnagar', category: 'Transformation Icon', company: 'Symbiosis International' },
  { name: 'Swapnil Wadhwa', category: 'Transformation Icon', company: 'Aragen Life Sciences' },
  { name: 'Selestin K Thomas', category: 'Virtualization Icon', company: 'Nissan Digital India' },
];

const businessIconEntries: Winner2024Entry[] = [
  { name: 'A Shiju Rawther', category: 'Asset Management Icon', company: 'SBI Mutual Fund' },
  { name: 'Ananth Subramanian', category: 'Asset Management Icon', company: 'Kotak Mutual Fund' },
  { name: 'Raghu Natha Reddy', category: 'Asset Management Icon', company: 'UTI Asset Management' },
  {
    name: 'Vamsi Krishna Ithamraju',
    category: 'Asset Management Icon',
    company: 'Axis Mutual Fund',
  },
  {
    name: 'Rajeev Mittal',
    category: 'Automobile & Auto Ancillaries Icon',
    company: 'Endurance Technologies',
  },
  {
    name: 'Chandrasekhar Velagapudi',
    category: 'Automobile & Auto Ancillaries Icon',
    company: 'Apollo Tyres',
  },
  {
    name: 'Rucha Nanavati',
    category: 'Automobiles & Auto Ancillaries Icon',
    company: 'Mahindra Group',
  },
  {
    name: 'Sharad Kumar Agarwal',
    category: 'Automobiles & Auto Ancillaries Icon',
    company: 'JK Tyre & Industries',
  },
  {
    name: 'Vinod Gopinathan',
    category: 'Automobiles & Auto Ancillaries Icon',
    company: 'Ashok Leyland',
  },
  { name: 'Mangesh Mahale', category: 'Banking Icon', company: 'Ujjivan Small Finance Bank' },
  { name: 'Vinod Kumar', category: 'Banking Icon', company: 'Fino Payments Bank' },
  { name: 'Vishal Bhatia', category: 'Banking Icon', company: 'Canara Bank' },
  { name: 'Zuzar Tinwalla', category: 'Banking Icon', company: 'Standard Chartered Bank India' },
  {
    name: 'Subhash Singh Punjabi',
    category: 'Chemical Icon',
    company: 'Deepak Fertilisers & Petrochemicals',
  },
  { name: 'Harnath Babu', category: 'Consulting Icon', company: 'KPMG India' },
  { name: 'Vinod Sivarama Krishnan', category: 'Diversified Group Icon', company: 'Essar' },
  { name: 'Jai Prakash Sharma', category: 'Ecommerce Icon', company: 'Info Edge India' },
  {
    name: 'Rajkumar Ayyella',
    category: 'Engineering Icon',
    company: 'RPG Group (KEC International)',
  },
  { name: 'Anurag Jain', category: 'Financial Services Icon', company: 'Bajaj Housing Finance' },
  { name: 'Jyothirlatha B', category: 'Financial Services Icon', company: 'Godrej Capital' },
  { name: 'Ashok Nayak', category: 'Healthcare & Pharma Icon', company: 'IPCA Laboratories' },
  {
    name: 'Balaji Aravamuthan',
    category: 'Healthcare & Pharma Icon',
    company: 'Emcure Pharmaceuticals',
  },
  { name: 'Kumaresan M', category: 'Healthcare & Pharma Icon', company: 'Unichem Laboratories' },
  {
    name: 'Sanjay Moralwar',
    category: 'Healthcare & Pharma Icon',
    company: 'Cadila Health Care - Zydus Group',
  },
  {
    name: 'Anjani Kumar',
    category: 'Insurance Icon',
    company: 'TATA AIG General Insurance Company',
  },
  { name: 'Rohit Kilam', category: 'Insurance Icon', company: 'HDFC Life' },
  { name: 'Saurabh Tiwari', category: 'Insurance Icon', company: 'PolicyBazaar.com' },
  { name: 'Kapil Pal', category: 'IT, ITES & BPO Icon', company: 'iEnergyizer' },
  { name: 'Mukesh Jain', category: 'IT, ITES & BPO Icon', company: 'Capgemini' },
  { name: 'Narendra Sonawane', category: 'IT, ITES & BPO Icon', company: 'Infosys' },
  { name: 'Nayan Desai', category: 'IT, ITES & BPO Icon', company: 'WNS' },
  {
    name: 'Chetan Trivedi',
    category: 'Manufacturing Icon',
    company: 'STL Digital & Vedanta Group',
  },
  { name: 'Gyan Pandey', category: 'Manufacturing Icon', company: 'Voltas, A Tata Enterprise' },
  {
    name: 'Pankaj Khare',
    category: 'NBFC Icon',
    company: 'Bharat Financial Inclusion (100% Subsidiary of IndusInd Bank)',
  },
  { name: 'Kiran Komatla', category: 'Retail Icon', company: 'Restaurants Brands Asia' },
  {
    name: 'Praveen Shrikhandc',
    category: 'Retail Icon',
    company: 'Aditya Birla Fashion and Retail',
  },
  { name: 'Satish Panchapakesan', category: 'Retail Icon', company: 'Arvind Fashions' },
  { name: 'Vinod Kapote', category: 'Retail Icon', company: 'Trent' },
  {
    name: 'Vinod Bhat',
    category: 'Travel & Hospitality Icon',
    company: 'Vistara, Tata SIA Airlines',
  },
  { name: 'Anand Prakash Budhoila', category: 'Utilities Icon', company: 'BSES Delhi' },
];

export const winner2024Sections: Winner2024Section[] = [
  {
    title: 'Technology Icons',
    entries: technologyIconEntries,
  },
  {
    title: 'Business Icons',
    entries: businessIconEntries,
  },
];
