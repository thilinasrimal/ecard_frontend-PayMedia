let appSettings

if (process.env.NODE_ENV === "production") {
  appSettings = {
    $api_url: "http://localhost:44351",
    timeoutDuration: 90000
  }
} else {
  appSettings = {
    $api_url: "http://localhost:44351",
    timeoutDuration: 10000
  }
}

export{appSettings}
