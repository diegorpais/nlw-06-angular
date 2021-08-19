import Swal, { SweetAlertIcon } from "sweetalert2";
import { AlertIcons, AlertQuestionResult } from "../models";
export class AlertUtil {

  private static showAlert(title: string, message: string, icon: SweetAlertIcon) {
    Swal.fire(title, message, icon);
  }

  static sucessAlert(message: string, title?: string) {
    this.showAlert(title, message, AlertIcons.SUCCESS);
  }

  static infoAlert(message: string, title?: string) {
    this.showAlert(title, message, AlertIcons.INFO);
  }

  static errorAlert(message: string, title?: string) {
    this.showAlert(title, message, AlertIcons.ERROR);
  }

  static confirmAlert(title: string, icon: SweetAlertIcon): Promise<AlertQuestionResult> {
    return Swal.fire({
      title,
      icon,
      backdrop: false,
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Cancelar',
    });
  }

}
