export default function useGetLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      localStorage.setItem('location', JSON.stringify(position.coords))
    })
    return true
  } else {
    alert('failed to get current location')
    return false
  }
}
