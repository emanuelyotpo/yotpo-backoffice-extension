import { toastAlert } from "@yotpo-common/react-b2b-components/alert"
import { YotpoStatus } from "@yotpo-common/react-b2b-components/enums"

export function toast(status:string, message:string) {
    toastAlert(
        {
          alertTitle: `${message}`,
          status: status === 'success' ? YotpoStatus.success : status === 'error' ? YotpoStatus.danger : YotpoStatus.neutral,
          icon: true,
        },
        () => {}
      )

  }