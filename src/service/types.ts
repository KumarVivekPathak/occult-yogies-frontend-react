export interface User {
  // Define the shape of your user object here, for example:
  id: string;
  name: string;
  email: string;
  phone : string;
  creationDate: string;
}


export interface NameFixingDTO {
    name: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    fathers_name: string;
    mothers_name: string;
    spouse_name: string;
    mobile: string;
}

export interface NameSuggestionsDTO {
    id : number;
    firstName : string;
    name : string;
    firstNameSum : string;
    fullNameSum : string;
    fullNamePrediction : string;
    firstNamePrediction : string;
}

export interface MobileAnalysisFormDTO {
    firstName: string;
    middleName?: string;
    lastName: string;
    gender: string;
    countryCode: string;
    emailId: string;
    dateOFBirth: string;
    mobileNo: string;
    areaOfStruggle?: number[];
}

export interface Dasha {
  period: string;
  sequence: string;
  description: string;
}

export interface DashaData {
  rulingPlanet: string;
  dashas: Dasha[];
}

export interface MobileNumerologyDetailsDTO {
    dateOfBirth: string;
    mobileNumber: string;
    mobileNumberCompound: string;
    mobileNumberTotal: string;
    recommendedMobileNumber: string;
    luckyColor: string[];
    unluckyColor: string[];
    luckyNumber: string[];
    unluckyNumber: string[];
    neutralNumber?: string[];
    missingNumber?: string[];
    mobileCombination?: string[];
    recomendation?: string;
    prediction?: string[];
    recommendedWallpaper?: string;
    areaWallpaper?: string[];
}

export interface MobileNumerologyReportDataDTO {
    loshuGrid : string[][],
    vedicGrid : string[][],
    mobileNumerDetails : MobileNumerologyDetailsDTO,
    dashaChart : DashaData,
}

export interface MobileNumerologyReportListDTO {
    id : number;
    first_name ?: string;
    middle_name ?: string;
    last_name ?: string;
    name ?: string;
}

export interface LoshuVedicAnalysisFormDTO{
    firstPartnerName: string;
    firstDateOfBirth: string;
    secondPartnerName: string;
    secondDateOfBirth: string;
}

export interface PartnerInfoDTO {
    name: string;
    dob: string;
    kingNumber: string | number;
    queenNumber: string | number;
    loshuGridData: string[][];
}

// vedic switch word types
export interface VedicSwitchWordCategoriesDTO {
    id: number;
    name: string;
    description: string | null;
    createdAt: string | null;
    updatedAt: string | null;
}


export interface VedicSwitchWordReportListDTO{
    id : number;
    firstName ?: string;
    middleName ?: string;
    lastName ?: string;
    name ?: string;

}

export interface VedicSwitchWordBodyDTO{
    firstName: string,
    middleName?:string,
    lastName: string,
    dateOfBirth: string,
    timeOfBirth: string,
    placeOfBirth: string,
    majorArea: string,
    minorArea: string
}
