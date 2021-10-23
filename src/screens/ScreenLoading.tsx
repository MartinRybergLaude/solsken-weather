import React, { useEffect, useState } from "react"
import * as serviceWorkerRegistration from "../serviceWorkerRegistration"
import styles from "./ScreenLoading.module.scss"
import { useTranslation } from 'react-i18next'

let serviceWorker: ServiceWorker | null
export default function ScreenLoading() {

  const { t } = useTranslation()
  const [showUpdate, setShowUpdate] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  
  function onSWUpdate(registration: ServiceWorkerRegistration) {
    setShowUpdate(true)
    serviceWorker = registration.waiting
  }

  function onSWSuccess() {
    console.log("App installed as a PWA.")
  }

  function updateSW() {
    setShowLoading(true)
    if (!serviceWorker) return
    // Add listener for state change of service worker
    serviceWorker.onstatechange = () => {
      if (serviceWorker?.state === "activated" &&
          navigator.serviceWorker.controller) {
        // Reload page if waiting was successfully skipped
        window.location.reload()
      }
    }
    serviceWorker.postMessage({ type: "SKIP_WAITING" })
    setShowUpdate(false)
  }

  useEffect(() => {
    serviceWorkerRegistration.register({onUpdate: onSWUpdate, onSuccess: onSWSuccess})
  }, [])

  return (
    <div className={styles.masterContainer}>
      {showUpdate && 
        <Dialog title={t("text_update_short")} body={t("text_update_long")}
          confirmText={t("text_update_call")} confirmCallback={updateSW} />
      }
      {showLoading &&
        <div className={styles.loadingContainer}>
          <h2>{t("text_updating")}</h2>
        </div>
      }
    </div>
  )
}
interface PropsDialog {
  confirmCallback: () => void
  confirmText: string
  title: string
  body: string
}
function Dialog(props: PropsDialog) {
  const [exitAnimationClass, setExitAnimationClass] = useState("")
  const [entryAnimationClass, setEntryAnimationClass] = useState("")
  
  useEffect(() => {
    const entryTimeout = setTimeout(() => {
      setEntryAnimationClass(styles.entryAnimation)
    }, 10)
    return (() => {
      clearTimeout(entryTimeout)
    })
  }, [])
  function close() {
    setExitAnimationClass(styles.exitAnimation)
    setTimeout(() => {
      props.confirmCallback()
    }, 200)
  }

  return (
    <div className={styles.dialogContainer + " " + entryAnimationClass + " " + exitAnimationClass}>
      <div className={styles.dialogWrapper}>
        <h2>{props.title}</h2>
        <p>{props.body}</p>
        <button onClick={close}>{props.confirmText}</button>  
      </div>
    </div>
  )
}
