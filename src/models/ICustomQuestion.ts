export interface ICustomQuestion {
  map(arg0: (customQuestion: any, index: any) => any): import("react").ReactNode
  title?: string
  type?: string
  score?: number
  average_score?: number
}
