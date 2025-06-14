
export type Language = 'en' | 'sw';

export const translations = {
  en: {
    // Auth page
    welcomeBack: 'Welcome Back',
    joinBwanaShamba: 'Join Bwana Shamba',
    signInToAccess: 'Sign in to access your farming dashboard',
    createAccountToStart: 'Create your account to start remote digital farming',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    country: 'Country',
    phone: 'Phone (Optional)',
    preferredCrop: 'Preferred Crop',
    farmSize: 'Farm Size',
    farmingExperience: 'Farming Experience',
    enterEmail: 'Enter your email',
    enterPassword: 'Enter your password',
    createPassword: 'Create password',
    confirmPasswordPlaceholder: 'Confirm password',
    yourFullName: 'Your full name',
    selectCountry: 'Select country',
    yourPhoneNumber: 'Your phone number',
    selectCrop: 'Select crop',
    selectSize: 'Select size',
    selectExperience: 'Select experience level',
    signIn: 'Sign In',
    signingIn: 'Signing In...',
    createAccount: 'Create Account',
    creatingAccount: 'Creating Account...',
    dontHaveAccount: "Don't have an account? Sign up",
    alreadyHaveAccount: "Already have an account? Sign in",
    
    // Dashboard
    remoteFarmingPlatform: 'Remote Farming Platform',
    operations: 'Operations',
    activeFarms: 'Active Farms',
    totalInvestment: 'Total Investment',
    workersHired: 'Workers Hired',
    nextHarvest: 'Next Harvest',
    days: 'days',
    dashboard: 'Dashboard',
    crops: 'Crop Matcher',
    marketplace: 'Marketplace',
    land: 'Land Rental',
    workers: 'Workers',
    farmUpdates: 'Farm Updates',
    realTimeProgress: 'Real-time progress from your farms',
    marketIntelligence: 'Market Intelligence',
    currentCropPrices: 'Current crop prices and trends',
    recentActivity: 'Recent Activity',
    profile: 'Profile',
    signOut: 'Sign Out',
    
    // Profile page
    backToDashboard: 'Back to Dashboard',
    yourProfile: 'Your Profile',
    memberSince: 'Member since',
    profileInformation: 'Profile Information',
    edit: 'Edit',
    cancel: 'Cancel',
    save: 'Save',
    saving: 'Saving...',
    notProvided: 'Not provided',
    experience: 'Experience',
    
    // Common
    loading: 'Loading...',
    loadingProfile: 'Loading profile...',
    
    // Countries
    countries: {
      Kenya: 'Kenya',
      Tanzania: 'Tanzania',
      Uganda: 'Uganda',
      Rwanda: 'Rwanda',
      Burundi: 'Burundi',
      Ethiopia: 'Ethiopia',
      'South Sudan': 'South Sudan'
    },
    
    // Crops
    crops: {
      Maize: 'Maize',
      Rice: 'Rice',
      Beans: 'Beans',
      Tomatoes: 'Tomatoes',
      Onions: 'Onions',
      Carrots: 'Carrots',
      Cabbage: 'Cabbage',
      Coffee: 'Coffee',
      Tea: 'Tea'
    },
    
    // Experience levels
    experienceLevels: {
      'Beginner (0-2 years)': 'Beginner (0-2 years)',
      'Intermediate (3-5 years)': 'Intermediate (3-5 years)',
      'Advanced (6-10 years)': 'Advanced (6-10 years)',
      'Expert (10+ years)': 'Expert (10+ years)'
    },
    
    // Farm sizes
    farmSizes: {
      'Small (0-2 acres)': 'Small (0-2 acres)',
      'Medium (3-10 acres)': 'Medium (3-10 acres)',
      'Large (11-50 acres)': 'Large (11-50 acres)',
      'Very Large (50+ acres)': 'Very Large (50+ acres)'
    }
  },
  
  sw: {
    // Auth page
    welcomeBack: 'Karibu Tena',
    joinBwanaShamba: 'Jiunge na Bwana Shamba',
    signInToAccess: 'Ingia ili kufikia dashibodi yako ya kilimo',
    createAccountToStart: 'Fungua akaunti yako ili kuanza kilimo cha kidijitali kwa mbali',
    email: 'Barua pepe',
    password: 'Nywila',
    confirmPassword: 'Thibitisha Nywila',
    fullName: 'Jina Kamili',
    country: 'Nchi',
    phone: 'Simu (Si Lazima)',
    preferredCrop: 'Mazao Unayopendelea',
    farmSize: 'Ukubwa wa Shamba',
    farmingExperience: 'Uzoefu wa Kilimo',
    enterEmail: 'Ingiza barua pepe yako',
    enterPassword: 'Ingiza nywila yako',
    createPassword: 'Tengeneza nywila',
    confirmPasswordPlaceholder: 'Thibitisha nywila',
    yourFullName: 'Jina lako kamili',
    selectCountry: 'Chagua nchi',
    yourPhoneNumber: 'Nambari yako ya simu',
    selectCrop: 'Chagua mazao',
    selectSize: 'Chagua ukubwa',
    selectExperience: 'Chagua kiwango cha uzoefu',
    signIn: 'Ingia',
    signingIn: 'Unaingia...',
    createAccount: 'Fungua Akaunti',
    creatingAccount: 'Unafungua Akaunti...',
    dontHaveAccount: 'Huna akaunti? Jisajili',
    alreadyHaveAccount: 'Una akaunti tayari? Ingia',
    
    // Dashboard
    remoteFarmingPlatform: 'Jukwaa la Kilimo kwa Mbali',
    operations: 'Shughuli',
    activeFarms: 'Mashamba Yanayofanya Kazi',
    totalInvestment: 'Jumla ya Uwekezaji',
    workersHired: 'Wafanyakazi Walioajiriwa',
    nextHarvest: 'Mavuno Yanayofuata',
    days: 'siku',
    dashboard: 'Dashibodi',
    crops: 'Kilinganishi cha Mazao',
    marketplace: 'Soko',
    land: 'Kukodisha Ardhi',
    workers: 'Wafanyakazi',
    farmUpdates: 'Masasisho ya Shamba',
    realTimeProgress: 'Maendeleo ya wakati halisi kutoka mashamba yako',
    marketIntelligence: 'Akili ya Soko',
    currentCropPrices: 'Bei za mazao za sasa na mielekeo',
    recentActivity: 'Shughuli za Hivi Karibuni',
    profile: 'Wasifu',
    signOut: 'Toka',
    
    // Profile page
    backToDashboard: 'Rudi kwenye Dashibodi',
    yourProfile: 'Wasifu Wako',
    memberSince: 'Mwanachama tangu',
    profileInformation: 'Maelezo ya Wasifu',
    edit: 'Hariri',
    cancel: 'Ghairi',
    save: 'Hifadhi',
    saving: 'Inahifadhi...',
    notProvided: 'Haijapatikana',
    experience: 'Uzoefu',
    
    // Common
    loading: 'Inapakia...',
    loadingProfile: 'Inapakia wasifu...',
    
    // Countries
    countries: {
      Kenya: 'Kenya',
      Tanzania: 'Tanzania',
      Uganda: 'Uganda',
      Rwanda: 'Rwanda',
      Burundi: 'Burundi',
      Ethiopia: 'Ethiopia',
      'South Sudan': 'Sudan Kusini'
    },
    
    // Crops
    crops: {
      Maize: 'Mahindi',
      Rice: 'Mpunga',
      Beans: 'Maharage',
      Tomatoes: 'Nyanya',
      Onions: 'Vitunguu',
      Carrots: 'Karoti',
      Cabbage: 'Kabichi',
      Coffee: 'Kahawa',
      Tea: 'Chai'
    },
    
    // Experience levels
    experienceLevels: {
      'Beginner (0-2 years)': 'Mwanzo (miaka 0-2)',
      'Intermediate (3-5 years)': 'Kati (miaka 3-5)',
      'Advanced (6-10 years)': 'Juu (miaka 6-10)',
      'Expert (10+ years)': 'Mtaalamu (miaka 10+)'
    },
    
    // Farm sizes
    farmSizes: {
      'Small (0-2 acres)': 'Ndogo (ekari 0-2)',
      'Medium (3-10 acres)': 'Kati (ekari 3-10)',
      'Large (11-50 acres)': 'Kubwa (ekari 11-50)',
      'Very Large (50+ acres)': 'Kubwa Sana (ekari 50+)'
    }
  }
};

export const getTranslation = (language: Language, key: string): string => {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};
