module.exports = {
  notifWaiting(toast) {
    var toastWaait = toast('Waiting for verification', {
      position: 'bottom-right',
      timeout: false,
      closeOnClick: true,
      showCloseButtonOnHover: false,
      hideProgressBar: false,
      closeButton: 'button',
      icon: true,  // Optional
    })
    return toastWaait
  },
  notifError(toast, error) {
    var toastError = toast.error(error, {
      position: 'bottom-right',
      timeout: 2000,
      closeOnClick: true,
      showCloseButtonOnHover: false,
      hideProgressBar: false,
      closeButton: 'button',
      icon: true,  // Optional
    })
    return toastError
  },
  notifSuccess(toast, transactionHash) {
    var toastSuccess = toast.success(transactionHash, {
      position: 'bottom-right',
      timeout: 1500,
      closeOnClick: true,
      showCloseButtonOnHover: false,
      hideProgressBar: false,
      closeButton: 'button',
      icon: true,  // Optional
    })
    return toastSuccess
  },
}
