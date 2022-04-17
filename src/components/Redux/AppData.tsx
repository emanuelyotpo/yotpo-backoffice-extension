export class AppData {
  // Reviews
  appkey: string = '';
  reviewsPlatform: string = '';
  isBottomLineInstalled: boolean = false;
  productId: string = '';
  productName: string = '';
  productImageURL: string = '';
  avgScore: number = 0;
  totalReviews: number = 0;
  groupedReviews: number = 0;
  syndicatedReviews: number = 0;
  customQuestionsSlugs: string[] = [];
  customQuestionsDetails: any[] = [];

  //Loyalty
  guid: string = ''
  merchantId: string = '';
  loyaltyPlatforms: string = '';
  customerEmail: string = '';
  customerId: string = '';
  customerTags: string = '';
  instances: any[] = [];
  activeInstances: any[] = [];
  inactiveInstances: any[] = [];
  instancesForCopy: any[] = [];
}
