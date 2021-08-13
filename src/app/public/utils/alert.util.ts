import Swal, { SweetAlertIcon } from "sweetalert2";

export class AlertUtil {

  private static showAlert(title: string, message: string, icon: SweetAlertIcon) {
    Swal.fire(title, message, icon);
  }

  static sucessAlert(message: string, title?: string) {
    this.showAlert(title, message, 'success');
  }

  static infoAlert(message: string, title?: string) {
    this.showAlert(title, message, 'info');
  }

  static errorAlert(message: string, title?: string) {
    this.showAlert(title, message, 'error');
  }

}
