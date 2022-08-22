import { YotpoProducts } from "@yotpo-common/react-b2b-components/enums"
import { IButton } from "./IButton"

export interface ITabData {
  id?: number
  label?: string
  value?: string
  product?: YotpoProducts
  tab?: any
  buttons?: IButton[]
}
