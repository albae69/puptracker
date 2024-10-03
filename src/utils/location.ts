export default function useGetLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      localStorage.setItem('location', JSON.stringify(position.coords))
    })
  } else {
    alert('failed to get current location')
  }
}
