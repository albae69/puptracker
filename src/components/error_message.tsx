export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className='p-2 bg-red-500 rounded-sm mb-2'>
      <p className='text-sm text-white'>{message}</p>
    </div>
  )
}
