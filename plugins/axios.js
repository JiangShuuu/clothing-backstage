// 目前plugins未使用axios.js

// const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNjQ2NzE3MDc0LCJ1c2VyX2lkIjoiWW5ISWlMb1lnYk9Ua1ZZeUllZXVtWFVHM3F4MiIsInN1YiI6IlluSElpTG9ZZ2JPVGtWWXlJZWV1bVhVRzNxeDIiLCJpYXQiOjE2NDY3MTcwNzQsImV4cCI6MTY0NzE0OTA3NCwiZW1haWwiOiJnbG9iZWxleDY1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImdsb2JlbGV4NjVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.WG6mmvjzQaXB6h5uLytOtWVe8jb2WjgPuhfQ5Wvif1xzhBtJQzMQ_MU-FLidM2ovuM3ctVHf68hP0Pysq1mSX_po5-p8R0rQgtvxwyeUx_HHIcpT3-FoOQIy-eYp2RR0gz1EpE_4SLl07lY2WzpzezgzJnmME5hUquD_x4Jssxbyg4UXJIJvKiVXa-CaDrkoDMYndIop1A5zPaJH7eKFjKgYSaZrJwDGM8eygoQEcx6TPhevDJn5aOLjFBdmg5ctufsSLYqbN_b9KHExoHwNwYdHwYcsuTW0ZuVC3sbynI5uYYM9cGIaTFAj9BKiQoBrceLD9_LsmlM2U1KX_hWaWA'

// export default function ({ $auth, $axios, redirect }) {
//   // 目前需要手動token 往cookies研究
//   $axios.onRequest((config) => {
//     config.headers.Authorization = token
//   })
//   $axios.onError((error) => {
//     const code = parseInt(error.response && error.response.status)
//     if (code === 400) {
//       redirect('/400')
//     }
//   })
// }
