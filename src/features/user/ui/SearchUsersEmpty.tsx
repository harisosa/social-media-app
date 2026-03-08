export const SearchUsersEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-sm font-semibold text-white">
        No results found
      </p>

      <p className="mt-2 text-sm text-neutral-400">
        Change your keyword and try again
      </p>
    </div>
  )
}